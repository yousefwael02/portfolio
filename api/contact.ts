import {createHash} from 'node:crypto'
import type {IncomingMessage, ServerResponse} from 'node:http'
import {Ratelimit} from '@upstash/ratelimit'
import {Redis} from '@upstash/redis'
import {Resend} from 'resend'

type ContactRequest = IncomingMessage & {body?: Record<string, unknown>}
type ContactResponse = ServerResponse & {status(code: number): ContactResponse; json(body: unknown): ContactResponse}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function getClientIdentifier(request: ContactRequest) {
  const realIp = request.headers['x-real-ip']
  const forwardedFor = request.headers['x-forwarded-for']
  const clientIp = (typeof realIp === 'string' ? realIp : realIp?.[0]) || (typeof forwardedFor === 'string' ? forwardedFor.split(',')[0] : forwardedFor?.[0]?.split(',')[0]) || 'unknown'
  return createHash('sha256').update(clientIp).digest('hex')
}

export default async function handler(request: ContactRequest, response: ContactResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({message: 'Method not allowed.'})
  }

  const {RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_RECIPIENT_EMAIL, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN} = process.env
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !CONTACT_RECIPIENT_EMAIL || !UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    return response.status(503).json({message: 'The contact service is not configured yet. Please use the email link instead.'})
  }

  const name = getString(request.body?.name)
  const email = getString(request.body?.email)
  const subject = getString(request.body?.subject)
  const message = getString(request.body?.message)
  const budget = getString(request.body?.budget)
  const honeypot = getString(request.body?.company)

  if (honeypot) return response.status(200).json({message: 'Your message has been sent.'})
  if (name.length < 2 || name.length > 100 || !emailPattern.test(email) || email.length > 254 || subject.length < 2 || subject.length > 120 || message.length < 20 || message.length > 5000 || budget.length > 80) {
    return response.status(400).json({message: 'Check the form fields and try again.'})
  }

  try {
    const redis = Redis.fromEnv()
    const limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 h'),
      prefix: 'portfolio-contact',
    })
    const {success} = await limiter.limit(getClientIdentifier(request))
    if (!success) return response.status(429).json({message: 'Too many messages have been sent. Please try again later.'})

    const resend = new Resend(RESEND_API_KEY)
    const emailResult = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [CONTACT_RECIPIENT_EMAIL],
      replyTo: email,
      subject: `Portfolio inquiry: ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        budget ? `Budget: ${budget}` : '',
        '',
        message,
      ].filter(Boolean).join('\n'),
    })

    if (emailResult.error) {
      console.error('Contact email delivery failed:', emailResult.error.name)
      return response.status(502).json({message: 'Your message could not be sent right now. Please try again or use the email link.'})
    }

    return response.status(200).json({message: 'Your message has been sent. I will be in touch soon.'})
  } catch (error) {
    console.error('Contact request failed:', error instanceof Error ? error.name : 'UnknownError')
    return response.status(503).json({message: 'Your message could not be sent right now. Please try again or use the email link.'})
  }
}
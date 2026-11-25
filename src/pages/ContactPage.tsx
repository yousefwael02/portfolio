import {useState, type FormEvent} from 'react'
import {ArrowUpRight, Mail} from 'lucide-react'
import {PageLoading} from '../components/ContentStates'
import {SEO} from '../components/SEO'
import {trackEvent} from '../lib/analytics'
import {usePortfolio} from '../context/usePortfolio'

type ContactForm = {name: string; email: string; subject: string; budget: string; message: string; company: string}

const initialForm: ContactForm = {name: '', email: '', subject: '', budget: '', message: '', company: ''}

export function ContactPage() {
  const {content, isLoading} = usePortfolio()
  const [form, setForm] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{type: 'success' | 'error'; message: string} | null>(null)
  if (isLoading) return <PageLoading label="Loading contact information" />
  const email = content?.profile?.email || content?.settings?.contactRecipientEmail

  async function submitContactForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setFeedback(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form),
      })
      const result = await response.json().catch(() => ({})) as {message?: string}
      if (!response.ok) throw new Error(result.message || 'Your message could not be sent. Please try again.')

      setForm(initialForm)
      trackEvent({name: 'Contact Form Submit', properties: {result: 'success'}})
      setFeedback({type: 'success', message: result.message || 'Your message has been sent.'})
    } catch (error) {
      trackEvent({name: 'Contact Form Submit', properties: {result: 'error'}})
      setFeedback({type: 'error', message: error instanceof Error ? error.message : 'Your message could not be sent. Please try again.'})
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEO title={`Contact | ${content?.settings?.siteTitle || 'Yousef Wael'}`} description="Get in touch with Yousef Wael about software engineering roles, consulting, and project collaborations." path="/contact" />
      <section className="contact-intro section-wrap">
        <div className="contact-copy">
          <p className="eyebrow">04 / Contact</p>
          <h1>Have a good problem<br />to <span>solve?</span></h1>
          <p className="page-intro__body">For roles, collaborations, or project inquiries, send me a note.</p>
          {email && <a className="contact-email" href={`mailto:${email}`}><Mail aria-hidden="true" size={20} /><span>{email}</span><ArrowUpRight aria-hidden="true" size={20} /></a>}
          {!!content?.socialLinks.length && <ul className="contact-socials">{content.socialLinks.map((social) => <li key={social._id}><a href={social.url} target="_blank" rel="noreferrer">{social.label} <ArrowUpRight aria-hidden="true" size={15} /></a></li>)}</ul>}
        </div>
        <form className="contact-form" onSubmit={submitContactForm}>
          <div className="contact-form__row">
            <label>Name<input autoComplete="name" maxLength={100} minLength={2} name="name" onChange={(event) => setForm({...form, name: event.target.value})} required value={form.name} /></label>
            <label>Email<input autoComplete="email" maxLength={254} name="email" onChange={(event) => setForm({...form, email: event.target.value})} required type="email" value={form.email} /></label>
          </div>
          <label>Subject<input maxLength={120} minLength={2} name="subject" onChange={(event) => setForm({...form, subject: event.target.value})} required value={form.subject} /></label>
          <label>Budget range <span className="contact-form__optional">Optional</span>
            <select name="budget" onChange={(event) => setForm({...form, budget: event.target.value})} value={form.budget}>
              <option value="">Prefer not to say</option>
              <option value="Under $1,000">Under $1,000</option>
              <option value="$1,000-$5,000">$1,000-$5,000</option>
              <option value="$5,000-$10,000">$5,000-$10,000</option>
              <option value="$10,000+">$10,000+</option>
              <option value="To be discussed">To be discussed</option>
            </select>
          </label>
          <label>Message<textarea maxLength={5000} minLength={20} name="message" onChange={(event) => setForm({...form, message: event.target.value})} required rows={6} value={form.message} /></label>
          <label className="contact-form__trap" aria-hidden="true">Company<input autoComplete="off" name="company" onChange={(event) => setForm({...form, company: event.target.value})} tabIndex={-1} value={form.company} /></label>
          <div className="contact-form__submit">
            <button className="button button--primary" disabled={isSubmitting} type="submit">{isSubmitting ? 'Sending…' : 'Send message'} <ArrowUpRight aria-hidden="true" size={17} /></button>
            <p aria-live="polite" className={`contact-form__feedback${feedback ? ` is-${feedback.type}` : ''}`} role={feedback?.type === 'error' ? 'alert' : 'status'}>{feedback?.message}</p>
          </div>
        </form>
      </section>
    </>
  )
}
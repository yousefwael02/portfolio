import {ArrowUpRight, Mail} from 'lucide-react'
import {PageLoading} from '../components/ContentStates'
import {SEO} from '../components/SEO'
import {usePortfolio} from '../context/usePortfolio'

export function ContactPage() {
  const {content, isLoading} = usePortfolio()
  if (isLoading) return <PageLoading label="Loading contact information" />
  const email = content?.profile?.email || content?.settings?.contactRecipientEmail

  return (
    <>
      <SEO title={`Contact | ${content?.settings?.siteTitle || 'Yousef Wael'}`} description="Get in touch with Yousef Wael about software engineering roles, consulting, and project collaborations." path="/contact" />
      <section className="contact-intro section-wrap">
        <p className="eyebrow">04 / Contact</p>
        <h1>Have a good problem<br />to <span>solve?</span></h1>
        <p className="page-intro__body">For roles, collaborations, or project inquiries, send me a note.</p>
        {email && <a className="contact-email" href={`mailto:${email}`}><Mail aria-hidden="true" size={20} /><span>{email}</span><ArrowUpRight aria-hidden="true" size={20} /></a>}
        {!!content?.socialLinks.length && <ul className="contact-socials">{content.socialLinks.map((social) => <li key={social._id}><a href={social.url} target="_blank" rel="noreferrer">{social.label} <ArrowUpRight aria-hidden="true" size={15} /></a></li>)}</ul>}
      </section>
    </>
  )
}
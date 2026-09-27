import {Link} from 'react-router-dom'
import {ArrowUpRight} from 'lucide-react'
import {EmptyState, PageLoading} from '../components/ContentStates'
import {SEO} from '../components/SEO'
import {usePortfolio} from '../context/usePortfolio'

export function ServicesPage() {
  const {content, isLoading} = usePortfolio()
  if (isLoading) return <PageLoading label="Loading services" />

  return (
    <>
      <SEO title={`Services | ${content?.settings?.siteTitle || 'Yousef Wael'}`} description="Full-stack development, backend and API engineering, and deployment support." path="/services" />
      <section className="services-page section-wrap">
        <header className="page-heading"><p className="eyebrow">03 / Services</p><div className="page-heading__row"><h1>Useful software.<br /><span>Built with care.</span></h1><p>Engineering support shaped around the problem, not a preset package.</p></div></header>
        {content?.services.length ? <div className="service-list">{content.services.map((service, index) => <article className="service-row" key={service._id}>
          <span className="service-row__index">0{index + 1}</span>
          <div className="service-row__body"><h2>{service.name}</h2><p className="service-row__summary">{service.shortSummary}</p><p>{service.detailedDescription}</p></div>
          <Link className="service-row__link" to={service.ctaUrl || '/contact'} aria-label={`${service.ctaLabel || 'Discuss'}: ${service.name}`}><ArrowUpRight aria-hidden="true" size={20} /></Link>
        </article>)}</div> : <EmptyState title="Services are being updated" children="Get in touch to discuss your requirements." />}
        <div className="services-cta"><p>Have a project in mind?</p><Link className="button button--primary" to="/contact">Let's work together <ArrowUpRight aria-hidden="true" size={17} /></Link></div>
      </section>
    </>
  )
}
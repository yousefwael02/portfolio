import {ArrowDownRight, ArrowUpRight, Braces, Database, ServerCog} from 'lucide-react'
import {Link} from 'react-router-dom'
import {EmptyState, PageLoading} from '../components/ContentStates'
import {ProjectCard} from '../components/ProjectCard'
import {SEO} from '../components/SEO'
import {usePortfolio} from '../context/usePortfolio'
import {getSanityImageUrl} from '../lib/sanity'

const capabilityIcons = [ServerCog, Braces, Database]

export function HomePage() {
  const {content, isLoading} = usePortfolio()
  if (isLoading) return <PageLoading label="Loading portfolio" />

  const profile = content?.profile
  const featuredProjects = content?.projects.filter((project) => project.isFeatured) ?? []
  const headline = profile?.valueProposition.split(/(?<=\.)\s/)[0] || 'I turn ideas into reliable software.'
  const image = getSanityImageUrl(profile?.profileImage, 640)
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile?.fullName || 'Yousef Wael',
      jobTitle: profile?.professionalTitle || 'Software Engineer',
      email: profile?.email ? `mailto:${profile.email}` : undefined,
      address: profile?.location ? {'@type': 'PostalAddress', addressLocality: profile.location} : undefined,
      sameAs: content?.socialLinks.map((link) => link.url),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: content?.settings?.siteTitle || 'Yousef Wael | Software Engineer',
      url: import.meta.env.VITE_SITE_URL || window.location.origin,
    },
  ]

  return (
    <>
      <SEO
        title={content?.settings?.defaultSeoTitle}
        description={content?.settings?.defaultSeoDescription}
        image={image}
        structuredData={structuredData}
      />
      <section className="hero section-wrap">
        <div className="hero__copy">
          {profile?.isAvailable && <p className="eyebrow hero__eyebrow"><span className="availability-dot" />{profile.availabilityMessage || 'Available for opportunities'}</p>}
          <h1>{headline}</h1>
          <p className="hero__summary">{profile?.positioningStatement || profile?.valueProposition || 'I build reliable web applications and backend systems.'}</p>
          <div className="hero__actions">
            <Link className="button button--primary" to={profile?.primaryCtaUrl || '/projects'}>{profile?.primaryCtaLabel || 'View my projects'} <ArrowUpRight aria-hidden="true" size={17} /></Link>
            <Link className="text-link" to={profile?.secondaryCtaUrl || '/contact'}>{profile?.secondaryCtaLabel || 'Get in touch'} <ArrowUpRight aria-hidden="true" size={16} /></Link>
          </div>
        </div>
        {image ? <div className="hero__portrait"><img src={image} alt={profile?.profileImage?.alt || profile?.fullName || 'Profile portrait'} /></div> : <div className="hero__aside" aria-label="Professional focus">
          <div className="orbit orbit--outer" /><div className="orbit orbit--inner" />
          <div className="orbit-core"><span>{profile?.fullName?.split(' ').map((part) => part[0]).slice(0, 2).join('') || 'YW'}</span><small>{profile?.location || 'CAIRO, EGYPT'}</small></div>
          <p className="hero__aside-label">Engineering with purpose</p><ArrowDownRight className="hero__aside-arrow" aria-hidden="true" size={23} />
        </div>}
        <div className="hero__index"><span>01</span><span className="hero__index-line" /><span>{profile?.timeZone || 'CAIRO, EGYPT'}</span></div>
      </section>

      <section className="featured-work section-wrap" aria-labelledby="featured-title">
        <div className="section-heading">
          <div><p className="eyebrow">Selected work</p><h2 id="featured-title">Built to solve<br />something real.</h2></div>
          <Link className="text-link" to="/projects">All projects <ArrowUpRight aria-hidden="true" size={16} /></Link>
        </div>
        {featuredProjects.length ? <div className="project-grid">{featuredProjects.map((project) => <ProjectCard key={project._id} project={project} />)}</div> : <EmptyState title="Projects are on their way" children="Check back soon for selected work and case studies." />}
      </section>

      <section className="capabilities section-wrap" aria-labelledby="capabilities-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">What I bring</p>
            <h2 id="capabilities-title">From system design<br />to shipped software.</h2>
          </div>
          <p className="section-heading__note">A biomedical engineering perspective, applied to practical software challenges.</p>
        </div>
        <div className="capability-list">
          {(profile?.coreStrengths || []).slice(0, 5).map((strength, index) => {
            const Icon = capabilityIcons[index % capabilityIcons.length]
            const [title, detail] = strength.split(' — ')
            return <article className="capability-row" key={strength}>
              <span className="capability-row__number">{String(index + 1).padStart(2, '0')}</span>
              <Icon className="capability-row__icon" aria-hidden="true" size={23} strokeWidth={1.5} />
              <div className="capability-row__text"><h3>{title}</h3><p>{detail || title}</p></div>
              <ArrowUpRight className="capability-row__arrow" aria-hidden="true" size={19} />
            </article>
          })}
        </div>
      </section>

      <section className="home-next section-wrap">
        <p className="eyebrow">A little more about me</p>
        <div className="home-next__row">
          <h2>{profile?.professionalTitle || 'Software engineer'}<br />{profile?.location || 'Cairo, Egypt'}</h2>
          <Link className="button button--outline" to="/about">More about me <ArrowUpRight aria-hidden="true" size={17} /></Link>
        </div>
      </section>
    </>
  )
}
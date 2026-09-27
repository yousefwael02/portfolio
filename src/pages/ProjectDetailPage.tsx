import {ArrowLeft, ArrowUpRight, ExternalLink} from 'lucide-react'
import {Link, useParams} from 'react-router-dom'
import {PageLoading} from '../components/ContentStates'
import {SEO} from '../components/SEO'
import {usePortfolio} from '../context/usePortfolio'
import type {Project} from '../lib/portfolio'
import {getSanityImageUrl} from '../lib/sanity'
import {NotFoundPage} from './NotFoundPage'

function projectStructuredData(project: Project) {
  const origin = import.meta.env.VITE_SITE_URL || window.location.origin
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: `${origin.replace(/\/$/, '')}/projects/${project.slug}`,
    creator: {'@type': 'Person', name: 'Yousef Wael'},
    keywords: project.technologies.map((technology) => technology.name).join(', '),
  }
}

export function ProjectDetailPage() {
  const {slug} = useParams()
  const {content, isLoading} = usePortfolio()

  if (isLoading) return <PageLoading label="Loading project" />
  const project = content?.projects.find((entry) => entry.slug === slug)
  if (!project) return <NotFoundPage />

  const image = getSanityImageUrl(project.coverImage, 1600)

  return (
    <>
      <SEO title={project.seoTitle || `${project.title} | Yousef Wael`} description={project.seoDescription || project.summary} path={`/projects/${project.slug}`} image={image} structuredData={projectStructuredData(project)} />
      <article className="project-detail section-wrap">
        <Link className="back-link" to="/projects"><ArrowLeft aria-hidden="true" size={16} /> All projects</Link>
        <header className="project-detail__header">
          <p className="eyebrow">{project.role}{project.clientOrganization ? ` · ${project.clientOrganization}` : ''}</p>
          <h1>{project.title}</h1>
          <p className="project-detail__summary">{project.summary}</p>
          <p className="project-detail__dates">
            {new Date(`${project.startDate}T00:00:00`).toLocaleDateString('en', {month: 'long', year: 'numeric'})}
            {project.isOngoing ? ' — Ongoing' : project.completionDate ? ` — ${new Date(`${project.completionDate}T00:00:00`).toLocaleDateString('en', {month: 'long', year: 'numeric'})}` : ''}
          </p>
        </header>
        <div className={`project-detail__media project-card__media--${project.slug}`}>
          {image ? <img src={image} alt={project.coverImage?.alt || `${project.title} project`} /> : <div className="project-art project-art--large" aria-hidden="true"><span className="project-art__number">{project.startDate.slice(0, 4)}</span><span className="project-art__name">{project.title}</span><span className="project-art__stack">{project.technologies.map((technology) => technology.name).join(' / ')}</span><span className="project-art__orb" /></div>}
        </div>
        <div className="project-detail__grid">
          <section className="project-detail__copy"><p className="eyebrow">The challenge</p><h2>The problem</h2><p>{project.problem}</p></section>
          <section className="project-detail__copy"><p className="eyebrow">The approach</p><h2>The solution</h2><p>{project.solution}</p></section>
          <section className="project-detail__copy project-detail__copy--result"><p className="eyebrow">The outcome</p><h2>What changed</h2><p>{project.outcome}</p></section>
          <aside className="project-detail__meta">
            <div><h2>Technologies</h2><ul className="technology-list">{project.technologies.map((technology) => <li key={technology._id}>{technology.name}</li>)}</ul></div>
            <div className="project-detail__links">
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Visit project <ExternalLink aria-hidden="true" size={15} /></a>}
              {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noreferrer">View repository <ExternalLink aria-hidden="true" size={15} /></a>}
            </div>
          </aside>
        </div>
        <Link className="text-link project-detail__next" to="/projects">More selected work <ArrowUpRight aria-hidden="true" size={16} /></Link>
      </article>
    </>
  )
}
import {ArrowUpRight} from 'lucide-react'
import {Link} from 'react-router-dom'
import type {Project} from '../lib/portfolio'
import {getSanityImageUrl} from '../lib/sanity'

export function ProjectCard({project}: {project: Project}) {
  const image = getSanityImageUrl(project.coverImage, 960)

  return (
    <article className="project-card">
      <Link className="project-card__link" to={`/projects/${project.slug}`}>
        <div className={`project-card__media project-card__media--${project.slug}`}>
          {image ? (
            <img src={image} alt={project.coverImage?.alt || `${project.title} project`} loading="lazy" decoding="async" />
          ) : (
            <div className="project-art" aria-hidden="true">
              <span className="project-art__number">{project.startDate.slice(0, 4)}</span>
              <span className="project-art__name">{project.title}</span>
              <span className="project-art__stack">{project.technologies.slice(0, 3).map((technology) => technology.name).join(' / ')}</span>
              <span className="project-art__orb" />
            </div>
          )}
          {project.isOngoing && <span className="project-card__status">In progress</span>}
        </div>
        <div className="project-card__body">
          <div className="project-card__heading">
            <div><p className="eyebrow">{project.role}</p><h2>{project.title}</h2></div>
            <ArrowUpRight aria-hidden="true" size={20} />
          </div>
          <p className="project-card__summary">{project.summary}</p>
          <ul className="technology-list" aria-label={`${project.title} technologies`}>
            {project.technologies.slice(0, 4).map((technology) => <li key={technology._id}>{technology.name}</li>)}
          </ul>
        </div>
      </Link>
    </article>
  )
}
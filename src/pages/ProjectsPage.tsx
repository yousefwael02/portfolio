import {useState} from 'react'
import {ArrowUpRight} from 'lucide-react'
import {Link} from 'react-router-dom'
import {EmptyState, PageLoading} from '../components/ContentStates'
import {ProjectCard} from '../components/ProjectCard'
import {SEO} from '../components/SEO'
import {usePortfolio} from '../context/usePortfolio'

export function ProjectsPage() {
  const {content, isLoading} = usePortfolio()
  const [activeTechnology, setActiveTechnology] = useState('All')
  if (isLoading) return <PageLoading label="Loading projects" />

  const projects = content?.projects ?? []
  const technologies = [...new Set(projects.flatMap((project) => project.technologies.map((technology) => technology.name)))].sort()
  const filteredProjects = activeTechnology === 'All' ? projects : projects.filter((project) => project.technologies.some((technology) => technology.name === activeTechnology))

  return (
    <>
      <SEO title={`Projects | ${content?.settings?.siteTitle || 'Yousef Wael'}`} description="Selected software projects, technical decisions, and outcomes." path="/projects" />
      <section className="projects-page section-wrap">
        <header className="page-heading">
          <p className="eyebrow">01 / Work</p>
          <div className="page-heading__row"><h1>Selected <span>work.</span></h1><p>A closer look at the problems, systems, and outcomes behind my projects.</p></div>
        </header>
        {projects.length > 1 && <div className="project-filters" role="group" aria-label="Filter projects by technology">
          {['All', ...technologies].map((technology) => <button key={technology} type="button" className={activeTechnology === technology ? 'filter-button is-active' : 'filter-button'} aria-pressed={activeTechnology === technology} onClick={() => setActiveTechnology(technology)}>{technology}</button>)}
        </div>}
        {filteredProjects.length ? <div className="project-grid">{filteredProjects.map((project) => <ProjectCard key={project._id} project={project} />)}</div> : <EmptyState title="No projects match this filter" children="Choose another technology to see more work." />}
        <div className="projects-cta"><p>Have a similar challenge?</p><Link className="text-link" to="/contact">Let's talk <ArrowUpRight aria-hidden="true" size={16} /></Link></div>
      </section>
    </>
  )
}
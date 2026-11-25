import {ArrowDownToLine, ArrowUpRight} from 'lucide-react'
import {Link} from 'react-router-dom'
import {PageLoading} from '../components/ContentStates'
import {ProfileOrbit} from '../components/ProfileOrbit'
import {SEO} from '../components/SEO'
import {usePortfolio} from '../context/usePortfolio'
import {trackEvent} from '../lib/analytics'
import {getSanityImageUrl} from '../lib/sanity'
import type {Skill} from '../lib/portfolio'

function formatDate(value?: string) {
  if (!value) return 'Present'
  return new Date(`${value}T00:00:00`).toLocaleDateString('en', {month: 'short', year: 'numeric'})
}

function groupSkills(skills: Skill[]) {
  return skills.reduce<Record<string, Skill[]>>((groups, skill) => {
    groups[skill.category] = [...(groups[skill.category] || []), skill]
    return groups
  }, {})
}

export function AboutPage() {
  const {content, isLoading} = usePortfolio()
  if (isLoading) return <PageLoading label="Loading profile" />
  const profile = content?.profile
  const portrait = getSanityImageUrl(profile?.profileImage, 640)

  return (
    <>
      <SEO title={`About | ${content?.settings?.siteTitle || 'Yousef Wael'}`} description={profile?.positioningStatement} path="/about" />
      <section className="about-page section-wrap">
        <header className="page-heading"><p className="eyebrow">02 / About</p><h1>Engineering perspective.<br /><span>Software focus.</span></h1></header>
        <div className="about-intro">
          {portrait ? <img className="about-portrait" src={portrait} alt={profile?.profileImage?.alt || profile?.fullName || 'Profile portrait'} /> : <ProfileOrbit className="about-orbit" fullName={profile?.fullName} location={profile?.location} />}
          <div className="about-copy">
            {(profile?.bio || []).map((block) => {
              const text = block.children?.map((child) => child.text || '').join('') || ''
              if (!text) return null
              return block.style === 'h2' ? <h2 key={block._key}>{text}</h2> : <p key={block._key}>{text}</p>
            })}
            {profile?.resumeFileUrl && <a className="button button--outline resume-link" href={profile.resumeFileUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent({name: 'Resume Download'})}><ArrowDownToLine aria-hidden="true" size={17} /> Download resume</a>}
          </div>
        </div>
        <section className="timeline-section" aria-labelledby="experience-heading">
          <div className="section-heading"><div><p className="eyebrow">The path so far</p><h2 id="experience-heading">Experience</h2></div></div>
          <div className="timeline-list">{content?.experience.map((entry) => <article className="timeline-entry" key={entry._id}>
            <div className="timeline-entry__date">{formatDate(entry.startDate)} — {entry.isCurrent ? 'Present' : formatDate(entry.endDate)}</div>
            <div><h3>{entry.position}</h3><p className="timeline-entry__org">{entry.organization}{entry.location ? ` · ${entry.location}` : ''}</p><p className="timeline-entry__summary">{entry.summary}</p>
              {entry.achievements.length > 0 && <ul className="achievement-list">{entry.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>}
            </div>
          </article>)}</div>
        </section>
        <section className="timeline-section" aria-labelledby="education-heading">
          <div className="section-heading"><div><p className="eyebrow">Academic foundation</p><h2 id="education-heading">Education</h2></div></div>
          <div className="timeline-list">{content?.education.map((entry) => <article className="timeline-entry" key={entry._id}>
            <div className="timeline-entry__date">{formatDate(entry.startDate)} — {formatDate(entry.endDate)}</div>
            <div><h3>{entry.qualification}</h3><p className="timeline-entry__org">{entry.institution} · {entry.fieldOfStudy}</p><p className="timeline-entry__summary">{entry.description}</p></div>
          </article>)}</div>
        </section>
        <section className="strengths-section" aria-labelledby="strengths-heading">
          <div className="section-heading"><div><p className="eyebrow">Areas of focus</p><h2 id="strengths-heading">Skills & strengths</h2></div></div>
          {content?.skills.length ? <div className="skill-groups">{Object.entries(groupSkills(content.skills)).map(([category, skills]) => <div className="skill-group" key={category}><h3>{category}</h3><div className="strengths-list">{skills.map((skill) => <p key={skill._id}><strong>{skill.name}</strong>{skill.summary ? ` — ${skill.summary}` : ''}</p>)}</div></div>)}</div> : <div className="strengths-list">{(profile?.skillHighlights || []).map((skill) => <p key={skill}>{skill}</p>)}</div>}
        </section>
        <Link className="text-link" to="/contact">Get in touch <ArrowUpRight aria-hidden="true" size={16} /></Link>
      </section>
    </>
  )
}
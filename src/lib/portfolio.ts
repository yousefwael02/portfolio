import {sanityClient, type SanityImage} from './sanity'

export type Profile = {
  fullName: string
  professionalTitle: string
  valueProposition: string
  positioningStatement: string
  bio: Array<{_key: string; style?: string; children?: Array<{text?: string}>}>
  coreStrengths: string[]
  skillHighlights: string[]
  targetOpportunities: string[]
  location?: string
  timeZone?: string
  isAvailable: boolean
  availabilityMessage?: string
  email: string
  profileImage?: SanityImage
  resumeFileUrl?: string
  resumeFileName?: string
  primaryCtaLabel: string
  primaryCtaUrl: string
  secondaryCtaLabel: string
  secondaryCtaUrl: string
}

export type SiteSettings = {
  siteTitle: string
  defaultSeoTitle: string
  defaultSeoDescription: string
  contactRecipientEmail: string
  copyrightText: string
  maintenanceMode: boolean
  maintenanceMessage?: string
}

export type Technology = {_id: string; name: string}

export type Project = {
  _id: string
  title: string
  slug: string
  summary: string
  problem: string
  solution: string
  role: string
  technologies: Technology[]
  clientOrganization?: string
  startDate: string
  completionDate?: string
  isOngoing: boolean
  liveUrl?: string
  repositoryUrl?: string
  coverImage?: SanityImage
  galleryImages?: SanityImage[]
  outcome: string
  isFeatured: boolean
  seoTitle?: string
  seoDescription?: string
}

export type Skill = {_id: string; name: string; category: string; summary?: string; displayOrder: number}

export type Experience = {
  _id: string
  organization: string
  position: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  location?: string
  summary: string
  achievements: string[]
  technologies: Technology[]
}

export type Education = {
  _id: string
  institution: string
  qualification: string
  fieldOfStudy: string
  startDate: string
  endDate?: string
  location?: string
  description: string
}

export type Service = {
  _id: string
  name: string
  shortSummary: string
  detailedDescription: string
  ctaLabel?: string
  ctaUrl?: string
  displayOrder: number
}

export type SocialLink = {
  _id: string
  platform: string
  label: string
  url: string
  displayOrder: number
}

export type PortfolioContent = {
  profile: Profile | null
  settings: SiteSettings | null
  projects: Project[]
  skills: Skill[]
  experience: Experience[]
  education: Education[]
  services: Service[]
  socialLinks: SocialLink[]
}

export const PORTFOLIO_QUERY = `{
  "profile": *[_id == "profile" && _type == "profile"][0]{
    fullName, professionalTitle, valueProposition, positioningStatement, bio,
    coreStrengths, skillHighlights, targetOpportunities, location, timeZone,
    isAvailable, availabilityMessage, email, resumeFileName,
    "profileImage": profileImage{"assetRef": asset._ref, "url": asset->url, alt},
    "resumeFileUrl": coalesce(resume.asset->url, resumeUrl),
    primaryCtaLabel, primaryCtaUrl, secondaryCtaLabel, secondaryCtaUrl
  },
  "settings": *[_id == "siteSettings" && _type == "siteSettings"][0]{
    siteTitle, defaultSeoTitle, defaultSeoDescription, contactRecipientEmail,
    copyrightText, maintenanceMode, maintenanceMessage
  },
  "projects": *[_type == "project" && isVisible == true && isArchived != true] | order(displayOrder asc, startDate desc){
    _id, title, "slug": slug.current, summary, problem, solution, role,
    "technologies": technologies[]->{_id, name}, clientOrganization,
    startDate, completionDate, isOngoing, liveUrl, repositoryUrl,
    "coverImage": coverImage{"assetRef": asset._ref, "url": asset->url, alt},
    "galleryImages": galleryImages[]{"assetRef": asset._ref, "url": asset->url, alt},
    outcome, isFeatured, seoTitle, seoDescription
  },
  "skills": *[_type == "skill" && isVisible == true] | order(displayOrder asc){_id, name, category, summary, displayOrder},
  "experience": *[_type == "experience" && isVisible == true] | order(displayOrder asc, startDate desc){
    _id, organization, position, startDate, endDate, isCurrent, location, summary,
    achievements, "technologies": technologies[]->{_id, name}
  },
  "education": *[_type == "education" && isVisible == true] | order(displayOrder asc, endDate desc){
    _id, institution, qualification, fieldOfStudy, startDate, endDate, location, description
  },
  "services": *[_type == "service" && isVisible == true] | order(displayOrder asc){
    _id, name, shortSummary, detailedDescription, ctaLabel, ctaUrl, displayOrder
  },
  "socialLinks": *[_type == "socialLink" && isVisible == true] | order(displayOrder asc){_id, platform, label, url, displayOrder}
}`

export function fetchPortfolio() {
  return sanityClient.fetch<PortfolioContent>(PORTFOLIO_QUERY, {}, {perspective: 'published'})
}
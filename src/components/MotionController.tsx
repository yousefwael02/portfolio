import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'

// Elements that fade up as they scroll into view. Siblings of the same kind are staggered.
const REVEAL_SELECTORS = [
  '.section-heading',
  '.project-filters',
  '.project-card',
  '.capability-row',
  '.home-next',
  '.about-intro',
  '.timeline-entry',
  '.skill-group',
  '.strengths-list > p',
  '.service-row',
  '.projects-cta',
  '.services-cta',
  '.project-detail__media',
  '.project-gallery img',
  '.project-detail__copy',
  '.project-detail__meta',
  '.project-detail__next',
  '.contact-form',
].join(',')

const MAX_STAGGER = 5

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Scroll reveals and route-change behaviour. Hidden-until-revealed styles only apply under
 * `html.motion-ready`, which is set here, so content stays visible without JavaScript or
 * when the visitor prefers reduced motion.
 */
export function MotionController() {
  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'instant'})
  }, [pathname])

  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return
    const root = document.documentElement
    root.classList.add('motion-ready')

    // Safety net: if the observer never reports (for example in a page that isn't being
    // rendered), stop hiding content rather than leaving sections invisible.
    // The timer starts with the first observed element, so slow CMS loads don't trip it.
    let hasReported = false
    let fallback: number | undefined
    const startFallback = () => {
      fallback ??= window.setTimeout(() => {
        if (!hasReported) root.classList.remove('motion-ready')
      }, 3000)
    }

    const intersection = new IntersectionObserver((entries) => {
      hasReported = true
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-revealed')
        intersection.unobserve(entry.target)
      }
    }, {rootMargin: '0px 0px -8% 0px', threshold: 0})

    function register(scope: ParentNode) {
      scope.querySelectorAll<HTMLElement>(REVEAL_SELECTORS).forEach((element) => {
        if (element.dataset.reveal !== undefined) return
        const siblings = element.parentElement ? Array.from(element.parentElement.children).filter((child) => child.matches(REVEAL_SELECTORS)) : [element]
        element.dataset.reveal = ''
        element.style.setProperty('--reveal-index', String(Math.min(siblings.indexOf(element), MAX_STAGGER)))
        intersection.observe(element)
        startFallback()
      })
    }

    // Content arrives from the CMS after the first render, so watch for new elements.
    const main = document.getElementById('main-content') ?? document.body
    register(main)
    const mutations = new MutationObserver(() => register(main))
    mutations.observe(main, {childList: true, subtree: true})

    return () => {
      window.clearTimeout(fallback)
      mutations.disconnect()
      intersection.disconnect()
      root.classList.remove('motion-ready')
    }
  }, [])

  return null
}

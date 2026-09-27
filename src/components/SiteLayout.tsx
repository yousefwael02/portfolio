import {ArrowUpRight, ExternalLink, Github, Instagram, Linkedin} from 'lucide-react'
import {Link, NavLink, Outlet} from 'react-router-dom'
import {useEffect, useRef} from 'react'
import {usePortfolio} from '../context/usePortfolio'
import {ContentNotice} from './ContentNotice'

const navigation = [
  {label: 'Work', to: '/projects'},
  {label: 'About', to: '/about'},
  {label: 'Services', to: '/services'},
]

function MobileNavigation() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const restoreFocus = () => triggerRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && dialog.open) {
        event.preventDefault()
        dialog.close()
      }
    }

    dialog.addEventListener('close', restoreFocus)
    document.addEventListener('keydown', closeOnEscape, true)
    return () => {
      dialog.removeEventListener('close', restoreFocus)
      document.removeEventListener('keydown', closeOnEscape, true)
    }
  }, [])

  function closeMenu() {
    const dialog = dialogRef.current
    if (!dialog?.open) return
    dialog.close()
    triggerRef.current?.focus()
  }

  return (
    <>
      <button
        ref={triggerRef}
        className="menu-trigger"
        type="button"
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        <span />
        <span />
      </button>
      <dialog
        ref={dialogRef}
        className="mobile-dialog"
        aria-label="Site navigation"
        onCancel={(event) => {
          event.preventDefault()
          closeMenu()
        }}
      >
        <div className="mobile-dialog__top">
          <span className="eyebrow">Navigate</span>
          <button className="dialog-close" type="button" onClick={closeMenu} aria-label="Close navigation menu">
            Close
          </button>
        </div>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <NavLink key={item.to} to={item.to} onClick={closeMenu}>
              <span className="mobile-nav__index">0{index + 1}</span>
              <span>{item.label}</span>
              <ArrowUpRight aria-hidden="true" size={20} />
            </NavLink>
          ))}
          <Link className="mobile-nav__contact" to="/contact" onClick={closeMenu}>
            Let's work together <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </nav>
      </dialog>
    </>
  )
}

export function SiteLayout() {
  const {content} = usePortfolio()
  const profile = content?.profile
  const settings = content?.settings

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="site-header__inner">
          <Link className="wordmark" to="/" aria-label="Yousef Wael, home">
            <span className="wordmark__mark">YW</span>
            <span>Yousef Wael</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} className={({isActive}) => isActive ? 'nav-link is-active' : 'nav-link'}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Link className="header-cta" to="/contact">
            Let's work together <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
          <MobileNavigation />
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        <ContentNotice />
        {settings?.maintenanceMode ? (
          <section className="page-intro section-wrap" aria-labelledby="maintenance-title">
            <p className="eyebrow">Temporarily unavailable</p>
            <h1 id="maintenance-title">Back shortly.</h1>
            <p className="page-intro__body">{settings.maintenanceMessage || 'Please check back soon.'}</p>
          </section>
        ) : <Outlet />}
      </main>
      <footer className="site-footer">
        <div className="site-footer__inner">
          <div>
            <p className="footer-name">{profile?.fullName || 'Yousef Wael'}</p>
            <p className="footer-note">{profile?.professionalTitle || 'Software engineer'}{profile?.location ? ` · ${profile.location}` : ''}</p>
          </div>
          {!!content?.socialLinks.length && <nav className="social-links" aria-label="Professional profiles">
            {content.socialLinks.map((social) => {
              const Icon = social.platform === 'LinkedIn' ? Linkedin : social.platform === 'GitHub' ? Github : social.platform === 'Instagram' ? Instagram : ExternalLink
              return <a key={social._id} href={social.url} target="_blank" rel="noreferrer" aria-label={`${social.label} (opens in new tab)`}><Icon aria-hidden="true" size={18} /></a>
            })}
          </nav>}
          <Link className="footer-email" to="/contact">{profile?.secondaryCtaLabel || 'Get in touch'} <ArrowUpRight aria-hidden="true" size={15} /></Link>
          <p className="copyright">{settings?.copyrightText || `© ${new Date().getFullYear()} Yousef Wael`}</p>
        </div>
      </footer>
    </div>
  )
}
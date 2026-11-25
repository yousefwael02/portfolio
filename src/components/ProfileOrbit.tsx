import {ArrowDownRight} from 'lucide-react'

type ProfileOrbitProps = {
  fullName?: string
  location?: string
  className?: string
}

// Shown in place of a profile photo: initials and location inside animated orbit rings.
export function ProfileOrbit({fullName, location, className}: ProfileOrbitProps) {
  const initials = fullName?.split(' ').map((part) => part[0]).slice(0, 2).join('') || 'YW'

  return (
    <div className={['hero__aside', className].filter(Boolean).join(' ')} aria-label="Professional focus">
      <div className="orbit orbit--outer" /><div className="orbit orbit--inner" />
      <div className="orbit-core"><span>{initials}</span><small>{location || 'CAIRO, EGYPT'}</small></div>
      <p className="hero__aside-label">Engineering with purpose</p><ArrowDownRight className="hero__aside-arrow" aria-hidden="true" size={23} />
    </div>
  )
}

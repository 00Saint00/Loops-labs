import { NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../lib/navLinks'

interface NavProps {
  variant?: 'full' | 'minimal'
  onMenuClick: () => void
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `pb-0.5 text-[0.78rem] font-medium tracking-[0.1em] uppercase border-b-[1.5px] transition-colors duration-200 ${
    isActive
      ? 'text-rose border-rose'
      : 'text-muted border-transparent hover:text-rose hover:border-rose'
  }`

export default function Nav({ variant = 'full', onMenuClick }: NavProps) {
  const transparent = variant === 'minimal'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[200] flex h-14 items-center justify-between px-10 max-md:px-5 ${
        transparent
          ? 'bg-transparent'
          : 'border-b border-linen bg-parch/96 backdrop-blur-[6px]'
      }`}
    >
      <NavLink to="/" className="font-display text-[1.15rem] text-walnut">
        <img src="/brand/wordmark.png" alt="Maro's Loop Lab" className="block h-9 w-auto" />
      </NavLink>

      {variant === 'full' && (
        <ul className="flex gap-8 max-md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={onMenuClick}
        className={`font-body text-[0.78rem] font-semibold tracking-[0.18em] uppercase text-walnut transition-colors hover:text-rose ${
          variant === 'full' ? 'hidden max-md:inline-block' : 'inline-block'
        }`}
      >
        Menu
      </button>
    </header>
  )
}

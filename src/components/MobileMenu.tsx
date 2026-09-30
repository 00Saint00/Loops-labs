import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../lib/navLinks'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement as HTMLElement | null
      closeButtonRef.current?.focus()
    } else {
      previouslyFocused.current?.focus()
    }
  }, [open])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={`fixed inset-0 z-[400] flex flex-col items-center justify-center overflow-y-auto bg-walnut px-6 py-16 transition-opacity duration-300 ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-[1.1rem] right-10 flex h-11 w-11 items-center justify-center text-parch transition-colors hover:text-rose max-md:right-5"
      >
        ✕
      </button>
      <ul className="flex flex-col items-center gap-6 text-center">
        {NAV_LINKS.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `font-display text-[2.6rem] transition-colors hover:text-rose hover:italic max-md:text-[2rem] ${
                  isActive ? 'text-rose' : 'text-parch'
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-12 font-fun text-[0.95rem] text-rose-lt">A story in every loop</div>
    </div>
  )
}

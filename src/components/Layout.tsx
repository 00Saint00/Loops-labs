import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import MobileMenu from './MobileMenu'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isGallery = pathname === '/gallery'

  return (
    <div
      className={`min-h-screen overflow-x-hidden bg-parch font-body text-walnut ${
        isGallery ? '' : 'pt-14'
      }`}
    >
      <Nav variant={isGallery ? 'minimal' : 'full'} onMenuClick={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Outlet />
    </div>
  )
}

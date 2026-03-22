import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { id: 'inicio',     label: 'Inicio' },
  { id: 'torneo',     label: 'Torneo' },
  { id: 'categorias', label: 'Categorías' },
  { id: 'premios',    label: 'Premios' },
  { id: 'promos',     label: 'Promos' },
]

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scrollspy – IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { rootMargin: '-80px 0px -55% 0px', threshold: 0 }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const scrollTo = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActiveSection(id)
    // Close mobile navbar if open
    const nav = document.getElementById('navbarNav')
    if (nav?.classList.contains('show')) nav.classList.remove('show')
  }

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark fixed-top${scrolled ? ' scrolled' : ''}`}
      id="mainNav"
    >
      <div className="container">
        <a className="navbar-brand fw-bold" href="#inicio" onClick={e => scrollTo(e, 'inicio')}>
          <i className="fa-solid fa-futbol me-2 brand-spin"></i>TORNEO 2026
        </a>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {NAV_LINKS.map(({ id, label }) => (
              <li className="nav-item" key={id}>
                <a
                  className={`nav-link${activeSection === id ? ' active' : ''}`}
                  href={`#${id}`}
                  onClick={e => scrollTo(e, id)}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="nav-item">
              <a
                className="nav-link btn-nav-cta"
                href="#inscripcion"
                onClick={e => scrollTo(e, 'inscripcion')}
              >
                <i className="fa-solid fa-pen-to-square me-1"></i>Inscripción
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

const LINKS = [
  { id: 'inicio',      label: 'Inicio' },
  { id: 'torneo',      label: 'Información' },
  { id: 'premios',     label: 'Premios' },
  { id: 'inscripcion', label: 'Inscripción' },
]

const SOCIALS = [
  { icon: 'fa-facebook-f', href: '#' },
  { icon: 'fa-instagram',  href: '#' },
  { icon: 'fa-x-twitter',  href: '#' },
  { icon: 'fa-youtube',    href: '#' },
  { icon: 'fa-tiktok',     href: '#' },
]

export default function Footer() {
  const scrollTo = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="site-footer" id="footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <h5 className="text-white fw-bold">
              <i className="fa-solid fa-futbol me-2"></i>Torneo 2026
            </h5>
            <p className="text-white-50 small">
              El torneo de fútbol más importante del año. Competencia, pasión y gloria en una sola cancha.
            </p>
            <div className="social-links">
              {SOCIALS.map(s => (
                <a href={s.href} key={s.icon}>
                  <i className={`fa-brands ${s.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <h5 className="text-white fw-bold">Links</h5>
            <ul className="list-unstyled footer-links">
              {LINKS.map(l => (
                <li key={l.id}>
                  <a href={`#${l.id}`} onClick={e => scrollTo(e, l.id)}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-4">
            <h5 className="text-white fw-bold">Contacto</h5>
            <ul className="list-unstyled text-white-50 small">
              <li className="mb-2"><i className="fa-solid fa-location-dot me-2"></i>Estadio Azteca Norte, CDMX</li>
              <li className="mb-2"><i className="fa-solid fa-phone me-2"></i>(55) 1234-5678</li>
              <li className="mb-2"><i className="fa-solid fa-envelope me-2"></i>info@torneofutbol.com</li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />
        <p className="text-center text-white-50 small mb-0">
          © 2026 Torneo de Fútbol. Todos los derechos reservados. — Sistema de demostración.
        </p>
      </div>
    </footer>
  )
}

import { useEffect, useRef } from 'react'

const STATS = [
  { target: 64,  label: 'Equipos' },
  { target: 3,   label: 'Categorías' },
  { target: 150, label: 'Premios (mil MXN)' },
]

export default function Hero() {
  const statsRef = useRef([])

  useEffect(() => {
    // Particles
    const container = document.getElementById('particles')
    if (container) {
      for (let i = 0; i < 15; i++) {
        const p = document.createElement('span')
        p.className = 'hero-particle'
        const size = 4 + Math.random() * 8
        p.style.cssText = [
          `width:${size}px`,
          `height:${size}px`,
          `left:${Math.random() * 100}%`,
          `top:${Math.random() * 100}%`,
          `animation-delay:${(Math.random() * 6).toFixed(2)}s`,
          `animation-duration:${(6 + Math.random() * 6).toFixed(2)}s`,
        ].join(';')
        container.appendChild(p)
      }
    }

    // Counter animation on intersection
    const els = statsRef.current
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        els.forEach((el, i) => {
          if (!el) return
          const target = STATS[i].target
          let current = 0
          const step = Math.max(1, Math.ceil(target / 60))
          const timer = setInterval(() => {
            current += step
            if (current >= target) { current = target; clearInterval(timer) }
            el.textContent = current
          }, 30)
        })
        obs.disconnect()
      },
      { threshold: 0.3 }
    )
    const section = document.getElementById('inicio')
    if (section) obs.observe(section)

    return () => {
      obs.disconnect()
      if (container) container.innerHTML = ''
    }
  }, [])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="inicio" className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-particles" id="particles"></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-7 text-white hero-content">
            <span className="badge bg-warning text-dark mb-3 px-3 py-2 fs-6 animate-badge">
              <i className="fa-solid fa-calendar-days me-1"></i> 15 de Junio, 2026
            </span>
            <h1 className="display-2 fw-900 mb-3 hero-title">
              TORNEO DE<br />
              <span className="text-gradient">FÚTBOL 2026</span>
            </h1>
            <p className="lead mb-4 opacity-90 hero-subtitle">
              La competencia más esperada del año. Demuestra el talento de tu equipo,
              compite en categorías de élite y llévate premios increíbles.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <a href="#inscripcion" className="btn btn-warning btn-lg px-5 fw-bold shadow-lg btn-hero"
                onClick={scrollTo('inscripcion')}>
                <i className="fa-solid fa-trophy me-2"></i>Inscribirme ahora
              </a>
              <a href="#torneo" className="btn btn-outline-light btn-lg px-4 btn-hero-outline"
                onClick={scrollTo('torneo')}>
                <i className="fa-solid fa-circle-info me-2"></i>Más info
              </a>
            </div>

            <div className="hero-stats mt-5">
              {STATS.map((s, i) => (
                <div className="stat-item" key={s.label}>
                  <span className="stat-number" ref={el => { statsRef.current[i] = el }}>0</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-5 d-none d-lg-flex justify-content-center">
            <div className="hero-ball-wrapper">
              <div className="hero-ball">
                <i className="fa-solid fa-futbol"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L0,120Z"
            fill="#f1f4f8"
          />
        </svg>
      </div>
    </section>
  )
}

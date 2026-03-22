const INFO_CARDS = [
  { icon: 'fa-calendar-days',   color: 'primary', bg: 'bg-primary-subtle', title: 'Fecha',       text: '15 de Junio de 2026', sub: 'Inauguración 9:00 AM' },
  { icon: 'fa-location-dot',    color: 'success', bg: 'bg-success-subtle', title: 'Ubicación',   text: 'Estadio Azteca Norte', sub: 'CDMX, México' },
  { icon: 'fa-money-bill-wave', color: 'warning', bg: 'bg-warning-subtle', title: 'Inscripción', text: '$800 MXN',              sub: 'Por equipo' },
  { icon: 'fa-users',           color: 'danger',  bg: 'bg-danger-subtle',  title: 'Formato',     text: 'Eliminación directa',  sub: '64 equipos max.' },
]

const TORNEOS = [
  {
    id: 'junior', cls: 'torneo-junior', featured: false,
    badge: 'Junior', icon: 'fa-child-reaching', title: 'Torneo Junior',
    desc: 'Para jóvenes promesas del fútbol. Edades de 12 a 17 años. Formación, talento y diversión en un solo lugar.',
    features: ['Edades: 12–17 años', 'Tiempos: 2x25 min', 'Árbitro certificado'],
  },
  {
    id: 'profesional', cls: 'torneo-profesional', featured: true,
    badge: '⭐ Profesional', icon: 'fa-futbol', title: 'Torneo Profesional',
    desc: 'Competencia de alto nivel. Equipos con experiencia compitiendo por la gloria y premios importantes.',
    features: ['18+ años', 'Tiempos: 2x45 min', 'VAR simulado'],
  },
  {
    id: 'master', cls: 'torneo-master', featured: false,
    badge: 'Master', icon: 'fa-crown', title: 'Torneo Master',
    desc: 'Para veteranos y leyendas del barrio. Experiencia, astucia y pasión por el fútbol en estado puro.',
    features: ['35+ años', 'Tiempos: 2x30 min', 'Premiación especial'],
  },
]

export default function TorneoInfo() {
  return (
    <section id="torneo" className="py-6">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag"><i className="fa-solid fa-circle-info me-1"></i> Información</span>
          <h2 className="section-title">Sobre el Torneo</h2>
          <p className="section-subtitle">Todo lo que necesitas saber sobre el evento deportivo del año</p>
        </div>

        <div className="row g-4">
          {INFO_CARDS.map(c => (
            <div className="col-md-6 col-lg-3" key={c.title}>
              <div className="info-card">
                <div className={`info-card-icon ${c.bg}`}>
                  <i className={`fa-solid ${c.icon} text-${c.color}`}></i>
                </div>
                <h5>{c.title}</h5>
                <p>{c.text}<br /><small className="text-muted">{c.sub}</small></p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4">
          <h3 className="text-center fw-bold mb-4">
            <i className="fa-solid fa-trophy me-2 text-warning"></i>Nuestros Torneos
          </h3>
          <div className="row g-4">
            {TORNEOS.map(t => (
              <div className="col-md-4" key={t.id}>
                <div className={`torneo-card ${t.cls}${t.featured ? ' featured' : ''}`}>
                  <div className="torneo-badge">{t.badge}</div>
                  <div className="torneo-icon"><i className={`fa-solid ${t.icon}`}></i></div>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                  <ul className="list-unstyled small">
                    {t.features.map(f => (
                      <li key={f}><i className="fa-solid fa-check text-success me-2"></i>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

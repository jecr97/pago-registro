const PREMIOS = [
  {
    id: 'plata', order: 'order-md-1 order-2', cls: 'premio-silver',
    medal: '🥈', pos: '2do Lugar', amount: '$30,000', iconColor: 'text-info',
    features: ['Trofeo de plata', 'Medallas para el equipo', 'Kit deportivo', 'Certificado oficial'],
  },
  {
    id: 'oro', order: 'order-md-0 order-1', cls: 'premio-gold featured-premio',
    medal: '🥇', pos: '1er Lugar', amount: '$80,000', iconColor: 'text-warning', crown: true,
    features: ['Trofeo de oro', 'Medallas grabadas', 'Kit Nike completo', 'Pase VIP siguiente torneo', 'Cobertura mediática'],
  },
  {
    id: 'bronce', order: 'order-3', cls: 'premio-bronze',
    medal: '🥉', pos: '3er Lugar', amount: '$15,000', iconColor: 'text-orange',
    features: ['Trofeo de bronce', 'Medallas para el equipo', 'Balón oficial', 'Certificado oficial'],
  },
]

export default function Premios() {
  return (
    <section id="premios" className="py-6 premios-section">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag tag-light"><i className="fa-solid fa-gem me-1"></i> Premios</span>
          <h2 className="section-title text-white">Premios Increíbles</h2>
          <p className="section-subtitle text-white-50">Compite por premios que harán historia</p>
        </div>
        <div className="row g-4 justify-content-center">
          {PREMIOS.map(p => (
            <div className={`col-md-6 col-lg-4 ${p.order}`} key={p.id}>
              <div className={`premio-card ${p.cls}`}>
                {p.crown && (
                  <div className="premio-crown">
                    <i className="fa-solid fa-crown"></i>
                  </div>
                )}
                <div className="premio-medal">{p.medal}</div>
                <div className="premio-pos">{p.pos}</div>
                <div className="premio-amount">{p.amount} <small>MXN</small></div>
                <ul className="list-unstyled">
                  {p.features.map(f => (
                    <li key={f}>
                      <i className={`fa-solid fa-check-circle ${p.iconColor} me-2`}></i>{f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

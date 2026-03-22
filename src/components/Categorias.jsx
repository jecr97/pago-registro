const CATEGORIAS = [
  {
    id: 'femenil', cls: 'cat-femenil', icon: 'fa-venus', title: 'Femenil',
    desc: 'Categoría exclusiva femenina. Demuestra tu fuerza, habilidad y determinación en la cancha. ¡El fútbol femenino crece con fuerza!',
    features: [
      { icon: 'fa-star',   text: 'Premiación especial' },
      { icon: 'fa-medal',  text: 'Trofeo exclusivo' },
      { icon: 'fa-camera', text: 'Cobertura media' },
    ],
  },
  {
    id: 'varonil', cls: 'cat-varonil', icon: 'fa-mars', title: 'Varonil',
    desc: 'La categoría clásica donde los equipos más fuertes se enfrentan por el título. Competencia pura, pasión sin límites.',
    features: [
      { icon: 'fa-fire',   text: 'Alta competencia' },
      { icon: 'fa-trophy', text: 'Gran premio' },
      { icon: 'fa-tv',     text: 'Transmisión en vivo' },
    ],
  },
]

export default function Categorias() {
  return (
    <section id="categorias" className="py-6 bg-light-custom">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag"><i className="fa-solid fa-layer-group me-1"></i> Categorías</span>
          <h2 className="section-title">Elige tu Categoría</h2>
          <p className="section-subtitle">Dos categorías diseñadas para la inclusión total</p>
        </div>
        <div className="row g-4 justify-content-center">
          {CATEGORIAS.map(cat => (
            <div className="col-md-6 col-lg-5" key={cat.id}>
              <div className={`cat-card ${cat.cls}`}>
                <div className="cat-icon-wrap">
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
                <div className="cat-features">
                  {cat.features.map(f => (
                    <span key={f.text}>
                      <i className={`fa-solid ${f.icon} me-1`}></i>{f.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

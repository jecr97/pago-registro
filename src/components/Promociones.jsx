import { useState } from 'react'

const PROMOS = [
  {
    id: 'primer', cls: 'promo-1', ribbonCls: '', ribbonText: '-50%',
    icon: 'fa-ticket', title: 'Primer Torneo',
    desc: '¿Es tu primera vez? ¡Te damos la bienvenida con un descuentazo!',
    code: 'PRIMERTORNEO', btnCls: 'btn-primary',
    oldPrice: '$800', newPrice: '$400 MXN',
  },
  {
    id: 'mundial', cls: 'promo-2', ribbonCls: 'ribbon-hot', ribbonText: '-80%',
    icon: 'fa-fire', title: 'Rumbo al Mundial',
    desc: 'Celebra la fiebre mundialista con el mayor descuento del año.',
    code: 'RUMBOALMUNDIAL', btnCls: 'btn-danger',
    oldPrice: '$800', newPrice: '$160 MXN',
  },
]

export default function Promociones() {
  const [copied, setCopied] = useState({})

  const copyCode = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(prev => ({ ...prev, [code]: true }))
      setTimeout(() => setCopied(prev => ({ ...prev, [code]: false })), 1500)
    })
  }

  return (
    <section id="promos" className="py-6">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag"><i className="fa-solid fa-tags me-1"></i> ofertas</span>
          <h2 className="section-title">Promociones Especiales</h2>
          <p className="section-subtitle">Aprovecha nuestros cupones de descuento exclusivos</p>
        </div>
        <div className="row g-4 justify-content-center">
          {PROMOS.map(p => (
            <div className="col-md-6" key={p.id}>
              <div className={`promo-card ${p.cls}`}>
                <div className={`promo-ribbon ${p.ribbonCls}`}>{p.ribbonText}</div>
                <div className="promo-content">
                  <div className="promo-icon">
                    <i className={`fa-solid ${p.icon}`}></i>
                  </div>
                  <h4>{p.title}</h4>
                  <p className="text-muted">{p.desc}</p>
                  <div className="promo-code-box">
                    <code>{p.code}</code>
                    <button
                      className={`btn btn-sm ${copied[p.code] ? 'btn-success' : p.btnCls}`}
                      onClick={() => copyCode(p.code)}
                    >
                      <i className={`fa-solid ${copied[p.code] ? 'fa-check' : 'fa-copy'}`}></i>
                    </button>
                  </div>
                  <div className="promo-price">
                    <span className="old-price">{p.oldPrice}</span>
                    <span className="new-price">{p.newPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

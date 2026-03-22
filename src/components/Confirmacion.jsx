import { useEffect, useRef, useState } from 'react'

function drawQR(canvas, data) {
  if (!canvas || !data) return
  const ctx = canvas.getContext('2d')
  const size = canvas.width
  const modules = 21
  const cell = size / modules

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, size, size)

  // Deterministic pseudo-random seeded from data string
  let seed = 0
  for (let i = 0; i < data.length; i++) seed = ((seed << 5) - seed + data.charCodeAt(i)) | 0
  const next = () => { seed = (seed * 16807) % 2147483647; return (seed & 1) === 0 }

  // Finder pattern helper
  const finder = (x, y) => {
    ctx.fillStyle = '#0C3354'
    ctx.fillRect(x * cell, y * cell, 7 * cell, 7 * cell)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect((x + 1) * cell, (y + 1) * cell, 5 * cell, 5 * cell)
    ctx.fillStyle = '#0C3354'
    ctx.fillRect((x + 2) * cell, (y + 2) * cell, 3 * cell, 3 * cell)
  }
  finder(0, 0)
  finder(modules - 7, 0)
  finder(0, modules - 7)

  // Timing patterns
  ctx.fillStyle = '#0C3354'
  for (let i = 8; i < modules - 8; i++) {
    if (i % 2 === 0) {
      ctx.fillRect(i * cell, 6 * cell, cell, cell)
      ctx.fillRect(6 * cell, i * cell, cell, cell)
    }
  }

  // Data modules
  for (let row = 0; row < modules; row++) {
    for (let col = 0; col < modules; col++) {
      if ((row < 8 && col < 8) || (row < 8 && col >= modules - 8) || (row >= modules - 8 && col < 8)) continue
      if (row === 6 || col === 6) continue
      if (next()) {
        ctx.fillStyle = '#0C3354'
        ctx.fillRect(col * cell, row * cell, cell, cell)
      }
    }
  }
}

export default function Confirmacion({ data, onNewRegistration }) {
  const canvasRef             = useRef(null)
  const [resending, setResend] = useState(false)
  const [resent,    setResent2] = useState(false)

  const dateStr = data?.date
    ? new Date(data.date).toLocaleDateString('es-MX', {
        day: '2-digit', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : ''

  useEffect(() => {
    if (canvasRef.current && data?.registrationId) {
      drawQR(canvasRef.current, data.registrationId)
    }
  }, [data?.registrationId])

  const handleResend = () => {
    setResend(true)
    setTimeout(() => {
      setResend(false)
      setResent2(true)
      setTimeout(() => setResent2(false), 2000)
    }, 1500)
  }

  if (!data) return null

  return (
    <section id="confirmacion" className="py-6 bg-light-custom">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">

            {/* Éxito */}
            <div className="text-center mb-4 animate-in">
              <div className="success-badge">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h3 className="fw-bold mt-3 text-success">¡Pago procesado exitosamente!</h3>
              <p className="text-muted">
                Se ha enviado una confirmación a <strong>{data.email}</strong>
              </p>
            </div>

            {/* Resumen inscripción */}
            <div className="confirmation-card animate-in mb-4">
              <h5 className="fw-bold mb-3">
                <i className="fa-solid fa-clipboard-list me-2 text-primary"></i>Resumen de tu inscripción
              </h5>
              <table className="table table-sm table-borderless mb-0">
                <tbody>
                  <tr>
                    <td className="text-muted"><i className="fa-solid fa-hashtag me-2"></i>ID</td>
                    <td className="fw-bold text-end font-monospace">{data.registrationId}</td>
                  </tr>
                  <tr>
                    <td className="text-muted"><i className="fa-solid fa-user me-2"></i>Nombre</td>
                    <td className="fw-bold text-end">{data.fullName}</td>
                  </tr>
                  <tr>
                    <td className="text-muted"><i className="fa-solid fa-shield-halved me-2"></i>Equipo</td>
                    <td className="fw-bold text-end">{data.teamName}</td>
                  </tr>
                  <tr>
                    <td className="text-muted"><i className="fa-solid fa-layer-group me-2"></i>Categoría</td>
                    <td className="fw-bold text-end">{data.category}</td>
                  </tr>
                  <tr>
                    <td className="text-muted"><i className="fa-solid fa-trophy me-2"></i>Torneo</td>
                    <td className="fw-bold text-end">{data.tournament}</td>
                  </tr>
                  <tr>
                    <td className="text-muted"><i className="fa-solid fa-credit-card me-2"></i>Método</td>
                    <td className="fw-bold text-end">{data.paymentMethod}</td>
                  </tr>
                  <tr className="total-row">
                    <td>
                      <strong>
                        <i className="fa-solid fa-money-bill-wave me-2 text-success"></i>Total
                      </strong>
                    </td>
                    <td className="fw-bold text-end text-success fs-5">
                      ${data.finalPrice.toFixed(0)} MXN
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Simulación de correo */}
            <div className="email-container animate-in">
              {/* Toolbar (macOS style) */}
              <div className="email-toolbar">
                <div className="email-dots">
                  <span className="dot-r"></span>
                  <span className="dot-y"></span>
                  <span className="dot-g"></span>
                </div>
                <span className="small text-muted">
                  <i className="fa-solid fa-envelope me-1"></i>Bandeja de entrada
                </span>
              </div>

              {/* Header del correo */}
              <div className="email-header">
                <div className="d-flex align-items-start gap-3 flex-wrap">
                  <div className="email-avatar"><i className="fa-solid fa-futbol"></i></div>
                  <div className="flex-grow-1">
                    <div>
                      <strong>Torneo de Fútbol 2026</strong>{' '}
                      <span className="text-muted small">&lt;noreply@torneofutbol.com&gt;</span>
                    </div>
                    <div className="small text-muted">Para: {data.email}</div>
                  </div>
                  <div className="small text-muted text-nowrap">
                    <i className="fa-solid fa-clock me-1"></i>{dateStr}
                  </div>
                </div>
                <div className="email-subject mt-2">
                  <i className="fa-solid fa-star text-warning me-2"></i>
                  <strong>Confirmación de inscripción — Torneo de Fútbol 2026</strong>
                </div>
              </div>

              {/* Cuerpo del correo */}
              <div className="email-body">
                <div className="email-banner">
                  <i className="fa-solid fa-trophy me-2"></i>TORNEO DE FÚTBOL 2026
                </div>
                <div className="email-greeting">
                  <p>Hola <strong>{data.fullName.split(' ')[0]}</strong>,</p>
                  <p>
                    Tu inscripción ha sido confirmada correctamente.
                    Adjuntamos tu código de acceso para el torneo.{' '}
                    <strong>Presenta este código el día del evento.</strong>
                  </p>
                </div>

                <div className="email-summary-box">
                  <h6 className="fw-bold mb-3">
                    <i className="fa-solid fa-clipboard-list me-2 text-primary"></i>Resumen
                  </h6>
                  <table className="table table-sm table-borderless mb-0">
                    <tbody>
                      <tr>
                        <td className="text-muted">ID:</td>
                        <td className="fw-bold text-end font-monospace">{data.registrationId}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">Equipo:</td>
                        <td className="fw-bold text-end">{data.teamName}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">Categoría:</td>
                        <td className="fw-bold text-end">{data.category}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">Torneo:</td>
                        <td className="fw-bold text-end">{data.tournament}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">Método:</td>
                        <td className="fw-bold text-end">{data.paymentMethod}</td>
                      </tr>
                      <tr className="total-row">
                        <td><strong>Total:</strong></td>
                        <td className="fw-bold text-end text-success fs-5">
                          ${data.finalPrice.toFixed(0)} MXN
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* QR de acceso */}
                <div className="email-qr-section">
                  <h6 className="fw-bold mb-2">
                    <i className="fa-solid fa-qrcode me-2"></i>Código QR de acceso
                  </h6>
                  <p className="small text-muted mb-3">Presenta este código en la entrada del evento</p>
                  <div className="qr-wrapper">
                    <canvas ref={canvasRef} width={180} height={180}></canvas>
                  </div>
                  <p className="small text-muted mt-2 mb-0">
                    <i className="fa-solid fa-camera me-1"></i>Este QR será escaneado el día del evento
                  </p>
                </div>

                <div className="email-contact">
                  <p className="mb-1">¿Tienes dudas? Contáctanos:</p>
                  <p className="mb-0">
                    <i className="fa-solid fa-envelope me-1"></i>soporte@torneofutbol.com{' '}
                    |{' '}
                    <i className="fa-solid fa-phone me-1"></i>(55) 1234-5678
                  </p>
                </div>
              </div>

              <div className="email-footer">
                <small>© 2026 Torneo de Fútbol. Todos los derechos reservados.</small>
              </div>
            </div>

            {/* Nota demo */}
            <div className="demo-notice animate-in">
              <i className="fa-solid fa-circle-info me-2"></i>
              <strong>Nota:</strong> Este es un correo de demostración. No se envían correos reales.
            </div>

            {/* Acciones */}
            <div className="d-flex gap-3 justify-content-center mt-4 flex-wrap animate-in">
              <button
                className={`btn ${resent ? 'btn-outline-success' : 'btn-outline-primary'}`}
                onClick={handleResend}
                disabled={resending}
              >
                {resending
                  ? <><span className="spinner-payment"></span>Reenviando…</>
                  : resent
                  ? <><i className="fa-solid fa-check me-2"></i>¡Reenviado!</>
                  : <><i className="fa-solid fa-paper-plane me-2"></i>Reenviar correo</>
                }
              </button>
              <button className="btn btn-primary" onClick={() => window.print()}>
                <i className="fa-solid fa-download me-2"></i>Descargar comprobante
              </button>
              <button className="btn btn-success" onClick={onNewRegistration}>
                <i className="fa-solid fa-plus-circle me-2"></i>Nueva inscripción
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

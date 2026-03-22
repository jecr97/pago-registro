import { useEffect, useRef, useState } from 'react'
import { Modal } from 'bootstrap'

function generateOxxoRef() {
  let ref = ''
  for (let i = 0; i < 14; i++) {
    ref += Math.floor(Math.random() * 10)
    if ((i + 1) % 4 === 0 && i < 13) ref += ' '
  }
  return ref
}

const formatCardNumber = (val) =>
  val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

const formatExpiry = (val) => {
  const d = val.replace(/\D/g, '').slice(0, 4)
  return d.length >= 3 ? d.slice(0, 2) + '/' + d.slice(2) : d
}

export default function PaymentModal({
  show, onHide, onSuccess,
  formData, finalPrice, originalPrice, appliedCoupon,
}) {
  const modalRef  = useRef(null)
  const bsModal   = useRef(null)
  const onHideRef = useRef(onHide)
  const onSuccessRef = useRef(onSuccess)
  const pendingSuccess = useRef(null)

  const [method,     setMethod]  = useState('card')
  const [cardNumber, setCardNum] = useState('')
  const [cardName,   setName]    = useState('')
  const [cardExpiry, setExpiry]  = useState('')
  const [cardCvc,    setCvc]     = useState('')
  const [processing, setProc]    = useState(false)
  const [oxxoRef,    setOxxo]    = useState('')

  // Keep callbacks refs current
  useEffect(() => { onHideRef.current = onHide }, [onHide])
  useEffect(() => { onSuccessRef.current = onSuccess }, [onSuccess])

  // Init Bootstrap Modal once
  useEffect(() => {
    const el = modalRef.current
    bsModal.current = new Modal(el, { backdrop: 'static', keyboard: false })
    const handleHidden = () => {
      // Limpiar TODOS los estilos que Bootstrap agrega
      document.body.classList.remove('modal-open')
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''

      // Remover backdrop si existe
      const backdrop = document.querySelector('.modal-backdrop')
      if (backdrop) backdrop.remove()

      // Primero notificar que el modal se ocultó
      try { onHideRef.current() } catch (e) { /* ignore */ }

      // Si hay un pago pendiente, notificar éxito ahora (después del hide)
      if (pendingSuccess.current) {
        try {
          onSuccessRef.current?.(pendingSuccess.current)
        } catch (e) { /* ignore */ }
        pendingSuccess.current = null
      }
    }
    el.addEventListener('hidden.bs.modal', handleHidden)
    return () => {
      el.removeEventListener('hidden.bs.modal', handleHidden)
      bsModal.current?.dispose()
    }
  }, [])

  // Show / hide based on prop
  useEffect(() => {
    if (!bsModal.current) return
    if (show) {
      setMethod('card')
      setCardNum(''); setName(''); setExpiry(''); setCvc('')
      setOxxo(generateOxxoRef())
      setProc(false)
      bsModal.current.show()
    } else {
      bsModal.current.hide()
    }
  }, [show])

  const handlePay = () => {
    if (method === 'card') {
      const num = cardNumber.replace(/\s/g, '')
      if (num.length < 15 || !cardName.trim() || cardExpiry.length < 5 || cardCvc.length < 3) {
        alert('Por favor completa todos los campos de la tarjeta.')
        return
      }
    }
    setProc(true)
    setTimeout(() => {
      setProc(false)
      // En lugar de notificar éxito inmediatamente, guardamos el resultado
      // y cerramos el modal; la notificación de éxito se hará cuando
      // el evento 'hidden.bs.modal' confirme que el modal ya está oculto.
      pendingSuccess.current = method === 'card' ? 'Tarjeta de crédito/débito' : 'OXXO'
      bsModal.current?.hide()
    }, 2200)
  }

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content payment-modal-content">

          {/* Header */}
          <div className="pm-header">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-white-50 small">
                <i className="fa-solid fa-lock me-1"></i>Pago seguro
              </span>
              <button
                type="button" className="btn btn-sm btn-link text-white p-0"
                onClick={onHide} disabled={processing}
              >
                <i className="fa-solid fa-xmark fs-5"></i>
              </button>
            </div>
            <div className="text-center">
              <small className="text-white-50">Total a pagar</small>
              <h2 className="text-white mb-0 fw-bold">${finalPrice.toFixed(0)} MXN</h2>
              {appliedCoupon && (
                <div className="text-white-50 text-decoration-line-through">
                  ${originalPrice} MXN
                </div>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="pm-body">
            {/* Resumen rápido */}
            <div className="pm-summary">
              <div className="d-flex justify-content-between small">
                <span className="text-muted">Equipo:</span>
                <span className="fw-bold">{formData.teamName}</span>
              </div>
              <div className="d-flex justify-content-between small">
                <span className="text-muted">Categoría:</span>
                <span className="fw-bold">{formData.category}</span>
              </div>
              <div className="d-flex justify-content-between small">
                <span className="text-muted">Torneo:</span>
                <span className="fw-bold">{formData.tournament}</span>
              </div>
            </div>

            {/* Método de pago */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Método de pago</label>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className={`btn flex-fill method-btn${method === 'card' ? ' active' : ''}`}
                  onClick={() => setMethod('card')}
                >
                  <i className="fa-solid fa-credit-card me-2"></i>Tarjeta
                </button>
                <button
                  type="button"
                  className={`btn flex-fill method-btn${method === 'oxxo' ? ' active' : ''}`}
                  onClick={() => setMethod('oxxo')}
                >
                  <i className="fa-solid fa-store me-2"></i>OXXO
                </button>
              </div>
            </div>

            {/* Sección Tarjeta */}
            {method === 'card' && (
              <>
                <div className="mb-3">
                  <label className="form-label small text-muted">Número de tarjeta</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-credit-card text-muted"></i>
                    </span>
                    <input
                      type="text" className="form-control"
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={e => setCardNum(formatCardNumber(e.target.value))}
                      maxLength={19}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label small text-muted">Nombre en la tarjeta</label>
                  <input
                    type="text" className="form-control" placeholder="NOMBRE APELLIDO"
                    value={cardName}
                    onChange={e => setName(e.target.value.toUpperCase())}
                  />
                </div>
                <div className="row">
                  <div className="col-7 mb-3">
                    <label className="form-label small text-muted">Vencimiento</label>
                    <input
                      type="text" className="form-control" placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={e => setExpiry(formatExpiry(e.target.value))}
                      maxLength={5}
                    />
                  </div>
                  <div className="col-5 mb-3">
                    <label className="form-label small text-muted">CVC</label>
                    <input
                      type="text" className="form-control" placeholder="123"
                      value={cardCvc}
                      onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      maxLength={4}
                    />
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center mb-3 small text-muted">
                  <i className="fa-brands fa-cc-visa fs-3"></i>
                  <i className="fa-brands fa-cc-mastercard fs-3"></i>
                  <i className="fa-brands fa-cc-amex fs-3"></i>
                </div>
              </>
            )}

            {/* Sección OXXO */}
            {method === 'oxxo' && (
              <div className="text-center p-3 bg-light rounded-3 border">
                <i className="fa-solid fa-store fs-1 text-warning mb-2 d-block"></i>
                <h5 className="fw-bold">Pago en OXXO</h5>
                <p className="text-muted small mb-2">
                  Presenta este código de referencia en cualquier tienda OXXO.
                </p>
                <div className="bg-white border rounded p-3 mb-2">
                  <span className="fw-bold fs-4 font-monospace text-dark">{oxxoRef}</span>
                </div>
                <p className="small text-muted mb-0">
                  <i className="fa-solid fa-clock me-1"></i>48 horas para pagar
                </p>
              </div>
            )}

            <div className="alert alert-info small py-2 mt-3">
              <i className="fa-solid fa-circle-info me-1"></i>
              <strong>Demo:</strong> No se guardan datos reales. Usa <code>2222 2222 2222 2222</code>.
            </div>

            <button
              className="btn btn-success btn-lg w-100 mt-2"
              onClick={handlePay}
              disabled={processing}
            >
              {processing
                ? <><span className="spinner-payment"></span>Procesando…</>
                : <><i className="fa-solid fa-check-circle me-2"></i>Pagar ahora</>
              }
            </button>
            <p className="text-center small text-muted mt-2 mb-0">
              <i className="fa-solid fa-shield-halved me-1"></i>Datos protegidos con cifrado 256 bits
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

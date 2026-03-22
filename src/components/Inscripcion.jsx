import { useState } from 'react'
import PaymentModal from './PaymentModal'

const BASE_PRICE = 800
const COUPONS = {
  PRIMERTORNEO:   { discount: 0.50, label: '50%' },
  RUMBOALMUNDIAL: { discount: 0.80, label: '80%' },
}

const INITIAL_FORM = {
  fullName: '', email: '', phone: '', teamName: '', category: '', tournament: '', coupon: '',
}

export default function Inscripcion({ onPaymentSuccess }) {
  const [form, setForm]             = useState(INITIAL_FORM)
  const [validated, setValidated]   = useState(false)
  const [couponMsg, setCouponMsg]   = useState(null)   // { text, type }
  const [appliedCoupon, setApplied] = useState(null)
  const [discountPct, setDiscount]  = useState(0)
  const [finalPrice, setFinalPrice] = useState(BASE_PRICE)
  const [showModal, setShowModal]   = useState(false)

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const applyCoupon = () => {
    const raw = form.coupon.trim().toUpperCase()
    if (!raw) { setCouponMsg({ text: 'Ingresa un código de cupón', type: 'warning' }); return }
    const coupon = COUPONS[raw]
    if (coupon) {
      setApplied(raw)
      setDiscount(coupon.discount)
      setFinalPrice(BASE_PRICE * (1 - coupon.discount))
      setCouponMsg({ text: `¡Cupón ${raw} aplicado! Descuento del ${coupon.label}`, type: 'success' })
    } else {
      setApplied(null)
      setDiscount(0)
      setFinalPrice(BASE_PRICE)
      setCouponMsg({ text: 'Cupón inválido', type: 'danger' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!e.target.checkValidity()) { setValidated(true); return }
    setShowModal(true)
  }

  const handlePaymentSuccess = (paymentMethod) => {
    setShowModal(false)
    onPaymentSuccess({
      ...form,
      appliedCoupon,
      finalPrice,
      paymentMethod,
      registrationId: 'TF-' + Date.now().toString(36).toUpperCase(),
      date: new Date(),
    })
  }

  const discountAmount = BASE_PRICE * discountPct

  return (
    <section id="inscripcion" className="py-6 bg-light-custom">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-tag"><i className="fa-solid fa-pen-to-square me-1"></i> Registro</span>
          <h2 className="section-title">Inscribe a tu Equipo</h2>
          <p className="section-subtitle">Completa el formulario y asegura tu lugar en el torneo</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="form-card">
              <div className="form-card-header">
                <i className="fa-solid fa-futbol me-2"></i>Formulario de Inscripción
              </div>
              <div className="form-card-body">
                <form
                  noValidate
                  className={validated ? 'was-validated' : ''}
                  onSubmit={handleSubmit}
                >
                  <div className="row g-3">
                    {/* Nombre */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        <i className="fa-solid fa-user me-1 text-primary"></i> Nombre completo
                      </label>
                      <input
                        type="text" className="form-control form-control-lg"
                        name="fullName" value={form.fullName} onChange={handleChange}
                        placeholder="Ej: Juan Pérez" required
                      />
                      <div className="invalid-feedback">Nombre completo requerido</div>
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        <i className="fa-solid fa-envelope me-1 text-danger"></i> Correo electrónico
                      </label>
                      <input
                        type="email" className="form-control form-control-lg"
                        name="email" value={form.email} onChange={handleChange}
                        placeholder="correo@ejemplo.com" required
                      />
                      <div className="invalid-feedback">Correo electrónico inválido</div>
                    </div>

                    {/* Teléfono */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        <i className="fa-solid fa-phone me-1 text-success"></i> Teléfono
                      </label>
                      <input
                        type="tel" className="form-control form-control-lg"
                        name="phone" value={form.phone} onChange={handleChange}
                        placeholder="10 dígitos" required
                      />
                      <div className="invalid-feedback">Teléfono requerido</div>
                    </div>

                    {/* Equipo */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        <i className="fa-solid fa-shield-halved me-1 text-warning"></i> Nombre del equipo
                      </label>
                      <input
                        type="text" className="form-control form-control-lg"
                        name="teamName" value={form.teamName} onChange={handleChange}
                        placeholder="Ej: Águilas FC" required
                      />
                      <div className="invalid-feedback">Nombre del equipo requerido</div>
                    </div>

                    {/* Categoría */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        <i className="fa-solid fa-layer-group me-1 text-info"></i> Categoría
                      </label>
                      <select
                        className="form-select form-select-lg"
                        name="category" value={form.category} onChange={handleChange} required
                      >
                        <option value="">— Selecciona —</option>
                        <option value="Femenil">Femenil</option>
                        <option value="Varonil">Varonil</option>
                      </select>
                      <div className="invalid-feedback">Selecciona una categoría</div>
                    </div>

                    {/* Torneo */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        <i className="fa-solid fa-trophy me-1 text-warning"></i> Torneo
                      </label>
                      <select
                        className="form-select form-select-lg"
                        name="tournament" value={form.tournament} onChange={handleChange} required
                      >
                        <option value="">— Selecciona —</option>
                        <option value="Junior">Junior</option>
                        <option value="Profesional">Profesional</option>
                        <option value="Master">Master</option>
                      </select>
                      <div className="invalid-feedback">Selecciona un torneo</div>
                    </div>

                    {/* Cupón */}
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        <i className="fa-solid fa-ticket me-1 text-purple"></i> Cupón de descuento
                      </label>
                      <div className="input-group input-group-lg">
                        <input
                          type="text" className="form-control"
                          name="coupon" value={form.coupon} onChange={handleChange}
                          placeholder="Ej: PRIMERTORNEO"
                          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), applyCoupon())}
                        />
                        <button type="button" className="btn btn-outline-primary" onClick={applyCoupon}>
                          <i className="fa-solid fa-tag me-1"></i>Aplicar
                        </button>
                      </div>
                      {couponMsg && (
                        <div className={`mt-2 small text-${couponMsg.type}`}>
                          {couponMsg.type === 'success'
                            ? <><i className="fa-solid fa-check-circle me-1"></i>{couponMsg.text}</>
                            : couponMsg.type === 'danger'
                            ? <><i className="fa-solid fa-times-circle me-1"></i>{couponMsg.text}</>
                            : couponMsg.text
                          }
                        </div>
                      )}
                    </div>

                    {/* Resumen de precio */}
                    <div className="col-12">
                      <div className="price-summary">
                        <div className="d-flex justify-content-between">
                          <span>Precio base:</span>
                          <span>$800 MXN</span>
                        </div>
                        {appliedCoupon && (
                          <div className="d-flex justify-content-between text-success">
                            <span>Descuento ({appliedCoupon}):</span>
                            <span>-${discountAmount.toFixed(0)} MXN</span>
                          </div>
                        )}
                        <hr />
                        <div className="d-flex justify-content-between fw-bold fs-5">
                          <span>Total:</span>
                          <span className="text-success">${finalPrice.toFixed(0)} MXN</span>
                        </div>
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary btn-lg w-100 btn-submit">
                        <i className="fa-solid fa-credit-card me-2"></i>Continuar al pago
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSuccess={handlePaymentSuccess}
        formData={form}
        finalPrice={finalPrice}
        originalPrice={BASE_PRICE}
        appliedCoupon={appliedCoupon}
      />
    </section>
  )
}

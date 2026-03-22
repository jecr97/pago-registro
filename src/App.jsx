import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TorneoInfo from './components/TorneoInfo'
import Categorias from './components/Categorias'
import Premios from './components/Premios'
import Promociones from './components/Promociones'
import Inscripcion from './components/Inscripcion'
import Confirmacion from './components/Confirmacion'
import Footer from './components/Footer'

export default function App() {
  const [registrationData, setRegistrationData] = useState(null)

  const handlePaymentSuccess = (data) => {
    setRegistrationData(data)
    setTimeout(() => {
      document.getElementById('confirmacion')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleNewRegistration = () => {
    setRegistrationData(null)
    setTimeout(() => {
      document.getElementById('inscripcion')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <>
      <Navbar />
      <Hero />
      <TorneoInfo />
      <Categorias />
      <Premios />
      <Promociones />
      {!registrationData
        ? <Inscripcion onPaymentSuccess={handlePaymentSuccess} />
        : <Confirmacion data={registrationData} onNewRegistration={handleNewRegistration} />
      }
      <Footer />
    </>
  )
}


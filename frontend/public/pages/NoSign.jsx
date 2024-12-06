import { useState } from 'react'
import Header2 from '../components/Header2'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

function NoSign() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header2 />
      <Hero />
      <Footer />
    </div>
  )
}

export default NoSign
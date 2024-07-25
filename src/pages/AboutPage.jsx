import React from 'react'
import About from '../components/About/About'
import { Footer } from '../components'
import { Helmet } from 'react-helmet'

function AboutPage() {
  return (
    <div>
        <Helmet>
            <title>SpotShare | About Us</title>
            <meta name="description" content="Learn more about SpotShare and how we are helping people find parking spaces easily." />
            <meta name="keywords" content="about us, SpotShare, parking spaces, rent parking" />
        </Helmet>
        <About />
        <Footer />
    </div>
  )
}

export default AboutPage
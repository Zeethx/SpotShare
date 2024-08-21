import React from 'react'
import { Container, Contact, Footer } from "../components";
import { Helmet } from 'react-helmet'
function ContactPage() {
  return (
    <div>
      <Helmet>
        <title>SpotShare | Contact Us</title>
        <meta name="description" content="Contact SpotShare for any queries or feedback." />
        <meta name="keywords" content="contact us, SpotShare, parking spaces, rent parking" />
      </Helmet>

      <Container>
        <Contact />
      </Container>
      <Footer />
    </div>
  )
}

export default ContactPage

import React from 'react'
import { Container,FindASpot } from '../components'
import { Helmet } from 'react-helmet'

function Find() {
  return (
    <Container>
      <Helmet>
        <title>SpotShare | Find Parking Spots</title>
        <meta name="description" content="Find parking spaces near you with SpotShare. Discover and book parking spots online with ease." />
        <meta name="keywords" content="find parking, parking spaces, parking spots, SpotShare" />
      </Helmet>
        <FindASpot />
    </Container>
  )
}

export default Find

import React from 'react'
import { Container, ProfilePage } from '../components'
import { Helmet } from 'react-helmet'

export default function Profile() {

  return (
	<Container>
		<Helmet>
			<title>SpotShare | Profile</title>
			<meta name="description" content="View your SpotShare profile" />
			<meta name="keywords" content="profile, SpotShare" />
		</Helmet>
		<ProfilePage />
	</Container>
  )
}

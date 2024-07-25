import React from 'react'
import Login from '../components/auth/LoginForm'
import { Helmet } from 'react-helmet'

export default function LoginPage() {
  return (
	<div>
		<Helmet>
			<title>SpotShare | Login</title>
			<meta name="description" content="Login to your SpotShare account" />
			<meta name="keywords" content="login, SpotShare, account" />
		</Helmet>
		<Login />
	</div>
  )
}

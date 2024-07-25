import React from 'react'
import SignUpForm from '../components/auth/SignUpForm'
import { Helmet } from 'react-helmet'


function SignUpPage() {
  return (
    <div>
      <Helmet>
        <title>SpotShare | Sign Up</title>
        <meta name="description" content="Sign up and create an account with SpotShare" />
        <meta name="keywords" content="sign up, SpotShare, account" />
      </Helmet>
        <SignUpForm />
    </div>
  )
}

export default SignUpPage
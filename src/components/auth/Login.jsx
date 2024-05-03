import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { authSlice } from '../../store/authSlice'
import { signIn, googleSignIn } from '../../firebase/auth'

function Login() {
  return (
    <div>
        <h1 className='text-[50px] font-bold text-center text-black'>Login</h1>
        <div>
            
        </div>
    </div>
  )
}

export default Login
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { signIn, googleSignIn } from '../../firebase/auth';
import { InputField, Button } from '../';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    const response = await googleSignIn();
    if (response && response.user) {
      console.log('Signed in with Google:', response.user);
      // Handle successful sign-in here (e.g., update user state, navigate)
    } else {
      console.error('Google Sign-In failed');
      // Handle errors or failed sign-in here
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    const response = await signIn(user.email, user.password);
    if (response) {
      dispatch(login(user));
      setIsLoggedIn(true);
    }
  };

  // Redirect after successful login
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-center p-10 mt-0 mr-auto mb-0 ml-auto max-w-md rounded-lg shadow-2xl">
        <h2 className="text-4xl font-semibold mb-6">Login to SpotShare</h2>
        <form onSubmit={onSubmit} className="w-full space-y-6">
          <div className="relative">
            <InputField label="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="border focus:border-primary-color w-full"/>
          </div>
          <div className="relative">
            <InputField label="Password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="border focus:border-primary-color w-full"/>
          </div>
          <div className="relative">
            <Button type="submit" text="Log In" />
          </div>
          <div className="relative text-center">
            <Button text="Sign in with Google" onClick={handleGoogleSignIn}
            className='p-2 bg-blue-500 text-white rounded shadow' />
          </div>
          <div className="text-center">
            <p>Don't have an account? <Link to="/signup" className="text-primary-color">Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

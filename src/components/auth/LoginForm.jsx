import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { signIn, googleSignIn } from '../../firebase/auth';
import { InputField, Button } from '../';
import api from '../../conf/axiosConfig';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await googleSignIn();
      if (userCredential && userCredential.user) {
        const idToken = await userCredential.user.getIdToken();
        localStorage.setItem('token', idToken);
        if(userCredential) {
          try {
            await api.post('/users/register', {
              uid: userCredential.user.uid,
              fullName: userCredential.user.displayName,
              email: userCredential.user.email,
              phoneNumber: userCredential.user.phoneNumber,
              photoUrl: userCredential.user.photoURL,
            });
          } catch (error) {
            console.error('Failed to create user:', error);
          }
        }
        dispatch(login({ email: userCredential.user.email, uid: userCredential.user.uid }));
        setIsLoggedIn(true);
        try {
          const userDetails = await api.get('/users/me');
          localStorage.setItem('user', JSON.stringify(userDetails.data)); // Store user details in local storage
        } catch (error) {
          console.error('Failed to fetch user details');
        }

      } else {
        console.error('Failed to sign in with Google.');
        setErrorMessage('Failed to sign in with Google.');
      }
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
      setErrorMessage('Failed to sign in with Google.');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signIn(email, password);
      if (userCredential && userCredential.user) {
        const idToken = await userCredential.user.getIdToken();
        localStorage.setItem('token', idToken);
        dispatch(login({ email, uid: userCredential.user.uid }));
        setIsLoggedIn(true);
        try {
          const userDetails = await api.get('/users/me');
          localStorage.setItem('user', JSON.stringify(userDetails.data)); // Store user details in local storage
        } catch (error) {
          console.error('Failed to fetch user details');
        }
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setErrorMessage('Invalid email or password');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen justify-center">
      <div className='lg:flex justify-center items-center hidden'>
        <div className="bg-center w-full bg-cover max-w-md lg:max-w-4xl lg:w-9/12 ">
          <img src="images/login_form.svg" alt="Login" className="w-1/2 lg:w-full lg:h-full lg:object-cover" />
        </div>
      </div>

      <div className="flex lg:w-1/2 items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center p-10 mt-0 mr-auto mb-0 ml-auto max-w-md rounded-lg shadow-2xl">
          <h2 className="text-4xl font-semibold mb-6">Login to SpotShare</h2>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <form className="w-full space-y-6">
            <InputField label="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <InputField label="Password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" text="Log In" onClick={onSubmit} />
            <Button text={
              <div className='flex gap-2 justify-center'>
                <img src="/images/googleg.png" alt="google" className='max-w-7' />
                <span className='text-black font-medium'>Sign in with Google</span>
              </div>
            } onClick={handleGoogleSignIn} className='p-2 text-white rounded shadow w-fit' />
            <p className="text-center">Don't have an account? <Link to="/signup" className="text-primary-color">Sign up</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import { signUp } from "../../firebase/auth";
import { InputField, Button } from "../"
import { useDispatch } from "react-redux";
import api from "../../conf/axiosConfig";

function SignUpForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const dispatch = useDispatch(); // Get the dispatch function

  const onSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!fullName || !email || !password) {
        setErrorMessage('Please fill in all fields');
        return;
      }

      const response = await signUp(email, password);
      if (response === "auth/email-already-in-use") {
        setErrorMessage('Email already in use');
      } else if (response && response.user) {
        const idToken = await response.user.getIdToken();
        localStorage.setItem('token', idToken);

        // Create user on the backend
        const user = {
          fullName: fullName,
          email,
          uid: response.user.uid  
        };

        // Send user data to the backend
        await api.post('/users/register', user);

        dispatch(login({ email, uid: response.user.uid }));
        setIsSignedUp(true);
      } else {
        setErrorMessage('Sign up failed');
      }
    } catch (error) {
      setErrorMessage('Sign up failed. Please try again.');
    }
  };

  
  if (isSignedUp) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex bg-white relative h-screen items-center justify-center">
      <div className="flex flex-col pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
        <div className="flex flex-col items-center w-full pt-10 pr-10 pb-20 pl-10  lg:flex-row">
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
            <div className="lg:flex flex-col items-center justify-center w-full h-full relative lg:pr-10 hidden">
              <img src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png" alt="Health and Running"
                className="w-1/2 lg:w-full lg:h-full lg:object-cover"
              />
            </div>
          </div>
          <div className="w-full  mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-2xl lg:text-4xl font-medium text-center leading-snug font-serif">Sign up for an account</p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute">Full Name</p>
                  <InputField label="FullName" type="text" placeholder="John Walker" value={fullName} onChange={(e) => setFullName(e.target.value)}
                  required/>
                </div>
                
                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute">Email</p>
                  <InputField label="Email" type="text" placeholder="123@ex.com" value={email} onChange={(e) => setEmail(e.target.value)}
                  required/>
                </div>

                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute">Password</p>
                  <InputField label="Password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                  required/>
                </div>
                <div className="relative">
                  <Button type="submit" text="Sign Up" 
                  onClick={onSubmit}
                  />
                </div>
                <div className="relative text-center">
                  <p>Already Have an account? <Link to="/login" className="text-primary-color">Log in</Link> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;

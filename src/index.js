import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';


import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import BecomeHost from './pages/BecomeHost';
import Location from './pages/host/Location';
import SpotDetails from './pages/host/SpotDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/become-a-host" element={<BecomeHost />} />
          <Route path="/become-a-host/location" element={<Location />} />
          <Route path="/become-a-host/spot-details" element={<SpotDetails />} />
        </Route>

      </Routes>
    </Router>
    </Provider>
  </React.StrictMode>
);
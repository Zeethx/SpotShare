import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Protected from './components/Misc/ProtectedRoute';
import AdminRoute from './components/Misc/AdminRoute';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import BecomeHost from './pages/BecomeHost';
import Location from './pages/host/Location';
import SpotDetails from './pages/host/SpotDetails';
import Availability from './pages/host/Availability';
import Pricing from './pages/host/Pricing';
import ReviewDetails from './pages/host/ReviewDetails';
import GetStartedPage from './pages/host/GetStartedPage';
import AboutPage from './pages/AboutPage';
import ConfirmReservationPage from './pages/ConfirmReservationPage';
import NotFound from './pages/Error';
import Find from './pages/Find';
import AdminDashboard from './pages/AdminDashboard';
import ReviewConfirmPage from './pages/host/ConfirmationPage';
import ParkingSpotDetailsPage from './pages/ParkingSpotDetailsPage';
import ContactPage from './pages/ContactPage';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Protected><Profile /></Protected>} />
            <Route path="admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUpPage />} />
            
            <Route path="about" element={<AboutPage />} />
            
            <Route path="become-a-host" element={<Protected><BecomeHost /></Protected>}>
              <Route index element={<GetStartedPage />} />
              <Route path="location" element={<Location />} />
              <Route path="spot-details" element={<SpotDetails />} />
              <Route path="availability" element={<Availability />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="review" element={<ReviewDetails />} />
              
            </Route>
            <Route path="/find" element={<Find />} />
            <Route path="/reserve/:spotId" element={<ConfirmReservationPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/submission-confirmation" element={<ReviewConfirmPage />} />
            <Route path="/parking-spot/:id" element={<ParkingSpotDetailsPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
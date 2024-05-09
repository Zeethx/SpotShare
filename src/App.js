import './App.css';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {
  const location = useLocation();


  return (
    <>
        <Header />
        <main>
        <Outlet />
        </main>

    </>


  );
}

export default App;

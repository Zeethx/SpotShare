import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, GetStarted } from '../components';

function BecomeHost() {
  const location = useLocation();

  return (
    <Container>
      {location.pathname === '/become-a-host' && <GetStarted />}
      <Outlet />
    </Container>
  );
}

export default BecomeHost;

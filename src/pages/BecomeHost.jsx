import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '../components';

function BecomeHost() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default BecomeHost;

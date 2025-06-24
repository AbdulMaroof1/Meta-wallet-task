import React from 'react';
import WalletConnect from '../components/WalletConnect';
import { Container, Card } from 'react-bootstrap';

const Wallet = () => {
  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4 shadow-sm" style={{ minWidth: '400px' }}>
        <WalletConnect />
      </Card>
    </Container>
  );
};

export default Wallet;

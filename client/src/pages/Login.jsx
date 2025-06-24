import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Alert, Container, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import config from '../config/config';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { walletAddress, signature } = location.state || {};

  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!walletAddress || !signature) {
      return toast.error('🦊 Wallet not connected or signature missing!');
    }

    try {
      setLoading(true);
      const res = await axios.post(`${config.API_BASE_URL}/auth/login`, {
        email,
        password,
        walletAddress,
        signature,
      });

      const { token, user } = res.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('✅ Login successful!');
      setTimeout(() => navigate('/meetings'), 1000);
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      toast.error(`❌ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="p-4 shadow rounded-4 border-0">
            <div className="text-center mb-4">
              <h2 className="fw-bold">🔐 Admin Login</h2>
              <p className="text-muted small">Login using email and MetaMask</p>
            </div>

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="admin123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Control type="hidden" value={walletAddress} readOnly />
              <Form.Control type="hidden" value={signature} readOnly />

              <Button variant="primary" type="submit" disabled={loading} className="w-100">
                {loading ? 'Logging in...' : 'Login with MetaMask'}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default Login;

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';
function Login() {
  const { state } = useLocation();
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const walletAddress = state?.walletAddress || '';
  const signature = state?.signature || '';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${config.API_BASE_URL}/auth/login`, {
        email,
        password,
        walletAddress,
        signature,
      });

      alert("Login success!");
      console.log(res.data);

      localStorage.setItem('token', res.data.data.token);
      // Redirect to meetings or dashboard page
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <input type="email" className="form-control mb-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="form-control mb-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        {/* Hidden fields */}
        <input type="hidden" value={walletAddress} />
        <input type="hidden" value={signature} />
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;

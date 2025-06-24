import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WalletConnect() {
  const [walletAddress, setWalletAddress] = useState('');
  const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("MetaMask is not installed!");

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const wallet = accounts[0];

      const message = `Login request for ${wallet}`;
      const signed = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, wallet],
      });

      setWalletAddress(wallet);

      navigate('/login', {
        state: {
          walletAddress: wallet,
          signature: signed,
        },
      });
    } catch (error) {
      console.error("Wallet connect error:", error.message);
      alert("Failed to connect wallet. Try again.");
    }
  };

  return (
    <div className="text-center">
      <h2 className="mb-4">🔗 Connect Your MetaMask Wallet</h2>
      <button className="btn btn-primary" onClick={connectWallet}>
        Connect Wallet
      </button>
      {walletAddress && (
        <p className="mt-3 text-success">
          ✅ Connected: <strong>{walletAddress}</strong>
        </p>
      )}
    </div>
  );
}

export default WalletConnect;

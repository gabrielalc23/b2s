import React, { useState } from 'react';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login com email:', email);
  };

  return (
    <div className="simple-login-container">
      <div className="simple-login-card">
        <div className="simple-login-header">
          <h2>Acessar plataforma</h2>
          <p>Informe seu email corporativo</p>
        </div>
        
        <form onSubmit={handleSubmit} className="simple-login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@empresa.com"
              required
            />
          </div>
          
          <button type="submit" className="login-button">Acessar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
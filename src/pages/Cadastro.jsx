import React, { useState } from 'react';
import './Cadastro.css';

const Cadastro = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!userEmail || !userName) {
      setErrorMessage('Preencha todos os campos obrigatórios');
      return;
    }

    // Simulação de cadastro
    const userType = isAdmin ? 'Administrador' : 'Usuário';
    setSuccessMessage(`${userType} ${userName} (${userEmail}) cadastrado com sucesso!`);
    setErrorMessage('');
    
    console.log('Novo usuário:', { 
      email: userEmail, 
      name: userName, 
      role: isAdmin ? 'admin' : 'user' 
    });
    
    setTimeout(() => {
      setUserEmail('');
      setUserName('');
      setIsAdmin(false);
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <div className="admin-header">
          <h2>Cadastrar Novo Usuário</h2>
          <p>Somente administradores podem cadastrar novos acessos</p>
        </div>
        
        <form onSubmit={handleSubmit} className="admin-form">
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          
          <div className="form-group">
            <label htmlFor="userEmail">Email Corporativo*</label>
            <input
              type="email"
              id="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="exemplo@empresa.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="userName">Nome Completo*</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Nome Sobrenome"
              required
            />
          </div>
          
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <label htmlFor="isAdmin">É administrador?</label>
          </div>
          
          <button type="submit" className="register-button">
            Cadastrar Usuário
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
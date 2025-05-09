import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { TextField, InputAdornment } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import NotesIcon from '@mui/icons-material/Notes';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MoneyIcon from '@mui/icons-material/Money';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const CadastroEmpresa = () => {
  const initialFormState = {
    nome: '',
    razao_social: '',
    endereco: '',
    complemento: '',
    cidade_estado: '',
    telefone: '',
    email: '',
    observacoes: '',
    data_fundacao: '',
    foramato_juridico: '',
    cnae: '',
    cnpj: '',
    aliquota_de_imposto: '',
    ano_inicial_negocios: '',
    mes_inicial_negocios: '',
    usuario_id: 1
  };

  const [empresa, setEmpresa] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dados-basicos');
  const [cadastroRealizado, setCadastroRealizado] = useState(false);

  const formatCNPJ = (value) => {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, '').slice(0, 14);
    return cleaned
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value) => {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, '').slice(0, 11);
    const isCelular = cleaned.length > 10;
    return isCelular
      ? cleaned
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1')
      : cleaned
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresa(prev => ({ ...prev, [name]: value }));
  };

  const handleCNPJChange = (e) => {
    const formattedValue = formatCNPJ(e.target.value);
    setEmpresa(prev => ({ ...prev, cnpj: formattedValue }));
  };

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhone(e.target.value);
    setEmpresa(prev => ({ ...prev, telefone: formattedValue }));
  };

  const validate = () => {
    const newErrors = {};
    if (!empresa.nome.trim()) newErrors.nome = 'Campo obrigatório';
    if (!empresa.cnpj.trim()) newErrors.cnpj = 'Campo obrigatório';
    else if (empresa.cnpj.replace(/\D/g, '').length !== 14) newErrors.cnpj = 'CNPJ inválido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const dadosParaEnviar = {
        ...empresa,
        cnpj: empresa.cnpj.replace(/\D/g, ''),
        telefone: empresa.telefone.replace(/\D/g, '')
      };

      const response = await fetch("http://localhost/teste/CadastroEmpresa.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosParaEnviar),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro no servidor");
      }

      const resultado = await response.json();
      setSuccess(true);
      setCadastroRealizado(true);
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Erro:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNovaEmpresa = () => {
    setEmpresa(initialFormState);
    setCadastroRealizado(false);
    setErrors({});
    setActiveTab('dados-basicos');
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (activeTab === 'dados-basicos') {
      const newErrors = {};
      if (!empresa.nome.trim()) newErrors.nome = 'Campo obrigatório';
      if (!empresa.cnpj.trim()) newErrors.cnpj = 'Campo obrigatório';
      else if (empresa.cnpj.replace(/\D/g, '').length !== 14) newErrors.cnpj = 'CNPJ inválido';
      
      setErrors(newErrors);
      
      if (Object.keys(newErrors).length === 0) {
        setActiveTab('contato');
      }
    } else if (activeTab === 'contato') {
      setActiveTab('detalhes');
    }
  };

  const handleBack = () => {
    if (activeTab === 'contato') {
      setActiveTab('dados-basicos');
    } else if (activeTab === 'detalhes') {
      setActiveTab('contato');
    }
  };

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const colors = {
    primary: '#4a6fa5',
    secondary: '#6c8fc7',
    accent: '#88a0d3',
    light: '#ffffff',
    background: '#f8fafc',
    text: '#334155',
    textLight: '#64748b',
    success: '#10b981',
    error: '#ef4444',
    border: '#e2e8f0',
    hover: '#f1f5f9'
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '960px' }}>
      <Row className="justify-content-center">
        <Col lg={12}>
          <Card className="border-0" style={{ 
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: colors.light
          }}>
            <Card.Header style={{ 
              backgroundColor: colors.light,
              borderBottom: `1px solid ${colors.border}`,
              padding: '1.25rem 1.5rem'
            }}>
              <div className="d-flex align-items-center">
                <BusinessIcon style={{ color: colors.primary, marginRight: '12px' }} fontSize="medium" />
                <h5 style={{ color: colors.text, margin: 0, fontWeight: 600, fontSize: '1.25rem' }}>
                  {cadastroRealizado ? 'Empresa Cadastrada' : 'Cadastro de Empresa'}
                </h5>
              </div>
            </Card.Header>
            
            <Card.Body style={{ backgroundColor: colors.light, padding: '1.5rem' }}>
              {success && (
                <Alert variant="success" style={{
                  backgroundColor: colors.success,
                  color: colors.light,
                  border: 'none',
                  padding: '0.75rem 1.25rem',
                  marginBottom: '1.5rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <svg style={{ marginRight: '8px' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="white"/>
                  </svg>
                  Empresa cadastrada com sucesso!
                </Alert>
              )}

              {!cadastroRealizado && (
                <div className="mb-4" style={{ display: 'flex', gap: '8px', borderBottom: `1px solid ${colors.border}`, paddingBottom: '1rem' }}>
                  {['dados-basicos', 'contato', 'detalhes'].map((tab) => (
                    <Button 
                      key={tab}
                      variant="link"
                      style={{
                        color: activeTab === tab ? colors.primary : colors.textLight,
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.5rem 1rem',
                        fontWeight: 500,
                        textDecoration: 'none',
                        position: 'relative',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab === 'dados-basicos' && 'Dados Básicos'}
                      {tab === 'contato' && 'Contato'}
                      {tab === 'detalhes' && 'Detalhes'}
                      {activeTab === tab && (
                        <div style={{
                          position: 'absolute',
                          bottom: '-1.1rem',
                          left: 0,
                          right: 0,
                          height: '2px',
                          backgroundColor: colors.primary,
                          borderRadius: '2px'
                        }} />
                      )}
                    </Button>
                  ))}
                </div>
              )}

              <Form onSubmit={activeTab === 'detalhes' ? handleSubmit : handleNext}>
                {activeTab === 'dados-basicos' && (
                  <Row>
                    <Col md={6}>
                      <TextField
                        fullWidth
                        label="Nome da Empresa *"
                        name="nome"
                        value={empresa.nome}
                        onChange={handleChange}
                        error={!!errors.nome}
                        helperText={errors.nome}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <BusinessIcon fontSize="small" style={{ color: colors.textLight }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: colors.light,
                            borderRadius: '8px',
                            border: `1px solid ${colors.border}`,
                            padding: '8px 12px'
                          }
                        }}
                        style={{ marginBottom: '1rem' }}
                        disabled={cadastroRealizado}
                      />
                    </Col>
                    <Col md={6}>
                      <TextField
                        fullWidth
                        label="Razão Social"
                        name="razao_social"
                        value={empresa.razao_social}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AssignmentIcon fontSize="small" style={{ color: colors.textLight }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: colors.light,
                            borderRadius: '8px',
                            border: `1px solid ${colors.border}`,
                            padding: '8px 12px'
                          }
                        }}
                        style={{ marginBottom: '1rem' }}
                        disabled={cadastroRealizado}
                      />
                    </Col>
                    <Col md={6}>
                      <TextField
                        fullWidth
                        label="CNPJ *"
                        name="cnpj"
                        value={empresa.cnpj}
                        onChange={handleCNPJChange}
                        error={!!errors.cnpj}
                        helperText={errors.cnpj}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AssignmentIcon fontSize="small" style={{ color: colors.textLight }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: colors.light,
                            borderRadius: '8px',
                            border: `1px solid ${colors.border}`,
                            padding: '8px 12px'
                          }
                        }}
                        style={{ marginBottom: '1rem' }}
                        disabled={cadastroRealizado}
                      />
                    </Col>
                    <Col md={6}>
                      <TextField
                        fullWidth
                        label="Formato Jurídico"
                        name="foramato_juridico"
                        value={empresa.foramato_juridico}
                        onChange={handleChange}
                        style={{ marginBottom: '1rem' }}
                        disabled={cadastroRealizado}
                      />
                    </Col>
                  </Row>
                )}

                {activeTab === 'contato' && (
                  <Row>
                    <Col md={8}>
                      <TextField
                        fullWidth
                        label="Endereço"
                        name="endereco"
                        value={empresa.endereco}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <HomeIcon fontSize="small" style={{ color: colors.textLight }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: colors.light,
                            borderRadius: '8px',
                            border: `1px solid ${colors.border}`,
                            padding: '8px 12px'
                          }
                        }}
                        style={{ marginBottom: '1rem' }}
                        disabled={cadastroRealizado}
                      />
                    </Col>
                    <Col md={4}>
                      <TextField
                        fullWidth
                        label="Complemento"
                        name="complemento"
                        value={empresa.complemento}
                        onChange={handleChange}
                        style={{ marginBottom: '1rem' }}
                        disabled={cadastroRealizado}
                      />
                    </Col>
                    <Col md={6}>
                      <TextField
                        fullWidth
                        label="Cidade/Estado"
                        name="cidade_estado"
                        value={empresa.cidade_estado}
                        onChange={handleChange}
                        style={{ marginBottom: '1rem' }}
                        disabled={cadastroRealizado}
                      />
                    </Col>
                    <Col md={6}>
                      <TextField
                        fullWidth
                        label="Telefone"
                        name="telefone"
                        value={empresa.telefone}
                        onChange={handlePhoneChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon fontSize="small" style={{ color: colors.textLight }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: colors.light,
                            borderRadius: '8px',
                            border: `1px solid ${colors.border}`,
                            padding: '8px 12px'
                          }
                        }}
                        style={{ marginBottom: '1rem' }}
                        disabled={cadastroRealizado}
                      />
                    </Col>
                    <Col md={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={empresa.email}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon fontSize="small" style={{ color: colors.textLight }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: colors.light,
                            borderRadius: '8px',
                            border: `1px solid ${colors.border}`,
                            padding: '8px 12px'
                          }
                        }}
                        style={{ marginBottom: '1rem' }}
                        disabled={cadastroRealizado}
                      />
                    </Col>
                  </Row>
                )}

                {activeTab === 'detalhes' && (
                  <Row>
                    <Col md={6}>
                      <TextField
                        fullWidth
                        label="CNAE"
                        name="cnae"
                        value={empresa.cnae}
                        onChange={handleChange}
                        style={{ marginBottom: '1rem' }}
                        disabled={cadastroRealizado}
                      />
                    </Col>
                    <Col md={6}>
                      <TextField
                        fullWidth
                        label="Alíquota de Imposto"
                        name="aliquota_de_imposto"
                        value={empresa.aliquota_de_imposto}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MoneyIcon fontSize="small" style={{ color: colors.textLight }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: colors.light,
                            borderRadius: '8px',
                            border: `1px solid ${colors.border}`,
                            padding: '8px 12px'
                          }
                        }}
                        style={{ marginBottom: '1rem' }}
                        disabled={cadastroRealizado}
                      />
                    </Col>
                    <Col md={6}>
                      <TextField
                        fullWidth
                        label="Ano Inicial de Negócios"
                        name="ano_inicial_negocios"
                        type="number"
                        value={empresa.ano_inicial_negocios}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarTodayIcon fontSize="small" style={{ color: colors.textLight }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: colors.light,
                            borderRadius: '8px',
                            border: `1px solid ${colors.border}`,
                            padding: '8px 12px'
                          }
                        }}
                        style={{ marginBottom: '1rem' }}
                        disabled={cadastroRealizado}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="mesInicialNegocios">
                        <Form.Label style={{ color: colors.textLight, fontSize: '0.875rem' }}>
                          Mês Inicial
                        </Form.Label>
                        <Form.Select
                          name="mes_inicial_negocios"
                          value={empresa.mes_inicial_negocios}
                          onChange={handleChange}
                          style={{
                            backgroundColor: colors.light,
                            border: `1px solid ${colors.border}`,
                            borderRadius: '8px',
                            height: '40px'
                          }}
                          disabled={cadastroRealizado}
                        >
                          <option value="">Selecione</option>
                          {meses.map((mes, index) => (
                            <option key={index} value={mes}>{mes}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <TextField
                        fullWidth
                        label="Data de Fundação"
                        name="data_fundacao"
                        type="date"
                        value={empresa.data_fundacao}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EventIcon fontSize="small" style={{ color: colors.textLight }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: colors.light,
                            borderRadius: '8px',
                            border: `1px solid ${colors.border}`,
                            padding: '8px 12px'
                          }
                        }}
                        style={{ marginBottom: '1rem' }}
                        disabled={cadastroRealizado}
                      />
                    </Col>
                    <Col md={12}>
                      <TextField
                        fullWidth
                        label="Observações"
                        name="observacoes"
                        value={empresa.observacoes}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <NotesIcon fontSize="small" style={{ color: colors.textLight }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: colors.light,
                            borderRadius: '8px',
                            border: `1px solid ${colors.border}`,
                            padding: '8px 12px'
                          }
                        }}
                        style={{ marginBottom: '1rem' }}
                        disabled={cadastroRealizado}
                      />
                    </Col>
                  </Row>
                )}

                <div className="d-flex justify-content-between mt-4">
                  {!cadastroRealizado && activeTab !== 'dados-basicos' && (
                    <Button 
                      onClick={handleBack}
                      style={{
                        backgroundColor: colors.secondary,
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.625rem 1.5rem',
                        fontWeight: 500
                      }}
                    >
                      Voltar
                    </Button>
                  )}
                  
                  <div className="ms-auto">
                    {!cadastroRealizado ? (
                      <Button 
                        type="submit" 
                        disabled={loading}
                        style={{
                          backgroundColor: colors.primary,
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.625rem 1.5rem',
                          fontWeight: 500,
                          opacity: loading ? 0.7 : 1
                        }}
                      >
                        {activeTab === 'detalhes' 
                          ? (loading ? 'Salvando...' : 'Salvar Cadastro') 
                          : 'Avançar'}
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleNovaEmpresa}
                        style={{
                          backgroundColor: colors.secondary,
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.625rem 1.5rem',
                          fontWeight: 500
                        }}
                      >
                        Cadastrar Nova Empresa
                      </Button>
                    )}
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CadastroEmpresa;
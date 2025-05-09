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

const EmpresaCadastro = () => {
  const [empresa, setEmpresa] = useState({
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
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('dados-basicos');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresa({ ...empresa, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!empresa.nome) newErrors.nome = 'Campo obrigatório';
    if (!empresa.cnpj) newErrors.cnpj = 'Campo obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Dados:', empresa);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const colors = {
    primary: '#2c3e50',
    secondary: '#34495e',
    accent: '#3498db',
    light: '#ecf0f1',
    background: '#f8f9fa',
    text: '#2c3e50',
    success: '#27ae60',
    error: '#e74c3c'
  };

  return (
    <Container className="mt-3" style={{ maxWidth: '960px' }}>
      <Row className="justify-content-center">
        <Col lg={12}>
          <Card className="border-0" style={{
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <Card.Header style={{
              backgroundColor: colors.primary,
              borderBottom: `1px solid ${colors.secondary}`,
              padding: '0.75rem 1.25rem'
            }}>
              <div className="d-flex align-items-center">
                <BusinessIcon style={{ color: '#fff', marginRight: '10px' }} fontSize="small" />
                <h5 style={{
                  color: '#fff',
                  margin: 0,
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }}>
                  Cadastro de Empresa
                </h5>
              </div>
            </Card.Header>

            <Card.Body style={{
              backgroundColor: colors.background,
              padding: '1.25rem'
            }}>
              {success && (
                <Alert variant="success" style={{
                  backgroundColor: colors.success,
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  marginBottom: '1rem',
                  borderRadius: '6px'
                }} dismissible onClose={() => setSuccess(false)}>
                  Empresa cadastrada com sucesso!
                </Alert>
              )}

              <div className="mb-3" style={{ display: 'flex', gap: '8px' }}>
                <Button
                  variant="link"
                  style={{
                    color: activeTab === 'dados-basicos' ? colors.primary : '#95a5a6',
                    backgroundColor: activeTab === 'dados-basicos' ? '#fff' : 'transparent',
                    border: activeTab === 'dados-basicos' ? `1px solid ${colors.primary}` : '1px solid #dfe6e9',
                    borderRadius: '6px',
                    padding: '0.375rem 0.75rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    boxShadow: activeTab === 'dados-basicos' ? `0 2px 4px rgba(44, 62, 80, 0.1)` : 'none'
                  }}
                  onClick={() => setActiveTab('dados-basicos')}
                >
                  Dados Básicos
                </Button>
                <Button
                  variant="link"
                  style={{
                    color: activeTab === 'contato' ? colors.primary : '#95a5a6',
                    backgroundColor: activeTab === 'contato' ? '#fff' : 'transparent',
                    border: activeTab === 'contato' ? `1px solid ${colors.primary}` : '1px solid #dfe6e9',
                    borderRadius: '6px',
                    padding: '0.375rem 0.75rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    boxShadow: activeTab === 'contato' ? `0 2px 4px rgba(44, 62, 80, 0.1)` : 'none'
                  }}
                  onClick={() => setActiveTab('contato')}
                >
                  Contato
                </Button>
                <Button
                  variant="link"
                  style={{
                    color: activeTab === 'detalhes' ? colors.primary : '#95a5a6',
                    backgroundColor: activeTab === 'detalhes' ? '#fff' : 'transparent',
                    border: activeTab === 'detalhes' ? `1px solid ${colors.primary}` : '1px solid #dfe6e9',
                    borderRadius: '6px',
                    padding: '0.375rem 0.75rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    boxShadow: activeTab === 'detalhes' ? `0 2px 4px rgba(44, 62, 80, 0.1)` : 'none'
                  }}
                  onClick={() => setActiveTab('detalhes')}
                >
                  Detalhes
                </Button>
              </div>

              <Form onSubmit={handleSubmit}>
                {activeTab === 'dados-basicos' && (
                  <Row>
                    <Col md={6}>
                      <TextField
                        fullWidth
                        label="Nome da Empresa *"
                        name="nome"
                        value={empresa.nome}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                        error={!!errors.nome}
                        helperText={errors.nome}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <BusinessIcon fontSize="small" style={{ color: colors.primary }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            border: '1px solid #dfe6e9'
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            color: colors.text
                          }
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <TextField
                        fullWidth
                        label="Razão Social"
                        name="razao_social"
                        value={empresa.razao_social}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AssignmentIcon fontSize="small" style={{ color: colors.primary }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            border: '1px solid #dfe6e9'
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            color: colors.text
                          }
                        }}
                      />
                    </Col>
                    <Col md={6} className="mt-2">
                      <TextField
                        fullWidth
                        label="CNPJ *"
                        name="cnpj"
                        value={empresa.cnpj}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                        error={!!errors.cnpj}
                        helperText={errors.cnpj}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AssignmentIcon fontSize="small" style={{ color: colors.primary }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            border: '1px solid #dfe6e9'
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            color: colors.text
                          }
                        }}
                      />
                    </Col>
                    <Col md={6} className="mt-2">
                      <TextField
                        fullWidth
                        label="Formato Jurídico"
                        name="foramato_juridico"
                        value={empresa.foramato_juridico}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                        InputProps={{
                          style: {
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            border: '1px solid #dfe6e9'
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            color: colors.text
                          }
                        }}
                      />
                    </Col>
                  </Row>
                )}

                {activeTab === 'contato' && (
                  <Row>
                    <Col md={8} className="mb-2">
                      <TextField
                        fullWidth
                        label="Endereço"
                        name="endereco"
                        value={empresa.endereco}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <HomeIcon fontSize="small" style={{ color: colors.primary }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            border: '1px solid #dfe6e9'
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            color: colors.text
                          }
                        }}
                      />
                    </Col>
                    <Col md={4} className="mb-2">
                      <TextField
                        fullWidth
                        label="Complemento"
                        name="complemento"
                        value={empresa.complemento}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                        InputProps={{
                          style: {
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            border: '1px solid #dfe6e9'
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            color: colors.text
                          }
                        }}
                      />
                    </Col>
                    <Col md={6} className="mb-2">
                      <TextField
                        fullWidth
                        label="Cidade/Estado"
                        name="cidade_estado"
                        value={empresa.cidade_estado}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                        InputProps={{
                          style: {
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            border: '1px solid #dfe6e9'
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            color: colors.text
                          }
                        }}
                      />
                    </Col>
                    <Col md={6} className="mb-2">
                      <TextField
                        fullWidth
                        label="Telefone"
                        name="telefone"
                        value={empresa.telefone}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon fontSize="small" style={{ color: colors.primary }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            border: '1px solid #dfe6e9'
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            color: colors.text
                          }
                        }}
                      />
                    </Col>
                    <Col md={12} className="mb-2">
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={empresa.email}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon fontSize="small" style={{ color: colors.primary }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            border: '1px solid #dfe6e9'
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            color: colors.text
                          }
                        }}
                      />
                    </Col>
                  </Row>
                )}

                {activeTab === 'detalhes' && (
                  <Row>
                    <Col md={6} className="mb-2">
                      <TextField
                        fullWidth
                        label="CNAE"
                        name="cnae"
                        value={empresa.cnae}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                        InputProps={{
                          style: {
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            border: '1px solid #dfe6e9'
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            color: colors.text
                          }
                        }}
                      />
                    </Col>
                    <Col md={6} className="mb-2">
                      <TextField
                        fullWidth
                        label="Alíquota de Imposto"
                        name="aliquota_de_imposto"
                        value={empresa.aliquota_de_imposto}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MoneyIcon fontSize="small" style={{ color: colors.primary }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            border: '1px solid #dfe6e9'
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            color: colors.text
                          }
                        }}
                      />
                    </Col>
                    <Col md={6} className="mb-2">
                      <TextField
                        fullWidth
                        label="Ano Inicial de Negócios"
                        name="ano_inicial_negocios"
                        type="number"
                        value={empresa.ano_inicial_negocios}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarTodayIcon fontSize="small" style={{ color: colors.primary }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            border: '1px solid #dfe6e9'
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            color: colors.text
                          }
                        }}
                      />
                    </Col>
                    <Col md={6} className="mb-2">
                      <Form.Group controlId="mesInicialNegocios">
                        <Form.Label style={{
                          color: colors.text,
                          fontSize: '0.875rem',
                          marginBottom: '0.25rem'
                        }}>
                          Mês Inicial
                        </Form.Label>
                        <Form.Select
                          name="mes_inicial_negocios"
                          value={empresa.mes_inicial_negocios}
                          onChange={handleChange}
                          style={{
                            backgroundColor: '#fff',
                            border: '1px solid #dfe6e9',
                            borderRadius: '6px',
                            color: colors.text,
                            fontSize: '0.875rem',
                            padding: '0.375rem 0.75rem'
                          }}
                        >
                          <option value="">Selecione</option>
                          {meses.map((mes, index) => (
                            <option key={index} value={mes}>{mes}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-2">
                      <TextField
                        fullWidth
                        label="Data de Fundação"
                        name="data_fundacao"
                        type="date"
                        value={empresa.data_fundacao}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EventIcon fontSize="small" style={{ color: colors.primary }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            border: '1px solid #dfe6e9'
                          }
                        }}
                        style={{ color: colors.text }}
                      />
                    </Col>
                    <Col md={12} className="mb-2">
                      <TextField
                        fullWidth
                        label="Observações"
                        name="observacoes"
                        value={empresa.observacoes}
                        onChange={handleChange}
                        size="small"
                        margin="dense"
                        multiline
                        rows={2}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <NotesIcon fontSize="small" style={{ color: colors.primary }} />
                            </InputAdornment>
                          ),
                          style: {
                            backgroundColor: '#fff',
                            borderRadius: '6px',
                            border: '1px solid #dfe6e9'
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            color: colors.text
                          }
                        }}
                      />
                    </Col>
                  </Row>
                )}

                <div className="d-grid mt-3">
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: colors.primary,
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.5rem',
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = colors.secondary}
                    onMouseOut={(e) => e.target.style.backgroundColor = colors.primary}
                  >
                    Salvar Cadastro
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmpresaCadastro;
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Table, Badge } from 'react-bootstrap';
import { TextField, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import PercentIcon from '@mui/icons-material/Percent';
import CakeIcon from '@mui/icons-material/Cake';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import NotesIcon from '@mui/icons-material/Notes';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const formatDocument = (value) => {
  if (!value) return '';
  
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length <= 11) {
    return cleaned
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  } 
  else {
    return cleaned
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }
};

const formatPhone = (value) => {
  if (!value) return '';
  
  const cleaned = value.replace(/\D/g, '');
  
  const isCelular = cleaned.length > 2 && cleaned[2] === '9';
  
  if (cleaned.length <= 2) {
    return `(${cleaned}`;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  } else if (isCelular && cleaned.length <= 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  } else if (!isCelular && cleaned.length <= 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  } else {
    // Caso tenha mais dígitos que o esperado, mantém o formato completo
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 3)} ${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  }
};

const CadastroSocios = () => {
  const [socios, setSocios] = useState([
    {
      id: 1,
      nome: '',
      documento: '',
      percentual: '',
      data_nascimento: '',
      email: '',
      telefone: '',
      formacao: '',
      responsabilidade: '',
      observacoes: ''
    }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const colors = {
    primary: '#4a6fa5',       
    secondary: '#6c8fc7',      
    light: '#ffffff',         
    background: '#f8fafc',     
    text: '#334155',           
    textLight: '#64748b',     
    success: '#10b981',       
    error: '#ef4444',         
    border: '#e2e8f0',        
    hover: '#f1f5f9'           
  };

  const handleDocumentChange = (id, e) => {
    const { value } = e.target;
    const formattedValue = formatDocument(value);
    
    setSocios(socios.map(socio => 
      socio.id === id ? { ...socio, documento: formattedValue } : socio
    ));
  };

  const handlePhoneChange = (id, e) => {
    const { value } = e.target;
    const formattedValue = formatPhone(value);
    
    setSocios(socios.map(socio => 
      socio.id === id ? { ...socio, telefone: formattedValue } : socio
    ));
  };

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    setSocios(socios.map(socio => 
      socio.id === id ? { ...socio, [name]: value } : socio
    ));
  };

  const validate = (socio) => {
    const newErrors = {};
    if (!socio.nome) newErrors.nome = 'Nome é obrigatório';
    if (!socio.documento) newErrors.documento = 'CPF/CNPJ é obrigatório';
    if (!socio.percentual) newErrors.percentual = 'Percentual é obrigatório';
    return newErrors;
  };

  const handleAddSocio = () => {
    const newId = socios.length > 0 ? Math.max(...socios.map(s => s.id)) + 1 : 1;
    setSocios([...socios, {
      id: newId,
      nome: '',
      documento: '',
      percentual: '',
      data_nascimento: '',
      email: '',
      telefone: '',
      formacao: '',
      responsabilidade: '',
      observacoes: ''
    }]);
    setEditingId(newId);
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id) => {
    const socio = socios.find(s => s.id === id);
    const validationErrors = validate(socio);
    
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setEditingId(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleRemove = (id) => {
    setSocios(socios.filter(socio => socio.id !== id));
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '1200px' }}>
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
                <PersonIcon style={{ 
                  color: colors.primary, 
                  marginRight: '12px',
                  fontSize: '1.75rem'
                }} />
                <h4 style={{ 
                  color: colors.text,
                  margin: 0,
                  fontWeight: 600
                }}>
                  Cadastro de Sócios
                </h4>
                <Badge style={{ 
                  backgroundColor: colors.background,
                  color: colors.text,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  padding: '0.35rem 0.65rem',
                  marginLeft: 'auto'
                }}>
                  {socios.length} {socios.length === 1 ? 'registro' : 'registros'}
                </Badge>
              </div>
            </Card.Header>
            
            <Card.Body style={{ padding: '1.5rem' }}>
              {success && (
                <Alert variant="success" onClose={() => setSuccess(false)} style={{
                  backgroundColor: colors.success,
                  color: colors.light,
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.25rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <svg style={{ marginRight: '8px' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="white"/>
                  </svg>
                  Sócio salvo com sucesso!
                </Alert>
              )}

              <Table hover responsive className="mb-4" style={{ 
                borderColor: colors.border,
                marginBottom: '1.5rem'
              }}>
                <thead>
                  <tr style={{ 
                    backgroundColor: colors.background,
                    color: colors.text
                  }}>
                    <th style={{ 
                      padding: '0.75rem 1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Sócio</th>
                    <th style={{ 
                      padding: '0.75rem 1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>CPF/CNPJ</th>
                    <th style={{ 
                      padding: '0.75rem 1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>%</th>
                    <th style={{ 
                      padding: '0.75rem 1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {socios.map(socio => (
                    <tr key={socio.id} style={{ 
                      borderBottom: `1px solid ${colors.border}`,
                      transition: 'background-color 0.2s ease'
                    }}>
                      <td style={{ padding: '1rem' }}>
                        {editingId === socio.id ? (
                          <TextField
                            fullWidth
                            name="nome"
                            value={socio.nome}
                            onChange={(e) => handleChange(socio.id, e)}
                            size="small"
                            margin="dense"
                            error={!!errors.nome}
                            helperText={errors.nome}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon fontSize="small" style={{ color: colors.textLight }} />
                                </InputAdornment>
                              ),
                              style: {
                                backgroundColor: colors.light,
                                borderRadius: '8px',
                                border: `1px solid ${colors.border}`,
                                padding: '8px 12px'
                              }
                            }}
                            InputLabelProps={{
                              style: {
                                color: colors.textLight,
                                fontSize: '0.875rem'
                              },
                              shrink: true
                            }}
                          />
                        ) : (
                          socio.nome || <span style={{ color: colors.textLight }}>Novo sócio</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {editingId === socio.id ? (
                          <TextField
                            fullWidth
                            name="documento"
                            value={socio.documento}
                            onChange={(e) => handleDocumentChange(socio.id, e)}
                            size="small"
                            margin="dense"
                            error={!!errors.documento}
                            helperText={errors.documento}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <BadgeIcon fontSize="small" style={{ color: colors.textLight }} />
                                </InputAdornment>
                              ),
                              style: {
                                backgroundColor: colors.light,
                                borderRadius: '8px',
                                border: `1px solid ${colors.border}`,
                                padding: '8px 12px'
                              }
                            }}
                            InputLabelProps={{
                              style: {
                                color: colors.textLight,
                                fontSize: '0.875rem'
                              },
                              shrink: true
                            }}
                          />
                        ) : (
                          socio.documento || <span style={{ color: colors.textLight }}>-</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {editingId === socio.id ? (
                          <TextField
                            fullWidth
                            name="percentual"
                            value={socio.percentual}
                            onChange={(e) => handleChange(socio.id, e)}
                            size="small"
                            margin="dense"
                            error={!!errors.percentual}
                            helperText={errors.percentual}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PercentIcon fontSize="small" style={{ color: colors.textLight }} />
                                </InputAdornment>
                              ),
                              endAdornment: <InputAdornment position="end">%</InputAdornment>,
                              style: {
                                backgroundColor: colors.light,
                                borderRadius: '8px',
                                border: `1px solid ${colors.border}`,
                                padding: '8px 12px'
                              }
                            }}
                            InputLabelProps={{
                              style: {
                                color: colors.textLight,
                                fontSize: '0.875rem'
                              },
                              shrink: true
                            }}
                          />
                        ) : (
                          socio.percentual ? `${socio.percentual}%` : <span style={{ color: colors.textLight }}>-</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div className="d-flex gap-2">
                          {editingId === socio.id ? (
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleSave(socio.id)}
                              style={{
                                backgroundColor: colors.success,
                                border: 'none',
                                borderRadius: '6px',
                                padding: '0.25rem 0.75rem',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              Salvar
                            </Button>
                          ) : (
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleEdit(socio.id)}
                              style={{
                                borderRadius: '6px',
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                borderColor: colors.border,
                                color: colors.primary,
                                backgroundColor: colors.background
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </Button>
                          )}
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemove(socio.id)}
                            style={{
                              borderRadius: '6px',
                              padding: '0.25rem 0.5rem',
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              display: 'flex',
                              alignItems: 'center',
                              borderColor: '#fee2e2',
                              color: '#dc2626',
                              backgroundColor: '#fef2f2'
                            }}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = '#fee2e2';
                              e.target.style.color = '#b91c1c';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = '#fef2f2';
                              e.target.style.color = '#dc2626';
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {editingId && socios.find(s => s.id === editingId) && (
                <Card className="mb-4" style={{ 
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <Card.Body style={{ padding: '1.5rem' }}>
                    <h6 className="mb-3" style={{ 
                      color: colors.text,
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}>
                      Detalhes do Sócio
                    </h6>
                    <Row>
                      <Col md={6} className="mb-3">
                        <TextField
                          fullWidth
                          label="Data de Nascimento"
                          name="data_nascimento"
                          type="date"
                          value={socios.find(s => s.id === editingId).data_nascimento}
                          onChange={(e) => handleChange(editingId, e)}
                          size="small"
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CakeIcon fontSize="small" style={{ color: colors.textLight }} />
                              </InputAdornment>
                            ),
                            style: {
                              backgroundColor: colors.light,
                              borderRadius: '8px',
                              border: `1px solid ${colors.border}`,
                              padding: '8px 12px'
                            }
                          }}
                          style={{ width: '100%' }}
                        />
                      </Col>
                      <Col md={6} className="mb-3">
                        <TextField
                          fullWidth
                          label="Telefone"
                          name="telefone"
                          value={socios.find(s => s.id === editingId).telefone}
                          onChange={(e) => handlePhoneChange(editingId, e)}
                          size="small"
                          margin="dense"
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
                          InputLabelProps={{
                            style: {
                              color: colors.textLight,
                              fontSize: '0.875rem'
                            },
                            shrink: true
                          }}
                        />
                      </Col>
                      <Col md={6} className="mb-3">
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={socios.find(s => s.id === editingId).email}
                          onChange={(e) => handleChange(editingId, e)}
                          size="small"
                          margin="dense"
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
                          InputLabelProps={{
                            style: {
                              color: colors.textLight,
                              fontSize: '0.875rem'
                            },
                            shrink: true
                          }}
                        />
                      </Col>
                      <Col md={6} className="mb-3">
                        <TextField
                          fullWidth
                          label="Formação"
                          name="formacao"
                          value={socios.find(s => s.id === editingId).formacao}
                          onChange={(e) => handleChange(editingId, e)}
                          size="small"
                          margin="dense"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SchoolIcon fontSize="small" style={{ color: colors.textLight }} />
                              </InputAdornment>
                            ),
                            style: {
                              backgroundColor: colors.light,
                              borderRadius: '8px',
                              border: `1px solid ${colors.border}`,
                              padding: '8px 12px'
                            }
                          }}
                          InputLabelProps={{
                            style: {
                              color: colors.textLight,
                              fontSize: '0.875rem'
                            },
                            shrink: true
                          }}
                        />
                      </Col>
                      <Col md={6} className="mb-3">
                        <TextField
                          fullWidth
                          label="Responsabilidade"
                          name="responsabilidade"
                          value={socios.find(s => s.id === editingId).responsabilidade}
                          onChange={(e) => handleChange(editingId, e)}
                          size="small"
                          margin="dense"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <WorkIcon fontSize="small" style={{ color: colors.textLight }} />
                              </InputAdornment>
                            ),
                            style: {
                              backgroundColor: colors.light,
                              borderRadius: '8px',
                              border: `1px solid ${colors.border}`,
                              padding: '8px 12px'
                            }
                          }}
                          InputLabelProps={{
                            style: {
                              color: colors.textLight,
                              fontSize: '0.875rem'
                            },
                            shrink: true
                          }}
                        />
                      </Col>
                      <Col md={12} className="mb-3">
                        <TextField
                          fullWidth
                          label="Observações"
                          name="observacoes"
                          value={socios.find(s => s.id === editingId).observacoes}
                          onChange={(e) => handleChange(editingId, e)}
                          size="small"
                          margin="dense"
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
                          InputLabelProps={{
                            style: {
                              color: colors.textLight,
                              fontSize: '0.875rem'
                            },
                            shrink: true
                          }}
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              )}

              <div className="d-flex justify-content-end">
                <Button 
                  variant="primary"
                  onClick={handleAddSocio}
                  style={{
                    backgroundColor: colors.primary,
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.625rem 1.25rem',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 2px 8px rgba(74, 111, 165, 0.2)'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = colors.secondary}
                  onMouseOut={(e) => e.target.style.backgroundColor = colors.primary}
                >
                  <AddIcon fontSize="small" style={{ marginRight: '6px' }} />
                  Adicionar Sócio
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CadastroSocios;
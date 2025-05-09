import React, { useState } from "react";
import { 
  Container, 
  Card, 
  Table, 
  Button, 
  Form, 
  Alert, 
  Badge,
  InputGroup,
  FloatingLabel,
  Row,
  Col
} from "react-bootstrap";
import { 
  Add, 
  Delete, 
  Clear,
  Groups,
  AttachMoney,
  People,
  TrendingUp,
  Work,
  Business
} from "@mui/icons-material";

const CadastroEquipes = () => {
  const [equipe, setEquipe] = useState({
    cargo: "",
    area: "",
    funcoes: "",
    salario: "",
    trabalhadores: "",
    reajuste: ""
  });
  const [equipes, setEquipes] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipe(prev => ({ ...prev, [name]: value }));
  };

  const adicionarEquipe = () => {
    if (!equipe.cargo.trim() || !equipe.area.trim()) {
      setError("Cargo e Área são campos obrigatórios");
      setSuccess("");
      return;
    }
    
    setEquipes([...equipes, equipe]);
    setEquipe({ 
      cargo: "", 
      area: "", 
      funcoes: "", 
      salario: "", 
      trabalhadores: "", 
      reajuste: "" 
    });
    setError("");
    setSuccess("Equipe cadastrada com sucesso!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarEquipe();
  };

  const removerEquipe = (index) => {
    const novoArray = [...equipes];
    novoArray.splice(index, 1);
    setEquipes(novoArray);
    setSuccess("Equipe removida com sucesso");
  };

  return (
    <Container className="my-5" style={{ maxWidth: '1200px' }}>
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
            <Groups style={{ 
              color: colors.primary, 
              marginRight: '12px',
              fontSize: '1.75rem'
            }} />
            <h4 style={{ 
              color: colors.text,
              margin: 0,
              fontWeight: 600
            }}>
              Cadastro de Equipes
            </h4>
            <Badge style={{ 
              backgroundColor: colors.background,
              color: colors.text,
              fontSize: '0.75rem',
              fontWeight: 500,
              padding: '0.35rem 0.65rem',
              marginLeft: 'auto'
            }}>
              {equipes.length} {equipes.length === 1 ? 'registro' : 'registros'}
            </Badge>
          </div>
        </Card.Header>
        
        <Card.Body style={{ padding: '1.5rem' }}>
          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible style={{
              backgroundColor: colors.error,
              color: colors.light,
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <svg style={{ marginRight: '8px' }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="white"/>
              </svg>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert variant="success" onClose={() => setSuccess("")} dismissible style={{
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
              {success}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row className="g-3 mb-4">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text style={{ 
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.border}`,
                    borderRight: 'none',
                    color: colors.textLight
                  }}>
                    <Work fontSize="small" />
                  </InputGroup.Text>
                  <FloatingLabel controlId="cargo" label="Cargo">
                    <Form.Control
                      name="cargo"
                      type="text"
                      placeholder="Cargo"
                      value={equipe.cargo}
                      onChange={handleChange}
                      style={{
                        backgroundColor: colors.light,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '0 8px 8px 0',
                        padding: '0.75rem 1rem',
                        fontSize: '0.875rem',
                        color: colors.text
                      }}
                      required
                    />
                  </FloatingLabel>
                </InputGroup>
              </Col>

              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text style={{ 
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.border}`,
                    borderRight: 'none',
                    color: colors.textLight
                  }}>
                    <Business fontSize="small" />
                  </InputGroup.Text>
                  <FloatingLabel controlId="area" label="Área">
                    <Form.Control
                      name="area"
                      type="text"
                      placeholder="Área"
                      value={equipe.area}
                      onChange={handleChange}
                      style={{
                        backgroundColor: colors.light,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '0 8px 8px 0',
                        padding: '0.75rem 1rem',
                        fontSize: '0.875rem',
                        color: colors.text
                      }}
                      required
                    />
                  </FloatingLabel>
                </InputGroup>
              </Col>

              <Col md={12}>
                <FloatingLabel controlId="funcoes" label="Funções Principais">
                  <Form.Control
                    name="funcoes"
                    as="textarea"
                    placeholder="Funções Principais"
                    value={equipe.funcoes}
                    onChange={handleChange}
                    style={{ 
                      height: '100px',
                      backgroundColor: colors.light,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      fontSize: '0.875rem',
                      color: colors.text
                    }}
                  />
                </FloatingLabel>
              </Col>

              <Col md={4}>
                <InputGroup>
                  <InputGroup.Text style={{ 
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.border}`,
                    borderRight: 'none',
                    color: colors.textLight
                  }}>
                    <AttachMoney fontSize="small" />
                  </InputGroup.Text>
                  <FloatingLabel controlId="salario" label="Salário">
                    <Form.Control
                      name="salario"
                      type="number"
                      placeholder="Salário"
                      value={equipe.salario}
                      onChange={handleChange}
                      style={{
                        backgroundColor: colors.light,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '0 8px 8px 0',
                        padding: '0.75rem 1rem',
                        fontSize: '0.875rem',
                        color: colors.text
                      }}
                    />
                  </FloatingLabel>
                </InputGroup>
              </Col>

              <Col md={4}>
                <InputGroup>
                  <InputGroup.Text style={{ 
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.border}`,
                    borderRight: 'none',
                    color: colors.textLight
                  }}>
                    <People fontSize="small" />
                  </InputGroup.Text>
                  <FloatingLabel controlId="trabalhadores" label="Quantidade de Trabalhadores">
                    <Form.Control
                      name="trabalhadores"
                      type="number"
                      placeholder="Quantidade"
                      value={equipe.trabalhadores}
                      onChange={handleChange}
                      style={{
                        backgroundColor: colors.light,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '0 8px 8px 0',
                        padding: '0.75rem 1rem',
                        fontSize: '0.875rem',
                        color: colors.text
                      }}
                    />
                  </FloatingLabel>
                </InputGroup>
              </Col>

              <Col md={4}>
                <InputGroup>
                  <InputGroup.Text style={{ 
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.border}`,
                    borderRight: 'none',
                    color: colors.textLight
                  }}>
                    <TrendingUp fontSize="small" />
                  </InputGroup.Text>
                  <FloatingLabel controlId="reajuste" label="Reajuste Anual (%)">
                    <Form.Control
                      name="reajuste"
                      type="number"
                      placeholder="Reajuste"
                      value={equipe.reajuste}
                      onChange={handleChange}
                      style={{
                        backgroundColor: colors.light,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '0 8px 8px 0',
                        padding: '0.75rem 1rem',
                        fontSize: '0.875rem',
                        color: colors.text
                      }}
                    />
                  </FloatingLabel>
                </InputGroup>
              </Col>
            </Row>

            <div className="d-flex gap-2 mb-4">
              <Button 
                variant="primary" 
                type="submit" 
                style={{
                  backgroundColor: colors.primary,
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.625rem 1.5rem',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: '0 2px 8px rgba(74, 111, 165, 0.2)'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = colors.secondary}
                onMouseOut={(e) => e.target.style.backgroundColor = colors.primary}
              >
                <Add style={{ fontSize: '1rem', marginRight: '6px' }} /> 
                Adicionar Equipe
              </Button>
              <Button 
                variant="outline-secondary" 
                onClick={() => setEquipe({ 
                  cargo: "", 
                  area: "", 
                  funcoes: "", 
                  salario: "", 
                  trabalhadores: "", 
                  reajuste: "" 
                })}
                disabled={!Object.values(equipe).some(val => val)}
                style={{
                  borderRadius: '8px',
                  padding: '0.625rem 1.5rem',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  borderColor: colors.border,
                  color: colors.textLight
                }}
              >
                <Clear style={{ fontSize: '1rem', marginRight: '6px' }} /> 
                Limpar
              </Button>
            </div>
          </Form>

          {equipes.length > 0 ? (
            <div className="table-responsive">
              <Table hover style={{ 
                marginBottom: 0,
                borderColor: colors.border
              }}>
                <thead>
                  <tr style={{ 
                    backgroundColor: colors.background,
                    color: colors.text
                  }}>
                    <th style={{ 
                      width: '5%',
                      padding: '0.75rem 1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>#</th>
                    <th style={{ 
                      width: '20%',
                      padding: '0.75rem 1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Cargo</th>
                    <th style={{ 
                      width: '15%',
                      padding: '0.75rem 1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Área</th>
                    <th style={{ 
                      padding: '0.75rem 1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Funções</th>
                    <th style={{ 
                      width: '10%',
                      padding: '0.75rem 1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Salário</th>
                    <th style={{ 
                      width: '10%',
                      padding: '0.75rem 1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Qtd.</th>
                    <th style={{ 
                      width: '10%',
                      padding: '0.75rem 1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Reajuste</th>
                    <th style={{ 
                      width: '10%',
                      padding: '0.75rem 1rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {equipes.map((eq, index) => (
                    <tr key={index} style={{ 
                      borderBottom: `1px solid ${colors.border}`,
                      transition: 'background-color 0.2s ease'
                    }}>
                      <td style={{ 
                        padding: '1rem',
                        color: colors.textLight,
                        fontSize: '0.875rem'
                      }}>{index + 1}</td>
                      <td style={{ 
                        padding: '1rem',
                        fontWeight: 500,
                        color: colors.text,
                        fontSize: '0.875rem'
                      }}>{eq.cargo}</td>
                      <td style={{ 
                        padding: '1rem',
                        color: colors.text,
                        fontSize: '0.875rem'
                      }}>{eq.area}</td>
                      <td style={{ 
                        padding: '1rem',
                        color: colors.textLight,
                        fontSize: '0.875rem'
                      }}>{eq.funcoes || "-"}</td>
                      <td style={{ 
                        padding: '1rem',
                        color: colors.success,
                        fontWeight: 500,
                        fontSize: '0.875rem'
                      }}>{eq.salario ? `R$ ${parseFloat(eq.salario).toLocaleString('pt-BR')}` : "-"}</td>
                      <td style={{ 
                        padding: '1rem',
                        color: colors.text,
                        fontSize: '0.875rem'
                      }}>{eq.trabalhadores || "-"}</td>
                      <td style={{ 
                        padding: '1rem',
                        color: eq.reajuste ? colors.primary : colors.textLight,
                        fontWeight: eq.reajuste ? 500 : 'normal',
                        fontSize: '0.875rem'
                      }}>
                        {eq.reajuste ? `${eq.reajuste}%` : "-"}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => removerEquipe(index)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '6px',
                            padding: '0.25rem 0.5rem',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            borderColor: '#fee2e2',
                            color: '#dc2626',
                            backgroundColor: '#fef2f2',
                            width: '100%'
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
                          <Delete style={{ fontSize: '0.875rem' }} /> 
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-5" style={{ 
              backgroundColor: colors.background,
              borderRadius: '8px'
            }}>
              <Groups style={{ 
                color: colors.border,
                fontSize: '3.5rem',
                marginBottom: '1rem'
              }} />
              <p style={{ 
                color: colors.textLight,
                margin: 0,
                fontSize: '0.875rem'
              }}>
                Nenhuma equipe cadastrada
              </p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CadastroEquipes;
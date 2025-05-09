import React, { useState } from 'react';
import { Container, Card, Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
import { TextField } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventIcon from '@mui/icons-material/Event';
import StarsIcon from '@mui/icons-material/Stars';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ComputerIcon from '@mui/icons-material/Computer';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CadastroDiretrizesEmpresa = () => {
  
  const colors = {
    primary: '#1976d2', 
    secondary: '#f5f5f5', 
    accent: '#64b5f6', 
    light: '#ffffff', 
    background: '#fafafa', 
    text: '#424242',
    success: '#4caf50', 
    error: '#f44336'  
  };

  const [editMode, setEditMode] = useState(true);
  const [success, setSuccess] = useState(false);

  const [empresa, setEmpresa] = useState({
    nome: 'LUZ Planilhas',
    anoInicial: '2022',
    mesInicial: 'Março',
    anosAnalisados: '10',
    missoes: [''],
    visoes: [''],
    valores: ['']
  });

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresa({ ...empresa, [name]: value });
  };

  const handleArrayChange = (arrayName, index, value) => {
    const newArray = [...empresa[arrayName]];
    newArray[index] = value;
    setEmpresa({ ...empresa, [arrayName]: newArray });
  };

  const addArrayItem = (arrayName) => {
    setEmpresa({ ...empresa, [arrayName]: [...empresa[arrayName], ''] });
  };

  const removeArrayItem = (arrayName, index) => {
    const newArray = [...empresa[arrayName]];
    newArray.splice(index, 1);
    setEmpresa({ ...empresa, [arrayName]: newArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação básica
    if (!empresa.nome || !empresa.anoInicial || !empresa.mesInicial) {
      alert('Preencha os campos obrigatórios');
      return;
    }
    
    console.log('Dados salvos:', empresa);
    setEditMode(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };
  const renderViewItems = (items, icon) => (
    <ListGroup variant="flush">
      {items.map((item, index) => (
        item && (
          <ListGroup.Item key={index} style={{ 
            borderLeft: 'none',
            borderRight: 'none',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            paddingLeft: '0',
            backgroundColor: colors.light
          }}>
            {React.cloneElement(icon, { style: { color: colors.primary } })}
            <span style={{ color: colors.text }}>{item}</span>
          </ListGroup.Item>
        )
      ))}
      {items.length === 0 || items.every(item => !item) && (
        <ListGroup.Item style={{ 
          color: '#9e9e9e', 
          fontStyle: 'italic',
          backgroundColor: colors.light
        }}>
          Nenhum item cadastrado
        </ListGroup.Item>
      )}
    </ListGroup>
  );

  const renderEditItems = (arrayName, label, icon) => (
    <div>
      {empresa[arrayName].map((item, index) => (
        <div key={index} style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px'
        }}>
          {React.cloneElement(icon, { style: { color: colors.primary } })}
          
          <TextField
            fullWidth
            label={`${label} ${index + 1}`}
            value={item}
            onChange={(e) => handleArrayChange(arrayName, index, e.target.value)}
            size="small"
            margin="dense"
            InputProps={{
              style: {
                backgroundColor: colors.light,
                borderRadius: '6px'
              }
            }}
          />
          
          {empresa[arrayName].length > 1 && (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => removeArrayItem(arrayName, index)}
              style={{
                minWidth: '32px',
                padding: '0',
                borderColor: '#e0e0e0'
              }}
            >
              <RemoveIcon fontSize="small" style={{ color: colors.error }} />
            </Button>
          )}
        </div>
      ))}
      
      <Button
        variant="outlined"
        size="sm"
        onClick={() => addArrayItem(arrayName)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginTop: '8px',
          borderColor: colors.primary,
          color: colors.primary
        }}
      >
        <AddIcon fontSize="small" />
        Adicionar {label}
      </Button>
    </div>
  );

  return (
    <Container className="mt-4" style={{ maxWidth: '800px' }}>
      <Card className="border-0" style={{ 
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: colors.light
      }}>
        <Card.Header style={{ 
          backgroundColor: colors.light,
          borderBottom: `1px solid ${colors.secondary}`,
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div className="d-flex align-items-center">
            <BusinessIcon style={{ color: colors.primary, marginRight: '12px' }} fontSize="medium" />
            <h4 style={{ 
              color: colors.primary,
              margin: 0,
              fontWeight: 500,
              letterSpacing: '0.5px'
            }}>
              {editMode ? 'Cadastro de Diretrizes' : 'Dados sobre a empresa'}
            </h4>
          </div>
          
          {!editMode && (
            <Button 
              variant="outlined"
              size="sm"
              onClick={() => setEditMode(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderColor: colors.primary,
                color: colors.primary
              }}
            >
              <EditIcon fontSize="small" /> Editar
            </Button>
          )}
        </Card.Header>
        
        <Card.Body style={{ 
          backgroundColor: colors.background,
          padding: '1.5rem'
        }}>
          {success && (
            <div style={{
              backgroundColor: colors.success,
              color: colors.light,
              padding: '0.75rem 1rem',
              marginBottom: '1.5rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <SaveIcon fontSize="small" />
              Dados salvos com sucesso!
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            <div style={{ 
              backgroundColor: colors.light,
              borderRadius: '8px',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
              border: `1px solid ${colors.secondary}`
            }}>
              <h5 style={{ 
                color: colors.primary,
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <BusinessIcon fontSize="small" />
                Informações Básicas
              </h5>
              
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
                    disabled={!editMode}
                    InputProps={{
                      style: {
                        backgroundColor: editMode ? colors.light : colors.background,
                        borderRadius: '6px'
                      }
                    }}
                  />
                </Col>
                
                <Col md={3}>
                  <TextField
                    fullWidth
                    label="Ano Inicial *"
                    name="anoInicial"
                    value={empresa.anoInicial}
                    onChange={handleChange}
                    size="small"
                    margin="dense"
                    type="number"
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: !editMode && (
                        <CalendarTodayIcon fontSize="small" style={{ color: colors.primary }} />
                      ),
                      style: {
                        backgroundColor: editMode ? colors.light : colors.background,
                        borderRadius: '6px'
                      }
                    }}
                  />
                </Col>
                
                <Col md={3}>
                  {editMode ? (
                    <Form.Group controlId="mesInicial">
                      <Form.Label style={{ 
                        color: '#9e9e9e',
                        fontSize: '0.875rem',
                        marginBottom: '0.25rem'
                      }}>
                        Mês Inicial *
                      </Form.Label>
                      <Form.Select
                        name="mesInicial"
                        value={empresa.mesInicial}
                        onChange={handleChange}
                        style={{
                          backgroundColor: colors.light,
                          borderRadius: '6px',
                          fontSize: '0.875rem',
                          borderColor: '#e0e0e0'
                        }}
                      >
                        <option value="">Selecione</option>
                        {meses.map((mes, index) => (
                          <option key={index} value={mes}>{mes}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  ) : (
                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ 
                        color: '#9e9e9e',
                        fontSize: '0.875rem',
                        marginBottom: '0.25rem'
                      }}>Mês Inicial</p>
                      <p style={{ 
                        color: colors.text,
                        fontSize: '1rem',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <EventIcon fontSize="small" style={{ color: colors.primary }} />
                        {empresa.mesInicial}
                      </p>
                    </div>
                  )}
                </Col>
                
                <Col md={12}>
                  <TextField
                    fullWidth
                    label="Anos Analisados"
                    name="anosAnalisados"
                    value={empresa.anosAnalisados}
                    onChange={handleChange}
                    size="small"
                    margin="dense"
                    type="number"
                    disabled={!editMode}
                    InputProps={{
                      style: {
                        backgroundColor: editMode ? colors.light : colors.background,
                        borderRadius: '6px'
                      }
                    }}
                  />
                </Col>
              </Row>
            </div>
            
            <div style={{ 
              backgroundColor: colors.light,
              borderRadius: '8px',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
              border: `1px solid ${colors.secondary}`
            }}>
              <h5 style={{ 
                color: colors.primary,
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <StarsIcon fontSize="small" style={{ color: colors.primary }} />
                Missões
              </h5>
              
              {editMode ? (
                renderEditItems('missoes', 'Missão', <StarsIcon fontSize="small" />)
              ) : (
                renderViewItems(empresa.missoes, <StarsIcon fontSize="small" />)
              )}
            </div>
            
            <div style={{ 
              backgroundColor: colors.light,
              borderRadius: '8px',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
              border: `1px solid ${colors.secondary}`
            }}>
              <h5 style={{ 
                color: colors.primary,
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <VisibilityIcon fontSize="small" style={{ color: colors.primary }} />
                Visões
              </h5>
              
              {editMode ? (
                renderEditItems('visoes', 'Visão', <VisibilityIcon fontSize="small" />)
              ) : (
                renderViewItems(empresa.visoes, <VisibilityIcon fontSize="small" />)
              )}
            </div>
            <div style={{ 
              backgroundColor: colors.light,
              borderRadius: '8px',
              padding: '1.25rem',
              boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
              border: `1px solid ${colors.secondary}`
            }}>
              <h5 style={{ 
                color: colors.primary,
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <EmojiObjectsIcon fontSize="small" style={{ color: colors.primary }} />
                Valores
              </h5>
              
              {editMode ? (
                renderEditItems('valores', 'Valor', <ComputerIcon fontSize="small" />)
              ) : (
                renderViewItems(empresa.valores, <ComputerIcon fontSize="small" />)
              )}
            </div>
            
            {editMode && (
              <div className="d-flex justify-content-end mt-4">
                <Button 
                  variant="outlined"
                  onClick={() => setEditMode(false)}
                  style={{
                    marginRight: '12px',
                    borderColor: '#e0e0e0',
                    color: colors.text,
                    borderRadius: '6px',
                    padding: '0.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  Cancelar
                </Button>
                
                <Button 
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: colors.primary,
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <SaveIcon fontSize="small" />
                  Salvar Diretrizes
                </Button>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CadastroDiretrizesEmpresa;
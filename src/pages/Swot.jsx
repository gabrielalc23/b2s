import React, { useState } from 'react';
import { Container, Card, Table, Form, Button } from 'react-bootstrap';
import { 
  AddCircleOutline,
  RemoveCircleOutline
} from '@mui/icons-material';

const AnaliseSWOT = () => {
  const colors = {
    primary: '#64B5F6',       
    secondary: '#FAFAFA',     
    accent: '#90CAF9',        
    light: '#FFFFFF',         
    background: '#F5F5F5',    
    text: '#424242',          
    success: '#A5D6A7',       
    warning: '#FFCC80',       
    error: '#EF9A9A',         
    white: '#FFFFFF',         
    black: '#212121',         
    forca: '#C8E6C9',         
    fraqueza: '#FFCDD2',      
    oportunidade: '#BBDEFB',  
    ameaca: '#FFE0B2',        
  };

  const opcoesClassificacao = ['Força', 'Fraqueza'];
  const opcoesImportancia = [
    'Totalmente sem importância',
    'Pouco importante',
    'Importante',
    'Muito importante',
    'Totalmente importante'
  ];

  const [forcasFraquezas, setForcasFraquezas] = useState([
    { id: 1, descricao: 'A empresa tem diferencial inovador', classificacao: 'Força', importancia: 'Totalmente sem importância', pontuacao: 0 },
    { id: 2, descricao: 'A tecnologia própria é essencial para o negócio', classificacao: 'Fraqueza', importancia: 'Totalmente importante', pontuacao: 10 },
    { id: 3, descricao: 'O produto é de qualidade', classificacao: 'Fraqueza', importancia: 'Pouco importante', pontuacao: 2.5 }
  ]);

  const [oportunidadesAmeacas, setOportunidadesAmeacas] = useState([
    { id: 1, descricao: 'Há mercados inexplorados', classificacao: 'Oportunidade', importancia: 'Muito importante', pontuacao: 7.5 },
    { id: 2, descricao: 'Possibilidade de parcerias estratégicas', classificacao: 'Oportunidade', importancia: 'Pouco importante', pontuacao: 2.5 }
  ]);

  const calcularPontuacao = (importancia) => {
    switch(importancia) {
      case 'Totalmente sem importância':
        return 0;
      case 'Pouco importante':
        return 2.5;
      case 'Importante':
        return 5;
      case 'Muito importante':
        return 7.5;
      case 'Totalmente importante':
        return 10;
      default:
        return 0;
    }
  };

  const getClassificacaoStyle = (classificacao) => {
    switch(classificacao) {
      case 'Força':
        return { 
          backgroundColor: colors.forca, 
          color: '#2E7D32', 
          border: `1px solid ${colors.forca}`
        };
      case 'Fraqueza':
        return { 
          backgroundColor: colors.fraqueza, 
          color: '#C62828', 
          border: `1px solid ${colors.fraqueza}`
        };
      case 'Oportunidade':
        return { 
          backgroundColor: colors.oportunidade, 
          color: '#1565C0', 
          border: `1px solid ${colors.oportunidade}`
        };
      case 'Ameaça':
        return { 
          backgroundColor: colors.ameaca, 
          color: '#E65100',
          border: `1px solid ${colors.ameaca}`
        };
      default:
        return { backgroundColor: 'transparent' };
    }
  };

  const getImportanciaStyle = (importancia) => {
    switch(importancia) {
      case 'Totalmente sem importância':
        return { 
          backgroundColor: '#FFEBEE', 
          color: colors.text,
          border: '1px solid #EF9A9A'
        };
      case 'Pouco importante':
        return { 
          backgroundColor: '#FFF8E1', 
          color: colors.text,
          border: '1px solid #FFE082'
        };
      case 'Importante':
        return { 
          backgroundColor: colors.light, 
          color: colors.text, 
          border: `1px solid ${colors.secondary}` 
        };
      case 'Muito importante':
        return { 
          backgroundColor: '#E3F2FD', 
          color: colors.text,
          border: '1px solid #90CAF9'
        };
      case 'Totalmente importante':
        return { 
          backgroundColor: '#E1F5FE', 
          color: colors.text,
          border: '1px solid #4FC3F7'
        };
      default:
        return { backgroundColor: 'transparent' };
    }
  };

  const getPontuacaoStyle = (pontuacao) => {
    const num = parseFloat(pontuacao);
    if (isNaN(num)) return { color: colors.text };
    
    if (num >= 8) return { color: '#388E3C', fontWeight: 'bold' }; 
    if (num >= 5) return { color: '#F57C00', fontWeight: 'bold' }; 
    return { color: '#D32F2F', fontWeight: 'bold' };               
  };

  const adicionarItem = (lista, setLista, tipo) => {
    const novoId = lista.length > 0 ? Math.max(...lista.map(item => item.id)) + 1 : 1;
    const novoItem = {
      id: novoId,
      descricao: '',
      classificacao: tipo === 'forcas' ? 'Força' : tipo === 'oportunidades' ? 'Oportunidade' : 'Ameaça',
      importancia: 'Importante',
      pontuacao: 5
    };
    setLista([...lista, novoItem]);
  };

  const removerItem = (lista, setLista, id) => {
    setLista(lista.filter(item => item.id !== id));
  };

  const atualizarItem = (lista, setLista, id, campo, valor) => {
    setLista(lista.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [campo]: valor };
        if (campo === 'importancia') {
          updatedItem.pontuacao = calcularPontuacao(valor);
        }
        return updatedItem;
      }
      return item;
    }));
  };

  return (
    <Container className="mt-4" style={{ 
      maxWidth: '1200px',
      backgroundColor: colors.background,
      padding: '20px',
      borderRadius: '8px'
    }}>
      <h2 style={{ 
        color: colors.primary,
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        Análise SWOT
      </h2>

      <Card className="mb-4" style={{ 
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
        backgroundColor: colors.light
      }}>
        <Card.Header style={{ 
          backgroundColor: colors.light,
          borderBottom: `1px solid ${colors.secondary}`,
          padding: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h4 style={{ margin: 0, color: colors.primary }}>Forças e Fraquezas</h4>
          <Button 
            variant="outlined"
            onClick={() => adicionarItem(forcasFraquezas, setForcasFraquezas, 'forcas')}
            style={{ 
              borderColor: colors.forca,
              color: colors.forca,
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: 'transparent'
            }}
          >
            <AddCircleOutline /> Adicionar
          </Button>
        </Card.Header>
        <Card.Body style={{ padding: 0 }}>
          <Table bordered hover responsive style={{ marginBottom: 0, borderColor: colors.secondary }}>
            <thead>
              <tr>
                <th style={{ width: '50%', backgroundColor: colors.secondary, borderColor: colors.secondary }}>Descrição</th>
                <th style={{ width: '15%', backgroundColor: colors.secondary, borderColor: colors.secondary }}>Classificação</th>
                <th style={{ width: '20%', backgroundColor: colors.secondary, borderColor: colors.secondary }}>Importância</th>
                <th style={{ width: '10%', backgroundColor: colors.secondary, borderColor: colors.secondary }}>Pontuação</th>
                <th style={{ width: '5%', backgroundColor: colors.secondary, borderColor: colors.secondary }}></th>
              </tr>
            </thead>
            <tbody>
              {forcasFraquezas.map((item) => (
                <tr key={item.id}>
                  <td style={{ backgroundColor: colors.light, borderColor: colors.secondary }}>
                    <Form.Control
                      type="text"
                      value={item.descricao}
                      onChange={(e) => atualizarItem(forcasFraquezas, setForcasFraquezas, item.id, 'descricao', e.target.value)}
                      style={{ 
                        border: 'none', 
                        backgroundColor: 'transparent',
                        boxShadow: 'none'
                      }}
                    />
                  </td>
                  <td style={{ ...getClassificacaoStyle(item.classificacao), borderColor: colors.secondary }}>
                    <Form.Select
                      value={item.classificacao}
                      onChange={(e) => atualizarItem(forcasFraquezas, setForcasFraquezas, item.id, 'classificacao', e.target.value)}
                      style={{ 
                        ...getClassificacaoStyle(item.classificacao),
                        border: 'none',
                        padding: '5px',
                        boxShadow: 'none'
                      }}
                    >
                      {opcoesClassificacao.map((opcao, index) => (
                        <option key={index} value={opcao} style={getClassificacaoStyle(opcao)}>
                          {opcao}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  <td style={{ ...getImportanciaStyle(item.importancia), borderColor: colors.secondary }}>
                    <Form.Select
                      value={item.importancia}
                      onChange={(e) => atualizarItem(forcasFraquezas, setForcasFraquezas, item.id, 'importancia', e.target.value)}
                      style={{ 
                        ...getImportanciaStyle(item.importancia),
                        border: 'none',
                        padding: '5px',
                        boxShadow: 'none'
                      }}
                    >
                      {opcoesImportancia.map((opcao, index) => (
                        <option key={index} value={opcao} style={getImportanciaStyle(opcao)}>
                          {opcao}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  <td style={{ 
                    ...getPontuacaoStyle(item.pontuacao),
                    backgroundColor: colors.light,
                    textAlign: 'center',
                    borderColor: colors.secondary
                  }}>
                    {item.pontuacao.toFixed(1)}
                  </td>
                  <td style={{ 
                    textAlign: 'center',
                    backgroundColor: colors.light,
                    borderColor: colors.secondary
                  }}>
                    <Button
                      variant="outlined"
                      onClick={() => removerItem(forcasFraquezas, setForcasFraquezas, item.id)}
                      style={{ 
                        padding: '5px',
                        borderColor: colors.secondary,
                        color: colors.error,
                        backgroundColor: 'transparent'
                      }}
                    >
                      <RemoveCircleOutline />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Oportunidades e Ameaças */}
      <Card style={{ 
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
        backgroundColor: colors.light
      }}>
        <Card.Header style={{ 
          backgroundColor: colors.light,
          borderBottom: `1px solid ${colors.secondary}`,
          padding: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h4 style={{ margin: 0, color: colors.primary }}>Oportunidades e Ameaças</h4>
          <Button 
            variant="outlined"
            onClick={() => adicionarItem(oportunidadesAmeacas, setOportunidadesAmeacas, 'oportunidades')}
            style={{ 
              borderColor: colors.oportunidade,
              color: colors.oportunidade,
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: 'transparent'
            }}
          >
            <AddCircleOutline /> Adicionar
          </Button>
        </Card.Header>
        <Card.Body style={{ padding: 0 }}>
          <Table bordered hover responsive style={{ marginBottom: 0, borderColor: colors.secondary }}>
            <thead>
              <tr>
                <th style={{ width: '50%', backgroundColor: colors.secondary, borderColor: colors.secondary }}>Descrição</th>
                <th style={{ width: '15%', backgroundColor: colors.secondary, borderColor: colors.secondary }}>Classificação</th>
                <th style={{ width: '20%', backgroundColor: colors.secondary, borderColor: colors.secondary }}>Importância</th>
                <th style={{ width: '10%', backgroundColor: colors.secondary, borderColor: colors.secondary }}>Pontuação</th>
                <th style={{ width: '5%', backgroundColor: colors.secondary, borderColor: colors.secondary }}></th>
              </tr>
            </thead>
            <tbody>
              {oportunidadesAmeacas.map((item) => (
                <tr key={item.id}>
                  <td style={{ backgroundColor: colors.light, borderColor: colors.secondary }}>
                    <Form.Control
                      type="text"
                      value={item.descricao}
                      onChange={(e) => atualizarItem(oportunidadesAmeacas, setOportunidadesAmeacas, item.id, 'descricao', e.target.value)}
                      style={{ 
                        border: 'none', 
                        backgroundColor: 'transparent',
                        boxShadow: 'none'
                      }}
                    />
                  </td>
                  <td style={{ ...getClassificacaoStyle(item.classificacao), borderColor: colors.secondary }}>
                    <Form.Select
                      value={item.classificacao}
                      onChange={(e) => atualizarItem(oportunidadesAmeacas, setOportunidadesAmeacas, item.id, 'classificacao', e.target.value)}
                      style={{ 
                        ...getClassificacaoStyle(item.classificacao),
                        border: 'none',
                        padding: '5px',
                        boxShadow: 'none'
                      }}
                    >
                      <option value="Oportunidade" style={getClassificacaoStyle('Oportunidade')}>Oportunidade</option>
                      <option value="Ameaça" style={getClassificacaoStyle('Ameaça')}>Ameaça</option>
                    </Form.Select>
                  </td>
                  <td style={{ ...getImportanciaStyle(item.importancia), borderColor: colors.secondary }}>
                    <Form.Select
                      value={item.importancia}
                      onChange={(e) => atualizarItem(oportunidadesAmeacas, setOportunidadesAmeacas, item.id, 'importancia', e.target.value)}
                      style={{ 
                        ...getImportanciaStyle(item.importancia),
                        border: 'none',
                        padding: '5px',
                        boxShadow: 'none'
                      }}
                    >
                      {opcoesImportancia.map((opcao, index) => (
                        <option key={index} value={opcao} style={getImportanciaStyle(opcao)}>
                          {opcao}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  <td style={{ 
                    ...getPontuacaoStyle(item.pontuacao),
                    backgroundColor: colors.light,
                    textAlign: 'center',
                    borderColor: colors.secondary
                  }}>
                    {item.pontuacao.toFixed(1)}
                  </td>
                  <td style={{ 
                    textAlign: 'center',
                    backgroundColor: colors.light,
                    borderColor: colors.secondary
                  }}>
                    <Button
                      variant="outlined"
                      onClick={() => removerItem(oportunidadesAmeacas, setOportunidadesAmeacas, item.id)}
                      style={{ 
                        padding: '5px',
                        borderColor: colors.secondary,
                        color: colors.error,
                        backgroundColor: 'transparent'
                      }}
                    >
                      <RemoveCircleOutline />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AnaliseSWOT;
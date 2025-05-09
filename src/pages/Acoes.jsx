import React, { useState } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import { 
  AddCircleOutline,
  RemoveCircleOutline,
  CheckCircleOutline,
  HourglassEmpty,
  ErrorOutline,
  PlayCircleOutline,
  DoneAll
} from '@mui/icons-material';

const MetasPlanosAcao = () => {
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
    black: '#212121'
  };

  const opcoesStatus = [
    'Não Iniciado',
    'Em Andamento',
    'Concluído no Prazo',
    'Concluído com Atraso',
    'Não Concluído'
  ];

  const [metas, setMetas] = useState([
    { 
      id: 1,
      meta: 'Meta 1', 
      planoAcao: 'Ação 1', 
      responsavel: 'Rafael', 
      inicio: '2022-01-10', 
      fim: '2022-01-20', 
      status: 'Concluído no Prazo' 
    },
    { 
      id: 2,
      meta: 'Meta 2', 
      planoAcao: 'Ação 2', 
      responsavel: 'Rafael', 
      inicio: '2022-02-20', 
      fim: '', 
      status: 'Não Concluído' 
    },
    { 
      id: 3,
      meta: 'Meta 3', 
      planoAcao: 'Ação 3', 
      responsavel: 'Rafael', 
      inicio: '2022-03-30', 
      fim: '', 
      status: 'Em Andamento' 
    }
  ]);

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Concluído no Prazo':
        return { 
          backgroundColor: '#E8F5E9', 
          color: '#2E7D32',
          border: '1px solid #C8E6C9'
        };
      case 'Em Andamento':
        return { 
          backgroundColor: '#FFF3E0', 
          color: '#EF6C00',
          border: '1px solid #FFE0B2'
        };
      case 'Não Concluído':
        return { 
          backgroundColor: '#FFEBEE', 
          color: '#C62828',
          border: '1px solid #FFCDD2'
        };
      case 'Concluído com Atraso':
        return { 
          backgroundColor: '#FCE4EC', 
          color: '#AD1457',
          border: '1px solid #F8BBD0'
        };
      case 'Não Iniciado':
        return { 
          backgroundColor: '#E3F2FD', 
          color: '#1565C0',
          border: '1px solid #BBDEFB'
        };
      default:
        return { backgroundColor: colors.light };
    }
  };
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Concluído no Prazo':
        return <CheckCircleOutline style={{ color: '#2E7D32', fontSize: '1.2rem' }} />;
      case 'Em Andamento':
        return <HourglassEmpty style={{ color: '#EF6C00', fontSize: '1.2rem' }} />;
      case 'Não Concluído':
        return <ErrorOutline style={{ color: '#C62828', fontSize: '1.2rem' }} />;
      case 'Concluído com Atraso':
        return <DoneAll style={{ color: '#AD1457', fontSize: '1.2rem' }} />;
      case 'Não Iniciado':
        return <PlayCircleOutline style={{ color: '#1565C0', fontSize: '1.2rem' }} />;
      default:
        return null;
    }
  };

  const adicionarMeta = () => {
    const novoId = metas.length > 0 ? Math.max(...metas.map(item => item.id)) + 1 : 1;
    const novaMeta = {
      id: novoId,
      meta: '',
      planoAcao: '',
      responsavel: '',
      inicio: '',
      fim: '',
      status: 'Não Iniciado'
    };
    setMetas([...metas, novaMeta]);
  };

  const removerMeta = (id) => {
    setMetas(metas.filter(item => item.id !== id));
  };

  const atualizarMeta = (id, campo, valor) => {
    setMetas(metas.map(item => {
      if (item.id === id) {
        return { ...item, [campo]: valor };
      }
      return item;
    }));
  };

  return (
    <Container className="mt-4" style={{ 
      maxWidth: '1400px', 
      backgroundColor: colors.background,
      padding: '20px',
      borderRadius: '8px',
      marginLeft: '370px',

    }}>
      <h2 style={{ 
        color: colors.primary,
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        Metas e Planos de Ação
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <Table bordered hover responsive style={{ 
          backgroundColor: colors.light,
          borderColor: colors.secondary,
          marginBottom: '20px',
          minWidth: '1200px' 
        }}>
          <thead>
            <tr>
              <th style={{ width: '20%', backgroundColor: colors.secondary, borderColor: colors.secondary }}>Meta</th>
              <th style={{ width: '20%', backgroundColor: colors.secondary, borderColor: colors.secondary }}>Plano de Ação</th>
              <th style={{ width: '15%', backgroundColor: colors.secondary, borderColor: colors.secondary }}>Responsável</th>
              <th style={{ width: '10%', backgroundColor: colors.secondary, borderColor: colors.secondary }}>Início</th>
              <th style={{ width: '10%', backgroundColor: colors.secondary, borderColor: colors.secondary }}>Fim</th>
              <th style={{ width: '20%', backgroundColor: colors.secondary, borderColor: colors.secondary }}>Status</th>
              <th style={{ width: '5%', backgroundColor: colors.secondary, borderColor: colors.secondary }}></th>
            </tr>
          </thead>
          <tbody>
            {metas.map((item) => (
              <tr key={item.id}>
                <td style={{ backgroundColor: colors.light, borderColor: colors.secondary }}>
                  <Form.Control
                    type="text"
                    value={item.meta}
                    onChange={(e) => atualizarMeta(item.id, 'meta', e.target.value)}
                    style={{ 
                      border: 'none', 
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                      width: '100%'
                    }}
                  />
                </td>
                <td style={{ backgroundColor: colors.light, borderColor: colors.secondary }}>
                  <Form.Control
                    type="text"
                    value={item.planoAcao}
                    onChange={(e) => atualizarMeta(item.id, 'planoAcao', e.target.value)}
                    style={{ 
                      border: 'none', 
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                      width: '100%'
                    }}
                  />
                </td>
                <td style={{ backgroundColor: colors.light, borderColor: colors.secondary }}>
                  <Form.Control
                    type="text"
                    value={item.responsavel}
                    onChange={(e) => atualizarMeta(item.id, 'responsavel', e.target.value)}
                    style={{ 
                      border: 'none', 
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                      width: '100%'
                    }}
                  />
                </td>
                <td style={{ backgroundColor: colors.light, borderColor: colors.secondary }}>
                  <Form.Control
                    type="date"
                    value={item.inicio}
                    onChange={(e) => atualizarMeta(item.id, 'inicio', e.target.value)}
                    style={{ 
                      border: 'none', 
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                      width: '100%'
                    }}
                  />
                </td>
                <td style={{ backgroundColor: colors.light, borderColor: colors.secondary }}>
                  <Form.Control
                    type="date"
                    value={item.fim}
                    onChange={(e) => atualizarMeta(item.id, 'fim', e.target.value)}
                    style={{ 
                      border: 'none', 
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                      width: '100%'
                    }}
                  />
                </td>
                <td style={{ ...getStatusStyle(item.status), borderColor: colors.secondary }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {getStatusIcon(item.status)}
                    <Form.Select
                      value={item.status}
                      onChange={(e) => atualizarMeta(item.id, 'status', e.target.value)}
                      style={{ 
                        ...getStatusStyle(item.status),
                        border: 'none',
                        padding: '5px',
                        boxShadow: 'none',
                        flex: 1,
                        width: '100%'
                      }}
                    >
                      {opcoesStatus.map((opcao, index) => (
                        <option key={index} value={opcao} style={getStatusStyle(opcao)}>
                          {opcao}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </td>
                <td style={{ 
                  textAlign: 'center',
                  backgroundColor: colors.light,
                  borderColor: colors.secondary
                }}>
                  <Button
                    variant="outlined"
                    onClick={() => removerMeta(item.id)}
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
      </div>

      <div className="text-center">
        <Button 
          variant="outlined"
          onClick={adicionarMeta}
          style={{ 
            borderColor: colors.primary,
            color: colors.primary,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'transparent'
          }}
        >
          <AddCircleOutline /> Adicionar Meta
        </Button>
      </div>
    </Container>
  );
};

export default MetasPlanosAcao;
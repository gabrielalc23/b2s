import React, { useState } from 'react';
import { Container, Card, Button, Table, Form, Collapse, Modal } from 'react-bootstrap';
import { 
  Business,
  People,
  LocalShipping,
  Store,
  SwapHoriz,
  Add,
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Assessment,
  BarChart,
  ShowChart,
  TrendingUp,
  PieChart,
  Money,
  ShoppingCart,
  Work,
  Public,
  Star
} from '@mui/icons-material';

const AnaliseConcorrencia = () => {
  const colors = {
    primary: '#1976d2',       
    secondary: '#f5f5f5',     
    accent: '#64b5f6',        
    light: '#ffffff',
    background: '#fafafa',    
    text: '#424242',          
    success: '#81C784',       
    warning: '#FFB74D',       
    error: '#E57373',         
    white: '#ffffff',
    black: '#212121'
  };

  const iconesDisponiveis = [
    { nome: 'Business', componente: <Business /> },
    { nome: 'People', componente: <People /> },
    { nome: 'LocalShipping', componente: <LocalShipping /> },
    { nome: 'Store', componente: <Store /> },
    { nome: 'SwapHoriz', componente: <SwapHoriz /> },
    { nome: 'Assessment', componente: <Assessment /> },
    { nome: 'BarChart', componente: <BarChart /> },
    { nome: 'ShowChart', componente: <ShowChart /> },
    { nome: 'TrendingUp', componente: <TrendingUp /> },
    { nome: 'PieChart', componente: <PieChart /> },
    { nome: 'Money', componente: <Money /> },
    { nome: 'ShoppingCart', componente: <ShoppingCart /> },
    { nome: 'Work', componente: <Work /> },
    { nome: 'Public', componente: <Public /> },
    { nome: 'Star', componente: <Star /> }
  ];

  const opcoesResposta = [
    'Concordo Totalmente',
    'Concordo Parcialmente',
    'Não concordo e nem discordo',
    'Discordo Parcialmente',
    'Discordo Totalmente'
  ];

  const opcoesImportancia = [
    'Muito importante',
    'Importante',
    'Sem importância'
  ];

  const [showModal, setShowModal] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [iconeSelecionado, setIconeSelecionado] = useState(iconesDisponiveis[0]);

  const [tabelas, setTabelas] = useState([
    {
      id: 1,
      titulo: 'Poder de negociação dos fornecedores',
      icone: <LocalShipping style={{ fontSize: '1.5rem', color: colors.primary }} />,
      perguntas: [
        { id: 1, texto: 'Existem poucos fornecedores para os insumos do seu negócio?', resposta: 'Discordo Totalmente', importancia: 'Muito importante', pontuacao: 8 },
        { id: 2, texto: 'O preço dos insumos necessários para o seu negócio varia fortemente?', resposta: 'Não concordo e nem discordo', importancia: 'Importante', pontuacao: 6.5 },
        { id: 3, texto: 'O perfil profissional necessário para o seu negócio é fácil de ser encontrado?', resposta: 'Discordo Totalmente', importancia: 'Muito importante', pontuacao: 8 },
        { id: 4, texto: 'Há carência de formação de profissionais para o seu mercado de fornecedores?', resposta: 'Concordo Totalmente', importancia: 'Sem importância', pontuacao: 5 },
        { id: 5, texto: 'Você tem dificuldade em substituir seus insumos por outro tipo (qualidade, preço, etc)?', resposta: 'Discordo Parcialmente', importancia: 'Importante', pontuacao: 6.25 },
        { id: 6, texto: 'Existem pesquisas para melhoria de tecnologia na área dos seus fornecedores?', resposta: 'Concordo Parcialmente', importancia: 'Sem importância', pontuacao: 3.75 }
      ],
      aberto: true
    },
    {
      id: 2,
      titulo: 'Ameaça de entrada de novos concorrentes',
      icone: <Business style={{ fontSize: '1.5rem', color: colors.primary }} />,
      perguntas: [
        { id: 1, texto: 'O custo para começar um novo negócio dentro da sua indústria é baixo?', resposta: 'Discordo Totalmente', importancia: 'Sem importância', pontuacao: 0 },
        { id: 2, texto: 'Existe espaço para mais concorrentes fora os já estabelecidos?', resposta: 'Não concordo e nem discordo', importancia: 'Importante', pontuacao: 6.5 },
        { id: 3, texto: 'A indústria é de pequena escala?', resposta: 'Discordo Totalmente', importancia: 'Muito importante', pontuacao: 8 },
        { id: 4, texto: 'Os custos de troca para os clientes são baixos?', resposta: 'Discordo Totalmente', importancia: 'Sem importância', pontuacao: 0 },
        { id: 5, texto: 'Existe escassez de pontos de vendas para esse tipo de negócio?', resposta: 'Discordo Parcialmente', importancia: 'Importante', pontuacao: 6.25 },
        { id: 6, texto: 'Existe o risco de novas tecnologias derrubarem as barreiras de entradas?', resposta: 'Concordo Parcialmente', importancia: 'Sem importância', pontuacao: 3.75 }
      ],
      aberto: true
    },
    {
      id: 3,
      titulo: 'Rivalidade entre os concorrentes',
      icone: <Store style={{ fontSize: '1.5rem', color: colors.primary }} />,
      perguntas: [
        { id: 1, texto: 'Na indústria que você pretende entrar/já atua existem concorrentes estabelecidos?', resposta: 'Concordo Parcialmente', importancia: 'Muito importante', pontuacao: 9.5 },
        { id: 2, texto: 'O(s) concorrente(s) atuais já conseguem atender a totalidade do mercado?', resposta: 'Não concordo e nem discordo', importancia: 'Importante', pontuacao: 6.5 },
        { id: 3, texto: 'Já existe uma competição explícita entre os concorrentes?', resposta: 'Discordo Totalmente', importancia: 'Muito importante', pontuacao: 8 },
        { id: 4, texto: 'Você vai entrar no mesmo mercado que eles?', resposta: 'Concordo Totalmente', importancia: 'Sem importância', pontuacao: 5 },
        { id: 5, texto: 'A diversidade desses concorrentes é alta?', resposta: 'Discordo Parcialmente', importancia: 'Importante', pontuacao: 6.25 },
        { id: 6, texto: 'Existe uma guerra de preço ou de qualidade no setor pretendido?', resposta: 'Concordo Parcialmente', importancia: 'Muito importante', pontuacao: 9.5 }
      ],
      aberto: true
    },
    {
      id: 4,
      titulo: 'Poder de negociação dos clientes',
      icone: <People style={{ fontSize: '1.5rem', color: colors.primary }} />,
      perguntas: [
        { id: 1, texto: 'Seus clientes são sensíveis a mudanças de preço?', resposta: 'Concordo Totalmente', importancia: 'Muito importante', pontuacao: 10 },
        { id: 2, texto: 'Existe escassez de clientes para o seu negócio em relação ao seu setor?', resposta: 'Concordo Parcialmente', importancia: 'Importante', pontuacao: 6.75 },
        { id: 3, texto: 'Você tem dificuldade em fidelizar os seus clientes?', resposta: 'Concordo Totalmente', importancia: 'Muito importante', pontuacao: 10 },
        { id: 4, texto: 'O volume de compra dos seus clientes é alto?', resposta: 'Concordo Totalmente', importancia: 'Importante', pontuacao: 7 },
        { id: 5, texto: 'O custo para o cliente trocar de fornecedor é baixo?', resposta: 'Discordo Parcialmente', importancia: 'Muito importante', pontuacao: 8.5 },
        { id: 6, texto: 'Existe a possibilidade do seu cliente fazer o próprio produto?', resposta: 'Concordo Parcialmente', importancia: 'Muito importante', pontuacao: 9.5 }
      ],
      aberto: true
    },
    {
      id: 5,
      titulo: 'Ameaça de substitutos',
      icone: <SwapHoriz style={{ fontSize: '1.5rem', color: colors.primary }} />,
      perguntas: [
        { id: 1, texto: 'Existem substitutos diretos ao seu produto/serviço?', resposta: 'Concordo Totalmente', importancia: 'Muito importante', pontuacao: 10 },
        { id: 2, texto: 'Os produtos substitutos tem alto grau de inovação?', resposta: 'Não concordo e nem discordo', importancia: 'Importante', pontuacao: 6.5 },
        { id: 3, texto: 'Existe propensão dos seus clientes trocarem a sua oferta pelos substitutos?', resposta: 'Concordo Parcialmente', importancia: 'Muito importante', pontuacao: 9.5 },
        { id: 4, texto: 'O custo de mudança dos seus clientes para o substituto é baixo?', resposta: 'Concordo Totalmente', importancia: 'Sem importância', pontuacao: 5 },
        { id: 5, texto: 'O preço dos produtos substitutos é inferior ao do seu produto ou serviço?', resposta: 'Discordo Parcialmente', importancia: 'Importante', pontuacao: 6.25 },
        { id: 6, texto: 'A qualidade dos produtos substitutos é superior a qualidade do seu produto ou serviço?', resposta: 'Concordo Parcialmente', importancia: 'Muito importante', pontuacao: 9.5 }
      ],
      aberto: true
    }
  ]);

  const calcularPontuacao = (resposta, importancia) => {
    let min, max;
    
    if (importancia === 'Muito importante') {
      min = 8;
      max = 10;
    } else if (importancia === 'Importante') {
      min = 6;
      max = 7;
    } else { 
      min = 0;
      max = 5;
    }

    switch(resposta) {
      case 'Concordo Totalmente':
        return max;
      case 'Concordo Parcialmente':
        return min + (max - min) * 0.75;
      case 'Não concordo e nem discordo':
        return (min + max) / 2;
      case 'Discordo Parcialmente':
        return min + (max - min) * 0.25;
      case 'Discordo Totalmente':
        return min;
      default:
        return (min + max) / 2;
    }
  };

  const toggleAbrirTabela = (tabelaId) => {
    setTabelas(tabelas.map(tabela => {
      if (tabela.id === tabelaId) {
        return { ...tabela, aberto: !tabela.aberto };
      }
      return tabela;
    }));
  };

  const adicionarPergunta = (tabelaId) => {
    setTabelas(tabelas.map(tabela => {
      if (tabela.id === tabelaId) {
        const novaPerguntaId = tabela.perguntas.length > 0 
          ? Math.max(...tabela.perguntas.map(p => p.id)) + 1 
          : 1;
        
        return {
          ...tabela,
          perguntas: [
            ...tabela.perguntas,
            { 
              id: novaPerguntaId, 
              texto: '', 
              resposta: 'Não concordo e nem discordo', 
              importancia: 'Importante', 
              pontuacao: 6.5 
            }
          ]
        };
      }
      return tabela;
    }));
  };

  // Abrir modal para nova análise
  const abrirModalNovaAnalise = () => {
    setNovoTitulo('');
    setIconeSelecionado(iconesDisponiveis[0]);
    setShowModal(true);
  };

  const adicionarNovaAnalise = () => {
    if (!novoTitulo.trim()) return;
    
    const novoId = tabelas.length > 0 ? Math.max(...tabelas.map(t => t.id)) + 1 : 1;
    const novaTabela = {
      id: novoId,
      titulo: novoTitulo,
      icone: React.cloneElement(iconeSelecionado.componente, { style: { fontSize: '1.5rem', color: colors.primary } }),
      perguntas: [
        { 
          id: 1, 
          texto: '', 
          resposta: 'Não concordo e nem discordo', 
          importancia: 'Importante', 
          pontuacao: 6.5 
        }
      ],
      aberto: true
    };
    setTabelas([...tabelas, novaTabela]);
    setShowModal(false);
  };

  const removerPergunta = (tabelaId, perguntaId) => {
    setTabelas(tabelas.map(tabela => {
      if (tabela.id === tabelaId) {
        return {
          ...tabela,
          perguntas: tabela.perguntas.filter(p => p.id !== perguntaId)
        };
      }
      return tabela;
    }));
  };

  const atualizarPergunta = (tabelaId, perguntaId, campo, valor) => {
    setTabelas(tabelas.map(tabela => {
      if (tabela.id === tabelaId) {
        return {
          ...tabela,
          perguntas: tabela.perguntas.map(pergunta => {
            if (pergunta.id === perguntaId) {
              const novaPergunta = { ...pergunta, [campo]: valor };
              
              if (campo === 'resposta' || campo === 'importancia') {
                novaPergunta.pontuacao = calcularPontuacao(
                  campo === 'resposta' ? valor : pergunta.resposta,
                  campo === 'importancia' ? valor : pergunta.importancia
                );
              }
              
              return novaPergunta;
            }
            return pergunta;
          })
        };
      }
      return tabela;
    }));
  };

  const getRespostaStyle = (resposta) => {
    switch(resposta) {
      case 'Concordo Totalmente':
        return { backgroundColor: '#E8F5E9', color: colors.text, border: '1px solid #C8E6C9' };
      case 'Concordo Parcialmente':
        return { backgroundColor: '#FFF3E0', color: colors.text, border: '1px solid #FFE0B2' };
      case 'Não concordo e nem discordo':
        return { backgroundColor: colors.light, color: colors.text, border: `1px solid ${colors.secondary}` };
      case 'Discordo Parcialmente':
        return { backgroundColor: '#FFEBEE', color: colors.text, border: '1px solid #FFCDD2' };
      case 'Discordo Totalmente':
        return { backgroundColor: '#FCE4EC', color: colors.text, border: '1px solid #F8BBD0' };
      default:
        return { backgroundColor: colors.light, color: colors.text };
    }
  };

  const getImportanciaStyle = (importancia) => {
    switch(importancia) {
      case 'Muito importante':
        return { backgroundColor: '#E3F2FD', color: colors.text, border: '1px solid #BBDEFB' };
      case 'Importante':
        return { backgroundColor: '#E8F5E9', color: colors.text, border: '1px solid #C8E6C9' };
      case 'Sem importância':
        return { backgroundColor: '#FFEBEE', color: colors.text, border: '1px solid #FFCDD2' };
      default:
        return { backgroundColor: colors.light, color: colors.text };
    }
  };

  const getPontuacaoStyle = (pontuacao) => {
    const num = parseFloat(pontuacao);
    if (isNaN(num)) return { color: colors.text };
    
    if (num >= 8) return { color: '#2E7D32', fontWeight: 'bold' }; // Verde escuro
    if (num >= 5) return { color: '#EF6C00', fontWeight: 'bold' };  // Laranja
    return { color: '#C62828', fontWeight: 'bold' };                 // Vermelho
  };

  return (
    <Container className="mt-4" style={{ 
      maxWidth: '1200px',
      backgroundColor: colors.background,
      padding: '20px',
      borderRadius: '8px'
    }}>
      <h3 style={{ 
        color: colors.primary,
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <Business style={{ fontSize: '2rem', color: colors.primary }} />
        Análise de Concorrência e Mercado
      </h3>

      {tabelas.map(tabela => (
        <Card key={tabela.id} className="mb-4" style={{ 
          border: 'none',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          backgroundColor: colors.light
        }}>
          <Card.Header 
            onClick={() => toggleAbrirTabela(tabela.id)}
            style={{ 
              backgroundColor: colors.light,
              color: colors.primary,
              borderBottom: `1px solid ${colors.secondary}`,
              padding: '1rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {tabela.aberto ? 
                <KeyboardArrowUp style={{ color: colors.primary }} /> : 
                <KeyboardArrowDown style={{ color: colors.primary }} />}
              {tabela.icone}
              <h5 style={{ margin: 0, fontWeight: 500, color: colors.primary }}>{tabela.titulo}</h5>
            </div>
            <Button 
              variant="outlined"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                adicionarPergunta(tabela.id);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderColor: colors.primary,
                color: colors.primary,
                backgroundColor: 'transparent'
              }}
            >
              <Add fontSize="small" /> Adicionar Pergunta
            </Button>
          </Card.Header>
          
          <Collapse in={tabela.aberto}>
            <div>
              <Card.Body style={{ padding: '1rem', backgroundColor: colors.background }}>
                <div style={{ overflowX: 'auto' }}>
                  <Table bordered responsive style={{ backgroundColor: colors.light }}>
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: colors.secondary, color: colors.text, width: '40%' }}>Pergunta</th>
                        <th style={{ backgroundColor: colors.secondary, color: colors.text, width: '15%' }}>Resposta</th>
                        <th style={{ backgroundColor: colors.secondary, color: colors.text, width: '15%' }}>Importância</th>
                        <th style={{ backgroundColor: colors.secondary, color: colors.text, width: '10%' }}>Pontuação</th>
                        <th style={{ backgroundColor: colors.secondary, color: colors.text, width: '50px' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tabela.perguntas.map((pergunta) => (
                        <tr key={pergunta.id}>
                          <td style={{ backgroundColor: colors.light }}>
                            <Form.Control
                              type="text"
                              value={pergunta.texto}
                              onChange={(e) => atualizarPergunta(tabela.id, pergunta.id, 'texto', e.target.value)}
                              placeholder="Digite a pergunta"
                              style={{ 
                                backgroundColor: colors.light,
                                border: 'none',
                                boxShadow: 'none'
                              }}
                            />
                          </td>
                          <td style={getRespostaStyle(pergunta.resposta)}>
                            <Form.Select
                              value={pergunta.resposta}
                              onChange={(e) => atualizarPergunta(tabela.id, pergunta.id, 'resposta', e.target.value)}
                              style={{ 
                                ...getRespostaStyle(pergunta.resposta),
                                border: 'none',
                                boxShadow: 'none'
                              }}
                            >
                              {opcoesResposta.map((opcao, index) => (
                                <option key={index} value={opcao} style={getRespostaStyle(opcao)}>
                                  {opcao}
                                </option>
                              ))}
                            </Form.Select>
                          </td>
                          <td style={getImportanciaStyle(pergunta.importancia)}>
                            <Form.Select
                              value={pergunta.importancia}
                              onChange={(e) => atualizarPergunta(tabela.id, pergunta.id, 'importancia', e.target.value)}
                              style={{ 
                                ...getImportanciaStyle(pergunta.importancia),
                                border: 'none',
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
                            ...getPontuacaoStyle(pergunta.pontuacao),
                            backgroundColor: colors.light,
                            textAlign: 'center'
                          }}>
                            {pergunta.pontuacao.toFixed(1)}
                          </td>
                          <td style={{ 
                            textAlign: 'center',
                            backgroundColor: colors.light
                          }}>
                            <Button
                              variant="outlined"
                              size="sm"
                              onClick={() => removerPergunta(tabela.id, pergunta.id)}
                              style={{ 
                                padding: '0.25rem',
                                borderColor: colors.secondary,
                                color: colors.error,
                                backgroundColor: 'transparent'
                              }}
                            >
                              <Delete fontSize="small" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </div>
          </Collapse>
        </Card>
      ))}

      {/* Botão para adicionar nova tabela */}
      <div className="text-center mb-4">
        <Button 
          variant="contained"
          onClick={abrirModalNovaAnalise}
          style={{ 
            backgroundColor: colors.primary,
            border: 'none',
            borderRadius: '6px',
            padding: '0.5rem 1.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Add /> Adicionar Nova Análise
        </Button>
      </div>

      {/* Modal para nova análise */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton style={{ 
          backgroundColor: colors.light,
          color: colors.primary,
          borderBottom: `1px solid ${colors.secondary}`
        }}>
          <Modal.Title>Criar Nova Análise</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: colors.background }}>
          <Form.Group className="mb-3">
            <Form.Label>Nome da Análise</Form.Label>
            <Form.Control
              type="text"
              value={novoTitulo}
              onChange={(e) => setNovoTitulo(e.target.value)}
              placeholder="Digite o nome da análise"
              style={{ backgroundColor: colors.light }}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Ícone</Form.Label>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '10px',
              marginTop: '10px'
            }}>
              {iconesDisponiveis.map((icone, index) => (
                <Button
                  key={index}
                  variant={icone.nome === iconeSelecionado.nome ? 'contained' : 'outlined'}
                  onClick={() => setIconeSelecionado(icone)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60px',
                    backgroundColor: icone.nome === iconeSelecionado.nome ? colors.primary : colors.light,
                    color: icone.nome === iconeSelecionado.nome ? colors.light : colors.text,
                    borderColor: colors.secondary
                  }}
                >
                  {React.cloneElement(icone.componente, { style: { fontSize: '1.5rem' } })}
                  <span style={{ fontSize: '0.7rem', marginTop: '5px' }}>{icone.nome}</span>
                </Button>
              ))}
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer style={{ 
          backgroundColor: colors.background,
          borderTop: `1px solid ${colors.secondary}`
        }}>
          <Button 
            variant="outlined" 
            onClick={() => setShowModal(false)}
            style={{ 
              borderColor: colors.secondary, 
              color: colors.text,
              backgroundColor: colors.light
            }}
          >
            Cancelar
          </Button>
          <Button 
            variant="contained"
            onClick={adicionarNovaAnalise}
            disabled={!novoTitulo.trim()}
            style={{ backgroundColor: colors.primary }}
          >
            Criar Análise
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AnaliseConcorrencia;
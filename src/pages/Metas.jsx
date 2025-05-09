import React, { useState } from 'react';
import { Container, Table, Form, Button, Row, Col } from 'react-bootstrap';
import { 
  Add, 
  Delete,
  Edit,
  Save,
  Cancel,
  PlaylistAdd,
  Timeline
} from '@mui/icons-material';

const MetasEmpresa = () => {
  const colors = {
    primary: '#5D6BB0',
    secondary: '#F8F9FA',
    accent: '#7E8FC7',
    light: '#FFFFFF',
    background: '#F5F7FA',
    text: '#4A4A4A',
    success: '#81C784',
    warning: '#FFD54F',
    error: '#E57373',
    header: '#EBEEF5'
  };

  const [anos, setAnos] = useState([1, 2, 3, 4, 5, 6]);
  const [metas, setMetas] = useState([
    { 
      id: 1,
      nome: 'Lei Energia',
      area: 'Comercial',
      formato: 'R$',
      valores: [
        { planejado: '110,000', realizado: '' },
        { planejado: '150,000', realizado: '' },
        { planejado: '200,000', realizado: '' },
        { planejado: '250,000', realizado: '' },
        { planejado: '500,000', realizado: '' },
        { planejado: '400,000', realizado: '' }
      ]
    },
    { 
      id: 2,
      nome: 'Síndalores',
      area: 'Aeroporto',
      formato: '%',
      valores: [
        { planejado: '2%', realizado: '' },
        { planejado: '7%', realizado: '' },
        { planejado: '10%', realizado: '' },
        { planejado: '12%', realizado: '' },
        { planejado: '15%', realizado: '' },
        { planejado: '20%', realizado: '' }
      ]
    }
  ]);

  const [editando, setEditando] = useState(null);
  const [novaMeta, setNovaMeta] = useState({
    nome: '',
    area: '',
    formato: '',
    valores: anos.map(() => ({ planejado: '', realizado: '' }))
  });

  const adicionarAno = () => {
    const novoAno = anos.length > 0 ? Math.max(...anos) + 1 : 1;
    setAnos([...anos, novoAno]);
    
    setMetas(metas.map(meta => ({
      ...meta,
      valores: [...meta.valores, { planejado: '', realizado: '' }]
    })));

    setNovaMeta(prev => ({
      ...prev,
      valores: [...prev.valores, { planejado: '', realizado: '' }]
    }));
  };

  const removerAno = (anoIndex) => {
    if (anos.length <= 1) return;
    
    const novosAnos = [...anos];
    novosAnos.splice(anoIndex, 1);
    setAnos(novosAnos);

    setMetas(metas.map(meta => ({
      ...meta,
      valores: meta.valores.filter((_, i) => i !== anoIndex)
    })));
  };

  const adicionarMeta = () => {
    if (!novaMeta.nome || !novaMeta.area || !novaMeta.formato) return;
    
    const novoId = metas.length > 0 ? Math.max(...metas.map(m => m.id)) + 1 : 1;
    setMetas([...metas, { ...novaMeta, id: novoId }]);
    setNovaMeta({
      nome: '',
      area: '',
      formato: '',
      valores: anos.map(() => ({ planejado: '', realizado: '' }))
    });
  };

  const removerMeta = (id) => {
    setMetas(metas.filter(m => m.id !== id));
  };

  const iniciarEdicao = (id) => {
    setEditando(id);
  };

  const salvarEdicao = (id) => {
    setEditando(null);
  };

  const cancelarEdicao = () => {
    setEditando(null);
  };

  const atualizarMeta = (id, campo, valor) => {
    setMetas(metas.map(m => 
      m.id === id ? { ...m, [campo]: valor } : m
    ));
  };

  const atualizarValor = (metaId, anoIndex, campo, valor) => {
    setMetas(metas.map(meta => {
      if (meta.id === metaId) {
        const novosValores = [...meta.valores];
        novosValores[anoIndex] = { ...novosValores[anoIndex], [campo]: valor };
        return { ...meta, valores: novosValores };
      }
      return meta;
    }));
  };

  return (
    <Container fluid className="p-3" style={{ 
      backgroundColor: colors.background,
      marginLeft: '280px', 
      width: 'calc(100% - 280px)',
      minHeight: '100vh',
      overflow: 'auto'
    }}>
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <h4 style={{ color: colors.primary, fontWeight: 600 }}>
            <Timeline className="me-2" />
            Planilha de Metas
          </h4>
        </Col>
        <Col md={6} className="d-flex justify-content-end">
          <Button 
            variant="outline-primary" 
            onClick={adicionarAno}
            size="sm"
            className="me-2"
            style={{ borderWidth: '2px' }}
          >
            <Add fontSize="small" /> Ano
          </Button>
        </Col>
      </Row>

      <div className="bg-white rounded-3 p-3 mb-3 shadow-sm">
        <Row className="g-2 align-items-center">
          <Col md={3}>
            <Form.Control
              placeholder="Nome"
              size="sm"
              value={novaMeta.nome}
              onChange={(e) => setNovaMeta({...novaMeta, nome: e.target.value})}
              className="border-0 shadow-sm"
            />
          </Col>
          <Col md={2}>
            <Form.Control
              placeholder="Área"
              size="sm"
              value={novaMeta.area}
              onChange={(e) => setNovaMeta({...novaMeta, area: e.target.value})}
              className="border-0 shadow-sm"
            />
          </Col>
          <Col md={2}>
            <Form.Control
              placeholder="Formato"
              size="sm"
              value={novaMeta.formato}
              onChange={(e) => setNovaMeta({...novaMeta, formato: e.target.value})}
              className="border-0 shadow-sm"
            />
          </Col>
          <Col md={2}>
            <Button 
              variant="success" 
              onClick={adicionarMeta}
              disabled={!novaMeta.nome || !novaMeta.area || !novaMeta.formato}
              size="sm"
              className="w-100"
              style={{ backgroundColor: colors.success, border: 'none' }}
            >
              <PlaylistAdd fontSize="small" className="me-1" /> Adicionar
            </Button>
          </Col>
        </Row>
      </div>

      <div style={{ 
        overflowX: 'auto',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 180px)',
        border: `1px solid ${colors.header}`,
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <Table borderless className="mb-0" style={{ minWidth: '700px' }}>
          <thead>
            <tr style={{ 
              backgroundColor: colors.header,
              position: 'sticky',
              top: 0,
              zIndex: 1
            }}>
              <th style={{ width: '150px', minWidth: '150px' }}>Nome</th>
              <th style={{ width: '120px', minWidth: '120px' }}>Área</th>
              <th style={{ width: '80px', minWidth: '80px' }}>Formato</th>
              {anos.map((ano, index) => (
                <th key={ano} colSpan={2} style={{ minWidth: '140px' }} className="text-center position-relative">
                  <div className="d-flex justify-content-center align-items-center">
                    <span>Ano {ano}</span>
                    {anos.length > 1 && (
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="p-0 ms-1 text-danger"
                        onClick={() => removerAno(index)}
                        style={{ lineHeight: 1 }}
                        title="Remover ano"
                      >
                        <Delete fontSize="small" />
                      </Button>
                    )}
                  </div>
                </th>
              ))}
              <th style={{ width: '100px', minWidth: '100px' }}>Ações</th>
            </tr>
            <tr style={{ backgroundColor: colors.header }}>
              <th colSpan={3}></th>
              {anos.map((ano) => (
                <React.Fragment key={ano}>
                  <th className="text-center">Planejado</th>
                  <th className="text-center">Realizado</th>
                </React.Fragment>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {metas.map((meta) => (
              <tr key={meta.id} style={{ borderBottom: `1px solid ${colors.header}` }}>
                <td className="align-middle">
                  {editando === meta.id ? (
                    <Form.Control
                      size="sm"
                      value={meta.nome}
                      onChange={(e) => atualizarMeta(meta.id, 'nome', e.target.value)}
                      className="border-0 shadow-sm"
                    />
                  ) : (
                    <div className="py-1" style={{ fontWeight: 500 }}>{meta.nome}</div>
                  )}
                </td>
                <td className="align-middle">
                  {editando === meta.id ? (
                    <Form.Control
                      size="sm"
                      value={meta.area}
                      onChange={(e) => atualizarMeta(meta.id, 'area', e.target.value)}
                      className="border-0 shadow-sm"
                    />
                  ) : (
                    <div className="py-1">{meta.area}</div>
                  )}
                </td>
                <td className="align-middle">
                  {editando === meta.id ? (
                    <Form.Control
                      size="sm"
                      value={meta.formato}
                      onChange={(e) => atualizarMeta(meta.id, 'formato', e.target.value)}
                      className="border-0 shadow-sm"
                    />
                  ) : (
                    <div className="py-1">{meta.formato}</div>
                  )}
                </td>
                
                {meta.valores.map((valor, index) => (
                  <React.Fragment key={index}>
                    <td className="align-middle">
                      <Form.Control
                        size="sm"
                        value={valor.planejado}
                        onChange={(e) => atualizarValor(meta.id, index, 'planejado', e.target.value)}
                        className="text-end border-0 shadow-sm"
                      />
                    </td>
                    <td className="align-middle">
                      <Form.Control
                        size="sm"
                        value={valor.realizado}
                        onChange={(e) => atualizarValor(meta.id, index, 'realizado', e.target.value)}
                        className="text-end border-0 shadow-sm"
                        style={{ 
                          backgroundColor: valor.realizado ? '#f0f7f0' : 'inherit',
                          fontWeight: valor.realizado ? 500 : 'inherit'
                        }}
                      />
                    </td>
                  </React.Fragment>
                ))}
                
                <td className="align-middle text-center">
                  {editando === meta.id ? (
                    <div className="d-flex justify-content-center">
                      <Button 
                        variant="success" 
                        size="sm" 
                        className="me-1"
                        onClick={() => salvarEdicao(meta.id)}
                        style={{ backgroundColor: colors.success, border: 'none' }}
                      >
                        <Save fontSize="small" />
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={cancelarEdicao}
                        style={{ backgroundColor: colors.error, border: 'none' }}
                      >
                        <Cancel fontSize="small" />
                      </Button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <Button 
                        variant="primary" 
                        size="sm" 
                        className="me-1"
                        onClick={() => iniciarEdicao(meta.id)}
                        style={{ backgroundColor: colors.primary, border: 'none' }}
                      >
                        <Edit fontSize="small" />
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => removerMeta(meta.id)}
                        style={{ backgroundColor: colors.error, border: 'none' }}
                      >
                        <Delete fontSize="small" />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default MetasEmpresa;
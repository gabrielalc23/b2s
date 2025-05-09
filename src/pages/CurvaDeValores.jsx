import { Container, Form, Row, Col, Button, Card, Tab, Tabs, Table, Badge, Alert } from "react-bootstrap";
import React, { useState } from 'react';
import {
  Bar,
  Line,
  Pie,
  Doughnut,
  PolarArea,
  Radar,
  Scatter,
  Bubble
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const COLORS = {
  primary: '#4361ee',
  secondary: '#3f37c9',
  success: '#4cc9f0',
  info: '#4895ef',
  warning: '#f72585',
  danger: '#b5179e',
  light: '#f8f9fa',
  dark: '#212529',
  background: '#f8f9fa',
  card: '#ffffff',
  text: '#495057'
};

const TIPOS_GRAFICOS = [
  { value: 'bar', label: 'Barras', icon: '📊' },
  { value: 'line', label: 'Linhas', icon: '📈' },
  { value: 'pie', label: 'Pizza', icon: '🥧' },
  { value: 'doughnut', label: 'Rosca', icon: '🍩' },
  { value: 'polarArea', label: 'Área Polar', icon: '❄️' },
  { value: 'radar', label: 'Radar', icon: '📡' },
  { value: 'scatter', label: 'Dispersão', icon: '✨' },
  { value: 'bubble', label: 'Bolhas', icon: '🫧' }
];

const CORES_PREDEFINIDAS = [
  '#4361ee', '#4cc9f0', '#f72585', '#b5179e', '#4895ef',
  '#3f37c9', '#7209b7', '#560bad', '#480ca8', '#3a0ca3'
];

export function CurvaDeValores() {
  const [tipoGrafico, setTipoGrafico] = useState('line');
  const [labels, setLabels] = useState(['Jan', 'Fev', 'Mar', 'Abr', 'Mai']);
  const [datasets, setDatasets] = useState([
    {
      label: 'Serviço A',
      data: [3, 2, 4, 1, 5],
      backgroundColor: CORES_PREDEFINIDAS[0],
      borderColor: CORES_PREDEFINIDAS[0],
      borderWidth: 2
    },
    {
      label: 'Serviço B',
      data: [2, 3, 1, 4, 2],
      backgroundColor: CORES_PREDEFINIDAS[1],
      borderColor: CORES_PREDEFINIDAS[1],
      borderWidth: 2
    }
  ]);
  const [activeDataset, setActiveDataset] = useState(0);

  const [alertas, setAlertas] = useState([
    { id: 1, tipo: 'info', texto: 'Você optou por um modelo de negócio em que o seu maior atributo é Expertise Financeira' },
    { id: 2, tipo: 'info', texto: 'Dos 15 atributos possíveis, você só usou 5. Faça uma análise e tente identificar se os atributos utilizados são suficientes para a análise' },
    { id: 3, tipo: 'info', texto: 'A sua média é maior ou igual que a de seus concorrentes. Continue assim.' },
    { id: 4, tipo: 'warning', texto: 'O seu maior ponto fraco é Preço. Talvez este possa ser o primeiro ponto de melhoria para buscar maior competitividade.' },
    { id: 5, tipo: 'success', texto: 'O seu maior ponto forte é Expertise Financeira. Este pode ser o seu principal argumento de venda e deve haver um esforço para aproveitar os benefícios desta força.' }
  ]);
  const [novoAlerta, setNovoAlerta] = useState('');
  const [tipoAlerta, setTipoAlerta] = useState('info');
  const [editandoAlerta, setEditandoAlerta] = useState(null);
  const [textoEditado, setTextoEditado] = useState('');

  const adicionarItem = () => {
    setLabels([...labels, `Mês ${labels.length + 1}`]);
    setDatasets(datasets.map(dataset => ({
      ...dataset,
      data: [...dataset.data, 0]
    })));
  };

  const removerItem = (index) => {
    const newLabels = [...labels];
    newLabels.splice(index, 1);
    setLabels(newLabels);

    setDatasets(datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.filter((_, i) => i !== index)
    })));
  };

  const atualizarLabel = (index, novoValor) => {
    const newLabels = [...labels];
    newLabels[index] = novoValor;
    setLabels(newLabels);
  };

  const atualizarValor = (datasetIndex, labelIndex, novoValor) => {
    const newDatasets = [...datasets];
    // Garante que o valor fique entre 0 e 5
    const valorLimitado = Math.min(5, Math.max(0, Number(novoValor) || 0));
    newDatasets[datasetIndex].data[labelIndex] = valorLimitado;
    setDatasets(newDatasets);
  };

  const adicionarDataset = () => {
    const newColor = CORES_PREDEFINIDAS[datasets.length % CORES_PREDEFINIDAS.length];
    setDatasets([
      ...datasets,
      {
        label: `Serviço ${String.fromCharCode(65 + datasets.length)}`,
        data: Array(labels.length).fill(0),
        backgroundColor: newColor,
        borderColor: newColor,
        borderWidth: 2
      }
    ]);
  };

  const removerDataset = (index) => {
    if (datasets.length <= 1) return;
    const newDatasets = datasets.filter((_, i) => i !== index);
    setDatasets(newDatasets);
    if (activeDataset >= newDatasets.length) {
      setActiveDataset(newDatasets.length - 1);
    }
  };

  const atualizarDatasetLabel = (index, novoValor) => {
    const newDatasets = [...datasets];
    newDatasets[index].label = novoValor;
    setDatasets(newDatasets);
  };

  const atualizarCorDataset = (index, tipoCor, novoValor) => {
    const newDatasets = [...datasets];
    if (tipoCor === 'fundo') {
      newDatasets[index].backgroundColor = novoValor;
    } else {
      newDatasets[index].borderColor = novoValor;
    }
    setDatasets(newDatasets);
  };

  const adicionarAlerta = () => {
    if (!novoAlerta.trim()) return;

    const novoId = Math.max(0, ...alertas.map(a => a.id)) + 1;
    setAlertas([
      ...alertas,
      {
        id: novoId,
        tipo: tipoAlerta,
        texto: novoAlerta
      }
    ]);
    setNovoAlerta('');
  };

  const removerAlerta = (id) => {
    setAlertas(alertas.filter(alerta => alerta.id !== id));
  };

  const iniciarEdicao = (alerta) => {
    setEditandoAlerta(alerta.id);
    setTextoEditado(alerta.texto);
  };

  const salvarEdicao = (id) => {
    setAlertas(alertas.map(alerta =>
      alerta.id === id ? { ...alerta, texto: textoEditado } : alerta
    ));
    setEditandoAlerta(null);
  };

  const cancelarEdicao = () => {
    setEditandoAlerta(null);
  };

  const getChartData = () => {
    const baseData = {
      labels,
      datasets: datasets.map(dataset => ({
        ...dataset,
        ...(tipoGrafico === 'line' && {
          fill: false,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: '#ffffff',
          pointBorderWidth: 2
        }),
        ...(tipoGrafico === 'bar' && {
          borderRadius: 6,
          borderSkipped: false
        })
      }))
    };

    if (tipoGrafico === 'scatter') {
      return {
        datasets: datasets.map(dataset => ({
          ...dataset,
          data: labels.map((_, i) => ({
            x: i,
            y: dataset.data[i]
          }))
        }))
      };
    }

    if (tipoGrafico === 'bubble') {
      return {
        datasets: datasets.map(dataset => ({
          ...dataset,
          data: labels.map((_, i) => ({
            x: i,
            y: dataset.data[i],
            r: dataset.data[i] * 2
          }))
        }))
      };
    }

    return baseData;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: COLORS.dark,
          font: {
            size: 14,
            weight: '500'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        },
        onClick: (e, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          const ci = legend.chart;
          const meta = ci.getDatasetMeta(index);
          meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
          ci.update();
        }
      },
      tooltip: {
        mode: tipoGrafico === 'line' ? 'index' : 'nearest',
        intersect: false,
        backgroundColor: COLORS.dark,
        titleColor: COLORS.light,
        bodyColor: COLORS.light,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true
      },
      title: {
        display: true,
        text: `Gráfico de ${TIPOS_GRAFICOS.find(t => t.value === tipoGrafico)?.label}`,
        font: {
          size: 18,
          weight: '600',
          family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        },
        color: COLORS.dark,
        padding: {
          top: 10,
          bottom: 20
        }
      },
    },
    scales: ['bar', 'line', 'radar'].includes(tipoGrafico) ? {
      y: {
        beginAtZero: true,
        max: 5, // Define o valor máximo do eixo Y como 5
        title: {
          display: true,
          text: 'Valores (0-5)',
          color: COLORS.dark,
          font: {
            size: 14,
            weight: '500'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          color: COLORS.text,
          stepSize: 1
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: COLORS.text
        }
      }
    } : undefined,
    interaction: {
      mode: tipoGrafico === 'line' ? 'nearest' : 'point',
      axis: 'x',
      intersect: false
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  const renderGrafico = () => {
    const data = getChartData();

    switch (tipoGrafico) {
      case 'bar': return <Bar data={data} options={options} />;
      case 'line': return <Line data={data} options={options} />;
      case 'pie': return <Pie data={data} options={options} />;
      case 'doughnut': return <Doughnut data={data} options={options} />;
      case 'polarArea': return <PolarArea data={data} options={options} />;
      case 'radar': return <Radar data={data} options={options} />;
      case 'scatter': return <Scatter data={data} options={options} />;
      case 'bubble': return <Bubble data={data} options={options} />;
      default: return <Line data={data} options={options} />;
    }
  };

  return (
    <Container fluid className="py-4" style={{ backgroundColor: COLORS.background, minHeight: '100vh' }}>
      <Container>
        {/* Header */}
        <Row className="mb-4 align-items-center">
          <Col>
            <h1 className="mb-0" style={{ color: COLORS.primary, fontWeight: '700' }}>
              Dashboard de Análise
            </h1>
            <p className="text-muted">Visualização dinâmica de dados e métricas</p>
          </Col>
          <Col xs="auto">
            <Badge bg="light" text="dark" className="fs-6 p-2">
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </Badge>
          </Col>
        </Row>

        <Card className="mb-4 border-0 shadow-sm">
          <Card.Body className="p-4">
            <Row className="align-items-center mb-4">
              <Col>
                <h4 className="mb-0" style={{ color: COLORS.dark }}>
                  {TIPOS_GRAFICOS.find(t => t.value === tipoGrafico)?.icon}{' '}
                  {TIPOS_GRAFICOS.find(t => t.value === tipoGrafico)?.label}
                </h4>
              </Col>
              <Col xs="auto">
                <Form.Select
                  value={tipoGrafico}
                  onChange={(e) => setTipoGrafico(e.target.value)}
                  style={{
                    backgroundColor: COLORS.card,
                    borderColor: '#dfe2e6',
                    color: COLORS.dark,
                    width: '200px'
                  }}
                >
                  {TIPOS_GRAFICOS.map(tipo => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.icon} {tipo.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <div style={{ height: '500px', position: 'relative' }} className="mb-4">
              {renderGrafico()}
            </div>
          </Card.Body>
        </Card>

        <Card className="mb-4 border-0 shadow-sm">
          <Card.Body className="p-4">
            <Tabs
              activeKey={activeDataset}
              onSelect={(k) => setActiveDataset(Number(k))}
              className="mb-3 custom-tabs"
              variant="pills"
            >
              {datasets.map((dataset, index) => (
                <Tab
                  key={index}
                  eventKey={index}
                  title={
                    <span className="d-flex align-items-center">
                      <span
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: dataset.backgroundColor,
                          borderRadius: '50%',
                          marginRight: '8px',
                          border: `2px solid ${dataset.borderColor}`
                        }}
                      />
                      {dataset.label || `Dataset ${index + 1}`}
                    </span>
                  }
                >
                  <Card className="mt-3 border-0" style={{ backgroundColor: 'rgba(248, 249, 250, 0.5)' }}>
                    <Card.Body>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="fw-medium">Nome do Dataset</Form.Label>
                            <Form.Control
                              type="text"
                              value={dataset.label}
                              onChange={(e) => atualizarDatasetLabel(index, e.target.value)}
                              style={{ backgroundColor: COLORS.card }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group>
                            <Form.Label className="fw-medium">Cor de Fundo</Form.Label>
                            <div className="d-flex align-items-center">
                              <Form.Control
                                type="color"
                                value={dataset.backgroundColor}
                                onChange={(e) => atualizarCorDataset(index, 'fundo', e.target.value)}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  padding: '5px',
                                  border: 'none',
                                  borderRadius: '8px',
                                  marginRight: '10px'
                                }}
                              />
                              <Form.Control
                                type="text"
                                value={dataset.backgroundColor}
                                onChange={(e) => atualizarCorDataset(index, 'fundo', e.target.value)}
                                style={{ backgroundColor: COLORS.card }}
                              />
                            </div>
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group>
                            <Form.Label className="fw-medium">Cor da Borda</Form.Label>
                            <div className="d-flex align-items-center">
                              <Form.Control
                                type="color"
                                value={dataset.borderColor}
                                onChange={(e) => atualizarCorDataset(index, 'borda', e.target.value)}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  padding: '5px',
                                  border: 'none',
                                  borderRadius: '8px',
                                  marginRight: '10px'
                                }}
                              />
                              <Form.Control
                                type="text"
                                value={dataset.borderColor}
                                onChange={(e) => atualizarCorDataset(index, 'borda', e.target.value)}
                                style={{ backgroundColor: COLORS.card }}
                              />
                            </div>
                          </Form.Group>
                        </Col>
                      </Row>

                      <h5 className="mb-3 fw-medium">Valores (0-5)</h5>
                      <div className="table-responsive">
                        <table className="table table-hover align-middle">
                          <thead>
                            <tr>
                              <th style={{ width: '30%' }}>Período</th>
                              <th style={{ width: '50%' }}>Valor</th>
                              <th style={{ width: '20%' }}>Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {labels.map((label, labelIndex) => (
                              <tr key={labelIndex}>
                                <td>
                                  <Form.Control
                                    type="text"
                                    value={label}
                                    onChange={(e) => atualizarLabel(labelIndex, e.target.value)}
                                    placeholder="Label"
                                    style={{ backgroundColor: COLORS.card }}
                                  />
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Form.Range
                                      min="0"
                                      max="5"
                                      step="1"
                                      value={dataset.data[labelIndex]}
                                      onChange={(e) => atualizarValor(index, labelIndex, e.target.value)}
                                      style={{ flex: 1, marginRight: '10px' }}
                                    />
                                    <Badge bg="primary" style={{ minWidth: '30px' }}>
                                      {dataset.data[labelIndex]}
                                    </Badge>
                                  </div>
                                </td>
                                <td>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => removerItem(labelIndex)}
                                    disabled={labels.length <= 2}
                                    className="w-100"
                                  >
                                    Remover
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>

                        </table>
                      </div>

                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          variant="outline-primary"
                          onClick={adicionarItem}
                          className="d-flex align-items-center"
                        >
                          <i className="bi bi-plus-circle me-2"></i>
                          Adicionar Período
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => removerDataset(index)}
                          disabled={datasets.length <= 1}
                          className="d-flex align-items-center"
                        >
                          <i className="bi bi-trash me-2"></i>
                          Remover Dataset
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab>
              ))}
            </Tabs>

            <div className="d-flex justify-content-end">
              <Button
                variant="primary"
                onClick={adicionarDataset}
                className="d-flex align-items-center"
              >
                <i className="bi bi-plus-lg me-2"></i>
                Adicionar Dataset
              </Button>
            </div>
          </Card.Body>
        </Card>

        <Card className="border-0 shadow-sm">
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0" style={{ color: COLORS.dark }}>
                <i className="bi bi-bell-fill me-2" style={{ color: COLORS.warning }}></i>
                Alertas e Insights
              </h4>
              <Badge bg="light" text="dark" className="fs-6">
                {alertas.length} {alertas.length === 1 ? 'alerta' : 'alertas'}
              </Badge>
            </div>

            <div className="mb-4">
              {alertas.map(alerta => (
                <Alert
                  key={alerta.id}
                  variant={
                    alerta.tipo === 'warning' ? 'warning' :
                      alerta.tipo === 'success' ? 'success' : 'info'
                  }
                  className="d-flex align-items-center"
                  style={{
                    borderLeft: `4px solid ${alerta.tipo === 'warning' ? COLORS.warning :
                        alerta.tipo === 'success' ? COLORS.success : COLORS.info
                      }`
                  }}
                >
                  <div className="flex-grow-1">
                    {editandoAlerta === alerta.id ? (
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={textoEditado}
                        onChange={(e) => setTextoEditado(e.target.value)}
                        style={{ backgroundColor: COLORS.card }}
                      />
                    ) : (
                      alerta.texto
                    )}
                  </div>
                  <div className="ms-3 d-flex">
                    {editandoAlerta === alerta.id ? (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => salvarEdicao(alerta.id)}
                          className="me-2"
                        >
                          <i className="bi bi-check-lg"></i>
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={cancelarEdicao}
                        >
                          <i className="bi bi-x-lg"></i>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() => iniciarEdicao(alerta)}
                          className="me-2"
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removerAlerta(alerta.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </>
                    )}
                  </div>
                </Alert>
              ))}
            </div>

            <Card className="border-0" style={{ backgroundColor: 'rgba(248, 249, 250, 0.5)' }}>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <Form.Group>
                      <Form.Label className="fw-medium">Novo Alerta/Insight</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={novoAlerta}
                        onChange={(e) => setNovoAlerta(e.target.value)}
                        placeholder="Digite o texto do novo alerta ou insight..."
                        style={{ backgroundColor: COLORS.card }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label className="fw-medium">Tipo</Form.Label>
                      <Form.Select
                        value={tipoAlerta}
                        onChange={(e) => setTipoAlerta(e.target.value)}
                        style={{ backgroundColor: COLORS.card }}
                      >
                        <option value="info">Informação</option>
                        <option value="warning">Alerta</option>
                        <option value="success">Sucesso</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={2} className="d-flex align-items-end">
                    <Button
                      variant="primary"
                      onClick={adicionarAlerta}
                      className="w-100 d-flex align-items-center justify-content-center"
                    >
                      <i className="bi bi-plus-lg me-2"></i>
                      Adicionar
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
}
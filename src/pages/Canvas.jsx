import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState } from 'react';
import './Canvas.css';

const CanvasItem = ({ title, icon, items, color, onUpdateItems }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [currentItems, setCurrentItems] = useState(items);

  const handleAddItem = () => {
    if (newItem.trim()) {
      const updatedItems = [...currentItems, newItem];
      setCurrentItems(updatedItems);
      onUpdateItems(updatedItems);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = currentItems.filter((_, i) => i !== index);
    setCurrentItems(updatedItems);
    onUpdateItems(updatedItems);
  };

  return (
    <Card className={`h-100 canvas-card border-0 shadow-sm`} style={{ backgroundColor: '#f8f9fa' }}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Card.Title className="mb-0 text-dark">{title}</Card.Title>
          <span className="canvas-icon" style={{ color: `var(--bs-${color})` }}>{icon}</span>
        </div>
        
        <ul className="canvas-list">
          {currentItems.map((item, index) => (
            <li key={index} className="d-flex justify-content-between align-items-center">
              <span className="text-dark">{item}</span>
              <Button 
                variant="link" 
                className="p-0 text-danger"
                onClick={() => handleRemoveItem(index)}
              >
                ×
              </Button>
            </li>
          ))}
        </ul>

        {isEditing && (
          <div className="mt-3 d-flex">
            <input
              type="text"
              className="form-control form-control-sm me-2"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Novo item"
            />
            <Button variant="primary" size="sm" onClick={handleAddItem}>
              +
            </Button>
          </div>
        )}

        <Button 
          variant="outline-primary" 
          size="sm" 
          className="mt-2"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Fechar' : 'Editar'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export function Canvas() {
  const [canvasData, setCanvasData] = useState({
    partnerships: ['Academias de Consultor'],
    activities: ['Consultoria', 'Vendas'],
    value: ['Consultoria Financeira'],
    relationships: ['-'],
    customers: ['Pequenas Empresas', 'Médias Empresas', 'Sistemas e Inventariadores'],
    costs: ['Salários', 'Custos com projetos'],
    revenue: ['Projetos de consultoria financeira', 'Cursos online e produtos digitais'],
    channels: ['Site', 'Redes Sociais', 'Parcerias'],
    segments: ['Startups', 'Empresas familiares', 'Profissionais liberais'],
    resources: ['Equipe especializada', 'Software de gestão', 'Conteúdo educativo']
  });

  const updateItems = (section, items) => {
    setCanvasData(prev => ({ ...prev, [section]: items }));
  };

  return (
    <Container className="canvas-container py-5" style={{ backgroundColor: 'white' }}>
      {/* Cabeçalho */}
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="canvas-title text-dark">Business Model Canvas</h1>
          <p className="text-muted">Visualize e edite seu modelo de negócios</p>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col md={6} lg={3}>
          <CanvasItem 
            title="Parcerias"
            icon="🤝"
            items={canvasData.partnerships}
            color="primary"
            onUpdateItems={(items) => updateItems('partnerships', items)}
          />
        </Col>

        <Col md={6} lg={3}>
          <CanvasItem 
            title="Atividades Chave"
            icon="⚙️"
            items={canvasData.activities}
            color="success"
            onUpdateItems={(items) => updateItems('activities', items)}
          />
        </Col>

        <Col md={6} lg={3}>
          <CanvasItem 
            title="Oferta de Valor"
            icon="💎"
            items={canvasData.value}
            color="warning"
            onUpdateItems={(items) => updateItems('value', items)}
          />
        </Col>

        <Col md={6} lg={3}>
          <CanvasItem 
            title="Relacionamento"
            icon="💬"
            items={canvasData.relationships}
            color="info"
            onUpdateItems={(items) => updateItems('relationships', items)}
          />
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col md={6} lg={4}>
          <CanvasItem 
            title="Segmento de Clientes"
            icon="👥"
            items={canvasData.customers}
            color="primary"
            onUpdateItems={(items) => updateItems('customers', items)}
          />
        </Col>

        <Col md={6} lg={4}>
          <CanvasItem 
            title="Canais de Distribuição"
            icon="📦"
            items={canvasData.channels}
            color="secondary"
            onUpdateItems={(items) => updateItems('channels', items)}
          />
        </Col>

        <Col md={6} lg={4}>
          <CanvasItem 
            title="Recursos Chave"
            icon="🔑"
            items={canvasData.resources}
            color="warning"
            onUpdateItems={(items) => updateItems('resources', items)}
          />
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={6}>
          <CanvasItem 
            title="Estrutura de Custos"
            icon="📉"
            items={canvasData.costs}
            color="danger"
            onUpdateItems={(items) => updateItems('costs', items)}
          />
        </Col>

        <Col lg={6}>
          <CanvasItem 
            title="Fontes de Receitas"
            icon="💰"
            items={canvasData.revenue}
            color="success"
            onUpdateItems={(items) => updateItems('revenue', items)}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Canvas;
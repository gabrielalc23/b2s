import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Divider, 
  Button,
  TextField,
  IconButton,
  MenuItem,
  Chip
} from '@mui/material';
import { Add, Delete, Check, Close } from '@mui/icons-material';

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

const ProblemOpportunityPage = () => {
  const [marketSize, setMarketSize] = useState('10.000.000');
  const [targetPercentage, setTargetPercentage] = useState('1%');
  const [targetMarketSize, setTargetMarketSize] = useState('100.000');
  const [competitors, setCompetitors] = useState('Duras consultorias');
  const [competitorApproach, setCompetitorApproach] = useState('Resposta');
  const [newEntrants, setNewEntrants] = useState('Stantups');
  const [solutionGaps, setSolutionGaps] = useState('Gaps');
  
  const [resources, setResources] = useState([
    { id: 1, name: 'Recurso 1', available: true },
    { id: 2, name: 'Recurso 2', available: false },
    { id: 3, name: 'Recurso 3', available: false },
    { id: 4, name: 'Recurso 4', available: false }
  ]);

  const [newResource, setNewResource] = useState({
    name: '',
    available: true
  });

  const handleAddResource = () => {
    if (newResource.name) {
      setResources([...resources, {
        id: resources.length + 1,
        ...newResource
      }]);
      setNewResource({
        name: '',
        available: true
      });
    }
  };

  const handleDeleteResource = (id) => {
    setResources(resources.filter(resource => resource.id !== id));
  };

  const toggleResourceAvailability = (id) => {
    setResources(resources.map(resource => 
      resource.id === id 
        ? { ...resource, available: !resource.available } 
        : resource
    ));
  };

  const calculateTargetMarket = () => {
    const cleanMarketSize = parseInt(marketSize.replace(/\./g, ''));
    const cleanPercentage = parseInt(targetPercentage.replace('%', ''));
    
    if (!isNaN(cleanMarketSize)) {
      const calculated = (cleanMarketSize * (cleanPercentage / 100)).toLocaleString();
      setTargetMarketSize(calculated);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          backgroundColor: COLORS.card
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            color: COLORS.primary,
            fontWeight: 'bold',
            mb: 3
          }}
        >
          Problema ou Oportunidade Identificada
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2, color: COLORS.secondary }}>
            Sobre os clientes
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
              Quem e quanto sofre com esse problema ou seria beneficiado pela solução
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, fontStyle: 'italic' }}>
              Segmento de clientes
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Qual tamanho desse mercado?
              </Typography>
              <TextField
                fullWidth
                value={marketSize}
                onChange={(e) => setMarketSize(e.target.value)}
                onBlur={calculateTargetMarket}
                variant="outlined"
              />
            </Box>
            
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                O quanto desse mercado você pretende atingir?
              </Typography>
              <TextField
                fullWidth
                value={targetPercentage}
                onChange={(e) => setTargetPercentage(e.target.value)}
                onBlur={calculateTargetMarket}
                variant="outlined"
              />
            </Box>
            
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Tamanho do mercado atingido
              </Typography>
              <TextField
                fullWidth
                value={targetMarketSize}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  backgroundColor: COLORS.light
                }}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2, color: COLORS.secondary }}>
            Sobre os concorrentes e substitutos
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
              Quem são as empresas que exploram essa oportunidade?
            </Typography>
            <TextField
              fullWidth
              value={competitors}
              onChange={(e) => setCompetitors(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
              Como elas exploram essa oportunidade? E quais são os seus pontos fracos?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={competitorApproach}
              onChange={(e) => setCompetitorApproach(e.target.value)}
              variant="outlined"
            />
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2, color: COLORS.secondary }}>
            Sobre os novos entrantes
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
              Quem e como exploram essa oportunidade hoje?
            </Typography>
            <TextField
              fullWidth
              value={newEntrants}
              onChange={(e) => setNewEntrants(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
              Quais os Gaps dessas soluções?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={solutionGaps}
              onChange={(e) => setSolutionGaps(e.target.value)}
              variant="outlined"
            />
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2, color: COLORS.secondary }}>
            Recursos necessários para o negócio
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2, fontStyle: 'italic' }}>
            Marque como disponível os recursos que você já tem
          </Typography>

          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: COLORS.light }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Recursos</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Disponibilidade</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell>{resource.name}</TableCell>
                    <TableCell>
                      <Chip
                        icon={resource.available ? <Check /> : <Close />}
                        label={resource.available ? 'Disponível' : 'Faltante'}
                        onClick={() => toggleResourceAvailability(resource.id)}
                        color={resource.available ? 'success' : 'error'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        onClick={() => handleDeleteResource(resource.id)}
                        sx={{ color: COLORS.danger }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <TextField
                      value={newResource.name}
                      onChange={(e) => setNewResource({...newResource, name: e.target.value})}
                      size="small"
                      fullWidth
                      placeholder="Novo recurso"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={newResource.available ? <Check /> : <Close />}
                      label={newResource.available ? 'Disponível' : 'Faltante'}
                      onClick={() => setNewResource({...newResource, available: !newResource.available})}
                      color={newResource.available ? 'success' : 'error'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={handleAddResource}
                      sx={{ color: COLORS.primary }}
                    >
                      <Add />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: COLORS.primary,
              '&:hover': {
                backgroundColor: COLORS.secondary,
              },
              px: 4,
              py: 1.5,
              fontWeight: 'bold'
            }}
          >
            Salvar Alterações
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProblemOpportunityPage;
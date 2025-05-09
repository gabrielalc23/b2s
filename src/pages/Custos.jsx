import React, { useState } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  TableContainer,
  styled
} from '@mui/material';
import { Add, Delete, Edit, Save, Cancel } from '@mui/icons-material';

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

const PageContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
  padding: '20px',
  boxSizing: 'border-box',
  paddingLeft: '300px',
  transition: 'margin-left 0.3s ease',
  '@media (max-width: 900px)': {
    marginLeft: '60px'
  },
  '@media (max-width: 600px)': {
    marginLeft: '20px',
    padding: '10px'
  }
});

const ContentContainer = styled(Box)(({ theme }) => ({
  width: 'calc(100% - 120px)',
  maxWidth: '1400px',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '100%',
    padding: '0 16px'
  }
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: colors.light,
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  margin: '20px 0',
  marginLeft: '40px',
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
    marginLeft: '0'
  }
}));

const StyledTableHead = styled(TableHead)({
  backgroundColor: colors.primary,
  '& th': {
    color: colors.white,
    fontWeight: 'bold',
    whiteSpace: 'nowrap'
  }
});

const StyledTableRow = styled(TableRow)(({ index }) => ({
  backgroundColor: index % 2 === 0 ? colors.light : colors.secondary,
  '&:hover': {
    backgroundColor: colors.accent,
    opacity: 0.9
  }
}));

const ActionButton = styled(Button)({
  margin: '0 4px',
  backgroundColor: colors.primary,
  color: colors.white,
  '&:hover': {
    backgroundColor: colors.accent
  }
});

const initialRows = [
  {
    id: 1,
    product: 'Consultoria Financeira',
    cost1: 500,
    cost2: 0,
    cost3: 0,
    cost4: 0,
    cost5: 0,
    extraCosts: {}, // Novo campo para custos extras
    otherCosts: 0,
    totalCost: 500
  },
  {
    id: 2,
    product: 'Cursos Finanças Já',
    cost1: 300,
    cost2: 0,
    cost3: 0,
    cost4: 0,
    cost5: 0,
    extraCosts: {}, // Novo campo para custos extras
    otherCosts: 0,
    totalCost: 300
  }
];

const Custos = () => {
  const [rows, setRows] = useState(initialRows);
  const [newRow, setNewRow] = useState({
    product: '',
    cost1: 0,
    cost2: 0,
    cost3: 0,
    cost4: 0,
    cost5: 0,
    extraCosts: {}, // Novo campo para custos extras
    otherCosts: 0
  });
  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [nextExtraCostId, setNextExtraCostId] = useState(1);

  const calculateTotal = (row) => {
    const fixedCosts = row.cost1 + row.cost2 + row.cost3 + row.cost4 + row.cost5;
    const extraCostsSum = Object.values(row.extraCosts || {}).reduce((sum, cost) => sum + (parseFloat(cost) || 0), 0);
    const total = fixedCosts + extraCostsSum + row.otherCosts;
    return {
      ...row,
      totalCost: parseFloat(total.toFixed(2))
    };
  };

  const handleAddRow = () => {
    if (!newRow.product) return;
    
    const calculatedRow = calculateTotal({
      ...newRow,
      id: Date.now() // Usando timestamp como ID único
    });
    setRows([...rows, calculatedRow]);
    setNewRow({
      product: '',
      cost1: 0,
      cost2: 0,
      cost3: 0,
      cost4: 0,
      cost5: 0,
      extraCosts: {},
      otherCosts: 0
    });
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('extraCost-')) {
      const extraCostKey = name.split('-')[1];
      setNewRow({
        ...newRow,
        extraCosts: {
          ...newRow.extraCosts,
          [extraCostKey]: parseFloat(value) || 0
        }
      });
    } else {
      setNewRow({
        ...newRow,
        [name]: name === 'product' ? value : parseFloat(value) || 0
      });
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('extraCost-')) {
      const extraCostKey = name.split('-')[1];
      setEditRow({
        ...editRow,
        extraCosts: {
          ...editRow.extraCosts,
          [extraCostKey]: parseFloat(value) || 0
        }
      });
    } else {
      setEditRow({
        ...editRow,
        [name]: name === 'product' ? value : parseFloat(value) || 0
      });
    }
  };

  const handleEditRow = (row) => {
    setEditingId(row.id);
    setEditRow({ ...row });
  };

  const handleSaveRow = () => {
    const calculatedRow = calculateTotal(editRow);
    setRows(rows.map(row => row.id === editingId ? calculatedRow : row));
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const addExtraCostField = () => {
    const newExtraCostKey = `extra${nextExtraCostId}`;
    setNextExtraCostId(nextExtraCostId + 1);
    
    setNewRow({
      ...newRow,
      extraCosts: {
        ...newRow.extraCosts,
        [newExtraCostKey]: 0
      }
    });
  };

  const removeExtraCostField = (extraCostKey) => {
    const newExtraCosts = { ...newRow.extraCosts };
    delete newExtraCosts[extraCostKey];
    setNewRow({
      ...newRow,
      extraCosts: newExtraCosts
    });
  };

  // Função para obter todas as chaves de custos extras usadas em qualquer linha
  const getAllExtraCostKeys = () => {
    const allKeys = new Set();
    rows.forEach(row => {
      if (row.extraCosts) {
        Object.keys(row.extraCosts).forEach(key => allKeys.add(key));
      }
    });
    if (newRow.extraCosts) {
      Object.keys(newRow.extraCosts).forEach(key => allKeys.add(key));
    }
    return Array.from(allKeys);
  };

  const allExtraCostKeys = getAllExtraCostKeys();

  return (
    <PageContainer>
      <ContentContainer>
        <StyledTableContainer component={Paper}>
          <Typography variant="h4" gutterBottom style={{ color: colors.primary, textAlign: 'left', padding: '10px 0 0 50px' }}>
            Tabela de Custos
          </Typography>
          
          <Box mb={4} p={2} style={{ backgroundColor: colors.background, borderRadius: '4px' }}>
            <Typography variant="h6" gutterBottom style={{ color: colors.text }}>
              Adicionar Novo Produto/Serviço
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              <TextField
                label="Produto ou Serviço"
                name="product"
                value={newRow.product}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                fullWidth
              />
              <TextField
                label="Custo 1 (R$)"
                name="cost1"
                type="number"
                value={newRow.cost1}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
              <TextField
                label="Custo 2 (R$)"
                name="cost2"
                type="number"
                value={newRow.cost2}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
              <TextField
                label="Custo 3 (R$)"
                name="cost3"
                type="number"
                value={newRow.cost3}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
              <TextField
                label="Custo 4 (R$)"
                name="cost4"
                type="number"
                value={newRow.cost4}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
              <TextField
                label="Custo 5 (R$)"
                name="cost5"
                type="number"
                value={newRow.cost5}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
              
              {/* Campos de custos extras */}
              {allExtraCostKeys.map((extraCostKey) => (
                <Box key={extraCostKey} display="flex" alignItems="center" gap={1}>
                  <TextField
                    label={`Custo Extra ${extraCostKey.replace('extra', '')} (R$)`}
                    name={`extraCost-${extraCostKey}`}
                    type="number"
                    value={newRow.extraCosts?.[extraCostKey] || 0}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                  <IconButton
                    size="small"
                    onClick={() => removeExtraCostField(extraCostKey)}
                    style={{ color: colors.error }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              
              <Button
                variant="outlined"
                onClick={addExtraCostField}
                startIcon={<Add />}
                size="small"
              >
                Adicionar Custo Extra
              </Button>
              
              <TextField
                label="Outros Custos (R$)"
                name="otherCosts"
                type="number"
                value={newRow.otherCosts}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-start">
              <ActionButton
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddRow}
              >
                Adicionar
              </ActionButton>
            </Box>
          </Box>

          <Box sx={{ overflowX: 'auto' }}>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <TableCell>Produto/Serviço</TableCell>
                  <TableCell align="right">Custo 1</TableCell>
                  <TableCell align="right">Custo 2</TableCell>
                  <TableCell align="right">Custo 3</TableCell>
                  <TableCell align="right">Custo 4</TableCell>
                  <TableCell align="right">Custo 5</TableCell>
                  
                  {/* Cabeçalhos para custos extras */}
                  {allExtraCostKeys.map(extraCostKey => (
                    <TableCell key={extraCostKey} align="right">
                      Extra {extraCostKey.replace('extra', '')}
                    </TableCell>
                  ))}
                  
                  <TableCell align="right">Outros Custos</TableCell>
                  <TableCell align="right">Custo Total</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <StyledTableRow key={row.id} index={index}>
                    {editingId === row.id ? (
                      <>
                        <TableCell>
                          <TextField
                            name="product"
                            value={editRow.product}
                            onChange={handleEditInputChange}
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            name="cost1"
                            type="number"
                            value={editRow.cost1}
                            onChange={handleEditInputChange}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            name="cost2"
                            type="number"
                            value={editRow.cost2}
                            onChange={handleEditInputChange}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            name="cost3"
                            type="number"
                            value={editRow.cost3}
                            onChange={handleEditInputChange}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            name="cost4"
                            type="number"
                            value={editRow.cost4}
                            onChange={handleEditInputChange}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            name="cost5"
                            type="number"
                            value={editRow.cost5}
                            onChange={handleEditInputChange}
                            size="small"
                          />
                        </TableCell>
                        
                        {/* Campos de edição para custos extras */}
                        {allExtraCostKeys.map(extraCostKey => (
                          <TableCell key={extraCostKey} align="right">
                            <TextField
                              name={`extraCost-${extraCostKey}`}
                              type="number"
                              value={editRow.extraCosts?.[extraCostKey] || 0}
                              onChange={handleEditInputChange}
                              size="small"
                            />
                          </TableCell>
                        ))}
                        
                        <TableCell align="right">
                          <TextField
                            name="otherCosts"
                            type="number"
                            value={editRow.otherCosts}
                            onChange={handleEditInputChange}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                          {formatCurrency(calculateTotal(editRow).totalCost)}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="save"
                            onClick={handleSaveRow}
                            style={{ color: colors.success }}
                          >
                            <Save />
                          </IconButton>
                          <IconButton
                            aria-label="cancel"
                            onClick={handleCancelEdit}
                            style={{ color: colors.warning }}
                          >
                            <Cancel />
                          </IconButton>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{row.product}</TableCell>
                        <TableCell align="right">{formatCurrency(row.cost1)}</TableCell>
                        <TableCell align="right">{formatCurrency(row.cost2)}</TableCell>
                        <TableCell align="right">{formatCurrency(row.cost3)}</TableCell>
                        <TableCell align="right">{formatCurrency(row.cost4)}</TableCell>
                        <TableCell align="right">{formatCurrency(row.cost5)}</TableCell>
                        
                        {/* Valores dos custos extras */}
                        {allExtraCostKeys.map(extraCostKey => (
                          <TableCell key={extraCostKey} align="right">
                            {formatCurrency(row.extraCosts?.[extraCostKey] || 0)}
                          </TableCell>
                        ))}
                        
                        <TableCell align="right">{formatCurrency(row.otherCosts)}</TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                          {formatCurrency(row.totalCost)}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleEditRow(row)}
                            style={{ color: colors.primary }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDeleteRow(row.id)}
                            style={{ color: colors.error }}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </>
                    )}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </StyledTableContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default Custos;
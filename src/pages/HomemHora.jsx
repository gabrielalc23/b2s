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
    hours: {
      hour1: 2000,
      hour2: 0,
      hour3: 0,
      hour4: 0,
      hour5: 0,
      hour6: 0
    },
    totalHourValue: 2000
  },
  {
    id: 2,
    product: 'Cursos Finanças Já',
    hours: {
      hour1: 0,
      hour2: 0,
      hour3: 0,
      hour4: 0,
      hour5: 0,
      hour6: 0
    },
    totalHourValue: 0
  }
];

const HomemHora = () => {
  const [rows, setRows] = useState(initialRows);
  const [newRow, setNewRow] = useState({
    product: '',
    hours: { hour1: 0, hour2: 0, hour3: 0, hour4: 0, hour5: 0, hour6: 0 }
  });
  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [nextHourId, setNextHourId] = useState(7); // Começa em 7 porque já temos hour1 a hour6

  const calculateTotal = (row) => {
    const hoursSum = Object.values(row.hours || {}).reduce((sum, hour) => sum + (parseFloat(hour) || 0), 0);
    return {
      ...row,
      totalHourValue: parseFloat(hoursSum.toFixed(2))
    };
  };

  const handleAddRow = () => {
    if (!newRow.product) return;
    
    const calculatedRow = calculateTotal({
      ...newRow,
      id: Date.now() // ID único
    });
    setRows([...rows, calculatedRow]);
    setNewRow({
      product: '',
      hours: { hour1: 0, hour2: 0, hour3: 0, hour4: 0, hour5: 0, hour6: 0 }
    });
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('hour-')) {
      const hourKey = name.split('-')[1];
      setNewRow({
        ...newRow,
        hours: {
          ...newRow.hours,
          [hourKey]: parseFloat(value) || 0
        }
      });
    } else {
      setNewRow({
        ...newRow,
        [name]: value
      });
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('hour-')) {
      const hourKey = name.split('-')[1];
      setEditRow({
        ...editRow,
        hours: {
          ...editRow.hours,
          [hourKey]: parseFloat(value) || 0
        }
      });
    } else {
      setEditRow({
        ...editRow,
        [name]: value
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

  const addHourField = () => {
    const newHourKey = `hour${nextHourId}`;
    setNextHourId(nextHourId + 1);
    
    setNewRow({
      ...newRow,
      hours: {
        ...newRow.hours,
        [newHourKey]: 0
      }
    });
  };

  const removeHourField = (hourKey) => {
    const newHours = { ...newRow.hours };
    delete newHours[hourKey];
    setNewRow({
      ...newRow,
      hours: newHours
    });
  };

  const getAllHourKeys = () => {
    const allKeys = new Set();
    rows.forEach(row => {
      if (row.hours) {
        Object.keys(row.hours).forEach(key => allKeys.add(key));
      }
    });
    if (newRow.hours) {
      Object.keys(newRow.hours).forEach(key => allKeys.add(key));
    }
    return Array.from(allKeys).sort((a, b) => {
      const numA = parseInt(a.replace('hour', ''));
      const numB = parseInt(b.replace('hour', ''));
      return numA - numB;
    });
  };

  const allHourKeys = getAllHourKeys();

  return (
    <PageContainer>
      <ContentContainer>
        <StyledTableContainer component={Paper}>
          <Typography variant="h4" gutterBottom style={{ color: colors.primary, textAlign: 'left', padding: '10px 0 0 50px' }}>
            Precificação de Homem/Hora
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
              
              {allHourKeys.map((hourKey) => (
                <Box key={hourKey} display="flex" alignItems="center" gap={1}>
                  <TextField
                    label={`Homem Hora ${hourKey.replace('hour', '')} (R$)`}
                    name={`hour-${hourKey}`}
                    type="number"
                    value={newRow.hours?.[hourKey] || 0}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                  />
                  {parseInt(hourKey.replace('hour', '')) > 6 && (
                    <IconButton
                      size="small"
                      onClick={() => removeHourField(hourKey)}
                      style={{ color: colors.error }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              ))}
              
              <Button
                variant="outlined"
                onClick={addHourField}
                startIcon={<Add />}
                size="small"
              >
                Adicionar Homem Hora
              </Button>
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-start">
              <ActionButton
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddRow}
              >
                Adicionar Produto
              </ActionButton>
            </Box>
          </Box>

          <Box sx={{ overflowX: 'auto' }}>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <TableCell>Produto/Serviço</TableCell>
                  {allHourKeys.map(hourKey => (
                    <TableCell key={hourKey} align="right">
                      Homem Hora {hourKey.replace('hour', '')}
                    </TableCell>
                  ))}
                  <TableCell align="right">Valor Total</TableCell>
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
                        
                        {allHourKeys.map(hourKey => (
                          <TableCell key={hourKey} align="right">
                            <TextField
                              name={`hour-${hourKey}`}
                              type="number"
                              value={editRow.hours?.[hourKey] || 0}
                              onChange={handleEditInputChange}
                              size="small"
                            />
                          </TableCell>
                        ))}
                        
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                          {formatCurrency(calculateTotal(editRow).totalHourValue)}
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
                        
                        {allHourKeys.map(hourKey => (
                          <TableCell key={hourKey} align="right">
                            {formatCurrency(row.hours?.[hourKey] || 0)}
                          </TableCell>
                        ))}
                        
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                          {formatCurrency(row.totalHourValue)}
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

export default HomemHora;
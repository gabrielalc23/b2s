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
  MenuItem
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

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

const PromotionStrategyPage = () => {
  const [marketingExpenses, setMarketingExpenses] = useState([
    {
      id: 1,
      description: 'Google Adwords',
      type: 'Online',
      value: 'R$3.000,00',
      annualAdjustment: '5,00%',
      startDate: 'Mar2022',
      endDate: 'Jul2022'
    },
    {
      id: 2,
      description: 'Propaganda em Revistas',
      type: 'Offline',
      value: 'R$2.000,00',
      annualAdjustment: '5,00%',
      startDate: 'Set2022',
      endDate: 'Out2026'
    }
  ]);

  const [newExpense, setNewExpense] = useState({
    description: '',
    type: 'Online',
    value: '',
    annualAdjustment: '',
    startDate: '',
    endDate: ''
  });

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.value) {
      setMarketingExpenses([...marketingExpenses, {
        id: marketingExpenses.length + 1,
        ...newExpense
      }]);
      setNewExpense({
        description: '',
        type: 'Online',
        value: '',
        annualAdjustment: '',
        startDate: '',
        endDate: ''
      });
    }
  };

  const handleDeleteExpense = (id) => {
    setMarketingExpenses(marketingExpenses.filter(expense => expense.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({
      ...newExpense,
      [name]: value
    });
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
          Definição de Promoção
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2, color: COLORS.secondary }}>
            Veja o que já foi definido por você para a Promoção
          </Typography>
          <Typography variant="subtitle1" sx={{ 
            mb: 2,
            p: 2,
            backgroundColor: COLORS.light,
            borderRadius: 1,
            borderLeft: `4px solid ${COLORS.info}`
          }}>
            Resposta 6 - Resposta 7 - Resposta 8 - Resposta 9
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h2" sx={{ mb: 3, color: COLORS.secondary }}>
          Despesas com Marketing
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: COLORS.light }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Descrição</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Valor</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Reajuste Anual</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Início</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Fim</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marketingExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.type}</TableCell>
                  <TableCell>{expense.value}</TableCell>
                  <TableCell>{expense.annualAdjustment}</TableCell>
                  <TableCell>{expense.startDate}</TableCell>
                  <TableCell>{expense.endDate}</TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleDeleteExpense(expense.id)}
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
                    name="description"
                    value={newExpense.description}
                    onChange={handleInputChange}
                    size="small"
                    fullWidth
                    placeholder="Nova despesa"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    select
                    name="type"
                    value={newExpense.type}
                    onChange={handleInputChange}
                    size="small"
                    fullWidth
                  >
                    <MenuItem value="Online">Online</MenuItem>
                    <MenuItem value="Offline">Offline</MenuItem>
                  </TextField>
                </TableCell>
                <TableCell>
                  <TextField
                    name="value"
                    value={newExpense.value}
                    onChange={handleInputChange}
                    size="small"
                    fullWidth
                    placeholder="R$0,00"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="annualAdjustment"
                    value={newExpense.annualAdjustment}
                    onChange={handleInputChange}
                    size="small"
                    fullWidth
                    placeholder="0,00%"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="startDate"
                    value={newExpense.startDate}
                    onChange={handleInputChange}
                    size="small"
                    fullWidth
                    placeholder="MmmAAAA"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="endDate"
                    value={newExpense.endDate}
                    onChange={handleInputChange}
                    size="small"
                    fullWidth
                    placeholder="MmmAAAA"
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    onClick={handleAddExpense}
                    sx={{ color: COLORS.primary }}
                  >
                    <Add />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

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

export default PromotionStrategyPage;
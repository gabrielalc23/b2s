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
  styled,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip
} from '@mui/material';
import { Add, Delete, Edit, Save, Cancel, FilterList } from '@mui/icons-material';

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

const ResponsivePageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
  padding: theme.spacing(2),
  boxSizing: 'border-box',
  paddingLeft: '300px',
  transition: 'padding-left 0.3s ease',
  [theme.breakpoints.down('lg')]: {
    paddingLeft: '280px'
  },
  [theme.breakpoints.down('md')]: {
    paddingLeft: '20px'
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1)
  }
}));

const ResponsiveContentContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1400px',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '100%'
  }
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: colors.light,
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  margin: theme.spacing(2, 0),
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(1, 0)
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
    cost: 500,
    hourValue: 2000,
    markup: 120,
    taxes: 15,
    annualVariation: 10
  },
  {
    id: 2,
    product: 'Cursos Finanças Já',
    cost: 300,
    hourValue: 0,
    markup: 80,
    taxes: 15,
    annualVariation: 10
  }
];

const Precificacao = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [rows, setRows] = useState(initialRows.map(calculateValues));
  const [newRow, setNewRow] = useState({
    product: '',
    cost: 0,
    hourValue: 0,
    markup: 0,
    taxes: 0,
    annualVariation: 0
  });
  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    hourValue: !isMobile,
    markupPrice: !isMobile,
    taxes: !isMobile,
    annualVariation: !isMobile,
    directCosts: !isMobile,
    taxAmount: !isMobile,
    contributionMargin: !isMobile
  });

  function calculateValues(row) {
    const markupDecimal = row.markup / 100;
    const markupPrice = row.cost * (1 + markupDecimal);
    const taxDecimal = row.taxes / 100;
    const annualVarDecimal = row.annualVariation / 100;
    const finalPrice = markupPrice * (1 + taxDecimal) * (1 + annualVarDecimal);
    const taxAmount = finalPrice - markupPrice;
    const contributionMargin = markupPrice - row.cost;

    return {
      ...row,
      markupPrice: parseFloat(markupPrice.toFixed(2)),
      finalPrice: parseFloat(finalPrice.toFixed(2)),
      taxAmount: parseFloat(taxAmount.toFixed(2)),
      contributionMargin: parseFloat(contributionMargin.toFixed(2)),
      directCosts: row.cost
    };
  }

  const handleAddRow = () => {
    if (!newRow.product) return;
    
    const calculatedRow = calculateValues({
      ...newRow,
      id: Date.now()
    });
    setRows([...rows, calculatedRow]);
    setNewRow({
      product: '',
      cost: 0,
      hourValue: 0,
      markup: 0,
      taxes: 0,
      annualVariation: 0
    });
    setOpenAddDialog(false);
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow({
      ...newRow,
      [name]: name === 'product' ? value : parseFloat(value) || 0
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditRow({
      ...editRow,
      [name]: name === 'product' ? value : parseFloat(value) || 0
    });
  };

  const handleEditRow = (row) => {
    setEditingId(row.id);
    setEditRow({ ...row });
  };

  const handleSaveRow = () => {
    const calculatedRow = calculateValues(editRow);
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

  const formatPercentage = (value) => {
    return `${value}%`;
  };

  const toggleColumnVisibility = (column) => {
    setVisibleColumns({
      ...visibleColumns,
      [column]: !visibleColumns[column]
    });
  };

  return (
    <ResponsivePageContainer>
      <ResponsiveContentContainer>
        <StyledTableContainer component={Paper}>
          <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <Typography variant="h4" style={{ color: colors.primary }}>
              Tabela de Precificação
            </Typography>
            
            <Box display="flex" gap={1}>
              {!isMobile && (
                <ActionButton
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setOpenAddDialog(true)}
                >
                  Adicionar
                </ActionButton>
              )}
              
              {isMobile && (
                <Tooltip title="Adicionar">
                  <IconButton
                    color="primary"
                    onClick={() => setOpenAddDialog(true)}
                  >
                    <Add />
                  </IconButton>
                </Tooltip>
              )}
              
              <Tooltip title="Filtrar Colunas">
                <IconButton
                  color="primary"
                  onClick={() => {
                    // Implementar menu de seleção de colunas
                    alert('Selecione as colunas para exibir');
                  }}
                >
                  <FilterList />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Formulário de adição em Dialog para mobile */}
          <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} fullScreen={isMobile}>
            <DialogTitle>Adicionar Novo Produto/Serviço</DialogTitle>
            <DialogContent>
              <Box display="flex" flexDirection="column" gap={2} mt={2}>
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
                  label="Custo (R$)"
                  name="cost"
                  type="number"
                  value={newRow.cost}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
                {!isMobile && (
                  <>
                    <TextField
                      label="Valor Hora (R$)"
                      name="hourValue"
                      type="number"
                      value={newRow.hourValue}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                    <TextField
                      label="Mark-up (%)"
                      name="markup"
                      type="number"
                      value={newRow.markup}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                    <TextField
                      label="Impostos (%)"
                      name="taxes"
                      type="number"
                      value={newRow.taxes}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                    <TextField
                      label="Variação Anual (%)"
                      name="annualVariation"
                      type="number"
                      value={newRow.annualVariation}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenAddDialog(false)} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleAddRow} color="primary" variant="contained">
                Adicionar
              </Button>
            </DialogActions>
          </Dialog>

          <Box sx={{ overflowX: 'auto' }}>
            <Table size={isMobile ? 'small' : 'medium'}>
              <StyledTableHead>
                <TableRow>
                  <TableCell>Produto/Serviço</TableCell>
                  <TableCell align="right">Custo (R$)</TableCell>
                  {visibleColumns.hourValue && (
                    <TableCell align="right">Valor Hora (R$)</TableCell>
                  )}
                  <TableCell align="right">Mark-up</TableCell>
                  {visibleColumns.markupPrice && (
                    <TableCell align="right">Preço com markup</TableCell>
                  )}
                  {visibleColumns.taxes && (
                    <TableCell align="right">Impostos</TableCell>
                  )}
                  {visibleColumns.annualVariation && (
                    <TableCell align="right">Variação Anual</TableCell>
                  )}
                  <TableCell align="right">Preço Final</TableCell>
                  {visibleColumns.directCosts && (
                    <TableCell align="right">Custos Diretos</TableCell>
                  )}
                  {visibleColumns.taxAmount && (
                    <TableCell align="right">Impostos (R$)</TableCell>
                  )}
                  {visibleColumns.contributionMargin && (
                    <TableCell align="right">Margem Contribuição</TableCell>
                  )}
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
                            name="cost"
                            type="number"
                            value={editRow.cost}
                            onChange={handleEditInputChange}
                            size="small"
                          />
                        </TableCell>
                        {visibleColumns.hourValue && (
                          <TableCell align="right">
                            <TextField
                              name="hourValue"
                              type="number"
                              value={editRow.hourValue}
                              onChange={handleEditInputChange}
                              size="small"
                            />
                          </TableCell>
                        )}
                        <TableCell align="right">
                          <TextField
                            name="markup"
                            type="number"
                            value={editRow.markup}
                            onChange={handleEditInputChange}
                            size="small"
                          />
                        </TableCell>
                        {visibleColumns.markupPrice && (
                          <TableCell align="right">
                            {formatCurrency(calculateValues(editRow).markupPrice)}
                          </TableCell>
                        )}
                        {visibleColumns.taxes && (
                          <TableCell align="right">
                            <TextField
                              name="taxes"
                              type="number"
                              value={editRow.taxes}
                              onChange={handleEditInputChange}
                              size="small"
                            />
                          </TableCell>
                        )}
                        {visibleColumns.annualVariation && (
                          <TableCell align="right">
                            <TextField
                              name="annualVariation"
                              type="number"
                              value={editRow.annualVariation}
                              onChange={handleEditInputChange}
                              size="small"
                            />
                          </TableCell>
                        )}
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                          {formatCurrency(calculateValues(editRow).finalPrice)}
                        </TableCell>
                        {visibleColumns.directCosts && (
                          <TableCell align="right">
                            {formatCurrency(editRow.cost)}
                          </TableCell>
                        )}
                        {visibleColumns.taxAmount && (
                          <TableCell align="right">
                            {formatCurrency(calculateValues(editRow).taxAmount)}
                          </TableCell>
                        )}
                        {visibleColumns.contributionMargin && (
                          <TableCell align="right" style={{ color: colors.success }}>
                            {formatCurrency(calculateValues(editRow).contributionMargin)}
                          </TableCell>
                        )}
                        <TableCell align="center" style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                          <Tooltip title="Salvar">
                            <IconButton
                              aria-label="save"
                              onClick={handleSaveRow}
                              style={{ color: colors.success }}
                            >
                              <Save />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Cancelar">
                            <IconButton
                              aria-label="cancel"
                              onClick={handleCancelEdit}
                              style={{ color: colors.warning }}
                            >
                              <Cancel />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{row.product}</TableCell>
                        <TableCell align="right">{formatCurrency(row.cost)}</TableCell>
                        {visibleColumns.hourValue && (
                          <TableCell align="right">{formatCurrency(row.hourValue)}</TableCell>
                        )}
                        <TableCell align="right">{formatPercentage(row.markup)}</TableCell>
                        {visibleColumns.markupPrice && (
                          <TableCell align="right">{formatCurrency(row.markupPrice)}</TableCell>
                        )}
                        {visibleColumns.taxes && (
                          <TableCell align="right">{formatPercentage(row.taxes)}</TableCell>
                        )}
                        {visibleColumns.annualVariation && (
                          <TableCell align="right">{formatPercentage(row.annualVariation)}</TableCell>
                        )}
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                          {formatCurrency(row.finalPrice)}
                        </TableCell>
                        {visibleColumns.directCosts && (
                          <TableCell align="right">{formatCurrency(row.directCosts)}</TableCell>
                        )}
                        {visibleColumns.taxAmount && (
                          <TableCell align="right">{formatCurrency(row.taxAmount)}</TableCell>
                        )}
                        {visibleColumns.contributionMargin && (
                          <TableCell align="right" style={{ color: colors.success }}>
                            {formatCurrency(row.contributionMargin)}
                          </TableCell>
                        )}
                        <TableCell align="center" style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                          <Tooltip title="Editar">
                            <IconButton
                              aria-label="edit"
                              onClick={() => handleEditRow(row)}
                              style={{ color: colors.primary }}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Excluir">
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDeleteRow(row.id)}
                              style={{ color: colors.error }}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </>
                    )}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </StyledTableContainer>
      </ResponsiveContentContainer>
    </ResponsivePageContainer>
  );
};

export default Precificacao;
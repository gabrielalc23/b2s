import React from 'react';
import { Box, Typography, Container, Paper, TextField, Button, Divider } from '@mui/material';

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

const DistributionStrategyPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
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
          Definição de Praça (Distribuição)
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2, color: COLORS.secondary }}>
            Veja o que já foi definido por você para Praça
          </Typography>
          <Typography variant="subtitle1" sx={{ 
            mb: 2, 
            fontStyle: 'italic',
            p: 2,
            backgroundColor: COLORS.light,
            borderRadius: 1,
            borderLeft: `4px solid ${COLORS.info}`
          }}>
            Site - Redes Sociais
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h2" sx={{ mb: 3, color: COLORS.secondary }}>
          Responda às questões abaixo
        </Typography>

        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: COLORS.dark }}>
              Em quais locais (ou tipos de mídias) o cliente procura seu produto?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Resposta 6"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: COLORS.info,
                  },
                  '&:hover fieldset': {
                    borderColor: COLORS.primary,
                  },
                }
              }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: COLORS.dark }}>
              Como você pode acessar canais de distribuição?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Resposta 7"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: COLORS.info,
                  },
                  '&:hover fieldset': {
                    borderColor: COLORS.primary,
                  },
                }
              }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: COLORS.dark }}>
              Quais são os seus canais de venda?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Resposta 8"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: COLORS.info,
                  },
                  '&:hover fieldset': {
                    borderColor: COLORS.primary,
                  },
                }
              }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: COLORS.dark }}>
              Onde seus concorrentes estão?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Resposta 9"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: COLORS.info,
                  },
                  '&:hover fieldset': {
                    borderColor: COLORS.primary,
                  },
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
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
              Salvar Respostas
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default DistributionStrategyPage;
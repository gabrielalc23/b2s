import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, TextField, Button, Container, Paper, Divider } from '@mui/material';

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

const ProductDefinitionForm = () => {
  const theme = useTheme();

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
          Definição do Produto/Serviço
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Veja o que já foi definido por você sobre o produto ou serviço.
          </Typography>
          <Box 
            sx={{ 
              p: 2, 
              backgroundColor: COLORS.light,
              borderRadius: 1,
              borderLeft: `4px solid ${COLORS.info}`
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Você optou por um modelo de negócio em que o seu maior atributo é <span style={{ color: COLORS.primary }}>Expertise Financeira</span>
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h2" sx={{ mb: 3, color: COLORS.secondary }}>
          Responda às questões abaixo
        </Typography>

        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: COLORS.dark }}>
              O que o cliente espera do produto/serviço?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Resposta 1"
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
              Quais atributos ele precisa ter?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Resposta 2"
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
              Como ele será usado?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Resposta 3"
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
              Qual a imagem o produto/serviço quer passar?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Resposta 4"
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
              Como pretende trabalhar essa marca?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Resposta 5"
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

export default ProductDefinitionForm;
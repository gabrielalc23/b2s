import React, { useState } from 'react';
import { Box, Typography, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Chip, Select, MenuItem, FormControl } from '@mui/material';

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

const answerOptions = [
  "Concordo Totalmente",
  "Concordo Parcialmente",
  "Não concordo e nem discordo",
  "Discordo Parcialmente",
  "Discordo Totalmente"
];

const PricingStrategyPage = () => {
  const [answers, setAnswers] = useState([
    { question: "Sua estratégia de vendas visa grande demanda", answer: "Concordo Totalmente" },
    { question: "O cliente é fortemente influenciado pelo preço", answer: "Não concordo e nem discordo" },
    { question: "O cliente valoriza a qualidade do produto em detrimento do preço", answer: "Concordo Parcialmente" },
    { question: "Sua estratégia visa acelerar a penetração no mercado", answer: "Concordo Parcialmente" },
    { question: "Sua linha de produtos/serviços é considerada Premium", answer: "Concordo Totalmente" },
  ]);

  const handleAnswerChange = (index, newAnswer) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = newAnswer;
    setAnswers(newAnswers);
  };

  const strategyDefinitions = [
    {
      name: "Estratégia Premium",
      description: "Para produtos de alta qualidade. Nesse caso, pode-se praticar um preço alto, visando atingir a faixa alta do mercado com uma imagem de prestígio no mercado."
    },
    {
      name: "Estratégia de Alto Valor",
      description: "Para produtos de alta qualidade. Pratica-se um preço médio tentando obter uma rápida penetração de mercado."
    },
    {
      name: "Estratégia de Valor Supremo",
      description: "Produto de alta qualidade a preço baixo. Recomendado para se obter uma rápida introdução no mercado."
    },
    {
      name: "Estratégia de Alto preço",
      description: "Produto de qualidade média e preço alto. É uma estratégia que valoriza o produto através do preço psicológico, visando lucratividade a outro prazo."
    },
    {
      name: "Estratégia de Médio Preço",
      description: "Preço compatível com a qualidade do produto, objetivando uma participação aceitável do mercado."
    },
    {
      name: "Estratégia de Valor Médio",
      description: "Produto de média qualidade a preço baixo. Recomendado para se obter uma rápida introdução no mercado."
    },
    {
      name: "Estratégia de Desconto",
      description: "Preço alto com qualidade baixa. Tem-se uma vantagem inicial e há uma retirada rápida do mercado."
    },
    {
      name: "Estratégia de Falsa Economia",
      description: "Preço médio para um produto de baixa qualidade. Pode-se com essa estratégia buscar tirar vantagem da marca ou de uma falsa imagem criada."
    },
    {
      name: "Estratégia de Economia",
      description: "Preços baixos e baixa qualidade. Procura-se vender com esta estratégia grande quantidade."
    }
  ];

  // Função para determinar a estratégia recomendada
  const getRecommendedStrategy = () => {
    // Lógica simplificada para determinar a estratégia
    // Numa aplicação real, isso seria mais complexo baseado nas respostas
    const qualityAnswers = answers[2].answer; // "O cliente valoriza a qualidade..."
    const premiumAnswers = answers[4].answer; // "Sua linha de produtos/serviços é considerada Premium"
    
    if (premiumAnswers === "Concordo Totalmente" || premiumAnswers === "Concordo Parcialmente") {
      if (qualityAnswers === "Concordo Totalmente") {
        return "Estratégia Premium";
      } else if (qualityAnswers === "Concordo Parcialmente") {
        return "Estratégia de Alto Valor";
      } else {
        return "Estratégia de Valor Supremo";
      }
    } else if (premiumAnswers === "Não concordo e nem discordo") {
      return "Estratégia de Médio Preço";
    } else {
      return "Estratégia de Economia";
    }
  };

  const recommendedStrategy = getRecommendedStrategy();

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
          Definição de Preço
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2, color: COLORS.secondary }}>
            Veja o que já foi definido por você sobre o preço
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2, fontStyle: 'italic' }}>
            Projetos de consultoria financeira – Cursos online e produtos digitais
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" component="h2" sx={{ mb: 3, color: COLORS.secondary }}>
          Responda às questões abaixo
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableBody>
              {answers.map((item, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', borderBottom: 'none' }}>
                    {item.question}
                  </TableCell>
                  <TableCell align="right" sx={{ borderBottom: 'none' }}>
                    <FormControl size="small" sx={{ minWidth: 200 }}>
                      <Select
                        value={item.answer}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        sx={{
                          backgroundColor: 
                            item.answer === "Concordo Totalmente" ? COLORS.success : 
                            item.answer === "Concordo Parcialmente" ? COLORS.info : 
                            item.answer === "Não concordo e nem discordo" ? COLORS.light :
                            item.answer === "Discordo Parcialmente" ? COLORS.warning :
                            COLORS.danger,
                          color: COLORS.dark
                        }}
                      >
                        {answerOptions.map((option, i) => (
                          <MenuItem key={i} value={option}>{option}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" component="h2" sx={{ mb: 3, color: COLORS.secondary }}>
          A estratégia de preço definida foi a:
        </Typography>

        <Box sx={{ mb: 4, p: 3, backgroundColor: COLORS.primary, color: COLORS.card, borderRadius: 1 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {recommendedStrategy}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {strategyDefinitions.find(s => s.name === recommendedStrategy)?.description}
          </Typography>
        </Box>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Preço Alto</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Preço Médio</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Preço Baixo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Qualidade Alta</TableCell>
                <TableCell align="center" sx={{ backgroundColor: recommendedStrategy === "Estratégia Premium" ? COLORS.success : COLORS.light, color: recommendedStrategy === "Estratégia Premium" ? COLORS.card : COLORS.dark }}>Estratégia Premium</TableCell>
                <TableCell align="center" sx={{ backgroundColor: recommendedStrategy === "Estratégia de Alto Valor" ? COLORS.info : COLORS.light, color: recommendedStrategy === "Estratégia de Alto Valor" ? COLORS.card : COLORS.dark }}>Estratégia de Alto Valor</TableCell>
                <TableCell align="center" sx={{ backgroundColor: recommendedStrategy === "Estratégia de Valor Supremo" ? COLORS.warning : COLORS.light, color: recommendedStrategy === "Estratégia de Valor Supremo" ? COLORS.card : COLORS.dark }}>Estratégia de Valor Supremo</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Qualidade Média</TableCell>
                <TableCell align="center" sx={{ backgroundColor: recommendedStrategy === "Estratégia de Alto Preço" ? COLORS.info : COLORS.light, color: recommendedStrategy === "Estratégia de Alto Preço" ? COLORS.card : COLORS.dark }}>Estratégia de Alto Preço</TableCell>
                <TableCell align="center" sx={{ backgroundColor: recommendedStrategy === "Estratégia de Médio Preço" ? COLORS.light : COLORS.light }}>Estratégia de Médio Preço</TableCell>
                <TableCell align="center" sx={{ backgroundColor: recommendedStrategy === "Estratégia de Valor Médio" ? COLORS.light : COLORS.light }}>Estratégia de Valor Médio</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>Qualidade Baixa</TableCell>
                <TableCell align="center" sx={{ backgroundColor: recommendedStrategy === "Estratégia de Desconto" ? COLORS.warning : COLORS.light, color: recommendedStrategy === "Estratégia de Desconto" ? COLORS.card : COLORS.dark }}>Estratégia de Desconto</TableCell>
                <TableCell align="center" sx={{ backgroundColor: recommendedStrategy === "Estratégia de Falsa Economia" ? COLORS.danger : COLORS.light, color: recommendedStrategy === "Estratégia de Falsa Economia" ? COLORS.card : COLORS.dark }}>Estratégia de Falsa Economia</TableCell>
                <TableCell align="center" sx={{ backgroundColor: recommendedStrategy === "Estratégia de Economia" ? COLORS.light : COLORS.light }}>Estratégia de Economia</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" component="h2" sx={{ mb: 3, color: COLORS.secondary }}>
          Definições das Estratégias
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {strategyDefinitions.map((strategy, index) => (
            <Box key={index} sx={{ p: 2, borderLeft: `4px solid ${COLORS.primary}`, backgroundColor: COLORS.light }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: COLORS.primary }}>
                {strategy.name}
              </Typography>
              <Typography variant="body1">
                {strategy.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default PricingStrategyPage;
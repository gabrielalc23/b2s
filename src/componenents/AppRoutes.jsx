import { Route, Routes } from "react-router";
import App from "../App";
import { Modelagem } from "../pages/Modelagem";
import { Pedidos } from "../pages/Pedidos";
import { Produtos } from "../pages/Produtos";
import { Clientes } from "../pages/Clientes";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";

import CadastroDepartamentos from "../pages/Cadastro/CadastroDepartamentos";
import CadastroEquipes from "../pages/Cadastro/CadastroEquipes";
import CadastroEmpresa from "../pages/Cadastro/CadastroEmpresa";
import CadastroSocios from "../pages/Cadastro/CadastroSocios";
import { CurvaDeValores } from "../pages/CurvaDeValores";
import { Canvas } from "../pages/Canvas";
import { Estrategia } from "../pages/Estrategia";
import CadastroDiretrizesEmpresa from "../pages/Diretrizes";
import Forcas from "../pages/Forcas";
import { Informacoes } from "../pages/Informacoes.jsx";
import AnaliseSWOT from "../pages/Swot";
import MetasPlanosAcao from "../pages/Acoes";
import MetasEmpresa from "../pages/Metas";
import ProductDefinitionForm from "../pages/Produto";
import PricingStrategyPage from "../pages/Preco";
import DistributionStrategyPage from "../pages/Praca";
import PromotionStrategyPage from "../pages/Promocao";
import ProblemOpportunityPage from "../pages/Mercado";
import Precificacao from "../pages/Precificacao";
import Custos from "../pages/Custos";
import HomemHora from "../pages/HomemHora";

export const AppRoutes = () => {
  return (
    <>
      <Routes>

        <Route path="/" element={<App />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        

        <Route path="/informacoes" element={<Informacoes />} />
        <Route path="/informacoes/empresa" element={<CadastroEmpresa />} />
        <Route path="/informacoes/socios" element={<CadastroSocios />} />
        <Route path="/informacoes/departamentos" element={<CadastroDepartamentos />} />
        <Route path="/informacoes/equipe" element={<CadastroEquipes />} />

        <Route path="/modelagem" element={<Modelagem />} />
        <Route path="/modelagem/canvas" element={<Canvas />} />
        <Route path="/modelagem/curva-de-valor" element={<CurvaDeValores />} />

        <Route path="/estrategia" element={<Estrategia />} />
        <Route path="/estrategia/diretrizes" element={<CadastroDiretrizesEmpresa />} />
        <Route path="/estrategia/forcas" element={<Forcas />} />
        <Route path="/estrategia/swot" element={<AnaliseSWOT />} />
        <Route path="/estrategia/metas" element={<MetasEmpresa />} />
        <Route path="/estrategia/acoes" element={<MetasPlanosAcao />} />

        <Route path="/marketing" element={<ProductDefinitionForm />} />
        <Route path="/marketing/produto" element={<ProductDefinitionForm />} />
        <Route path="/marketing/preco" element={<PricingStrategyPage />} />
        <Route path="/marketing/praca" element={<DistributionStrategyPage />} />
        <Route path="/marketing/promocao" element={<PromotionStrategyPage />} />
        <Route path="/marketing/mercado" element={<ProblemOpportunityPage />} />

        <Route path="/preco" element={<Precificacao  />} />
        <Route path="/preco/precificacao" element={<Precificacao  />} />
        <Route path="/preco/custos" element={<Custos />} />
        <Route path="/preco/homem-hora" element={<HomemHora />} />
      </Routes>
    </>
  );
};

import { Form, InputGroup, Table } from "react-bootstrap";
import "./App.css";
import { Input, TextField } from "@mui/material";
import CadastroEmpresa from "./pages/Cadastro/CadastroEmpresa.jsx";

function App() {
  return (
    <div className="container">
        <CadastroEmpresa />
    </div>
  );
}

export default App;

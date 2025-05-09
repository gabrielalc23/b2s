import { Container, Table } from "react-bootstrap";
import { Input, TextField } from "@mui/material";

export function Empresa() {


    return (
        <>

            <Container>
                <div className="final d-flex flex-row-reverse p-1" >

                    <button type="button" class="btn btn-success">Nova empresa </button>

                </div>                <Table bordered hover className="rounded">
                    <thead >
                        <tr>
                            <th colSpan={2} className="mb-2 bg-secondary text-white">Dados sobre empresa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="mb-2 bg-secondary text-white">Nome</td>
                            <td>LUZ Planilhas</td>
                        </tr>
                        <tr>
                            <td className="mb-2 bg-secondary text-white">Razão Social</td>
                            <td>LUZ LAB DE IDEAS LTDA</td>
                        </tr>
                        <tr>
                            <td className="mb-2 bg-secondary text-white">Endereço</td>
                            <td>Rua da matriz</td>
                        </tr>
                        <tr>
                            <td className="mb-2 bg-secondary text-white">Complemento</td>
                            <td>93</td>
                        </tr>
                        <tr>
                            <td className="mb-2 bg-secondary text-white">Cidade - Estado</td>
                            <td>Rio de janeiro - RJ</td>
                        </tr>
                        <tr>
                            <td className="mb-2 bg-secondary text-white">Telefone com DDD</td>
                            <td>21994432-3256</td>
                        </tr>
                        <tr>
                            <td className="mb-2 bg-secondary text-white">E-mail</td>
                            <td>Email</td>
                        </tr>
                        <tr>
                            <td className="mb-2 bg-secondary text-white">Observações</td>
                            <td>OBS</td>
                        </tr>
                    </tbody>
                    <br />

                    <thead >
                        <tr>
                            <th colSpan={2} className="mb-2 bg-secondary text-white">Aspectos Legais</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="mb-2 bg-secondary text-white">Data Fundação</td>
                            <td>14/07/1905</td>
                        </tr>
                        <tr>
                            <td className="mb-2 bg-secondary text-white">Formato Juridico</td>
                            <td>LTDA</td>
                        </tr>
                        <tr>
                            <td className="mb-2 bg-secondary text-white">CNAE</td>
                            <td>4399101</td>
                        </tr>
                        <tr>
                            <td className="mb-2 bg-secondary text-white">CNPJ</td>
                            <td>12.434.234/0001-33</td>
                        </tr>
                        <tr>
                            <td className="mb-2 bg-secondary text-white">Alíquota de Imposto</td>
                            <td>Simples</td>
                        </tr>
                        <tr>
                            <td className="mb-2 bg-secondary text-white">Ano Inicial dos Planos de Negócio</td>
                            <td>2022</td>
                        </tr>
                        <tr>
                            <td className="mb-2 bg-secondary text-white">Mes Inicial dos Planos de Negócio</td>
                            <td>Mar</td>
                        </tr>
                        <tr>
                            <td className="mb-2 bg-secondary text-white">Quantidade de Anos Analisados no Plano de Negócios</td>
                            <td>10</td>
                        </tr>
                    </tbody>
                </Table>

            </Container>
        </>
    )
}
import { TextField } from "@mui/material";
import { Container, Table } from "react-bootstrap";

export function Areas() {

    return (
        <>
            <Container>
                <div className="final d-flex flex-row-reverse p-1" >

                    <button type="button" class="btn btn-success ">Adicionar </button>

                </div>
                <Table bordered hover className="rounded">
                    <thead >
                        <tr>
                            <th
                                colSpan={2}
                                className="mb-2 bg-secondary text-white">
                                Cadastro das áreas internas / Departamento da empresa
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Operação</td>
                            <td><button type="button" class="btn btn-danger">Remover</button></td>
                        </tr>
                        <tr>
                            <td>Vendas</td>
                            <td><button type="button" class="btn btn-danger">Remover</button></td>
                        </tr>
                        <tr>
                            <td>Financias</td>
                            <td><button type="button" class="btn btn-warning">Salvar</button></td>

                        </tr>
                    </tbody>
                </Table>

            </Container>
        </>
    )
}
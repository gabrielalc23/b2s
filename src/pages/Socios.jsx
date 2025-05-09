import { Container, Table } from "react-bootstrap";

export function Socios() {


    return (
        <>
            <Container>
                <div className="final d-flex flex-row-reverse p-1" >

                    <button type="button" class="btn btn-success">Nova Sócio</button>

                </div>                <Table bordered hover className="rounded">
                    <thead >
                        <tr>
                            <th className="mb-2 bg-secondary text-white">
                                Sócio
                            </th>
                            <th className="mb-2 bg-secondary text-white">
                                CPF/CNPJ
                            </th>
                            <th className="mb-2 bg-secondary text-white">
                                Percentual Societario
                            </th>
                            <th className="mb-2 bg-secondary text-white">
                                Data de Nascimento
                            </th>
                            <th className="mb-2 bg-secondary text-white">
                                E-mail
                            </th>
                            <th className="mb-2 bg-secondary text-white">
                                Telefone
                            </th>
                            <th className="mb-2 bg-secondary text-white">
                                Formação
                            </th>
                            <th className="mb-2 bg-secondary text-white">
                                Responsabilidade
                            </th>
                            <th className="mb-2 bg-secondary text-white">
                                Observações
                            </th>
                            <th className="mb-2 bg-secondary text-white">
                                Alterar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Rafael</td>
                            <td>112.321.123.12</td>
                            <td className="bg-success">60%</td>
                            <td>08/11/1985</td>
                            <td>email</td>
                            <td>21 99324-2356</td>
                            <td>Superior Completo</td>
                            <td>Operação</td>
                            <td className="bg-secondary text-white"></td>
                            <td><button type="button" class="btn btn-danger">Remover</button></td>
                        </tr>
                        <tr>
                            <td>Paula</td>
                            <td>146.363.142-44</td>
                            <td className="bg-danger">40%</td>
                            <td>14/10/1990</td>
                            <td>email</td>
                            <td>21 99678-6855</td>
                            <td>Superior Completo</td>
                            <td>Vendas</td>
                            <td className="bg-secondary text-white"></td>
                            <td><button type="button" class="btn btn-warning">Salvar</button></td>
                        </tr>
                    </tbody>
                </Table>

            </Container>
        </>
    )
}
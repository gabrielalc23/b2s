import { Container, Table } from "react-bootstrap";

export function Equipe() {


    return (
        <>
            <Container>
                <div className="final d-flex flex-row-reverse p-1" >

                    <button type="button" class="btn btn-success">Nova Equipe</button>

                </div>                <Table bordered hover className="rounded">
                    <thead >
                        <tr>
                            <th className="mb-2 bg-secondary text-white">Cargo</th>
                            <th className="mb-2 bg-secondary text-white">Área</th>
                            <th className="mb-2 bg-secondary text-white">Resumo das funções principais</th>
                            <th className="mb-2 bg-secondary text-white">Salario com encargos</th>
                            <th className="mb-2 bg-secondary text-white">Quantidade de trabalhadores</th>
                            <th className="mb-2 bg-secondary text-white">Reajuste Anual</th>
                            <th className="mb-2 bg-secondary text-white">Inicio do Custo</th>
                            <th className="mb-2 bg-secondary text-white">Final do custo</th>
                            <th className="mb-2 bg-secondary text-white">Total Gasto com salario</th>
                            <th className="mb-2 bg-secondary text-white">Alterar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Gerente de Vendas</td>
                            <td>Vendas</td>
                            <td>Prospectar, negociar e fechar contratos</td>
                            <td>R$ 8.000,00</td>
                            <td>1</td>
                            <td>5,00%</td>
                            <td></td>
                            <td></td>
                            <td className="bg-secondary"></td>
                            <td><button type="button" class="btn btn-danger">Remover</button></td>
                        </tr>
                        <tr>
                            <td>Analista Financeiro</td>
                            <td>Finançias</td>
                            <td>Controle financeiro, planejamento e orçamento</td>
                            <td>R$ 5.000,00</td>
                            <td>1</td>
                            <td>5,00%</td>
                            <td></td>
                            <td></td>
                            <td className="bg-secondary"></td>
                            <td><button type="button" class="btn btn-warning">Salvar</button></td>
                        </tr>
                        
                    </tbody>
                </Table>

            </Container>
        </>
    )
}
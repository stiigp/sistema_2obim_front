import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { zerarMensagem } from "../../../redux/redux.cliente";
import { atualizarCliente, gravarCliente } from "../../../redux/redux.cliente";
import ESTADO from "../../../redux/redux.estado";
import { gravar, atualizar } from "../../../services/clienteService";

export default function FormularioClientes(props) {
    const [cliente, setCliente] = useState(props.clienteSelecionado);

    const despachante = useDispatch();
    let { estado, mensagem } = useSelector((state) => state.clientes);

    const [clienteZerado] = useState({
        codigo: 0,
        nome: "",
        qtdcompras: "",
        cpf: "",
        endereco: "",
        telefone: "",
        email: "",
    });

    useEffect(() => {
        if (estado === ESTADO.OCIOSO && mensagem) {
            window.alert(mensagem);
            despachante(zerarMensagem());
            props.setClienteSelecionado(clienteZerado);
            props.setModoEdicao(false);
            props.setExibirTabela(true);
        }
        else if (estado === ESTADO.ERRO && mensagem) {
            window.alert(mensagem);
            despachante(zerarMensagem());
        }

    }, [estado, mensagem, props, clienteZerado, despachante]);

    function handleChange(e) {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (props.modoEdicao) {
            despachante(atualizarCliente(cliente));
        } else {
            despachante(gravarCliente(cliente));
        }

        e.preventDefault()
        e.stopPropagation();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o nome do cliente"
                    name="nome"
                    value={cliente.nome}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formQtdCompras">
                <Form.Label>Quantidade de Compras</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite a quantidade de compras"
                    name="qtdcompras"
                    value={cliente.qtdcompras}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formCpf">
                <Form.Label>CPF</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o CPF"
                    name="cpf"
                    value={cliente.cpf}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formEndereco">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o endereço"
                    name="endereco"
                    value={cliente.endereco}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formTelefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o telefone"
                    name="telefone"
                    value={cliente.telefone}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Digite o email"
                    name="email"
                    value={cliente.email}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                {props.modoEdicao ? "Editar Cliente" : "Cadastrar Cliente"}
            </Button>
        </Form>
    );
}

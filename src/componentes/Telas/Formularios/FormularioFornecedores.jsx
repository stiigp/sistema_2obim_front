import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { gravar, atualizar } from "../../../services/fornecedorService";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ESTADO from "../../../redux/redux.estado";
import { atualizarFornecedor, gravarFornecedor } from "../../../redux/redux.fornecedor";
import { zerarMensagem } from "../../../redux/redux.fornecedor";

export default function FormularioFornecedores(props) {
    const [formValidado, setFormValidado] = useState(false);

    const fornecedorReseta = {
        codigo: 0,
        nome: "",
        contato: "",
        endereco: "",
    };

    const despachante = useDispatch();
    let { estado, mensagem } = useSelector((state) => state.fornecedores);

    useEffect(() => {
        if (estado === ESTADO.OCIOSO && mensagem) {
            window.alert(mensagem);
            despachante(zerarMensagem());
            props.setFornecedorSelecionado(fornecedorReseta);
            props.setModoEdicao(false);
            props.setExibirTabela(true);
        }
        else if (estado === ESTADO.ERRO && mensagem) {
            window.alert(mensagem);
            despachante(zerarMensagem());
        }

    }, [estado, mensagem, props, fornecedorReseta, despachante]);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            setFormValidado(false);
            if (!props.modoEdicao) {
                console.log(props.fornecedorSelecionado);
                despachante(gravarFornecedor(props.fornecedorSelecionado))
            } else {
                despachante(atualizarFornecedor(props.fornecedorSelecionado))
            }
        } else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        props.setFornecedorSelecionado({
            ...props.fornecedorSelecionado,
            [elemento]: valor,
        });
    }

    return (
        <Container>
            <Form onSubmit={manipularSubmissao} noValidate validated={formValidado}>
                <Form.Group className="mb-3">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        id="codigo"
                        name="codigo"
                        type="text"
                        disabled={true}
                        placeholder="Código do fornecedor"
                        value={props.fornecedorSelecionado.codigo}
                        onChange={manipularMudanca}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        id="nome"
                        name="nome"
                        type="text"
                        placeholder="Nome do fornecedor"
                        value={props.fornecedorSelecionado.nome}
                        onChange={manipularMudanca}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contato</Form.Label>
                    <Form.Control
                        id="contato"
                        name="contato"
                        type="text"
                        placeholder="Contato do fornecedor"
                        value={props.fornecedorSelecionado.contato}
                        onChange={manipularMudanca}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                        id="endereco"
                        name="endereco"
                        type="text"
                        placeholder="Endereço do fornecedor"
                        value={props.fornecedorSelecionado.endereco}
                        onChange={manipularMudanca}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Salvar
                </Button>

                <Button
                    type="button"
                    variant="success"
                    onClick={() => {
                        props.setExibirTabela(true);
                    }}
                >
                    Voltar
                </Button>
            </Form>
        </Container>
    );
}

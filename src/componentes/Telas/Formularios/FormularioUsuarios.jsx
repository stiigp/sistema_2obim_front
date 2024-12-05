import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { gravar, atualizar } from "../../../services/usuarioService";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ESTADO from "../../../redux/redux.estado";
import { atualizarUsuario, gravarUsuario, zerarMensagem } from "../../../redux/redux.usuario";

export default function FormularioUsuario(props) {
    const [formValidado, setFormValidado] = useState(false);

    const usuarioReseta = {
        codigo: "",
        nome: "",
        perfil: "",
        senha: "",
    };

    const despachante = useDispatch();
    let { estado, mensagem } = useSelector((state) => state.usuarios);

    useEffect(() => {
        if (estado === ESTADO.OCIOSO && mensagem) {
            window.alert(mensagem);
            despachante(zerarMensagem());
            props.setUsuarioSelecionado(usuarioReseta);
            props.setModoEdicao(false);
            props.setExibirTabela(true);
        }
        else if (estado === ESTADO.ERRO && mensagem) {
            window.alert(mensagem);
            despachante(zerarMensagem());
        }

    }, [estado, mensagem, props, usuarioReseta, despachante]);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            setFormValidado(false);
            if (!props.modoEdicao) {
                console.log(props.usuarioSelecionado);
                despachante(gravarUsuario(props.usuarioSelecionado));
            } else {
                despachante(atualizarUsuario(props.usuarioSelecionado));
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
        props.setUsuarioSelecionado({
            ...props.usuarioSelecionado,
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
                        type="number"
                        disabled={true}
                        placeholder="Insira o código do usuário"
                        value={props.usuarioSelecionado.codigo}
                        onChange={manipularMudanca}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        id="nome"
                        name="nome"
                        type="text"
                        placeholder="Insira o nome do usuário"
                        value={props.usuarioSelecionado.nome}
                        onChange={manipularMudanca}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Perfil</Form.Label>
                    <Form.Select
                        required
                        id="perfil"
                        name="perfil"
                        value={props.usuarioSelecionado.perfil}
                        onChange={manipularMudanca}
                        aria-label="Perfil"
                    >
                        <option value="">Nenhum</option>
                        <option value="Admin">Admin</option>
                        <option value="Gerente">Gerente</option>
                        <option value="Cliente">Cliente</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Por favor, selecione um tipo de perfil!.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        id="senha"
                        name="senha"
                        type="password"
                        placeholder="Insira a senha do usuário"
                        value={props.usuarioSelecionado.senha}
                        onChange={manipularMudanca}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
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

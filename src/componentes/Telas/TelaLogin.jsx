import { Container, Form, Button } from "react-bootstrap";
import { useContext, useRef } from "react";
import { ContextoUsuario } from "../../App";
import Cabecalho from "../layouts/Cabecalho";
import { login } from "../../services/usuarioService";

export default function TelaLogin() {
    const nomeUsuario = useRef();
    const senha = useRef();
    const { usuario, setUsuario } = useContext(ContextoUsuario);

    function manipularSubmissao(evento) {
        const usuarioDigitado = nomeUsuario.current.value;
        const senhaDigitada = senha.current.value;
        
        login(usuarioDigitado, senhaDigitada).then((resp) => {
            if (resp?.status) {
                setUsuario({
                    "usuario": usuarioDigitado,
                    "perfil": resp.perfil,
                    "logado": true
                })
                window.alert(resp.mensagem);
            } else {
                window.alert(resp.mensagem)    
            }
        }).catch((e) => {
            window.alert(e.mensagem)
        })

        // if (usuarioDigitado === 'admin' &&
        //     senhaDigitada === 'admin') {
        //     setUsuario({
        //         "usuario": usuarioDigitado,
        //         "logado": true
        //     })
        // }
        evento.preventDefault();
        evento.stopPropagation();
    }


    return (
        <>
            <Cabecalho titulo="Tela de Login"></Cabecalho>
            <Container className="w-25 border p-2">

                <Form onSubmit={manipularSubmissao}>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicEmail">
                        <Form.Label>Usuário:</Form.Label>
                        <Form.Control
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Informe o usuário"
                            ref={nomeUsuario}
                        />
                        <Form.Text className="text-muted">
                            Nunca compartilhe suas credenciais de acesso.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            id="senha"
                            name="senha"
                            ref={senha}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
        </>
    );
}
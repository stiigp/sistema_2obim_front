import { useState } from "react";
import Pagina from "../layouts/Pagina";
import { Alert } from "react-bootstrap";
import TabelaUsuarios from "./Tabelas/TabelaUsuarios";
import FormularioUsuarios from "./Formularios/FormularioUsuarios";

export default function TelaCadastroUsuario() {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        codigo: 0,
        nome: "",
        senha: "",
        perfil: ""
    });

    return (
        <Pagina>
            <Alert variant="success" className="text-center">
                <h2>Cadastro de Usuários</h2>
            </Alert>
            {exibirTabela ? (
                <TabelaUsuarios
                    usuarios={usuarios}
                    setExibirTabela={setExibirTabela}
                    setUsuarioSelecionado={setUsuarioSelecionado}
                    usuarioSelecionado={usuarioSelecionado}
                    setModoEdicao={setModoEdicao}
                />
            ) : (
                <FormularioUsuarios
                    usuarioSelecionado={usuarioSelecionado}
                    setUsuarioSelecionado={setUsuarioSelecionado}
                    setExibirTabela={setExibirTabela}
                    setModoEdicao={setModoEdicao}
                    modoEdicao={modoEdicao}
                />
            )}
        </Pagina>
    );
}

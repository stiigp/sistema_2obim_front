import { useState } from "react";
import Pagina from "../layouts/Pagina";
import { Alert } from "react-bootstrap";
import TabelaClientes from "./Tabelas/TabelaClientes";
import FormularioClientes from "./Formularios/FormularioClientes";

export default function TelaCadastroCliente() {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [clientes, setClientes] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState({
    codigo: 0,
    nome: "",
    qtdcompras: "",
    cpf: "",
    endereco: "",
    telefone: "",
    email: "",
  });

  return (
    <Pagina>
      <Alert variant="success" className="text-center">
        <h2>Cadastro de Clientes</h2>
      </Alert>
      {exibirTabela ? (
        <TabelaClientes
          clientes={clientes}
          setExibirTabela={setExibirTabela}
          setClienteSelecionado={setClienteSelecionado}
          clienteSelecionado={clienteSelecionado}
          setModoEdicao={setModoEdicao}
        />
      ) : (
        <FormularioClientes
          clienteSelecionado={clienteSelecionado}
          setClienteSelecionado={setClienteSelecionado}
          setExibirTabela={setExibirTabela}
          setModoEdicao={setModoEdicao}
          modoEdicao={modoEdicao}
        />
      )}
    </Pagina>
  );
}

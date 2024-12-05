import { useState } from "react";
import Pagina from "../layouts/Pagina";
import { Alert } from "react-bootstrap";
import TabelaFornecedores from "./Tabelas/TabelaFornecedores";
import FormularioFornecedores from "./Formularios/FormularioFornecedores";

export default function TelaCadastroFornecedor() {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [fornecedores, setFornecedores] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState({
    codigo: 0,
    nome: "",
    contato: "",
    endereco: "",
  });

  return (
    <Pagina>
      <Alert variant="success" className="text-center">
        <h2>Cadastro de Fornecedores</h2>
      </Alert>
      {exibirTabela ? (
        <TabelaFornecedores
          fornecedores={fornecedores}
          setExibirTabela={setExibirTabela}
          setFornecedorSelecionado={setFornecedorSelecionado}
          fornecedorSelecionado={fornecedorSelecionado}
          setModoEdicao={setModoEdicao}
        />
      ) : (
        <FormularioFornecedores
          fornecedorSelecionado={fornecedorSelecionado}
          setFornecedorSelecionado={setFornecedorSelecionado}
          setExibirTabela={setExibirTabela}
          setModoEdicao={setModoEdicao}
          modoEdicao={modoEdicao}
        />
      )}
    </Pagina>
  );
}

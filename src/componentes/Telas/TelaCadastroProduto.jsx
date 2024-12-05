import { useState } from "react";
import Pagina from "../layouts/Pagina";
import { Alert } from "react-bootstrap";
import TabelaProdutos from "./Tabelas/TabelaProdutos";
import FormularioProdutos from "./Formularios/FormularioProdutos";
import { produtos } from "../../dados/mockProdutos";

export default function TelaCadastroProduto(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [listaDeProdutos, setListaDeProdutos] = useState(produtos);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState({
    codigo: 0,
    categoria: {},
    fornecedor: {},
    descricao: "",
    precoCusto: 0,
    precoVenda: 0,
    qtdEstoque: 0,
    urlImagem: "",
    dataValidade: "",
  });
  return (
    <div>
      <Pagina>
        <Alert classname="mt-02 mb-02 success text-center" variant="success">
          <h2>Cadastro de Produto</h2>
        </Alert>
        {exibirTabela ? (
          <TabelaProdutos
            listaDeProdutos={listaDeProdutos}
            setExibirTabela={setExibirTabela}
            setListaDeProdutos={setListaDeProdutos}
            setModoEdicao={setModoEdicao}
            setProdutoSelecionado={setProdutoSelecionado}
          />
        ) : (
          <FormularioProdutos
            listaDeProdutos={listaDeProdutos}
            setExibirTabela={setExibirTabela}
            setListaDeProdutos={setListaDeProdutos}
            setModoEdicao={setModoEdicao}
            setProdutoSelecionado={setProdutoSelecionado}
            modoEdicao={modoEdicao}
            produtoSelecionado={produtoSelecionado}
          />
        )}
      </Pagina>
    </div>
  );
}

import { useState } from "react";
import Pagina from "../layouts/Pagina";
import { Alert } from "react-bootstrap";
import TabelaCategorias from "./Tabelas/TabelaCategorias";
import FormularioCategorias from "./Formularios/FormularioCategorias";
import { categorias } from "../../dados/mockCategorias"

export default function TelaCadastroCategoria(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [categoriaSelecionado, setCategoriaSelecionado] = useState({
    codigo: "",
    descricao: ""
  });
  
  return (
    <div>
      <Pagina>
        <Alert classname="mt-02 mb-02 success text-center" variant="success">
          <h2>
            Cadastro de Categoria
          </h2>
        </Alert>
        {
          exibirTabela ? <TabelaCategorias listaDeCategorias={categorias} setExibirTabela={setExibirTabela} setCategoriaSelecionado={setCategoriaSelecionado} setModoEdicao={setModoEdicao} /> : <FormularioCategorias setCategoriaSelecionado={setCategoriaSelecionado} categoriaSelecionado={categoriaSelecionado} setExibirTabela={setExibirTabela} setModoEdicao={setModoEdicao} modoEdicao={ modoEdicao} />
        }
      </Pagina>
    </div>
  )
}
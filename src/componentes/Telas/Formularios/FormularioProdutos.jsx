import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { consultar } from "../../../services/categoriaService";
import { consultar as consultarForn } from "../../../services/fornecedorService";
import { Container } from "react-bootstrap";
import {gravar, atualizar} from "../../../services/produtoService"
import { useEffect, useState } from "react";
import ESTADO from "../../../redux/redux.estado";
import { atualizarProduto, gravarProduto, zerarMensagem } from "../../../redux/redux.produto";
import { useDispatch, useSelector } from "react-redux";

export default function FormularioProdutos(props) {
  
  const [formValidado, setFormValidado] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  
  const produtoReseta = {
    categoria: {
      codigo: "",
      descricao: ""
    },
    fornecedor: {
      codigo: "",
      nome: ""
    },
    codigo: 0,
    descricao: "",
    precoCusto: 0,
    precoVenda: 0,
    qtdEstoque: 0,
    urlImagem: "",
    dataValidade: ""
  };

  const despachante = useDispatch();
  let { estado, mensagem } = useSelector((state) => state.produtos);

  useEffect(() => {
    if (estado === ESTADO.OCIOSO && mensagem) {
      window.alert(mensagem);
      despachante(zerarMensagem());
      props.setProdutoSelecionado(produtoReseta);
      props.setModoEdicao(false);
      props.setExibirTabela(true);
    }
    else if (estado === ESTADO.ERRO && mensagem) {
      window.alert(mensagem);
      despachante(zerarMensagem());
    }


  }, [estado, mensagem, props, produtoReseta, despachante])

  useEffect(() => {
    consultar().then((res) => {
      if (Array.isArray(res))
        setCategorias(res);
    })

    consultarForn().then((res) => {
      console.log(res)
      if (Array.isArray(res))
        setFornecedores(res);
    })
  }, [])

  
  function manipularSubmissao(evento) {
		const form = evento.currentTarget;
		if (form.checkValidity()) {
			setFormValidado(false);
			if (!props.modoEdicao) {
        console.log(props.produtoSelecionado);
        despachante(gravarProduto(props.produtoSelecionado));
			} else {
        despachante(atualizarProduto(props.produtoSelecionado));
			}
		}
		else {
			setFormValidado(true);
		}
		evento.preventDefault();
		evento.stopPropagation();
	}
  
	function manipularMudanca(evento) {
		const elemento = evento.target.name;
		const valor = evento.target.value;
		if (elemento === 'categoria') {
			props.setProdutoSelecionado({
				...props.produtoSelecionado,
				[elemento]: { codigo: valor }
			});
    } else if (elemento === 'fornecedor') {
      props.setProdutoSelecionado({
        ...props.produtoSelecionado,
        [elemento]: {codigo: valor}
      })
    } else {
			props.setProdutoSelecionado({
				...props.produtoSelecionado,
				[elemento]: valor,
			});
		}
		console.log(props.produtoSelecionado);
	}

  return (
    <Container>
      <Form onSubmit={manipularSubmissao}>
        <Form.Group className="mb-3">
          <Form.Label>Código</Form.Label>
          <Form.Control
            id="codigo"
            name="codigo"
            type="text"
            placeholder="Insira o código do produto"
            value={props.produtoSelecionado.codigo}
            onChange={manipularMudanca}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Preço de custo</Form.Label>
          <Form.Control
            type="text"
            name="precoCusto"
            value={props.produtoSelecionado.precoCusto}
            onChange={manipularMudanca}
            placeholder="Insira o preço de custo"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Preço de venda</Form.Label>
          <Form.Control
            type="text"
            name="precoVenda"
            value={props.produtoSelecionado.precoVenda}
            onChange={manipularMudanca}
            placeholder="Insira o preço de venda"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            name="descricao"
            value={props.produtoSelecionado.descricao}
            onChange={manipularMudanca}
            placeholder="Insira a descrição do produto"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Qtd. do Estoque</Form.Label>
          <Form.Control
              type="text"
            name="qtdEstoque"
            value={props.produtoSelecionado.qtdEstoque}
            onChange={manipularMudanca}
            placeholder="Insira a qtde. em estoque"
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label> Categoria </Form.Label>
          <Form.Select
            required
            id="categoria"
            name="categoria"
            value={props.produtoSelecionado.categoria.codigo}
            onChange={manipularMudanca}
          >
            <option value=""> Selecionar </option>
            {categorias?.map((categoria) => (
              <option key={categoria.codigo} value={categoria.codigo}>
                {categoria.descricao}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Por favor, informe a categoria do produto!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label> Fornecedor </Form.Label>
          <Form.Select
            required
            id="fornecedor"
            name="fornecedor"
            value={props.produtoSelecionado.fornecedor.codigo}
            onChange={manipularMudanca}
          >
            <option value=""> Selecionar </option>
            {fornecedores?.map((fornecedor) => (
              <option key={fornecedor.codigo} value={fornecedor.codigo}>
                {fornecedor.nome}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Por favor, informe a categoria do produto!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Url da Imagem</Form.Label>
          <Form.Control
            type="text"
            name="urlImagem"
            value={props.produtoSelecionado.urlImagem}
            onChange={manipularMudanca}
            placeholder="Insira a url da imagem do produto"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data de validade</Form.Label>
          <Form.Control
            type="date"
            name="dataValidade"
            value={props.produtoSelecionado.dataValidade}
            onChange={manipularMudanca}
            placeholder="Insira a validade do produto"
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

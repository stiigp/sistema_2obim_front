import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Container, FloatingLabel, Row, Col } from 'react-bootstrap';
import { gravar, atualizar } from '../../../services/categoriaService';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ESTADO from "../../../redux/redux.estado";
import { atualizarCategoria, gravarCategoria, zerarMensagem } from '../../../redux/redux.categoria';

export default function FormularioClientes(props) {
  const [formValidado, setFormValidado] = useState(false);
  const {categoriaReseta} = useState({
    codigo: "",
    descricao: ""
  });

  const despachante = useDispatch();
  let { estado, mensagem } = useSelector((state) => state.categorias);

  useEffect(() => {
    if (estado === ESTADO.OCIOSO && mensagem) {
      window.alert(mensagem);
      despachante(zerarMensagem());
      props.setCategoriaSelecionado(categoriaReseta);
      props.setModoEdicao(false);
      props.setExibirTabela(true);
    }
    else if (estado === ESTADO.ERRO && mensagem) {
      window.alert(mensagem);
      despachante(zerarMensagem());
    }

  }, [estado, mensagem, props, categoriaReseta, despachante]);

  function manipularSubmissao(evento) {
    const form = evento.currentTarget;
    if (form.checkValidity()) {
      setFormValidado(false);
      if (!props.modoEdicao) {
        despachante(gravarCategoria(props.categoriaSelecionado));
      } else {
        despachante(atualizarCategoria(props.categoriaSelecionado));
      }
    }
    evento.preventDefault();
    evento.stopPropagation();
  }

  function manipularMudanca(evento) {
    const elemento = evento.target.name;
    const valor = evento.target.value;
    props.setCategoriaSelecionado({
      ...props.categoriaSelecionado,
      [elemento]: valor,
    });
  }


  return (
    <Container>
      <Form noValidate onSubmit={manipularSubmissao}>
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel
                label="Código:"
                className="mb-3"
              >
                <Form.Control
                  value={props.categoriaSelecionado.codigo}
                  type="text"
                  placeholder="0"
                  id="codigo"
                  name="codigo"
                  disabled />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">Informe o código da categoria!</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel
                label="Categoria:"
                className="mb-3"
              >
                <Form.Control
                  value={props.categoriaSelecionado.descricao}
                  type="text"
                  onChange={manipularMudanca}
                  placeholder="Informe a descrição da categoria"
                  id="descricao"
                  name="descricao"
                  required />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">Informe a descrição da categoria!</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
          <Button type="button" variant="success" onClick={() => {
            props.setExibirTabela(true);
          }}>
            Voltar
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
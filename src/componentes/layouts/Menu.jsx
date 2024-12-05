import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { ContextoUsuario } from '../../App';

export default function Menu(props) {
  
  const { setUsuario } = useContext(ContextoUsuario);
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
        <Navbar.Brand href="#" as={Link} to="/">Menu</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#" as={Link} to="/cliente">Cliente</NavDropdown.Item>
                  <NavDropdown.Item href="#" as={Link} to="/fornecedor">Fornecedores</NavDropdown.Item>
                  <NavDropdown.Item href="#" as={Link} to="/produto">Produtos</NavDropdown.Item>
                  <NavDropdown.Item href="#" as={Link} to="/categoria">Categorias</NavDropdown.Item>
                  <NavDropdown.Item href="#" as={Link} to="/usuario">Usuarios</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Operações" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Compras</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Vendas</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Relatórios" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Clientes</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Fornecedores</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Produtos</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Categorias</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Compras</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#home">Sobre</Nav.Link>
            <Nav.Link href="#link" as={Link} to="/" onClick={() => {
              setUsuario({
                "usuario": "",
                "logado": false,
                "perfil": ""
              })
                }}>Sair</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  )
}
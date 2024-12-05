import TelaCadastroFornecedor from './componentes/Telas/TelaCadastroFornecedor';
import TelaCadastroCliente from './componentes/Telas/TelaCadastroCliente'
import Tela404 from './componentes/Telas/Tela404';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TelaMenu from './componentes/Telas/TelaMenu';
import TelaCadastroProduto from './componentes/Telas/TelaCadastroProduto';
import TelaCadastroCategoria from './componentes/Telas/TelaCadastroCategoria';
import TelaCadastroUsuario from './componentes/Telas/TelaCadastroUsuario';
import { createContext, useState } from 'react';
import TelaLogin from './componentes/Telas/TelaLogin';

export const ContextoUsuario = createContext();

function App() {

  const [usuario, setUsuario] = useState({
    "usuario": "",
    "logado": false,
    "perfil": ""
  });


  if (!usuario.logado) {
    return (
      <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
        <TelaLogin />
      </ContextoUsuario.Provider>
    );
  } else {
    return (
      <div className="App">
        <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
          <BrowserRouter>
            {
              //A ordem das rotas é importante
            }
            <Routes>
              <Route path="/fornecedor" element={<TelaCadastroFornecedor />} />
              <Route path="/cliente" element={<TelaCadastroCliente />} />
              <Route path="/produto" element={<TelaCadastroProduto />} />
              <Route path="/categoria" element={<TelaCadastroCategoria />} />
              <Route path="/usuario" element={<TelaCadastroUsuario />} />
              <Route path="/" element={<TelaMenu />} />
              <Route path="/*" element={<Tela404 />} />
            </Routes>
          </BrowserRouter>
        </ContextoUsuario.Provider>
      </div>

    );
  }
}

export default App;

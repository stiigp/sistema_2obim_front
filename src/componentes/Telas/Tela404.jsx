import Pagina from "../layouts/Pagina"
import imagem404 from "../../assets/404_img.png"
import {Container} from "react-bootstrap"

export default function Tela404(props) {
  return (
    <Pagina>
      <Container>
        <img src={imagem404} alt="Página não encontrada :("/>
        <h1 className="text-center">
          O recurso solicitado não existe!
        </h1>
      </Container>
    </Pagina>
  )
}
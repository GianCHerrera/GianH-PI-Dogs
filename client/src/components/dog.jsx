import { Link } from "react-router-dom";
import '../Styles/DogStyle.css'

export default function Dog({ id, nombre, imagen, temperamentos, pesoMaximo }) {
    return <div className="conetenedorDog">
        <Link to={`/${id}`} className="textDecorationNone">
            <h3 className="h3NombreRazaDog" >{nombre}</h3>
            <img className="imgDog" src={imagen} alt="imagen de raza" />
        </Link>
        <p>{temperamentos}</p>
        <p>Peso Máximo: {pesoMaximo} Libras</p>

    </div>
}
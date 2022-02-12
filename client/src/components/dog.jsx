import { Link } from "react-router-dom";

export default function Dog({ id, nombre, imagen, temperamentos, pesoMaximo }) {
    return <div>
        <Link to={`/${id}`}>
            <h3>{nombre}</h3>
            <img src={imagen} alt="imagen de raza" />
        </Link>
        <p>{temperamentos}</p>
        <p>Peso Máximo: {pesoMaximo} Libras</p>

    </div>
}
import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import '../Styles/DogDetailsStyle.css'

export default function DogDetails() {

    const [dog, setDog] = useState(null);
    let { id } = useParams()

    useEffect(() => {
        axios.get('http://localhost:3001/api/dogs/' + id)
            .then((response) => {
                console.log(response.data);
                setDog(response.data)
            })
        return () => {
            setDog(null)
        } // este es el cleanup
    }, [])

    return <div className="contenedorDogDetails" >
        <Link to={'/main'}>
            <button className="botonVolver">Volver</button>
        </Link>
        {
            dog ? <>
                <div className="contenedorDogDetail">
                    <h3 className="TitleDogDetails">{dog.nombre}</h3>
                    {console.log(dog.imagen)}
                    <img className="imgDogDetails" src={dog.imagen} alt="imagen de raza" />
                    <p className="tempsDogDetails"> Temperamentos <br />{dog.temperamentos}</p>
                    <p className="">Peso Máximo: {dog.pesoMaximo} Libras</p>
                    <p className="">Peso Mínimo: {dog.pesoMinimo === 0 ? <span> No Definido </span> : <span>{dog.pesoMinimo} Libras</span>}</p>
                    <p className="">Altura Máxima: {dog.alturaMaxima} Pulgadas</p>
                    <p className="">Altura Mínima: {dog.alturaMinima === 0 ? <span> No Definido </span> : <span>{dog.alturaMinima} Pulgadas</span>} </p>
                    <p className=""> Años de Vida: {dog.añosDeVida}</p>
                </div>
            </> :
                <div> loading</div>
        }
    </div>
}
import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function DogDetails() {

    const [dog, setDog] = useState(null);
    let {id} = useParams()
    
    useEffect(() => {
        axios.get('http://localhost:3001/api/dogs/'+id)
        .then((response)=>{
            console.log(response.data);
            setDog(response.data)
        })
        return ()=>{
            setDog(null)
        } // este es el cleanup
    }, [])

    return <div>

        {
            dog ? <>
                <h3>{dog.nombre}</h3>
                {console.log(dog.imagen)}
                <img src={dog.imagen} alt="imagen de raza" />
                <p>{dog.temperamentos}</p>
                <p>Peso Máximo: {dog.pesoMaximo} Libras</p>
                <p>Peso Minimo: {dog.pesoMinimo === 0 ? <span> No Definido </span> : <span>{dog.pesoMinimo} Libras</span>}</p>
                <p>Altura Maxima: {dog.alturaMaxima} Pulgadas</p>
                <p>Altura Minima: {dog.alturaMinima === 0 ? <span> No Definido </span> : <span>{dog.alturaMinima} Pulgadas</span>} </p>
                <p> Años de Vida: {dog.añosDeVida}</p>
            </> : 
            <div> loading</div>
    }
    </div>
}
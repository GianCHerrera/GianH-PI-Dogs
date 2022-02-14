import "../Styles/HomeStyle.css"
import {Link} from 'react-router-dom'

export default function Home() {
    return <div className="contenedorHome">
        <h1 className="titleHome"> The Dogs PI</h1>
        <Link to='/main'>
        <button className="botonComenzarHome"> Comenzar </button>
        </Link>
        <div className="flexHomeDog">
        <div className="contenedorHomeDogsImgs">
            <div className="homeDogImg homeImg1"></div>
            <div className="homeDogImg homeImg2"></div>
            <div className="homeDogImg homeImg3"></div>
            <div className="homeDogImg homeImg4"></div>
        </div>
        <h4 className="titleMadeBy">Made by: Gian Herrera</h4>
        </div>
    </div>
}
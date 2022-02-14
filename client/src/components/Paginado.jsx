import '../Styles/PaginadoStyle.css'

export default function Paginado({dogsPerPage, allDogs, paginado}){
    const pageNumber =[];
    
    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumber.push(i)
    }

    return <div className='contenedorPaginado'>
        <ul className="unorderedListPaginado">
            {pageNumber && pageNumber.map((number,i) =>{
                return <li className="liPaginado" key={i}>
                    <button className='botonPaginado' onClick={()=> paginado(number)} >{number}</button>
                </li>
            })}
        </ul>
    </div>
}
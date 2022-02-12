export default function Paginado({dogsPerPage, allDogs, paginado}){
    const pageNumber =[];
    
    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumber.push(i)
    }

    return <nav>
        <ul>
            {pageNumber && pageNumber.map((number,i) =>{
                return <li key={i}>
                    <button onClick={()=> paginado(number)} >{number}</button>
                </li>
            })}
        </ul>
    </nav>
}
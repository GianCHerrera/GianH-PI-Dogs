
import { useDispatch } from "react-redux";
import { API, BASE_DE_DATOS, TODOS } from "../constantes/filter";
import { filterBySource } from "../store/actions";


export default function FilterRazas(){

    let dispatch = useDispatch();

    function onSelectChange(e){
        dispatch(filterBySource(e.target.value))
    }

    return <select name="filterDogs" onChange={onSelectChange} >
        <option selected disabled> Seleccionar Recurso</option>
        <option value={API}> API</option>
        <option value={BASE_DE_DATOS}> Base de Datos</option>
        <option value={TODOS}> Todos</option>
    </select>


}
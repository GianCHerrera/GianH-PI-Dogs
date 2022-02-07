
import { useDispatch } from "react-redux";
import { API, BASE_DE_DATOS, TODOS } from "../constantes/filter";
import { getApiDogs } from "../store/actions";


export default function FilterRazas(){

    let dispatch = useDispatch();

    function onSelectChange(e){
        dispatch(getApiDogs())
    }

    return <select name="filter" onChange={onSelectChange} >
        <option selected disabled> Seleccionar Recurso</option>
        <option value={API}> API</option>
        <option value={BASE_DE_DATOS}> Base de Datos</option>
        <option value={TODOS}> Todos</option>
    </select>


}
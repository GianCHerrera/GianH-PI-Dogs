import { useDispatch } from "react-redux";
import { ASCENDENTE, DESCENDENTE, PESOASCENDENTE, PESODESCENDENTE } from "../constantes/sort"
import { sort } from "../store/actions"


export default function Order(){

    let dispatch = useDispatch();

    function onSelectChange(e){
        dispatch(sort(e.target.value))
    }
    return <select name='select' onChange={onSelectChange}>

        <option value='' disabled selected>Selccionar orden</option>
        <option value={ASCENDENTE}>Ascendente por Nombre</option>
        <option value={DESCENDENTE}>Descendente por Nombre</option>
        <option value={PESOASCENDENTE}>Ascendente por Peso</option>
        <option value={PESODESCENDENTE}>Descendente por Peso</option>
    </select>
}
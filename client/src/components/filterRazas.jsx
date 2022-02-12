
import { useDispatch } from "react-redux";
import { API, BASE_DE_DATOS, TODOS } from "../constantes/filter";
import { filterBySource } from "../store/actions";
import OptionSelect from "./OptionSelect";
import OptionSelectDefault from "./OptionSelectDefault";

export default function FilterRazas(){

    let dispatch = useDispatch();
    let opc = [{value: API, text: 'API'},{value: BASE_DE_DATOS, text: 'Base de Datos'}, {value: TODOS, text: 'Todos'}]
    function onSelectChange(e){
        dispatch(filterBySource(e.target.value))
    }

    return <select name="filterDogs" onChange={onSelectChange} >
        <OptionSelectDefault text='Filtrar por Recurso' />
        {
            opc.map( (op,i )=> {
                return <OptionSelect key={i} value={op.value} text={op.text} />
            })
        }
    </select>
}
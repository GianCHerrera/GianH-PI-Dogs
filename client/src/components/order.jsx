import { useDispatch } from "react-redux";
import { ASCENDENTE, DESCENDENTE, PESOASCENDENTE, PESODESCENDENTE } from "../constantes/sort"
import { sort } from "../store/actions"
import OptionSelect from "./OptionSelect";
import OptionSelectDefault from "./OptionSelectDefault";


export default function Order(){

    let dispatch = useDispatch();
    let opc=[{
        value:ASCENDENTE,
        text:'Ascendente por Nombre'
    },{
        value:DESCENDENTE,
        text:'Descendente por Nombre'
    },{
        value:PESOASCENDENTE,
        text:'Ascendente por Peso'
    },{
        value:PESODESCENDENTE,
        text:'Descendente por Peso'
    }]
    function onSelectChange(e){
        dispatch(sort(e.target.value))
    }
    return <select name='select' onChange={onSelectChange}>
    <OptionSelectDefault text='Selccionar orden'/>
    {
        opc.map((op,i)=>{
            return <OptionSelect key={i} value={op.value} text={op.text} />
        })
    }
    </select>
}
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { filterByTemperament, getDbTemperaments } from "../store/actions";
import OptionSelect from "./OptionSelect";
import OptionSelectDefault from "./OptionSelectDefault";
import '../Styles/FilterTemperamentsStyle.css'

export default function FIilterTemperaments() {

    let temps = useSelector(state => state.filteredTemperaments);
    let dispatch = useDispatch()
    let t = []
    useEffect(() => {
        dispatch(getDbTemperaments())
    }, [])
    function onSelectChange(e) {
        dispatch(filterByTemperament(e.target.value))
    }
    return <select className="selectTemperaments" name="filterTemps" onChange={onSelectChange}>
            <OptionSelectDefault text='Filtrar por Temperamento'/>
            <OptionSelect value='.Todos' text='.Todos'/> 
        {temps.map((temperamento,i) => {
            return t.push(temperamento.nombre)
        })}
        
        {
            t.sort((a, b) => {
                if (a > b) {
                    return 1;
                }
                if (a < b) {
                    return -1;
                }
                return 0;
            })
        }
        {t.map((temp,i) => {
            return <OptionSelect value={temp} text={temp} key={i}/>
        })}
    </select>

}

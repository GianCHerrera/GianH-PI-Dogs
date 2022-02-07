import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { filterByTemperament, getDbTemperaments } from "../store/actions";





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
    return <select name="filterTemps" onChange={onSelectChange}>
        <option disabled selected >Filtrar por Temperamento</option>
        <option value='.Todos' >.Todos</option>
        {temps.map(temperamento => {
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
        {t.map(temp => {
            return <option value={temp}>{temp}</option>
        })}
    </select>

}

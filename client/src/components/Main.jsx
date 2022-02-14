import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogs } from "../store/actions";
import Dogs from "./Dogs";
import FilterRazas from "./FilterRazas";
import FIilterTemperaments from "./FilterTemperaments";
import Order from "./Order";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import '../Styles/MainStyle.css'

export default function Main() {

    let allDogs = useSelector(state => state.filteredDogs)
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    useEffect(() => {
        dispatch(fetchDogs())
    }, [])
    return <div>
        <SearchBar />
        <FIilterTemperaments />
        <FilterRazas />
        <Order />
    <div className='contenedorDogs'>
        <Dogs
            currentDogs={currentDogs} />
    </div>
        <Paginado

            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado={paginado}
        />
    </div>
}
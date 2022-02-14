import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchDogs } from '../store/actions';
import '../Styles/SearchStyle.css'


export default function SearchBar() {

    const [search, setSearch] = useState('');
    let dispatch = useDispatch()

    function onSubmit(e) {
        e.preventDefault();
        dispatch(searchDogs(search.toLowerCase()))
    }
    function onInputChange(e) {
        e.preventDefault();
        setSearch(e.target.value)
    }
    return <form onSubmit={onSubmit}>
        <input type="text" onChange={onInputChange} value={search} placeholder='Search...' className='inputSearch'/>
        <input type="submit" value="Buscar" className='botonSearch' />
    </form>
}
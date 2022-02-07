import axios from 'axios';
import { API, BASE_DE_DATOS, TODOS } from '../../constantes/filter';
export const FETCH_DOGS = 'FETCH_DOGS';
export const SEARCH_DOGS = 'SEARCH_DOGS';
export const SORT = 'SORT';
export const API_DOGS = 'API_DOGS';
export const DB_DOGS = 'DB_DOGS';
export const FILTER_BY_SOURCE = 'FILTER_BY_SOURCE'
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT'


export function fetchDogs() {
    return function (dispatch) {
        axios.get('http://localhost:3001/api/dogs')
            .then((dogs) => {
                dispatch({
                    type: FETCH_DOGS,
                    payload: dogs.data
                })
            }).catch(error => {
                console.log(error)
            })
    }
}
export function searchDogs(name) {
    return function (dispatch) {
        axios.get('http://localhost:3001/api/dogs/?name=' + name)
            .then(dogs => {
                dispatch({
                    type: SEARCH_DOGS,
                    payload: dogs.data
                })
            }).catch(error => {
                console.log(error)
            })
    }
}

export function sort(order){
    return{
        type: SORT,
        payload: order
    }
}

export function filterBySource(resource){
    if(resource === API){
        return getApiDogs();
    }else if(resource === BASE_DE_DATOS){
        return getDbDogs();
    }else if(resource === TODOS){
        return fetchDogs()
    }
}

export function filterByTemperament(temperament){
    console.log(temperament==='.Todos');
    if(temperament==='.Todos'){
        return fetchDogs();

    }else{
        return{
            type: FILTER_BY_TEMPERAMENT,
            payload: temperament
        }
    }
}

export function getDbTemperaments(){
    return function(dispatch){
        axios.get('http://localhost:3001/api/temperament')
        .then( temps =>{
            dispatch({
                type: GET_TEMPERAMENTS,
                payload: temps.data
            })
        }).catch(error => {
            console.log(error)
        })
    }
}

export function getApiDogs(){
    return function (dispatch){
        axios.get('http://localhost:3001/api/dogs/apidogs')
        .then(dogs =>{
            dispatch({
                type: API_DOGS,
                payload: dogs.data
            })
        }).catch(error => {
            console.log(error)
        })
    }
}

export function getDbDogs(){
    return function (dispatch){
        axios.get('http://localhost:3001/api/dogs/db')
        .then(dogs=>{
            dispatch({
                type: DB_DOGS,
                payload: dogs.data
            })
        }).catch(error => {
            console.log(error)
        })
    }
}
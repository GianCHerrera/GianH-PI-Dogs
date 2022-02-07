import axios from 'axios';
export const FETCH_DOGS = 'FETCH_DOGS';
export const SEARCH_DOGS = 'SEARCH_DOGS';
export const SORT = 'SORT';
export const API_DOGS = 'API_DOGS';
export const DB_DOGS = 'DB_DOGS';
export const FILTER_RESOURCE = 'FILTER_RESOURCE'

export function fetchDogs() {
    return function (dispatch) {
        axios.get('http://localhost:3001/api/dogs')
            .then((dogs) => {
                dispatch({
                    type: FETCH_DOGS,
                    payload: dogs.data
                })
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

export function filterResource(resource){
    return{
        type: FILTER_RESOURCE,
        payload: resource
    }
}

export function getApiDogs(){
    return function (dispatch){
        axios.get('http://localhost:3001/api/dogs/apidogs')
        .then(dogs =>{
            dispatch({
                type: API_DOGS,
                payload: dogs
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
                payload: dogs
            })
        })
    }
}
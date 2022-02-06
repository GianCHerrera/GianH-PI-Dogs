import axios from 'axios';
export const FETCH_DOGS = 'FETCH_DOGS';
export const SEARCH_DOGS = 'SEARCH_DOGS';

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
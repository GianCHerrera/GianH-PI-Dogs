import { ASCENDENTE, DESCENDENTE, PESOASCENDENTE, PESODESCENDENTE } from "../../constantes/sort"
import { API_DOGS, DB_DOGS, FETCH_DOGS, FILTER_BY_TEMPERAMENT, GET_TEMPERAMENTS, SEARCH_DOGS, SORT } from "../actions"


const intialState = {
    dogs: [],
    filteredDogs: [],
    temperaments: [],
    filteredTemperaments: [],
    apiDogs: [],
    dbDogs: []
}


export default function reducer(state = intialState, action) {
    switch (action.type) {
        case FETCH_DOGS:
            return {
                ...state,
                dogs: action.payload,
                filteredDogs: action.payload
            }
        case SEARCH_DOGS:
            return {
                ...state,
                filteredDogs: action.payload
            }
        case API_DOGS:
            return {
                ...state,
                filteredDogs: action.payload
            }
        case DB_DOGS:
            return {
                ...state,
                filteredDogs: action.payload
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload,
                filteredTemperaments: action.payload
            }
        case FILTER_BY_TEMPERAMENT:
            let filterDogsByTemperament = [...state.filteredDogs];
            let result = [];
            filterDogsByTemperament.map(dog => {
                if (String(dog.temperamentos).includes(action.payload)){
                    return result.push(dog)
                }
                return{}
            })
            return {
                ...state,
                filteredDogs: result
            }



        case SORT:
            let orderedDogs = [...state.filteredDogs]
            switch (action.payload) {

                case PESOASCENDENTE:
                    orderedDogs = orderedDogs.sort((a, b) => {
                        if (a.pesoMaximo > b.pesoMaximo) {
                            return 1;
                        }
                        if (a.pesoMaximo < b.pesoMaximo) {
                            return -1;
                        }
                        return 0;
                    })
                    break;

                case PESODESCENDENTE:
                    orderedDogs = orderedDogs.sort((a, b) => {
                        if (a.pesoMaximo > b.pesoMaximo) {
                            return -1;
                        }
                        if (a.pesoMaximo < b.pesoMaximo) {
                            return 1;
                        }
                        return 0;
                    })
                    break;

                case ASCENDENTE:
                    orderedDogs = orderedDogs.sort((a, b) => {
                        if (a.nombre < b.nombre) {
                            return -1;
                        }
                        if (a.nombre > b.nombre) {
                            return 1;
                        }
                        return 0;
                    })
                    break;

                case DESCENDENTE:
                    orderedDogs = orderedDogs.sort((a, b) => {
                        if (a.nombre < b.nombre) {
                            return 1;
                        }
                        if (a.nombre > b.nombre) {
                            return -1;
                        }
                        return 0;
                    })
                    break;
                default:
                    break;
            }
            return {
                ...state,
                filteredDogs: orderedDogs
            }
        default:
            return state
    }
}
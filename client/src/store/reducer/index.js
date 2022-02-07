import { ASCENDENTE, DESCENDENTE, PESOASCENDENTE, PESODESCENDENTE } from "../../constantes/sort"
import { API_DOGS, FETCH_DOGS, FILTER_RESOURCE, SEARCH_DOGS, SORT } from "../actions"


const intialState = {
    dogs: [],
    filteredDogs: [],
    temperaments: [],
    filteredTemperaments: [],
    apiDogs: []
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
            return{
                ...state,
                apiDogs: action.payload
            }
        
        case FILTER_RESOURCE:
            return{
                
            }

        case SORT:
            let orderedDogs = [...state.filteredDogs]
            switch (action.payload) {

                case PESOASCENDENTE:
                    orderedDogs = orderedDogs.sort((a, b) => {
                        if (a.peso > b.peso) {
                            return 1;
                        }
                        if (a.peso < b.peso) {
                            return -1;
                        }
                        return 0;
                    })
                    break;

                case PESODESCENDENTE:
                    orderedDogs = orderedDogs.sort((a, b) => {
                        if (a.peso > b.peso) {
                            return -1;
                        }
                        if (a.peso < b.peso) {
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
                                return  1 ;
                            }
                            return 0;
                        })
                        break;

                    case DESCENDENTE:
                        orderedDogs = orderedDogs.sort((a, b) => {
                            if (a.nombre < b.nombre) {
                                return  1 ;
                            }
                            if (a.nombre > b.nombre) {
                                return  -1;
                            }
                            return 0;
                        })
            }
            return {
                ...state,
                filteredDogs: orderedDogs
            }
        default:
            return state
    }
}
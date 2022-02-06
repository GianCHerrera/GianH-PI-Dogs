import { FETCH_DOGS, SEARCH_DOGS } from "../actions"


const intialState = {
    dogs: [],
    filteredDogs: [],
    temperaments: [],
    filteredTemperaments: []
}

export default function reducer(state = intialState, action){
    switch(action.type){
        case FETCH_DOGS:
            return{
                ...state,
                dogs: action.payload
            }
        case SEARCH_DOGS:
            return{
                ...state,
                dogs:action.payload
            }
            default:
                return state
    }
}
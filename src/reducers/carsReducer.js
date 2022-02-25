const SET_CARS = 'SET_CARS'
const SET_CAR = 'SET_CAR'
const SET_MY_CARS = 'SET_MY_CAR'
const SET_ERROR = 'SET_ERROR'
const REMOVE_ALL_CARS = 'REMOVE_ALL_CARS'


const initState = {
    cars: [],
    myCars: [],
    car: {},
    error: ''
}

export const carsReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_CARS: return {...state, cars: action.payload}
        case SET_MY_CARS: return {...state, myCars: action.payload}
        case SET_CAR: return {...state, car: action.payload}
        case SET_ERROR: return {...state, error: action.payload}
        case REMOVE_ALL_CARS: return initState

        default: return state
    }
}


export const setCars = (payload) => ({type: SET_CARS, payload})
export const setMyCars = (payload) => ({type: SET_MY_CARS, payload})
export const setCar = (payload) => ({type: SET_CAR, payload})
export const setError = (payload) => ({type: SET_ERROR, payload})
export const removeAllCars = () => ({type: REMOVE_ALL_CARS})

const SET_AUTH = 'SET_AUTH'
const SET_ERROR = 'SET_ERROR'
const SET_EMAIL = 'SET_EMAIL'
const SET_TYPE = 'SET_TYPE'

const initState = {
    isAuth: false,
    email: '',
    type: '',
    error: ''
}


export const authReducer = (state = initState, action) => {
    switch (action.type){
        case SET_AUTH: return {...state, isAuth: action.payload}
        case SET_EMAIL: return {...state, email: action.payload}
        case SET_TYPE: return {...state, type: action.payload}
        case SET_ERROR: return {...state, error: action.payload}

        default: return state
    }
}


export const setAuth = (payload) => ({type: SET_AUTH, payload})
export const setEmail = (payload) => ({type: SET_EMAIL, payload})
export const setType = (payload) => ({type: SET_TYPE, payload})
export const setError = (payload) => ({type: SET_ERROR, payload})

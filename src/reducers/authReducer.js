const SET_AUTH = 'SET_AUTH'
const SET_ERROR = 'SET_ERROR'

const initState = {
    isAuth: false,
    error: ''
}


export const authReducer = (state = initState, action) => {
    switch (action.type){
        case SET_AUTH: return {...state, isAuth: action.payload}
        case SET_ERROR: return {...state, error: action.payload}

        default: return state
    }
}


export const setAuth = (payload) => ({type: SET_AUTH, payload})
export const setError = (payload) => ({type: SET_ERROR, payload})

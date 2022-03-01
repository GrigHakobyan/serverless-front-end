const SET_USERS = 'SET_USERS'
const SET_USER = 'SET_USER'
const SET_ERROR = 'SET_ERROR'
const REMOVE_ALL_USER = 'REMOVE_ALL_USER'

const initState = {
    users: [],
    user: '',
    error: ''
}


export const usersReducer = (state = initState, action) => {
    switch (action.type){
        case SET_USERS: return {...state, users: action.payload}
        case SET_USER: return {...state, user: action.payload}
        case SET_ERROR: return {...state, error: action.payload}
        case REMOVE_ALL_USER: return initState

        default: return state
    }
}

export const setUsers = (payload) => ({type: SET_USERS, payload})
export const setUser = (payload) => ({type: SET_USER, payload})
export const setError = (payload) => ({type: SET_ERROR, payload})
export const removeAllUsers = () => ({type: REMOVE_ALL_USER})

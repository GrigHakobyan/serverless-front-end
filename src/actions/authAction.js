import request from "../helpers/axios";
import {setAuth, setError} from "../reducers/authReducer";
import {removeAllCars} from "../reducers/carsReducer";
import {removeAllUsers} from "../reducers/usersReducer";


export const login = (username, password) => {
    return async dispatch => {
        try {
            const response = await request.post('/login',{
                username,
                password
            })

            const token = response.data.token

            dispatch(setAuth(true))
            dispatch(setError(''))
            localStorage.setItem('token', token)

        } catch (e) {
            dispatch(setError(e.response.data.error))
        }
    }
}


export const registration = (username, email, password) => {
    return async dispatch => {
        try {
            const response = await request.post('/registration',{
                username,
                email,
                password
            })

            const token = response.data.token

            dispatch(setAuth(true))
            dispatch(setError(''))
            localStorage.setItem('token', token)

        } catch (e) {
            dispatch(setError(e.response.data.error))
        }
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch(setAuth(false))
        localStorage.removeItem('token')
    }
}


export const check = () => {
    return async dispatch => {
        try {
            const {data} = await request.get('/check',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            localStorage.setItem('token', data.token)

            dispatch(setAuth(true))

        } catch (e) {
            localStorage.removeItem('token')
            dispatch(setAuth(false))
            dispatch(setError(''))
            dispatch(removeAllCars())
            dispatch(removeAllUsers())
        }
    }
}

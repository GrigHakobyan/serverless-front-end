import {removeAllUsers, setError, setUser, setUsers} from "../reducers/usersReducer";
import request from "../helpers/axios";
import {setAuth} from "../reducers/authReducer";
import {removeAllCars} from "../reducers/carsReducer";


export const getUsers = () => {
    return async dispatch => {
        try {
            const {data} = await request.get('/users',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            dispatch(setUsers(data))
            dispatch(setError(''))

        } catch (e) {
            dispatch(setError(e.response.data.error))
        }
    }
}

export const getUserById = (userId) => {
    return async dispatch => {
        try {
            const {data} = await request.get(`/user/${userId}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            dispatch(setUser(data))
            dispatch(setError(''))

        } catch (e) {
            dispatch(setError(e.response.data.error))
        }
    }
}


export const getProfile = async () => {
        const {data} = await request.get('/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

    return data
}

export const updateUser = (username, email, password) => {
    return async dispatch => {
        try {
            const {data} = await request.put('/user',
                {
                    username, email, password
                },
                {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            dispatch(setUser(data))
            dispatch(setError(''))

        } catch (e) {
            dispatch(setError(e.response.data.error))
        }
    }
}


export const deleteProfile = () => {
    return async dispatch => {
        try {
            await request.delete('/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            localStorage.removeItem('token')
            dispatch(setAuth(false))
            dispatch(removeAllCars())
            dispatch(removeAllUsers())
        } catch (e) {
            dispatch(setError(e.response.data.error))
        }
    }
}

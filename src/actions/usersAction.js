import {removeAllUsers, setError, setUser, setUsers} from "../reducers/usersReducer";
import request from "../helpers/axios";
import {setAuth} from "../reducers/authReducer";
import {removeAllCars} from "../reducers/carsReducer";
import {Auth} from "aws-amplify";


export const getUsers = () => {
    return async dispatch => {
        try {
            const {data} = await request.get('/users')

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
            const {data} = await request.get(`/user/${userId}`)

            dispatch(setUser(data))
            dispatch(setError(''))

        } catch (e) {
            dispatch(setError(e.response.data.error))
        }
    }
}


export const getProfile = async () => {
    const user = await Auth.currentAuthenticatedUser()

    const email = user?.signInUserSession?.idToken?.payload['email']
    const first_name = user?.signInUserSession?.idToken?.payload['custom:first_name']
    const last_name = user?.signInUserSession?.idToken?.payload['custom:last_name']

    return {
        email,
        first_name,
        last_name
    }
}

export const updateUserPassword = (oldPassword, newPassword) => {
    return async dispatch => {
        try {

            const user = await Auth.currentAuthenticatedUser()

            await Auth.changePassword(user,oldPassword, newPassword)

            dispatch(setError(''))

        } catch (e) {
            dispatch(setError(e.response.data.error))
        }
    }
}


export const deleteProfile = (myCars) => {
    return async dispatch => {
        try {
            if(myCars.length > 0) {
                const carsId = myCars.map(car => car.id)

                await request.delete('/deleteCars',{
                    data: {
                        carsId: carsId
                    }
                })
            }

            await Auth.deleteUser()

            dispatch(setAuth(false))
            dispatch(removeAllCars())
            dispatch(removeAllUsers())

        } catch (e) {
            console.log(e)
            dispatch(setError(e.response.data.error))
        }
    }
}

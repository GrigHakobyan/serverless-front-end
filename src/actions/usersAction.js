import {removeAllUsers, setError, setUser, setUsers} from "../reducers/usersReducer";
import request from "../helpers/axios";
import {setAuth} from "../reducers/authReducer";
import {removeAllCars} from "../reducers/carsReducer";
import UserPool from "../helpers/cognito/userPool";


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
    let email
    UserPool.getCurrentUser().getSession((err, session) => {
        if(err){
            console.log(err)
        } else {
            email = session.getIdToken().payload.email
        }
    })

    return email
}

export const updateUserPassword = (oldPassword, newPassword) => {
    return async dispatch => {
        try {

            const user = UserPool.getCurrentUser()
            user.getSession((error, session) => {
                if(error){
                    console.log(error)
                } else {
                    user.changePassword(oldPassword, newPassword, (err,res) => {
                        if(err){
                            console.log(err)
                        } else {
                            console.log(res)
                        }
                    })
                }
            })


            dispatch(setError(''))

        } catch (e) {
            dispatch(setError(e.response.data.error))
        }
    }
}


export const deleteProfile = () => {
    return async dispatch => {
        try {
            const user = UserPool.getCurrentUser()

            user.getSession((error, session) => {
                user.deleteUser((err, result) => {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log(result)

                        dispatch(setAuth(false))
                        dispatch(removeAllCars())
                        dispatch(removeAllUsers())
                    }
                })
            })



        } catch (e) {
            dispatch(setError(e.response.data.error))
        }
    }
}

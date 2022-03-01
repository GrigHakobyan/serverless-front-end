import {setAuth, setError} from "../reducers/authReducer";
import {removeAllCars} from "../reducers/carsReducer";
import {removeAllUsers} from "../reducers/usersReducer";
import UserPool from "../helpers/cognito/userPool";
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";


export const login = (email, password) => {
    return async dispatch => {
        dispatch(setError(''))

            const user = new CognitoUser({
                Username: email,
                Pool: UserPool
            })

            const authDetails = new AuthenticationDetails({
                Username: email,
                Password: password
            })

            user.authenticateUser(authDetails,{
                onSuccess: (data) => {
                    console.log(data)
                    dispatch(setError(''))
                    dispatch(setAuth(true))
                },
                onFailure: (err) => {
                    if(err) {
                        console.log(err.message)
                        dispatch(setError(err.message))
                    } else {
                        dispatch(setError(''))
                    }
                },
                newPasswordRequired: (data) => {
                    console.log('New password required', data)
                    dispatch(setError(''))
                    dispatch(setAuth(true))
                }
            })

    }
}


export const registration = (email, password) => {
    return async dispatch => {

        UserPool.signUp(email, password, [], null, (err, data) => {
            if(err) {
                console.log(err.message)
                dispatch(setError(err.message))
            } else {
                dispatch(setError('You registered successfully'))
            }
        })
    }
}

export const logout = () => {
    return async dispatch => {
        const user = UserPool.getCurrentUser()
        if(user) {
            user.signOut()

            dispatch(setAuth(false))
            dispatch(setError(''))
            dispatch(removeAllCars())
            dispatch(removeAllUsers())
        }
    }
}


export const check = () => {
    return async dispatch => {
        dispatch(setError(''))
            const user = UserPool.getCurrentUser()

            if(user){
                user.getSession((err, session) => {
                    if(err) {
                        console.log(err)
                        dispatch(setAuth(false))
                        dispatch(setError(err.message))
                        dispatch(removeAllCars())
                        dispatch(removeAllUsers())
                    } else {
                        dispatch(setError(''))
                        dispatch(setAuth(true))
                    }
                })
            }
    }
}


export const forgotPassword = (email) => {

    const user = new CognitoUser({
        Username: email,
        Pool: UserPool
    })

    console.log(user)

    user.forgotPassword({
        onSuccess: (data) => {
            console.log('success', data)
        },
        onFailure: (err) => {
            console.log('error', err)
        },
        inputVerificationCode: (data) => {
            console.log('verification', data)
        }
    })
}

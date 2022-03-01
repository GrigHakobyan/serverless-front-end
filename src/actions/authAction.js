import {setAuth, setEmail, setError} from "../reducers/authReducer";
import {removeAllCars} from "../reducers/carsReducer";
import {removeAllUsers} from "../reducers/usersReducer";
import {Auth} from "aws-amplify";



export const login = (email, password) => {
    return async dispatch => {
        dispatch(setError(''))

        try {
            await Auth.signIn(email, password)

            dispatch(setError(''))
            dispatch(setAuth(true))

        } catch (e) {
            dispatch(setError(e.message))
        }
    }
}


export const registration = (email, password, fname, lname) => {
    return async dispatch => {
        try {
            await Auth.signUp({
                username: email,
                password,
                attributes: {
                    'custom:first_name': fname,
                    'custom:last_name': lname
                }
            })

            dispatch(setError(''))
            dispatch(setEmail(email))
        } catch (e) {
            dispatch(setError(e.message))
        }
    }
}


export const verifyCode = (type,email, code,newPassword) => {
    return async dispatch => {
        try {
            if(type === 'ConfirmSignUp') {
                await Auth.confirmSignUp(email, code)
            } else if(type === 'ForgotPasswordSubmit') {
                await Auth.forgotPasswordSubmit(email,code,newPassword)
            }


            dispatch(setError(''))
            dispatch(setEmail(''))
        } catch (e) {
            console.log(e)
            dispatch(setError(e.message))
        }
    }
}


export const logout = () => {
    return async dispatch => {
        try {
            await Auth.signOut()

            dispatch(setAuth(false))
            dispatch(setError(''))
            dispatch(removeAllCars())
            dispatch(removeAllUsers())

        } catch (e) {
            dispatch(setError(e.message))
        }
    }
}


export const check = () => {
    return async dispatch => {
        dispatch(setError(''))

        try {
            const session = (await Auth.currentSession())

            if(session) {
                dispatch(setError(''))
                dispatch(setAuth(true))
            }

        } catch (e) {
            dispatch(setAuth(false))
            dispatch(setError(e.message))
            dispatch(removeAllCars())
            dispatch(removeAllUsers())
        }
    }
}


export const forgotPassword = (email) => {
    return async dispatch => {
        try {
            await Auth.forgotPassword(email)

            dispatch(setError(''))
            dispatch(setEmail(email))
        } catch (e) {
            dispatch(setError(e.message))
        }
    }
}

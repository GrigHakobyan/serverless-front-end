import thunk from "redux-thunk";
import {composeWithDevTools, composeWithDevToolsDevelopmentOnly} from '@redux-devtools/extension'
import {createStore, applyMiddleware, combineReducers} from 'redux'

import {authReducer} from './authReducer'
import {usersReducer} from './usersReducer'
import {carsReducer} from './carsReducer'

const rootReducer = combineReducers({
    authReducer,
    usersReducer,
    carsReducer
})


export const store = createStore(rootReducer, composeWithDevToolsDevelopmentOnly(applyMiddleware(thunk)))

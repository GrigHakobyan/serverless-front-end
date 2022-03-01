import React, {useEffect, useState} from 'react';
import {forgotPassword} from "../../actions/authAction";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setType} from "../../reducers/authReducer";

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const {error} = useSelector(state => state.authReducer)

    const onForgotHandler = async () => {
        await dispatch(forgotPassword(email))

        console.log(error)

        if(!error) {
            dispatch(setType('ForgotPasswordSubmit'))
            navigate('/confirm')
        }
    }

    return (
        <div className='content'>
            <h1>Forgot password</h1>

            <p className='error'>{error}</p>

            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text"/>
            <button className='btn btn-success' onClick={onForgotHandler}>Send</button>
        </div>
    );
};

export default ForgotPassword;

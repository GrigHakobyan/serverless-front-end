import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {login} from "../../actions/authAction";
import {Link, useNavigate} from "react-router-dom";
import {setError} from "../../reducers/authReducer";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const {error, isAuth} = useSelector(state => state.authReducer)

    const navigate = useNavigate()

    const onLoginHandler = () => {
        dispatch(login(email, password))
    }

    useEffect(() => {
        dispatch(setError(''))
    }, [])

    if(isAuth) {
        navigate('/')
    }

    return (
        <div className='content'>
            <h1>Login</h1>

            <p className='error'>{error}</p>

            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text"/>

            <label>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text"/>

            <div className='flex-row'>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Link to='/forgotpassword'>Forgot password?</Link>
                    <Link to='/registration'>Registration</Link>
                </div>
                <button className='btn auth-btn' onClick={onLoginHandler}>Login</button>
            </div>
        </div>
    );
};

export default Login;

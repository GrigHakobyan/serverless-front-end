import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {login} from "../../actions/authAction";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const {error} = useSelector(state => state.authReducer)

    const onLoginHandler = () => {
        dispatch(login(username, password))
    }

    return (
        <div className='content'>
            <h1>Login</h1>

            <p className='error'>{error}</p>

            <label>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text"/>

            <label>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text"/>

            <button className='btn btn-success' onClick={onLoginHandler}>Login</button>
        </div>
    );
};

export default Login;

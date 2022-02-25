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
        <div>
            <p>{error}</p>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text"/>
            <br/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text"/>
            <br/>
            <button onClick={onLoginHandler}>Login</button>
        </div>
    );
};

export default Login;

import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {registration} from "../../actions/authAction";

const Registration = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const {error} = useSelector(state => state.authReducer)

    const onRegistrationHandler = () => {
        dispatch(registration(username, email, password))
    }


    return (
        <div className='content'>
            <h1>Registration</h1>

            <p className='error'>{error}</p>

            <label>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text"/>

            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text"/>

            <label>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text"/>

            <button className='btn btn-success' onClick={onRegistrationHandler}>Registration</button>
        </div>
    );
};

export default Registration;

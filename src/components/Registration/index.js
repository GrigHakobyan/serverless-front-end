import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {registration} from "../../actions/authAction";
import {setError} from "../../reducers/authReducer";
import {Link, useNavigate} from "react-router-dom";

const Registration = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const {error} = useSelector(state => state.authReducer)

    const navigate = useNavigate()


    const onRegistrationHandler = () => {
        dispatch(registration(email, password))
    }

    useEffect(() => {
        dispatch(setError(''))
    }, [])


    return (
        <div className='content'>
            <h1>Registration</h1>

            <p className='error'>{error}</p>

            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text"/>

            <label>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text"/>
            <div className='flex-row'>
                <Link to='/login'>Login</Link>
                <button className='btn auth-btn' onClick={onRegistrationHandler}>Registration</button>
            </div>
        </div>
    );
};

export default Registration;

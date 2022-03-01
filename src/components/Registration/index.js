import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {registration} from "../../actions/authAction";
import {setError, setType} from "../../reducers/authReducer";
import {Link, useNavigate} from "react-router-dom";

const Registration = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const dispatch = useDispatch()

    const {error} = useSelector(state => state.authReducer)

    const navigate = useNavigate()


    const onRegistrationHandler = async (e) => {
        e.preventDefault()

        await dispatch(registration(email, password, firstName, lastName))

        if(!error) {
            dispatch(setType('ConfirmSignUp'))
            navigate('/confirm')
        }
    }

    useEffect(() => {
        dispatch(setError(''))
    }, [])


    return (
        <div className='content'>
            <h1>Registration</h1>

            <p className='error'>{error}</p>

            <form className='content' onSubmit={onRegistrationHandler}>
                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text"/>

                <label>First Name</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text"/>

                <label>Last Name</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text"/>

                <label>Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text"/>
                <div className='flex-row'>
                    <Link to='/login'>Login</Link>
                    <button className='btn auth-btn'>Registration</button>
                </div>
            </form>
        </div>
    );
};

export default Registration;

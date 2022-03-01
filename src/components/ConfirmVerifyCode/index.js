import React, {useEffect, useState} from 'react';
import {verifyCode} from "../../actions/authAction";
import {useDispatch, useSelector} from "react-redux";
import {setError} from "../../reducers/authReducer";
import {useNavigate} from "react-router-dom";

const ConfirmSignUp = () => {
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')

    const {email, error, type} = useSelector(state => state.authReducer)

    const dispatch = useDispatch()

    const navigate = useNavigate()


    const onVerifyHandler = async (e) => {
        e.preventDefault()

        await dispatch(verifyCode(type,email, code, password))

        if(!error){
            navigate('/login')
        }
    }

    return (
        <div className='content'>
            <h1>Verify Code</h1>

            <p>{error}</p>

            <form className='content' onSubmit={onVerifyHandler}>
                <input style={{marginBottom: '8px'}} value={code} onChange={(e) => setCode(e.target.value)} type="text"/>
                {
                    type === 'ForgotPasswordSubmit' &&
                    <input style={{marginBottom: '8px'}} value={password} onChange={(e) => setPassword(e.target.value)} type="text"/>
                }

                <button className='btn btn-success'>Verify</button>
            </form>
        </div>
    );
};

export default ConfirmSignUp;

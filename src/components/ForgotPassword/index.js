import React, {useEffect, useState} from 'react';
import {forgotPassword} from "../../actions/authAction";

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const onForgotHandler = () => {
        forgotPassword(email)
    }

    return (
        <div className='content'>
            <h1>Forgot password</h1>

            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text"/>
            <button onClick={onForgotHandler}>Send</button>
        </div>
    );
};

export default ForgotPassword;

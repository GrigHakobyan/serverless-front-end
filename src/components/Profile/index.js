import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteProfile, getProfile, updateUserPassword} from "../../actions/usersAction";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')


    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const dispatch = useDispatch()
    const error = useSelector(state => state.usersReducer.error)
    const myCars = useSelector(state => state.carsReducer.myCars)

    const navigate = useNavigate()

    useEffect(() => {
        getProfile().then(({email, first_name,last_name}) => {
            setEmail(email)
            setFirstName(first_name)
            setLastName(last_name)
        })
    }, [])

    const onSaveHandler = () => {
        dispatch(updateUserPassword(password, newPassword))
    }

    const onDeleteHandler = () => {
        dispatch(deleteProfile(myCars))
        navigate('/login')
    }


    return (
        <div className='content'>
            <h2>Profile</h2>

            <p className='error'>{error}</p>

            <input disabled value={email} onChange={(e) => setEmail(e.target.value)} type="text"/>
            <input disabled value={firstName} onChange={(e) => setEmail(e.target.value)} type="text"/>
            <input disabled value={lastName} onChange={(e) => setEmail(e.target.value)} type="text"/>

            <input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} type="text"/>
            <input placeholder='New password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="text"/>

            <button style={{marginBottom: '8px'}} className='btn btn-success' onClick={onSaveHandler}>Save</button>

            <button className='btn btn-alert' onClick={onDeleteHandler}>Delete profile</button>
        </div>
    );
};

export default Profile;

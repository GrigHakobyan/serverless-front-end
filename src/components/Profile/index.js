import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteProfile, getProfile, updateUser} from "../../actions/usersAction";

const Profile = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const error = useSelector(state => state.usersReducer.error)

    useEffect(() => {
        getProfile().then(data => {
            setUsername(data.username)
            setEmail(data.email)
        })
    }, [])

    const onSaveHandler = () => {
        dispatch(updateUser(username, email, password))
    }

    const onDeleteHandler = () => {
        dispatch(deleteProfile())
    }


    return (
        <div className='content'>
            <h2>Profile</h2>

            <p className='error'>{error}</p>

            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text"/>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text"/>

            <input placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} type="text"/>

            <button style={{marginBottom: '8px'}} className='btn btn-success' onClick={onSaveHandler}>Save</button>

            <button className='btn btn-alert' onClick={onDeleteHandler}>Delete profile</button>
        </div>
    );
};

export default Profile;

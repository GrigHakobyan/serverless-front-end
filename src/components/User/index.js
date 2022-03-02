import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserById} from "../../actions/usersAction";

const User = () => {
    const {userId} = useParams()

    const [findUser, setFindUser] = useState('')

    const dispatch = useDispatch()
    const {error, user, users} = useSelector(state => state.usersReducer)

    useEffect(() => {
        const foundUser = users?.find(user => user.sub === userId)

        if(foundUser) {
            setFindUser(foundUser)
        } else {
            dispatch(getUserById(userId))
        }

    }, [])


    return (
        <div className='content'>
            {
                error ?
                        <p className='error'>{error}</p>
                    :
                    findUser ?
                        <>
                            <h2>{findUser.email}</h2>
                            <div className='content'>
                                <p>First Name: {findUser['custom:first_name'] ?? 'N/A'}</p>
                                <p>Last Name: {findUser['custom:last_name']  ?? 'N/A'}</p>
                            </div>
                        </>
                        :
                        <>
                            <h2>{user && user.email}</h2>
                            <div className='content'>
                                <p>First Name: {user['custom:first_name']  ?? 'N/A'}</p>
                                <p>Last Name: {user['custom:last_name']  ?? 'N/A'}</p>
                            </div>
                        </>
            }
        </div>
    );
};

export default User;

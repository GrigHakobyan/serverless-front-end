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
        const foundUser = users?.find(user => user.Username === userId)

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
                            <h2>{findUser?.Attributes[1].Value}</h2>
                        </>
                        :
                        <>
                        <h2>{user && user?.Attributes?.[2].Value}</h2>
                        </>
            }
        </div>
    );
};

export default User;

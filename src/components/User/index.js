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
        const foundUser = users?.find(user => user.userId === userId)

        if(foundUser) {
            setFindUser(foundUser)
        } else {
            dispatch(getUserById(userId))
        }

    }, [])


    return (
        <div>
            {
                error ?
                        <p>{error}</p>
                    :
                    findUser ?
                        <>
                            <p>{findUser.username}</p>
                            <p>{findUser.email}</p>
                        </>
                        :
                        <>
                            <p>{user.username}</p>
                            <p>{user.email}</p>
                        </>
            }
        </div>
    );
};

export default User;

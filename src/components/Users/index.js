import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../actions/usersAction";
import {Link} from "react-router-dom";

const Users = () => {
    const dispatch = useDispatch()
    const {users, error} = useSelector(state => state.usersReducer)

    useEffect(() => {
            dispatch(getUsers())
    }, [])

    return (
        <div>
            <p>{error}</p>
            {
                users && users.map(user => <div key={user.userId}>
                    <Link to={`/user/${user.userId}`}>{user.username}</Link>
                </div>)
            }
        </div>
    );
};

export default Users;

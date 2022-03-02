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
        <div className='list'>
            <h2 style={{margin: 'auto'}}>Users</h2>
            <h2 className='error'>{error}</h2>
            {
                users && users.map(user => <div
                    className='list-item'
                    key={user.sub}
                >
                    <Link to={`/user/${user.sub}`}>{user.email}</Link>
                </div>)
            }
        </div>
    );
};

export default Users;

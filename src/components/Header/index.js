import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../actions/authAction";

const Header = () => {
    const {isAuth} = useSelector(state => state.authReducer)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const onLogoutHandler = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <header>
            {
                !isAuth ?
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/registration'>Registration</Link>
                    </>
                :
                    <>
                        <Link to='/'>Users</Link>
                        <Link to='/cars'>Cars</Link>
                        <Link to='/myCars'>My cars</Link>
                        <Link to='/profile'>My profile</Link>
                        <button onClick={onLogoutHandler} className='logout'>Logout</button>
                    </>
            }


        </header>
    );
};

export default Header;

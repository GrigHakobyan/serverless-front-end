import Header from "./components/Header";
import {useDispatch, useSelector} from "react-redux";
import {Routes, Route, Navigate} from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Users from "./components/Users";
import User from "./components/User";
import Cars from "./components/Cars";
import Profile from "./components/Profile";
import MyCars from "./components/MyCars";
import Car from "./components/Car";
import {useEffect} from "react";
import {check} from "./actions/authAction";

function App() {
    const {isAuth} = useSelector(state => state.authReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(check())
    }, [])

    return (
        <div className="App">
          <Header />
            <main>
                <Routes>
                    {
                        !isAuth ?
                        <>
                            <Route path='/login' element={ <Login /> }/>
                            <Route path='/registration' element={ <Registration /> }/>
                        </>
                        :
                        <>
                            <Route path='/' element={<Users />} />
                            <Route path='/user/:userId' element={<User />} />
                            <Route path='/cars' element={<Cars />} />
                            <Route path='/myCars' element={<MyCars />} />
                            <Route path='/car/:carId' element={<Car />} />
                            <Route path='/profile' element={<Profile />} />
                            <Route path='*' element={ <Navigate to={ isAuth ? '/' : '/login'}/> } />
                        </>
                    }
                </Routes>
            </main>
        </div>
  );
}

export default App;

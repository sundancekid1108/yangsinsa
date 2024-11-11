import {React} from 'react';
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom'

// import Router from './router/router.js';
import PrivateRoute from "./utils/protectedroutes";
import Login from './pages/login/login.jsx'
import Home from './pages/home/home.jsx';
import Profile from "./pages/profile/profile";
import NotFound from './pages/notfound/notfound.jsx';
import Store from "./pages/store/store.jsx"
import StoreInfo from './pages/storeinfo/storeinfo.jsx'



const App = () => {
    // const accessToken = localStorage.getItem("token")
    // console.log("accessToken", accessToken  )


    return (
        <BrowserRouter>
            <Routes>

                <Route path='/login' element={<Login />}></Route>

                <Route element={<PrivateRoute />} >
                    <Route path='/' element={<Home />} ></Route>
                    <Route path='/store' element={<Store />}></Route>
                    <Route path='/store/:storeid' element={<StoreInfo />}></Route>
                    <Route path='/profile' element={<Profile />} ></Route>
                </Route>



                <Route path='*' element={<NotFound />}></Route>
            </Routes>

        </BrowserRouter>


      );
}

export default App;

import { Navigate, Outlet, useLocation } from "react-router-dom";


const PrivateRoute = ({ component, ...rest }) => {
    const currentRoutePath = useLocation()
    const token=localStorage.getItem('token')

    if(token){
        // console.log('token', token)
        // console.log('currentRoutePath', currentRoutePath)

        return <Outlet />
    }else {
        console.log('currentRoutePath', currentRoutePath)
        return <Navigate to="/login" />
    }

};

export default PrivateRoute;
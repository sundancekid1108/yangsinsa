import React, { useState, useRef } from 'react';
import {
	Navigate,
	Outlet,
	useLocation,
	useNavigate,
	redirect,
} from 'react-router-dom';

const PrivateRoute = ({ children, ...props }) => {
	const { authentication } = props;
	const currentLocation = useLocation();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const token = localStorage.getItem('token');
	console.log('token', token);
	console.log(currentLocation);
	const path = currentLocation.pathname;

	return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

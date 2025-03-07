import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();

	console.log('isAuthenticated', isAuthenticated);

	if (isAuthenticated) {
		return <Outlet />;
	} else {
		return <Navigate to={'/login'} />;
	}
};

export default ProtectedRoute;

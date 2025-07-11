import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../stores/slice/auth/authslice';

const ProtectedRoute = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const navigate = useNavigate();

	useEffect(() => {
		// console.log('path', path);
		if (!isAuthenticated) {
			navigate('/login');
		}
	}, [isAuthenticated, navigate]);

	return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute;

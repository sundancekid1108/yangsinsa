import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	let status = !!localStorage.getItem('token');

	const navigate = useNavigate();
	const [isAuthenticated, setIsAuthenticated] = useState(status);

	const setLogin = () => {
		setIsAuthenticated(true);
		navigate('/');
	};

	const setLogout = () => {
		localStorage.removeItem('token');
		setIsAuthenticated(false);
		navigate('/login');
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, setLogin, setLogout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

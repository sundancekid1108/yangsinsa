import React, { createContext, useState, useContext } from 'react';

//context 생성
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	let status = !!localStorage.getItem('token');
	const [isAuthenticated, setIsAuthenticated] = useState(status);

	const setLogin = () => {
		setIsAuthenticated(true);
	};

	const setLogout = () => {
		localStorage.removeItem('token');
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, setLogin, setLogout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

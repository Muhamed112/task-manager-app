import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
	const token = localStorage.getItem("token");
	const [isAuthenticated, setIsAuthenticated] = useState(!!token);

	useEffect(() => {
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	const saveToken = (token) => {
		localStorage.setItem("token", token);
		setIsAuthenticated(true);
	};

	const removeToken = () => {
		localStorage.removeItem("token");
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, saveToken, removeToken }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

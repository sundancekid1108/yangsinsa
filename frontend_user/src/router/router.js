import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom'
import Login from '../pages/login/login.jsx';
import Home from '../pages/home/home.jsx';
import NotFound from '../pages/notfound/notfound.jsx';


const Router = () => {
    const elements = useRoutes([
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		]);

    return elements
};

export default Router

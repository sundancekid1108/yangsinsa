import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import ProtectedRoute from './utils/protectedroute';
import Login from './pages/login/login.jsx';
import Home from './pages/home/home.jsx';
import Profile from './pages/profile/profile';
import NotFound from './pages/notfound/notfound.jsx';
import StoreList from './pages/storelist/storelist.jsx';
import StoreInfo from './pages/storeinfo/storeinfo.jsx';
import SignUp from './pages/signup/signup.jsx';
import BrandList from './pages/brandlist/brandlist';
import UserList from './pages/userlist/userlist';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<Home />} />
					<Route path="/store" element={<StoreList />} />
					{/*<Route path="/brand" element={<BrandList />} />*/}
					{/*<Route path="/user" element={<UserList />} />*/}
					{/*<Route path="/store/:storeid" element={<StoreInfo />} />*/}
					{/*<Route path="/profile" element={<Profile />} />*/}
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;

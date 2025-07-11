import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import ProtectedRoute from './utils/protectedroute';
import Login from './pages/login/login.jsx';
import Home from './pages/home/home.jsx';
import Profile from './pages/profile/profile';
import NotFound from './pages/notfound/notfound.jsx';
import StoreInfo from './pages/storeinfo/storeinfo.jsx';
import SignUp from './pages/signup/signup.jsx';
import BrandList from './pages/brandlist/brandlist';
import UserList from './pages/userlist/userlist';
import CreateStore from './pages/createstore/createstore';
import CreateBrand from './pages/createbrand/createbrand';
import OrderList from './pages/orderlist/orderlist';
import Layout from './components/layout/layout/layout';

import { persistor } from './stores/store';
import { PersistGate } from 'redux-persist/integration/react';
const App = () => {
	return (
		<PersistGate loading={null} persistor={persistor}>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route element={<ProtectedRoute />}>
						<Route element={<Layout />}>
							<Route path="/" element={<Home />} />
							<Route
								path="/brand/brandlist"
								element={<BrandList />}
							/>
							<Route path="/userlist" element={<UserList />} />
							<Route
								path="/store/mystore"
								element={<StoreInfo />}
							/>
							<Route path="/profile" element={<Profile />} />
							<Route
								path="/store/createstore"
								element={<CreateStore />}
							/>
							<Route
								path="/brand/createbrand"
								element={<CreateBrand />}
							/>
							<Route
								path="/order/orderlist"
								element={<OrderList />}
							/>
							<Route path="*" element={<NotFound />} />ㅠ
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</PersistGate>
	);
};

export default App;

import { React } from 'react';
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';

// import Router from './router/router.js';
import PrivateRoute from './utils/protectedroutes';
import Login from './pages/login/login.jsx';
import Home from './pages/home/home.jsx';
import Profile from './pages/profile/profile';
import NotFound from './pages/notfound/notfound.jsx';
import Store from './pages/store/store.jsx';
import StoreInfo from './pages/storeinfo/storeinfo.jsx';
import SignUp from './pages/signup/signup.jsx';

const App = () => {
	// const accessToken = localStorage.getItem("token")
	// console.log("accessToken", accessToken  )

	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/signup" element={<SignUp />} />

				<Route element={<PrivateRoute />}>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/store" element={<Store />} />
					<Route
						exact
						path="/store/:storeid"
						element={<StoreInfo />}
					/>

					<Route exact path="/profile" element={<Profile />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;

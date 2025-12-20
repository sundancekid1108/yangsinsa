import { Routes, Route, useLocation, Outlet } from 'react-router-dom'

import ProtectedRoutes from './protectedroutes.jsx'
import Layout from '../components/Layout/layout.jsx'
import Home from '../page/home/home.jsx'
import Login from '../page/login/login.jsx'
import Store from '../page/store/store.jsx'
import BrandList from '../page/brandlist/brandlist.jsx'
import SighUp from '../page/signup/signup.jsx'
import MyProfile from '../page/myprofile/myprofile.jsx'
import NotFound from '../page/notfound/notfound.jsx'

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<ProtectedRoutes />}>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SighUp />} />
				<Route path="/*" element={<NotFound />} />
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/store" element={<Store />} />
					<Route path="/brandlist" element={<BrandList />} />
					<Route path="/myprofile" element={<MyProfile />} />
				</Route>
			</Route>
		</Routes>
	)
}

export default AppRoutes

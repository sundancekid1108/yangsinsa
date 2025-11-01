import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import Home from '../page/home/home.jsx'
import Login from '../page/login/login.jsx'
import NotFound from '../page/notfound/notfound.jsx'

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/*" element={<NotFound />} />
		</Routes>
	)
}

export default AppRoutes

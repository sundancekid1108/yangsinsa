import { useNavigate, Outlet, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import authStore from '../utils/zustand/authstore.js'

const ProtectedRoutes = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const currentPath = location.pathname
	console.log(currentPath)

	const isLoggedIn = authStore.getState().isLoggedIn

	if (isLoggedIn) {
		if (currentPath === '/login') {
			return <Navigate to="/" replace />
		}
		if (currentPath === '/signup') {
			return <Navigate to="/" replace />
		} else {
			return (
				<>
					<Outlet />
				</>
			)
		}
	} else {
		if (currentPath === '/login') {
			return (
				<>
					<Outlet />
				</>
			)
		} else if (currentPath === '/signup') {
			return (
				<>
					<Outlet />
				</>
			)
		} else {
			return <Navigate to="/login" replace />
		}
	}
}

export default ProtectedRoutes

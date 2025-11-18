import axios from 'axios'
import { updateAccessToken } from '../../api/auth/auth.js'
import authStore from '../../utils/zustand/authstore.js'

const config = {
	baseURL: import.meta.env.VITE_SERVER_URL,
	withCredentials: true,
	timeout: 5000,
}
const axiosInstance = axios.create(config)

axiosInstance.interceptors.request.use(
	(config) => {
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	(response) => {
		return response
	},
	async (error) => {
		//토큰 만료일때 처리

		const originalRequest = error.config
		if (error.response.status === 401) {
			const isAccessTokenExpired =
				error.response.data.isAccessTokenExpired
			const isRefreshTokenExpired =
				error.response.data.isRefreshTokenExpired
			//  엑세스 토큰 만료, 토큰 재발급 진행, 기존 리퀘스트 재요청
			if (
				isAccessTokenExpired === true &&
				isRefreshTokenExpired === false
			) {
				const response = await updateAccessToken()
				if (response.status === 200) {
					if (response.headers.authorization) {
						const newAccessToken = response.headers.authorization

						authStore.getState().setAccessToken(newAccessToken)
						const token = authStore.getState().accessToken
						originalRequest.headers.authorization = token
						return axiosInstance(originalRequest)
					}
				}
			}

			// 둘다 만료시 로그아웃 처리
			if (
				isAccessTokenExpired === true &&
				isRefreshTokenExpired === true
			) {
				console.log('토큰 둘다 만료 로그아웃')
				authStore.getState().setLogOut()
			}
		}

		return Promise.reject(error)
	}
)

export default axiosInstance

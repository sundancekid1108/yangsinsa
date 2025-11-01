import axios from 'axios'

const config = {
	baseURL: import.meta.env.VITE_SERVER_URL,
	withCredentials: true,
	timeout: 5000,
}
const axiosApi = axios.create(config)

axiosApi.interceptors.request.use(
	(config) => {
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

axiosApi.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		const originalRequest = error.config
		return Promise.reject(error)
	}
)

export default axiosApi

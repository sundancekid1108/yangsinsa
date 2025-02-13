import axios from 'axios';
import { Outlet, useLocation, useNavigate, redirect } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	timeout: 5000,
});

//요청시 처리
axiosInstance.interceptors.request.use(
	(config) => {
		// console.log(config.url);
		return config;
	},
	(error) => {
		// console.log('인터셉터 req ', error);
		return Promise.reject(error);
	},
);

//응답시 처리
axiosInstance.interceptors.response.use(
	// 200번대 응답이 올때 처리
	(response) => {
		console.log('인스탄스 성공!!');
		return response;
	},

	async (error) => {
		// 401, 403, 404, 500 에러일 경우
		console.log('인스탄스 실패!!');
		// console.log(error);
		const originalRequest = error.config;

		if (error.response && error.response.status === 401) {
			try {
				const response = await axiosInstance.get(
					'/admin/auth/updateaccessetoken',
				);
				console.log(response);
				const headers = response.headers;
				const newAccessToken = headers.authorization;
				console.log(newAccessToken);
				localStorage.setItem('token', newAccessToken);
				originalRequest.headers.authorization = newAccessToken;
				return axiosInstance(originalRequest);
			} catch (error) {
				return Promise.reject(error);
			}
		}

		if (error.response && error.response.status === 403) {
			console.log('인터셉터 테스트, 토큰 만료');
			localStorage.removeItem('token');
			return Promise.reject(error);
		}
	},
);

export default axiosInstance;

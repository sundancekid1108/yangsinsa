import axios from 'axios';
import { store } from '../stores/store';
import { logout } from '../stores/slice/auth/authslice';
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

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
		return response;
	},

	async (error) => {
		// 401, 403, 404, 500 에러일 경우

		const originalRequest = error.config;

		if (error.response && error.response.status === 400) {
			return Promise.reject(error);
		} else if (error.response && error.response.status === 401) {
			const response = await axiosInstance.get(
				'/storeadmin/auth/refreshaccesstoken',
			);
			alert('토큰 업데이트');
			// console.log('response', response);
			const headers = response.headers;
			const newAccessToken = headers.authorization;

			localStorage.setItem('token', newAccessToken);
			originalRequest.headers.authorization = newAccessToken;
			return axiosInstance(originalRequest);
		} else if (error.response && error.response.status === 403) {
			// console.log(error.response);
			// console.log('인터셉터 테스트, 토큰 만료');
			localStorage.removeItem('token');
			store.dispatch(logout()); // 강제 로그아웃
			window.location.href = '/login';
			return new Promise(() => {});
		} else {
			// console.log('오류 발생');
			// console.log(error);
			localStorage.removeItem('token');
			store.dispatch(logout()); // 강제 로그아웃
			window.location.href = '/login';
			return Promise.reject(error);
		}
	},
);

export default axiosInstance;

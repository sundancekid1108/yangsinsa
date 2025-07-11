import axiosInstance from '../../utils/axios';

export const userLogin = async (data) => {
	const LOGIN_URL = '/storeadmin/auth/login';

	try {
		const response = await axiosInstance.post(LOGIN_URL, data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.status === 200) {
			localStorage.setItem('token', response.headers.authorization);
			return response;
		}
	} catch (error) {
		// console.log('error', error.response);
		// return error.response?.data?.message || '로그인 요청에 실패했습니다.';
		// 요청 실패 시, 에러를 던져서 `useMutation`의 `onError` 콜백 함수에서 처리
		// 서버에서 에러 메시지를 JSON 형태로 반환하는 경우, error.response.data 사용
		throw error.response?.data?.message || '로그인 요청에 실패했습니다.';
	}
};

export const userSignUp = async (data) => {
	const SIGNUP_URL = '/storeadmin/auth/register';
	try {
		const response = await axiosInstance.post(SIGNUP_URL, data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (response.status === 200) {
			return response;
		}
	} catch (error) {
		// console.log('error.response', error.response);
		return error.response;
	}
};

export const getUserInfo = async () => {
	const GET_USERINFO_URL = '/storeadmin/user/userinfo';
	const accessToken = localStorage.getItem('token');
	try {
		const response = await axiosInstance.get(GET_USERINFO_URL, {
			headers: {
				'Content-Type': 'application/json',
				authorization: accessToken,
			},
		});
		return response;
	} catch (error) {
		// console.log('error.response', error.response);
		return error.response;
	}
};

export const getRefreshAccessToken = async () => {
	try {
		const GET_REFRESHACCESSTOKEN_URL =
			'/storeadmin/auth/refreshaccesstoken';
		const accessToken = localStorage.getItem('token');
		const response = await axiosInstance.get(GET_REFRESHACCESSTOKEN_URL, {
			headers: {
				'Content-Type': 'application/json',
				authorization: accessToken,
			},
		});

		if (response.status === 200) {
			localStorage.setItem('token', response.headers.authorization);
			return response;
		}
	} catch (error) {
		// console.log('error.response', error.response);
		return error.response;
	}
};

import axiosInstance from '../../utils/axios';

export const userLogin = async (data) => {
	const LOGIN_URL = '/store/auth/login';

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
		console.log('error.response', error.response);
		return error.response;
	}
};

export const userSignUp = async (data) => {
	const SIGNUP_URL = 'store/auth/register';
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

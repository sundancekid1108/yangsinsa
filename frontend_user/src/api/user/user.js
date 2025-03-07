import axiosInstance from '../../utils/axios';

export const userLogin = async (data) => {
	const test_URL = '/user/auth/login';

	try {
		const response = await axiosInstance.post(test_URL, data, {
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

import axiosInstance from '../../utils/axios';

export const getStoreList = async () => {
	try {
		const accessToken = localStorage.getItem('token');
		const response = await axiosInstance.get('/store/storelist', {
			headers: {
				'Content-Type': 'application/json',
				authorization: accessToken,
			},
		});

		if (response.status === 200) {
			return response;
		}
	} catch (error) {
		console.log('error.response', error.response);
		return error;
	}
};

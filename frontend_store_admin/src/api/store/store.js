import axiosInstance from '../../utils/axios';

export const getStoreList = async () => {
	const GET_STORELIST_URL = '/stores/storelist';
	try {
		const accessToken = localStorage.getItem('token');
		const response = await axiosInstance.get(GET_STORELIST_URL, {
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

export const createStore = async (data) => {
	const CREATE_STORE_URL = '/stores/createStore';
	try {
		const accessToken = localStorage.getItem('token');
		const response = await axiosInstance.post(CREATE_STORE_URL, data, {
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
		return error.response;
	}
};

export const getMyStore = async () => {
	const GET_MYSTORE_URL = '/stores/mystore';
	try {
		const accessToken = localStorage.getItem('token');
		const response = await axiosInstance.get(GET_MYSTORE_URL, {
			headers: {
				'Content-Type': 'application/json',
				authorization: accessToken,
			},
		});
		return response;
		// if (response.status === 200) {
		// 	return response;
		// }
	} catch (error) {
		// console.log('error.response', error);
		return error.response;
	}
};

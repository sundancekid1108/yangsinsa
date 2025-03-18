import axiosInstance from '../../utils/axios';

export const getStoreList = async () => {
	const GETSTORELIST_URL = '/store/storelist';
	try {
		const accessToken = localStorage.getItem('token');
		const response = await axiosInstance.get(GETSTORELIST_URL, {
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
	const CREATESTORE_URL = '/store/createStore';
	try {
		const accessToken = localStorage.getItem('token');
		const response = await axiosInstance.post(CREATESTORE_URL, data, {
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
	const GETMYSTORE_URL = '/store/mystore';
	try {
		const accessToken = localStorage.getItem('token');
		const response = await axiosInstance.get(GETMYSTORE_URL, {
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

import axiosInstance from '../../utils/axios';

export const getBrandList = async () => {
	const GET_BRANDLIST_URL = '/brand/brandlist';
	try {
		const accessToken = localStorage.getItem('token');
		const response = await axiosInstance.get(GET_BRANDLIST_URL, {
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

export const createBrand = async (data) => {
	const CREATE_BRAND_URL = '/brand/createbrand';
	try {
		const accessToken = localStorage.getItem('token');
		const response = await axiosInstance.post(CREATE_BRAND_URL, data, {
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

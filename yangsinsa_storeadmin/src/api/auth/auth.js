import axiosInstance from '../../utils/axios/axios.js'
import authStore from '../../utils/zustand/authstore.js'

const updateAccessToken = async () => {
	try {
		const response = await axiosInstance.get(
			'/auth/storeadmin/updateaccesstoken'
		)

		return response
	} catch (error) {
		return error
	}
}

const registerUser = async (data) => {
	try {
		const response = await axiosInstance.post(
			'/auth/storeadmin/register',
			data
		)

		return response
	} catch (error) {
		console.log('error!!!')
		return error
	}
}

const loginUser = async (data) => {
	console.log('loginUser')
	try {
		const response = await axiosInstance.post(
			'/auth/storeadmin/login',
			data
		)

		return response
	} catch (error) {
		return error
	}
}

export { updateAccessToken, registerUser, loginUser }

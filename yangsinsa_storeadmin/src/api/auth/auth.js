import axiosInstance from '../../utils/axios/axios.js'
import authStore from '../../utils/zustand/authstore.js'

const updateAccessToken = async () => {
	try {
		const result = await axiosInstance('/auth/admin/updateaccesstoken')

		return result
	} catch (error) {
		return error
	}
}

export { updateAccessToken }

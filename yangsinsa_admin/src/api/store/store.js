import { useQuery, useMutation } from '@tanstack/react-query'
import authStore from '../../utils/zustand/authstore.js'
import axiosInstance from '../../utils/axios/axios.js'

const getStoreList = async () => {
	const token = authStore.getState().accessToken
	try {
		const response = await axiosInstance.get('/admin/store/storelist', {
			headers: { authorization: token },
		})
		console.log('getStoreList', response)
		return response
	} catch (error) {
		return error
	}
}

export { getStoreList }

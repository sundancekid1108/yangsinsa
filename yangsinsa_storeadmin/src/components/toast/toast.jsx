import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const customToast = (type, message) => {
	const toastOption = {
		position: 'bottom-right',
		newestOnTop: false,
		closeOnClick: true,
		limit: 1,
		autoClose: 5000,
		hideProgressBar: false,
		toastId: message,
	}

	const toastId = 'loginToast' // 고유 ID 설정
	switch (type) {
		case 'error':
			toast.error(message, { ...toastOption })
			return
		default:
			break
	}
}
export default customToast

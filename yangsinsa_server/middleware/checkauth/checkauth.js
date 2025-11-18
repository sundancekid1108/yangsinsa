import config from '../../config/config.js'

//어드민권한 확인
const checkAdminAuth = (req, res, next) => {
	// 권한 체크
	console.log('checkAdminAuth req', req.body)
	if (req.body.grade) {
		console.log('권한있음')
		next()
	} else {
		return res.status(403).json({ message: '권한이 없습니다.' })
	}
}

// 스토어 어드민 권한 확인
const checkStoreAdminAuth = (req, res, next) => {
	console.log('checkStoreAdminAuth')

	const grade = req.body.decoded.grade

	if (grade === 'service' || grade === 'maintenance') {
		next()
	} else {
		return res.status(403).json({ message: '권한이 없습니다.' })
	}
}

export { checkAdminAuth, checkStoreAdminAuth }

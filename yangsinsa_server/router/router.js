import express from 'express'
import config from '../config/config.js'
import storeRouter from './api/store/store.js'
import adminAuthRouter from './api/auth/admin/admin.js'
import storeAdminAuthRouter from './api/auth/storeadmin/storeadmin.js'
import userAuthRouter from './api/auth/user/user.js'
import brandRouter from './api/brand/brand.js'

import {
	validateTokenLifeTime,
	checkStoreAdminAuth,
} from '../middleware/checkauth/checkauth.js'

const router = express.Router()

const PORT = config.port

router.get('/', (req, res) => {
	return res.status(200).json({
		message: `Backend Server on Listening on port ${PORT}. Check http://localhost:${PORT}/ `,
	})
})

router.use('/auth/admin', adminAuthRouter)
router.use('/auth/storeadmin', storeAdminAuthRouter)
router.use('/auth/user', userAuthRouter)
router.use('/store', validateTokenLifeTime, checkStoreAdminAuth, storeRouter)
router.use('/brand', validateTokenLifeTime, checkStoreAdminAuth, brandRouter)

export default router

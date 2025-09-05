import express from 'express'
import Store from '../../../database/model/store/store.js'
import Authority from '../../../database/model/authority/authority.js'
import constant from '../../../constant/constant.js'
import constants from '../../../constant/constant.js'

const storeRouter = express.Router()

storeRouter.get('/storeinfo', async (req, res) => {
	try {
		const { decode } = req.body
		const storeAdminUserId = decode.id

		const myStoreData = await Store.findOne({
			storeAdmin: storeAdminUserId,
		}).populate({
			path: 'storeAdmin',
			select: 'koreanName phoneNumber adminGrade',
		})

		if (myStoreData) {
			return res.status(200).json(myStoreData)
		}
	} catch (error) {
		return res.status(500).json({
			error,
		})
	}
})

storeRouter.get('/storelist', async (req, res) => {
	try {
		const storeList = await Store.find().sort('-createdDate').exec()
		if (storeList) {
			return res.status(200).json({
				storeList,
			})
		} else {
			return res.status(400).json({
				message: '스토어 정보가 없습니다.',
			})
		}
	} catch (error) {
		return res.status(500).json({
			error,
		})
	}
})

storeRouter.post('/createstore', async (req, res) => {
	try {
		console.log(req.body)
		const decoded = req.body.decoded
		const {
			storeName,
			storeEngName,
			email,
			president,
			phoneNumber,
			description,
			businessRegistrationCode,
		} = req.body

		if (
			!storeName ||
			!storeEngName ||
			!president ||
			!email ||
			!phoneNumber ||
			!description ||
			!businessRegistrationCode
		) {
			return res.status(400).json({
				message: '필수 필드를 입력해주세요.',
			})
		}

		const newStore = new Store({
			storeName: storeName,
			storeEngName: storeEngName,
			email: email,
			president: president,
			description: description,
			phoneNumber: phoneNumber,
			businessRegistrationCode: businessRegistrationCode,
			storeAdmin: decoded.id,
		})

		const newAuthority = new Authority({
			admin: decoded.id,
			store: newStore._id,
			type: constants.STORE_ADMIN_GRADE.SUPERVISOR,
		})

		console.log(newStore)
		console.log(newAuthority)
		await Promise.all([newStore.save(), newAuthority.save()])

		return res.status(200).json({ message: '스토어 생성' })
	} catch (error) {
		console.log(error)
		if (error.name === 'ValidationError') {
			const errorMessage = Object.values(error.errors).map(
				(err) => err.message
			)
			return res.status(400).json({
				message: errorMessage,
			})
		}

		if (error.name === 'MongoServerError' && error.code === 11000) {
			const field = Object.keys(error.keyValue)[0]

			if (field === 'storeName') {
				return res
					.status(409)
					.json({ message: '중복된 스토어명 입니다.' })
			}

			if (field === 'storeEngName') {
				return res
					.status(409)
					.json({ message: '중복된 영문 스토어명 입니다.' })
			}

			if (field === 'email') {
				return res
					.status(409)
					.json({ message: '중복된 이메일 입니다.' })
			}

			if (field === 'phoneNumber') {
				return res
					.status(409)
					.json({ message: '중복된 전화번호 입니다.' })
			}

			if (field === 'businessRegistrationCode') {
				return res
					.status(409)
					.json({ message: '중복된 사업자등록번호 입니다.' })
			}

			if (field === 'admin') {
				return res
					.status(409)
					.json({ message: '중복된 관리자 입니다.' })
			}
		}
		return res.status(500).json({ error })
	}
})

storeRouter.post('/updatestore', async (req, res) => {
	try {
		const updateStoreData = req.body
		const storeData = await Store.findById(updateStoreData.id)
		if (!storeData) {
			return res.status(404).json({
				message: '스토어 정보를 찾을 수 없습니다.',
			})
		}

		if (updateStoreData.storeName) {
			storeData.storeName = updateStoreData.storeName
		}

		if (updateStoreData.storeEngName) {
			storeData.storeEngName = updateStoreData.storeEngName
		}

		if (updateStoreData.email) {
			storeData.email = updateStoreData.email
		}

		if (updateStoreData.description) {
			storeData.description = updateStoreData.description
		}

		if (updateStoreData.phoneNumber) {
			storeData.phoneNumber = updateStoreData.phoneNumber
		}

		if (updateStoreData.businessRegistrationCode) {
			storeData.businessRegistrationCode =
				updateStoreData.businessRegistrationCode
		}

		await storeData.save()
		return res.status(200).json({ message: '저장 완료' })
	} catch (error) {
		if (error.name === 'ValidationError') {
			// Mongoose validation errors (e.g., regex mismatch, required field missing)
			const errorMessage = Object.values(error.errors).map(
				(err) => err.message
			)
			return res.status(400).json({
				message: errorMessage,
			})
		} else if (error.name === 'MongoServerError' && error.code === 11000) {
			const field = Object.keys(error.keyValue)[0]
			if (field === 'storeName') {
				return res
					.status(409)
					.json({ message: '중복된 스토어명 입니다.' })
			}

			if (field === 'storeEngName') {
				return res
					.status(409)
					.json({ message: '중복된 영문 스토어명 입니다.' })
			}

			if (field === 'email') {
				return res
					.status(409)
					.json({ message: '중복된 이메일 입니다.' })
			}

			if (field === 'phoneNumber') {
				return res
					.status(409)
					.json({ message: '중복된 전화번호 입니다.' })
			}

			if (field === 'businessRegistrationCode') {
				return res
					.status(409)
					.json({ message: '중복된 사업자등록번호 입니다.' })
			}
		}
		return res.status(500).json(error)
	}
})

export default storeRouter

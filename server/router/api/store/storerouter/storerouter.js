import express from 'express';
import Store from '../../../../database/model/store/store.js';
const storeRouter = express.Router();

// 상점 등록
storeRouter.post('/createstore', async (req, res) => {
	try {
		const {
			storeName,
			storeEngName,
			storeEmail,
			storePhoneNumber,
			storeDescription,
			businessRegistrationCode,
			decoded,
		} = req.body;

		if (decoded && decoded.adminGrade) {
			if (
				!storeName ||
				!storeEngName ||
				!storeEmail ||
				!storePhoneNumber ||
				!storeDescription ||
				!businessRegistrationCode
			) {
				return res.status(400).json({
					message: '필수 필드를 입력해주세요.',
				});
			}

			if (
				businessRegistrationCode.length > 10 ||
				businessRegistrationCode.length < 10
			) {
				return res.status(400).json({
					message: '사업자 등록 번호는 10자리 입니다.',
				});
			}

			const duplicateStoreName = await Store.findOne({ storeName });
			if (duplicateStoreName) {
				return res.status(400).json({
					message: '이미 등록된 상점입니다.',
				});
			}
			const duplicateStoreEngName = await Store.findOne({ storeEngName });
			if (duplicateStoreEngName) {
				return res.status(400).json({
					message: '이미 등록된 상점(영문)입니다.',
				});
			}

			const duplicateStoreEmail = await Store.findOne({ storeEmail });

			if (duplicateStoreEmail) {
				return res.status(400).json({
					message: '이미 등록된 이메일입니다.',
				});
			}

			const duplicateStorePhoneNumber = await Store.findOne({
				storePhoneNumber,
			});

			if (duplicateStorePhoneNumber) {
				return res.status(400).json({
					message: '이미 등록된 전화번호입니다.',
				});
			}

			const duplicateBusinesssRegistrationCode = await Store.findOne({
				businessRegistrationCode,
			});

			if (duplicateBusinesssRegistrationCode) {
				return res.status(400).json({
					message: '이미 등록된 사업자 등록번호입니다.',
				});
			}

			const newStore = new Store({
				storeName: storeName,
				storeAdminId: decoded.id,
				storeEngName: storeEngName,
				storeEmail: storeEmail,
				storePhoneNumber: storePhoneNumber,
				storeDescription: storeDescription,
				businessRegistrationCode: businessRegistrationCode,
			});

			console.log(newStore);

			await newStore.save().then((store) => {
				return res.status(200).json({ message: '스토어 생성 완료' });
			});
		} else {
			return res.status(400).json({
				message: '스토어 생성 실패',
			});
		}
	} catch (error) {
		return res.status(500).json({
			error,
		});
	}
});

storeRouter.get('/mystore', async (req, res) => {
	try {
		const { decoded } = req.body;
		const storeAdminUserId = decoded.id;
		const myStoreData = await Store.find(storeAdminId: storeAdminUserId);
		return res.status(200).json({})
	} catch (error) {
		return res.status(500).json({
			error,
		});
	}
});

// 상점 리스트 조회
storeRouter.get('/storelist', async (req, res) => {
	try {
		const storeList = await Store.find().sort('-createdDate').exec();
		return res.status(200).json({
			storeList,
		});
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
});

// 상점 검색
storeRouter.post('/searchstore', async (req, res) => {
	try {
		const { searchquery } = req.query;

		const regex = new RegExp(searchquery, 'i');

		const storeList = await Store.find({
			$or: [
				{ storeEmail: { $regex: regex } },
				{ storePhoneNumber: { $regex: regex } },
				{ storeName: { $regex: regex } },
				{ businessRegistrationCode: { $regex: regex } },
			],
		})
			.sort('-createdDate')
			.exec();

		return res.status(200).json({
			storeList,
		});
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
});

storeRouter.get('/storedetail/:storeid', async (req, res) => {
	try {
		const { storeId } = req.params.storeid;
		const store = await Store.findById(storeId);
		if (store) {
			return res.status(200).json({
				store,
			});
		} else {
			return res.status(500).json({
				message: '상점 정보 없음',
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
});

/// 상점 삭제
storeRouter.delete('/deletestore/:storeId', async (req, res) => {
	try {
		const { storeId } = req.params.storeId;
		const deleteStore = await Store.findByIdAndDelete(storeId);
		if (deleteStore) {
			return res.status(200).json({
				message: '상점 삭제 성공',
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
});

export default storeRouter;

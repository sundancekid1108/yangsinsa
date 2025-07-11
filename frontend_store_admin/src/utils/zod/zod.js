import { z } from 'zod';

//zod를 활용해 validation 구현

export const storeAdminRegisterSchema = z.object({
	userName: z
		.string()
		.nonempty('유저명을 입력해주세요.')
		.regex(
			/^[a-z0-9]{5,20}$/,
			'영문 소문자 또는 영문+숫자 조합 5~20자리를 입력해주세요.',
		),
	password: z
		.string()
		.nonempty('비밀번호를 입력해주세요.')
		.regex(
			/^[a-zA-Z0-9]{5,20}$/,
			'영문 또는 영문+숫자 조합 5~20자리를 입력해주세요.',
		),
	koreanName: z
		.string()
		.nonempty('이름을 입력해주세요.')
		.regex(/^[가-힣]{3,40}$/, '한글 성명을 입력해주세요.'),
	phoneNumber: z
		.string()
		.nonempty('전화번호를 입력해주세요.')
		.regex(
			/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
			'올바른 휴대폰 전화번호를 입력해주세요.',
		),
	email: z
		.string()
		.nonempty('이메일을 입력해주세요.')
		.email('올바른 형식의 이메일을 입력해주세요.'),
});

export const storeAdminLoginSchema = z.object({
	userName: z.string().nonempty('유저명을 입력해주세요.'),
	password: z.string().nonempty('비밀번호를 입력해주세요.'),
});

export const createStoreSchema = z.object({
	storeName: z
		.string()
		.nonempty('스토어명(한글)을 입력해주세요.')
		.regex(/^[가-힣0-9]{1,40}$/, '최대 40자까지 입력 가능합니다.'),
	storeEngName: z
		.string()
		.nonempty('스토어명(영문)을 입력해주세요.')
		.regex(/^[a-zA-Z0-9]{1,40}$/, '최대 40자까지 입력 가능합니다.'),
	storeEmail: z
		.string()
		.nonempty('이메일을 입력해주세요.')
		.email('올바른 형식의 이메일을 입력해주세요.'),

	storePhoneNumber: z
		.string()
		.nonempty('전화번호(유선)를 입력해주세요.')
		.regex(/^\d{3,20}$/, '올바른 전화번호를 입력해주세요.'),
	storeDescription: z
		.string()
		.nonempty('스토어 상세 설명을 입력해주세요.')
		.regex(/^[a-zA-Z가-힣0-9]{0,2000}$/, '2000자까지 입력가능합니다..'),
	businessRegistrationCode: z
		.string()
		.nonempty('사업자번호를 입력해주세요.')
		.regex(/^\d{10}$/, '올바른 사업자번호를 입력해주세요.'),
});

export const createBrandSchema = z.object({
	brandName: z
		.string()
		.nonempty('브랜드명을 입력해주세요.')
		.regex(/^[가-힣0-9]{1,40}$/, '스토어명(한글)을 입력해주세요.'),
	brandEngName: z
		.string()
		.nonempty('브랜드명(영문)을 입력해주세요.')
		.regex(/^[a-zA-Z0-9]{1,20}$/, '스토어명(영문)을 입력해주세요.'),

	brandDescription: z
		.string()
		.nonempty('스토어 상세 설명을 입력해주세요.')
		.regex(/^[a-zA-Z가-힣0-9]{0,2000}$/, '2000자까지 입력가능합니다..'),
});

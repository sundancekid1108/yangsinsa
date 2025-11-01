import { z } from 'zod'

const AdminSchema = z.object({
	userName: z
		.string()
		.min(1, { message: '아이디를 확인해주세요.' })
		.max(40, { message: '아이디를 확인해주세요.' }),
	password: z
		.string()
		.min(1, { message: '비밀번호를 확인해주세요.' })
		.max(40, { message: '비밀번호를 확인해주세요.' }),
})

export { AdminSchema }

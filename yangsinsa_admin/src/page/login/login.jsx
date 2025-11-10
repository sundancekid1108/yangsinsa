import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AdminSchema } from '../../utils/zod/zod.js'
import axiosApi from '../../utils/axios/axios.js'
import authStore from '../../utils/zustand/authstore.js'

const Login = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		mode: 'onSubmit',
		resolver: zodResolver(AdminSchema),
	})

	const navigate = useNavigate()
	const [loginError, setLoginError] = useState(null) // 전역 로그인 에러 상태

	console.log('isSubmitting', isSubmitting)

	const onSubmit = async (data) => {
		try {
			const response = await axiosApi.post('/auth/admin/login', data)

			if (response.status === 200) {
				const token = response.headers.authorization
				console.log(token)
				authStore.getState().setLogIn(token)
				navigate('/')
			}
		} catch (error) {
			console.error('Validation failed:', error)
			const message = error.response.data.message
			setLoginError(message)
		}
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
				<h2 className="text-3xl font-bold text-center text-gray-900">
					로그인
				</h2>

				{/* 4. 폼 엘리먼트 */}
				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					{/* 사용자 이름 (Username) 입력 필드 */}
					<div>
						<label
							htmlFor="username"
							className="block text-sm font-medium text-gray-700"
						>
							사용자 이름
						</label>
						<div className="mt-1">
							<input
								id="userName"
								type="text"
								className={`
                  appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                  ${errors.userName ? 'border-red-500' : 'border-gray-300'}
                `}
								// register 함수로 필드 등록 및 유효성 규칙 설정
								{...register('userName', {
									required: '아이디를 입력해주세요.',
								})}
							/>
							{/* 유효성 검사 오류 메시지 표시 */}
							{errors.userName && (
								<p className="mt-2 text-sm text-red-500">
									{errors.userName.message}
								</p>
							)}
						</div>
					</div>

					{/* 비밀번호 (Password) 입력 필드 */}
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							비밀번호
						</label>
						<div className="mt-1">
							<input
								id="password"
								type="password"
								autoComplete="current-password"
								className={`
                  appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                  ${errors.password ? 'border-red-500' : 'border-gray-300'}
                `}
								// register 함수로 필드 등록 및 유효성 규칙 설정
								{...register('password', {
									required: '비밀번호를 입력해주세요.',
								})}
							/>
							{/* 유효성 검사 오류 메시지 표시 */}
							{errors.password && (
								<p className="mt-2 text-sm text-red-500">
									{errors.password.message}
								</p>
							)}
						</div>
					</div>

					{/* 제출 버튼 */}
					<div>
						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{isSubmitting ? '로딩중...' : '로그인'}
						</button>

						{loginError && (
							<p className="mt-2 text-sm text-red-500">
								{loginError}
							</p>
						)}
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login

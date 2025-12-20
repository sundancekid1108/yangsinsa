import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { signUpSchema } from '../../utils/zod/zod.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '../../api/auth/auth.js'

import customToast from '../../components/toast/toast.jsx'

const SignUp = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		mode: 'onSubmit',
		resolver: zodResolver(signUpSchema),
	})

	const [signUpError, setSignUpError] = useState(null)

	const navigate = useNavigate()

	const onSubmit = async (data) => {
		const response = await registerUser(data)
		if (response && response.status === 200) {
			console.log('success')
			navigate('/login')
		}
		if (response && response.status === 409) {
			console.log('response', response.response.data.message)
			const errorMessage = response.response.data.message
			setSignUpError(errorMessage)
			customToast('error', errorMessage)
		}
	}

	console.log(errors)

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
				<h2 className="text-3xl font-bold text-center text-gray-900">
					스토어 어드민 회원 가입
				</h2>
				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label
							htmlFor="username"
							className="block text-sm font-medium text-gray-700"
						>
							아이디
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
								{...register('userName', {
									required: '아이디를 입력해주세요.',
								})}
							/>
						</div>
						<div>
							{/* 유효성 검사 오류 메시지 표시 */}
							{errors.userName && (
								<p className="mt-2 text-sm text-red-500">
									{errors.userName.message}
								</p>
							)}
						</div>
					</div>
					<div>
						<label
							htmlFor="koreanName"
							className="block text-sm font-medium text-gray-700"
						>
							이름
						</label>
						<div className="mt-1">
							<input
								id="koreanName"
								type="text"
								className={`
									  appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
									  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
									  ${errors.userName ? 'border-red-500' : 'border-gray-300'}
									`}
								{...register('koreanName', {
									required: '아이디를 입력해주세요.',
								})}
							/>
						</div>
						<div>
							{/* 유효성 검사 오류 메시지 표시 */}
							{errors.koreanName && (
								<p className="mt-2 text-sm text-red-500">
									{errors.koreanName.message}
								</p>
							)}
						</div>
					</div>

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
						</div>
						<div>
							{/* 유효성 검사 오류 메시지 표시 */}
							{errors.password && (
								<p className="mt-2 text-sm text-red-500">
									{errors.password.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<label
							htmlFor="phoneNumber"
							className="block text-sm font-medium text-gray-700"
						>
							전화번호
						</label>
						<div className="mt-1">
							<input
								id="phoneNumber"
								type="string"
								className={`
											  appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
											  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
											  ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}
											`}
								// register 함수로 필드 등록 및 유효성 규칙 설정
								{...register('phoneNumber', {
									required: '비밀번호를 입력해주세요.',
								})}
							/>
						</div>
						<div>
							{/* 유효성 검사 오류 메시지 표시 */}
							{errors.phoneNumber && (
								<p className="mt-2 text-sm text-red-500">
									{errors.phoneNumber.message}
								</p>
							)}
						</div>
					</div>

					{/* 제출 버튼 */}
					<div className="mt-1">
						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{isSubmitting ? '로딩중...' : '회원가입'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignUp

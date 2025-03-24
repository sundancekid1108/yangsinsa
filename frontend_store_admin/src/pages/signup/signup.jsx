import { React, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../components/input/input.jsx';
import { useAuth } from '../../utils/useAuth';
import { userSignUp } from '../../api/user/user';
import { storeAdminRegisterSchema } from '../../utils/zod/zod.js';

const SignUp = () => {
	const navigate = useNavigate();

	const { isAuthenticated } = useAuth();
	const [errorMessage, setErrorMessage] = useState('');
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
		resolver: zodResolver(storeAdminRegisterSchema),
	});

	//Token 보유시 리다이렉트
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	});

	const mutate = useMutation({
		mutationFn: (data) => {
			return userSignUp(data);
		},
		onSuccess: (response) => {
			console.log('onSuccess', response);
			if (response.status === 200) {
				console.log('success');
				navigate('/');
			} else {
				setErrorMessage(response.data.message);
			}
		},
		onError: (error, newData, context) => {
			console.log('onError', error);
			setErrorMessage('서버에 문제가 발생했습니다.');
		},
	});

	const submitForm = (data) => {
		mutate.mutate(data);
	};

	return (
		<div>
			<div>스토어 어드민 가입 페이지</div>
			<div>
				<form onSubmit={handleSubmit(submitForm)}>
					<div>
						<div>
							<Input
								type={'text'}
								label={'아이디'}
								placeholder={'아이디'}
								register={register('userName', {
									required: true,
									maxLength: 30,
								})}
							/>
						</div>
						<div>
							{errors.userName && (
								<p>{errors.userName.message}</p>
							)}
						</div>

						<div>
							<Input
								type={'password'}
								label={'암호'}
								placeholder={'암호'}
								register={register('password', {
									required: true,
									maxLength: 30,
								})}
							/>
						</div>
						<div>
							{errors.password && (
								<p>{errors.password.message}</p>
							)}
						</div>

						<div>
							<Input
								type={'text'}
								label={'이름'}
								placeholder={'이름'}
								register={register('koreanName', {
									required: true,
									maxLength: 30,
								})}
							/>
						</div>
						<div>
							{errors.koreanName && (
								<p>{errors.koreanName.message}</p>
							)}
						</div>

						<div>
							<Input
								type={'text'}
								label={'전화번호'}
								placeholder={'전화번호'}
								register={register('phoneNumber', {
									required: true,
									maxLength: 30,
								})}
							/>
						</div>

						<div>
							{errors.phoneNumber && (
								<p>{errors.phoneNumber.message}</p>
							)}
						</div>

						<div>
							<Input
								type={'text'}
								label={'이메일'}
								placeholder={'이메일'}
								register={register('email', {
									required: true,
									maxLength: 30,
								})}
							/>
						</div>

						<div>
							{errors.email && <p>{errors.email.message}</p>}
						</div>

						<div>
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								type="submit"
							>
								signup
							</button>
						</div>

						<div>{errorMessage ? errorMessage : ''}</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;

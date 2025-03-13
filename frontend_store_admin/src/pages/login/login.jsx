import { React, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../../components/input/input.jsx';
import axiosInstance from '../../utils/axios';
import { userLogin } from '../../api/user/user.js';
import { useAuth } from '../../utils/useAuth';
import {
	storeAdminLoginSchema,
	storeAdminRegisterSchema,
} from '../../utils/zod/zod';
import { zodResolver } from '@hookform/resolvers/zod';

const Login = () => {
	const navigate = useNavigate();
	const { isAuthenticated, setLogin } = useAuth();
	const [errorMessage, setErrorMessage] = useState('');
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
		resolver: zodResolver(storeAdminLoginSchema),
	});
	//Token 보유시 리다이렉트
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	});

	const submitForm = async (data) => {
		console.log(data);
		userLogin(data)
			.then((response) => {
				console.log('response', response);
				if (response && response.status === 200) {
					setLogin();
					navigate('/');
				} else {
					console.log(response.data.message);
					setErrorMessage(response.data.message);
				}
			})
			.catch((error) => {
				console.log('error', error);
			});
	};

	const navigateToSignUp = () => {
		navigate('/signup');
	};

	return (
		<div>
			스토어 어드민 로그인
			<div>
				<form onSubmit={handleSubmit(submitForm)}>
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
						{errors.userName && <p>{errors.userName.message}</p>}
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
						{errors.password && <p>{errors.password.message}</p>}
					</div>

					<div>
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							type="submit"
						>
							login
						</button>
					</div>
				</form>
				<div>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						type="submit"
						onClick={navigateToSignUp}
					>
						signup
					</button>
				</div>

				<div>{errorMessage ? errorMessage : ''}</div>
			</div>
		</div>
	);
};

export default Login;

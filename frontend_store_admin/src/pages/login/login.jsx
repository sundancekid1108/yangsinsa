import { React, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Input from '../../components/input/input.jsx';
import { storeAdminLoginSchema } from '../../utils/zod/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '../../stores/slice/auth/authslice';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
		resolver: zodResolver(storeAdminLoginSchema),
	});

	const error = useSelector((state) => state.auth.error);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const submitForm = (data, e) => {
		e.preventDefault();

		// console.log(data);
		dispatch(login(data));
	};

	const navigateToSignUp = () => {
		navigate('/signup');
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	}, [isAuthenticated]);

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

				<div>{error ? error : ''}</div>
			</div>
		</div>
	);
};

export default Login;

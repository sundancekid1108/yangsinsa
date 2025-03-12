import { React, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate, redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../../components/input/input.jsx';
import axiosInstance from '../../utils/axios';
import { userLogin } from '../../api/user/user.js';
import { useAuth } from '../../utils/useAuth';

const Login = () => {
	const navigate = useNavigate();
	const { isAuthenticated, setLogin } = useAuth();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ mode: 'onSubmit' });
	//Token 보유시 리다이렉트
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	});

	const submitForm = async (data) => {
		try {
			const res = await userLogin(data);
			if (res && res.status === 200) {
				setLogin();
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const navigateToSignUp = () => {
		navigate('/signup');
	};

	return (
		<div>
			스토어 어드민 로그인
			<div>
				<form
					onSubmit={handleSubmit(submitForm)}
					onError={() => {
						'로그인 실패';
					}}
				>
					<div>
						<Input
							type={'text'}
							label={'username'}
							placeholder={'username'}
							register={register('userName', {
								required: true,
								maxLength: 30,
							})}
						/>
					</div>

					<div>
						<Input
							type={'password'}
							label={'password'}
							placeholder={'password'}
							register={register('password', {
								required: true,
								maxLength: 30,
							})}
						/>
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
			</div>
		</div>
	);
	i;
};

export default Login;

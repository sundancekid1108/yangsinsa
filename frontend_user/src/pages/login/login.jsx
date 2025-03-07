import { React, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate, redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { userLogin } from '../../api/user/user.js';
import { useAuth } from '../../utils/useAuth';
import Input from '../../components/input/input.jsx';

const Login = () => {
	const navigate = useNavigate();
	const { isAuthenticated, setLogin } = useAuth();
	//Token 보유시 리다이렉트
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	});

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ mode: 'onSubmit' });

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

	return (
		<div>
			유저 로그인
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
							label={'email'}
							placeholder={'email'}
							register={register('email', {
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
			</div>
		</div>
	);
	i;
};

export default Login;

import { React, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate, redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../../components/input/input.jsx';
import axiosInstance from '../../utils/axios';

const Login = () => {
	const navigate = useNavigate();

	//Token 보유시 리다이렉트
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			navigate('/');
		}
	});

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ mode: 'onSubmit' });

	const axiosLoginTest = async (data) => {
		const test_URL = '/admin/auth/login';
		try {
			const response = await axiosInstance.post(test_URL, data, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.status === 200) {
				// console.log(response.data)
				localStorage.setItem('token', response.data.token);

				navigate('/');
			}
		} catch (error) {
			console.log('error.response', error.response);
		}
	};

	console.log('errors', errors);

	const submitForm = (data) => {
		console.log(data);
		axiosLoginTest(data);
	};

	return (
		<div>
			로그인
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
			</div>
		</div>
	);
};

export default Login;

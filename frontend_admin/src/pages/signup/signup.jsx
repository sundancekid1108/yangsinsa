import { React, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate, redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../../components/input/input.jsx';
import axiosInstance from '../../utils/axios';

const SignUp = () => {
	const navigate = useNavigate();
	//Token 보유시 리다이렉트
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			navigate(-1);
		}
	});

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({ mode: 'onSubmit' });

	return <div>signup</div>;
};

export default SignUp;

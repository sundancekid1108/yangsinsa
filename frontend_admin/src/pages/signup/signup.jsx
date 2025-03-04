import { React, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate, redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../utils/useAuth';
import Input from '../../components/input/input.jsx';
import axiosInstance from '../../utils/axios';

const SignUp = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();
	//Token 보유시 리다이렉트
	useEffect(() => {
		if (isAuthenticated) {
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

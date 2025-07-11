import { React, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, redirect } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Input from '../../components/input/input.jsx';
import { createBrandSchema } from '../../utils/zod/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createStore } from '../../api/store/store';

const CreateBrand = () => {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('');
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
		resolver: zodResolver(createBrandSchema),
	});

	const submitForm = (data, e) => {
		e.preventDefault();
		console.log(data);
	};

	return (
		<div>
			<div>브랜드 등록</div>
			<div>
				<form onSubmit={handleSubmit(submitForm)}>
					<div>
						<Input
							type={'text'}
							label={'브랜드명'}
							placeholder={'브랜드'}
							register={register('brandName')}
						/>
					</div>

					<div>
						{errors.brandName && <p>{errors.brandName.message}</p>}
					</div>

					<div>
						<Input
							type={'text'}
							label={'브랜드 영문명'}
							placeholder={'브랜드 영문명'}
							register={register('brandEngName')}
						/>
					</div>

					<div>
						{errors.brandEngName && (
							<p>{errors.brandEngName.message}</p>
						)}
					</div>

					<div>
						<Input
							type={'text'}
							label={'브랜드 설명'}
							placeholder={'브랜드 설명'}
							register={register('brandDescription')}
						/>
					</div>

					<div>
						{errors.brandDescription && (
							<p>{errors.brandDescription.message}</p>
						)}
					</div>

					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						type="submit"
					>
						브랜드 등록
					</button>
				</form>

				<div>{errorMessage ? errorMessage : ''}</div>
			</div>
		</div>
	);
};

export default CreateBrand;

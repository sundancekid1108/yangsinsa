import { React, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, redirect } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Input from '../../components/input/input.jsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { createStoreSchema } from '../../utils/zod/zod';
import { _createStore } from '../../stores/slice/store/storeslice';
import { useDispatch } from 'react-redux';

const CreateStore = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState('');
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
		resolver: zodResolver(createStoreSchema),
	});

	const submitForm = async (data, e) => {
		e.preventDefault();
		console.log(data);

		const result = await dispatch(_createStore(data));
		console.log(result);
	};

	return (
		<div>
			<div>스토어 생성</div>
			<div>
				<form onSubmit={handleSubmit(submitForm)}>
					<div>
						<Input
							type={'text'}
							label={'스토어명'}
							placeholder={'스토어'}
							register={register('storeName')}
						/>
					</div>

					<div>
						{errors.storeName && <p>{errors.storeName.message}</p>}
					</div>
					<div>
						<Input
							type={'text'}
							label={'스토어명(영문)'}
							placeholder={'스토어명(영문)'}
							register={register('storeEngName')}
						/>
					</div>

					<div>
						{errors.storeEngName && (
							<p>{errors.storeEngName.message}</p>
						)}
					</div>

					<div>
						<Input
							type={'text'}
							label={'스토어 대표 이메일'}
							placeholder={'스토어 대표 이메일'}
							register={register('storeEmail')}
						/>
					</div>

					<div>
						{errors.storeEmail && (
							<p>{errors.storeEmail.message}</p>
						)}
					</div>

					<div>
						<Input
							type={'text'}
							label={'스토어 대표 전화번호'}
							maxLength={20}
							placeholder={'스토어 대표 전화번호'}
							register={register('storePhoneNumber')}
						/>
					</div>

					<div>
						{errors.storePhoneNumber && (
							<p>{errors.storePhoneNumber.message}</p>
						)}
					</div>

					<div>
						<Input
							type={'textarea'}
							label={'스토어 설명'}
							maxLength={2000}
							placeholder={'스토어 설명'}
							register={register('storeDescription')}
						/>
					</div>

					<div>
						{errors.storeDescription && (
							<p>{errors.storeDescription.message}</p>
						)}
					</div>

					<div>
						<Input
							type={'text'}
							maxLength={'10'}
							label={'사업자 번호'}
							placeholder={'사업자 번호'}
							register={register('businessRegistrationCode')}
						/>
					</div>

					<div>
						{errors.businessRegistrationCode && (
							<p>{errors.businessRegistrationCode.message}</p>
						)}
					</div>

					<div>
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							type="submit"
						>
							스토어 등록
						</button>
					</div>
				</form>
			</div>
			<div>
				<div>{errorMessage ? errorMessage : ''}</div>
			</div>
		</div>
	);
};

export default CreateStore;

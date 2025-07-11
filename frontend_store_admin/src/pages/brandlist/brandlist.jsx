import { React, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getBrandList } from '../../api/brand/brand';

const BrandList = () => {
	const navigate = useNavigate();
	const [brandList, setBrandList] = useState({});
	const [errorMessage, setErrorMessage] = useState('');
	const navigateToSignUp = () => {
		navigate('/brand/createbrand');
	};

	return (
		<div>
			<div>브랜드 리스트</div>
			<div>
				{brandList ? '등록된 브랜드가 없습니다.' : '브랜드 리스트 노출'}
			</div>
			<div>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					type="submit"
					onClick={navigateToSignUp}
				>
					브랜드 생성
				</button>
			</div>
		</div>
	);
};

export default BrandList;

import { React, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Outlet, useLocation, useNavigate, redirect } from 'react-router-dom';
import { getMyStore } from '../../api/store/store';

const StoreInfo = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const [loadingMessage, setLoadingMessage] = useState('');
	const [myStore, setMyStore] = useState({});
	const [storeAdminInfo, setStoreAdminInfo] = useState({});

	const { data, isError, isLoading } = useQuery({
		queryKey: ['myStoreQuery'],
		queryFn: getMyStore,
	});

	useEffect(() => {
		// getMyStore().then((response) => {
		// 	if (response.status === 200) {
		// 		const result = response.data.myStoreData;
		//
		// 		setMyStore(result);
		// 		setStoreAdminInfo(result.storeAdmin);
		// 	}
		// });

		if (data) {
			setMyStore(data.data.myStoreData);
			setStoreAdminInfo(data.data.myStoreData.storeAdmin);
		}

		if (isLoading) {
			setLoadingMessage('로딩중입니다.');
		}
		if (isError) {
			setErrorMessage('에러발생');
		}
	}, [data, setMyStore]);

	return (
		<div>
			<div>마이스토어 </div>
			{errorMessage ? (
				<div>Error: {errorMessage}</div>
			) : (
				<div>
					<div>
						<div>
							<div>스토어명</div>
							<div>{myStore.storeName}</div>
						</div>
						<div>
							<div>스토어 관리자</div>
							<div>{storeAdminInfo.koreanName}</div>
						</div>
						<div>
							<div>스토어 세부내용</div>
							<div>{myStore.storeDescription}</div>
						</div>
						<div>
							<div>스토어 이메일</div>
							<div>{myStore.storeEmail}</div>
						</div>

						<div>스토어 전화번호</div>
						<div>{myStore.storePhoneNumber}</div>
						<div>사업자번호</div>
						<div>{myStore.businessRegistrationCode}</div>
						<div></div>
					</div>
				</div>
			)}
		</div>
	);
};

export default StoreInfo;

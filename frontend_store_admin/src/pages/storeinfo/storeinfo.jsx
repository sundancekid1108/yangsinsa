import { React, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, redirect } from 'react-router-dom';
import { getMyStore } from '../../api/store/store';

const StoreInfo = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const [myStore, setMyStore] = useState({});
	const [storeAdminInfo, setStoreAdminInfo] = useState({});

	useEffect(() => {
		getMyStore().then((response) => {
			console.log(response);
			if (response.status === 200) {
				const result = response.data.myStoreData;

				setMyStore(result);
				setStoreAdminInfo(result.storeAdmin);
			}
		});
	}, []);

	console.log(myStore);
	console.log(typeof myStore);

	console.log(myStore.storeAdmin);

	return (
		<div>
			<div>마이스토어 </div>
			{errorMessage ? (
				<div>Error: {errorMessage}</div>
			) : (
				<div>
					<div>
						<div>스토어명</div>
						<div>{myStore.storeName}</div>
						<div>스토어 관리자</div>
						<div>{storeAdminInfo.koreanName}</div>

						<div>스토어 세부내용</div>
						<div>{myStore.storeDescription}</div>
						<div>스토어 세부내용</div>
						<div>{myStore.storeEmail}</div>
						<div>스토어 세부내용</div>
						<div>{myStore.storePhoneNumber}</div>
						<div>사업자번호</div>
						<div>{myStore.businessRegistrationCode}</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default StoreInfo;

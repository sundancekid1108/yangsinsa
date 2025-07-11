import { React, useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, redirect } from 'react-router-dom';
import { setStoreInfo } from '../../stores/slice/store/storeslice';
import { useDispatch, useSelector } from 'react-redux';
import { _getMyStore } from '../../stores/slice/store/storeslice';
import { getMyStore } from '../../api/store/store';

const StoreInfo = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { myStore, isLoading, error } = useSelector((state) => state.store);

	useEffect(() => {
		dispatch(_getMyStore());
	}, [_getMyStore]);

	console.log('myStore', myStore, error);

	const navigateToCreateStore = () => {
		navigate('/store/createStore');
	};

	if (error) {
		return <div> {error}</div>;
	}

	return (
		<div>
			<div>마이스토어 </div>
			<div>
				{/* myStore 객체가 비어있는지 확인하여 스토어 존재 여부 판단 */}
				{myStore === null ? (
					<div>
						<div>스토어 없음</div>{' '}
						{/* errorMessage 대신 직접 메시지 표시 */}
						<div>
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								type="submit"
								onClick={navigateToCreateStore}
							>
								스토어 생성
							</button>
						</div>
					</div>
				) : (
					<div>
						{/* 스토어 정보가 있을 때 렌더링될 내용 (주석 처리된 부분) */}
						<div>
							<div>스토어명</div>
							<div>{myStore.storeName}</div>
						</div>

						{/* 다른 스토어 정보들도 여기에 표시할 수 있습니다 */}
						<div>스토어 세부내용</div>
						<div>{myStore.storeDescription}</div>
						<div>스토어 이메일</div>
						<div>{myStore.storeEmail}</div>
						<div>스토어 전화번호</div>
						<div>{myStore.storePhoneNumber}</div>
						<div>사업자번호</div>
						<div>{myStore.businessRegistrationCode}</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default StoreInfo;

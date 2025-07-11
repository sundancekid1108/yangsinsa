import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout/layout';
import { useQuery } from '@tanstack/react-query';
import { getMyStore } from '../../api/store/store';
import { getBrandList } from '../../api/brand/brand';

const Home = () => {
	const [myStore, setMyStore] = useState({});
	const [errorMessage, setErrorMessage] = useState('');
	const [loadingMessage, setLoadingMessage] = useState('');

	// const { data, isError, isLoading } = useQuery({
	// 	queryKey: ['myStoreQuery'],
	// 	queryFn: getMyStore,
	// });
	//
	// useEffect(() => {
	// 	if (data) {
	// 		setMyStore(data.data.myStoreData);
	// 	}
	//
	// 	if (isLoading) {
	// 		// setLoadingMessage('로딩중입니다.');
	// 	}
	// 	if (isError) {
	// 		// setErrorMessage('에러발생');
	// 	}
	// }, [data, setMyStore]);
	//
	// console.log(myStore);

	return <div>홈</div>;
};

export default Home;

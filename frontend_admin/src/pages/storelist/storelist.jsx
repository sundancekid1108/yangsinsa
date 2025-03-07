import { React, useState, useEffect, useRef } from 'react';
import { getStoreList } from '../../api/store/store.js';
import axiosInstance from '../../utils/axios';

const StoreList = () => {
	const [storeList, setStoreList] = useState(null);

	useEffect(() => {
		const storeListData = getStoreList();
	}, []);
	console.log('storeList', storeList);

	return (
		<div>
			<div>StoreList</div>
			<div>
				<ol>
					{storeList ? (
						storeList.map((store) => (
							<div key={store._id}>{store.storeName}</div>
						))
					) : (
						<div>No list</div>
					)}
				</ol>
			</div>
		</div>
	);
};

export default StoreList;

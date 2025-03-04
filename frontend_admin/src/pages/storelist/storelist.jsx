import { React, useState, useEffect, useRef } from 'react';
import { getStoreList } from '../../api/store/store.js';
import axiosInstance from '../../utils/axios';

const StoreList = () => {
	const [storeList, setStoreList] = useState(null);

	useEffect(() => {
		getStoreList().then((result) => {
			const data = result.data.storeList;
			// console.log('data', data);
			setStoreList(data);
		});
	}, []);
	console.log(storeList);

	return (
		<div>
			<div>StoreList</div>
			<div>
				<ol>
					{storeList.map((store) => (
						<div key={store._id}>{store.storeName}</div>
					))}
				</ol>
			</div>
		</div>
	);
};

export default StoreList;

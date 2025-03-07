import { React, useState, useEffect, useRef } from 'react';
import { getStoreList } from '../../api/store/store.js';
import axiosInstance from '../../utils/axios';

const StoreList = () => {
	const storeList = getStoreList();
	console.log(storeList);
	return <div>StoreList</div>;
};

export default StoreList;

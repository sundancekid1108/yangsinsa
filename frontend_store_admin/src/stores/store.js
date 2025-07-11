import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slice/auth/authslice';
import storeReducer from './slice/store/storeslice';

const persistConfig = {
	key: 'root',
	storage: storage, // 로컬 스토리지에 저장
	whitelist: ['user', 'isAuthenticated', 'myStore'],
	version: 1,
	timeout: 5000,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedStoreReducer = persistReducer(persistConfig, storeReducer);

const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
		store: persistedStoreReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

const persistor = persistStore(store);

export { store, persistor };

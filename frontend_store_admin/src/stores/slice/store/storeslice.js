import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMyStore, createStore } from '../../../api/store/store';
import error from 'eslint-plugin-react/lib/util/error';

export const _createStore = createAsyncThunk(
	'store/createnewstore',
	async (data, { rejectWithValue }) => {
		try {
			const response = await createStore(data);
			// console.log(response);
			return response;
		} catch (error) {
			console.log('error', error.response.data);
			return rejectWithValue(error.response.data.message);
		}
	},
);

export const _getMyStore = createAsyncThunk(
	'store/getmystore',
	async (_, { rejectWithValue }) => {
		try {
			const response = await getMyStore();
			// console.log(' _getMyStore response', response);
			return response;
		} catch (error) {
			console.log('error', error.response.data);
			return rejectWithValue(error.response.data);
		}
	},
);

const storeSlice = createSlice({
	name: 'store',
	initialState: {
		myStore: null,
		isLoading: false,
		error: false,
		isSuccess: false,
	},
	reducers: {
		setStoreInfo: (state, action) => {
			state.store = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(_getMyStore.pending, (state, action) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(_getMyStore.fulfilled, (state, action) => {
				state.myStore = action.payload.data;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(_getMyStore.rejected, (state, action) => {
				state.isLoading = false;
				state.isSuccess = false;
				state.error = '스토어 불러오기 오류';
			})
			.addCase(_createStore.pending, (state, action) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(_createStore.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.error = null;
			})
			.addCase(_createStore.rejected, (state, action) => {});
	},
});

export const { setStoreInfo } = storeSlice.actions;
export default storeSlice.reducer;

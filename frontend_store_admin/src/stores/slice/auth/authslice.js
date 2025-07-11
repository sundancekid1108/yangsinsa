import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { userLogin } from '../../../api/user/user';

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

const authAxiosInstance = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	timeout: 5000,
});

export const login = createAsyncThunk(
	'auth/login',
	async (loginData, { rejectWithValue }) => {
		const LOGIN_URL = '/storeadmin/auth/login';
		try {
			const response = await authAxiosInstance.post(
				LOGIN_URL,
				loginData,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);
			if (response.status === 200) {
				console.log('response', response);
				localStorage.setItem('token', response.headers.authorization);
				return { user: response.data };
			}
		} catch (error) {
			console.log('error', error.response.data);
			return rejectWithValue(error.response.data.message);
		}
	},
);

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: false,
		isLoading: false,
		user: null,
		error: null,
	},
	reducers: {
		logout: (state) => {
			state.isAuthenticated = false;
			state.isLoading = false;
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = true;
				state.error = null;
				state.user = action.payload.user;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.error = action.payload;
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

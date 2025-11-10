import { createStore } from 'zustand'
import { persist } from 'zustand/middleware'

const authStore = createStore(
	persist(
		(set) => ({
			isLoggedIn: false,
			accessToken: null,
			setLogIn: (token) => set({ isLoggedIn: true, accessToken: token }),
			setLogOut: () => set({ isLoggedIn: false, accessToken: null }),
		}),
		{
			name: 'authStorage',
		}
	)
)

export default authStore

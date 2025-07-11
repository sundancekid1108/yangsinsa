import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
	persist(
		(set) => ({
			user: null,
			userLogIn: ({ loginUser }) => set({ user: loginUser }),
			userLogOut: () => set({ user: null }),
		}),
		{
			name: 'user-store',
		},
	),
);

export default useUserStore;

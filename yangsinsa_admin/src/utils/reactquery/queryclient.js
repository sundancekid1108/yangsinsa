import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
	defaultOptions: {
		retry: 3,
		refetchOnWindowFocus: true,
	},
})

export default queryClient

import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import AppRoutes from './routes/routes.jsx'

import './App.css'

function App() {
	const queryClient = new QueryClient()
	return (
		<div className="App">
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<AppRoutes />
				</BrowserRouter>
			</QueryClientProvider>
		</div>
	)
}

export default App

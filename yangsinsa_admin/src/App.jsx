import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import queryClient from './utils/reactquery/queryclient.js'
import AppRoutes from './routes/routes.jsx'

import './App.css'

function App() {
	return (
		<div className="App">
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<AppRoutes />
				</BrowserRouter>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</div>
	)
}

export default App

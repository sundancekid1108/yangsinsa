import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/routes.jsx'
import './App.css'

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</div>
	)
}

export default App

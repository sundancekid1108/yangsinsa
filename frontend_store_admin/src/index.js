import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import App from './App';
import { AuthProvider } from './utils/useAuth.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<App />
		</AuthProvider>
		<ReactQueryDevtools />
	</QueryClientProvider>,
);

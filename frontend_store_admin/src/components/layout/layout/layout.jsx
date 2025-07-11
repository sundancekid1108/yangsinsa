import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

const Layout = () => {
	return (
		<>
			<div>
				<Header />
			</div>
			<div>
				<Outlet />
			</div>
			<div>
				<Footer />
			</div>
		</>
	);
};

export default Layout;

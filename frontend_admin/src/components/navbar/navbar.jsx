import { React, useState } from 'react';

const Navbar = () => {
	const [navOpen, setNavOpen] = useState(false);

	const navbarMenuList = [
		{ name: 'store', href: '/store', current: true },
		{ name: 'brand', href: '/brand', current: false },
		{ name: 'user', href: '/user', current: false },
	];

	return (
		<div>
			<nav className="bg-gray-600">
				<div>이미지</div>
				<div>
					{navbarMenuList.map((item) => (
						<a
							key={item.name}
							href={item.href}
							aria-current={item.current ? 'page' : undefined}
						>
							{item.name}
						</a>
					))}
				</div>
			</nav>
		</div>
	);
};

export default Navbar;

import { React, useState } from 'react';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Outlet, useLocation, useNavigate, redirect } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../api/user/user';
import defaultUserImg from '../../resource/defaultuser.jpg';
import logoImg from '../../resource/yangsinsa_logo.jpeg';

const Navbar = () => {
	const [navbarMenuList, setNavbarMenuList] = useState([
		{ name: '내 스토어', path: '/store/mystore' },
		{ name: '브랜드리스트', path: '/brand/brandlist' },
		{ name: '유저리스트', path: '/userlist' },
		{ name: '주문리스트', path: '/order/orderlist' },
	]);

	const [userMenuList, setUserMenuList] = useState([
		{ name: '내 프로필', path: '/profile' },
	]);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navigate = useNavigate();

	const setToggleMobileMenu = () => {
		if (isMobileMenuOpen) {
			setIsMobileMenuOpen(false);
		} else {
			setIsMobileMenuOpen(true);
		}
	};

	const onClickMenu = (path) => {
		setIsMobileMenuOpen(false);

		navigate(path);
	};

	const userLogout = () => {
		alert('로그아웃');
	};

	const classNames = (...classes) => {
		return classes.filter(Boolean).join(' ');
		//값 있는 요소들을 연결하여 문자열로 반환
	};

	return (
		<div>
			<Disclosure as="nav" className="bg-gray-800">
				<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
							{/* Mobile menu button*/}
							<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
								<span className="absolute -inset-0.5" />
								<span className="sr-only">Open main menu</span>
								<Bars3Icon
									aria-hidden="true"
									className="block size-6 group-data-open:hidden"
								/>
								<XMarkIcon
									aria-hidden="true"
									className="hidden size-6 group-data-open:block"
								/>
							</DisclosureButton>
						</div>
						<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
							<div className="flex shrink-0 items-center">
								<img
									alt="Your Company"
									src={logoImg}
									className="h-8 w-auto"
									onClick={() => navigate('/')}
								/>
							</div>
							<div className="hidden sm:ml-6 sm:block">
								<div className="flex space-x-4">
									{navbarMenuList.map((item) => (
										<div
											key={item.name}
											href={item.path}
											className={
												'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
											}
											onClick={() => {
												onClickMenu(item.path);
											}}
										>
											{item.name}
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<button
								type="button"
								className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
							>
								<span className="absolute -inset-1.5" />
								<span className="sr-only">
									View notifications
								</span>
								<BellIcon
									aria-hidden="true"
									className="size-6"
								/>
							</button>

							{/* Profile dropdown */}
							<Menu as="div" className="relative ml-3">
								<div>
									<MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
										<span className="absolute -inset-1.5" />
										<span className="sr-only">
											Open user menu
										</span>
										<img
											alt=""
											src={defaultUserImg}
											className="size-8 rounded-full"
										/>
									</MenuButton>
								</div>
								<MenuItems
									transition
									className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
								>
									{userMenuList.map((item) => (
										<MenuItem key={item.name}>
											<div
												path={item.path}
												onClick={() => {
													onClickMenu(item.path);
												}}
												className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden hover:bg-gray-100"
											>
												{item.name}
											</div>
										</MenuItem>
									))}
									<MenuItem>
										<div
											className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden hover:bg-gray-100"
											onClick={() => {
												userLogout();
											}}
										>
											로그아웃
										</div>
									</MenuItem>
								</MenuItems>
							</Menu>
						</div>
					</div>
				</div>

				<DisclosurePanel className="sm:hidden">
					<div className="space-y-1 px-2 pt-2 pb-3">
						{navbarMenuList.map((item) => (
							<DisclosureButton
								key={item.name}
								as="a"
								path={item.path}
								onClick={() => {
									onClickMenu(item.path);
								}}
								className={
									'text-gray-300 hover:bg-gray-600 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
								}
							>
								{item.name}
							</DisclosureButton>
						))}
					</div>
				</DisclosurePanel>
			</Disclosure>
		</div>
	);
};

export default Navbar;

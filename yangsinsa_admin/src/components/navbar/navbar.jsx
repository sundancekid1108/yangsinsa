import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { HomeIcon, UserIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const location = useLocation()
	const navItems = [
		{ name: '스토어 관리', href: 'storelist', icon: UserIcon },
		{ name: '문의', href: 'contact', icon: UserIcon },
	]

	return (
		<nav className="bg-gray-800 shadow-md sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* 로고 영역 */}
					<div className="flex items-center">
						<a
							href="/"
							className="text-white text-xl font-bold tracking-wider"
						>
							YANGSINSA
						</a>
					</div>

					{/* 데스크톱 메뉴 영역 (MD 이상에서 보임) */}
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							{navItems.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
								>
									{/* Heroicon 사용: 크기와 색상은 Tailwind 클래스로 제어 */}
									{/*<item.icon*/}
									{/*	className="h-5 w-5 mr-1"*/}
									{/*	aria-hidden="true"*/}
									{/*/>*/}
									{item.name}
								</a>
							))}
						</div>
					</div>

					{/* 모바일 메뉴 버튼 영역 (MD 미만에서 보임) */}
					<div className="-mr-2 flex md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							type="button"
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
							aria-controls="mobile-menu"
							aria-expanded="false"
						>
							<span className="sr-only">메인 메뉴 열기</span>
							{/* Heroicon: 상태에 따라 햄버거 또는 X 아이콘 표시 */}
							{isOpen ? (
								<XMarkIcon
									className="block h-6 w-6"
									aria-hidden="true"
								/>
							) : (
								<Bars3Icon
									className="block h-6 w-6"
									aria-hidden="true"
								/>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* 모바일 메뉴 (isOpen 상태에 따라 표시) */}
			<div
				className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
				id="mobile-menu"
			>
				<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
					{navItems.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
							onClick={() => setIsOpen(false)} // 메뉴 클릭 시 닫기
						>
							{/* Heroicon 사용 */}
							<item.icon
								className="h-6 w-6 mr-2"
								aria-hidden="true"
							/>
							{item.name}
						</a>
					))}
				</div>
			</div>
		</nav>
	)
}

export default Navbar

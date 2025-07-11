import { React, useEffect, useState } from 'react';
import Navbar from '../../navbar/navbar.jsx';
import { getUserInfo } from '../../../api/user/user.js';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div>
			<div>
				<Navbar />
			</div>
		</div>
	);
};

export default Header;

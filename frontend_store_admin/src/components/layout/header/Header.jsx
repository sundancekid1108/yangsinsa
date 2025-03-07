import { React, useState } from "react";
import Navbar from "../../navbar/navbar.jsx";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div>
			<div>
				<Navbar />
			</div>
			<div>Header</div>
		</div>
	);
};

export default Header;

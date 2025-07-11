import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
	const user = useSelector((state) => state.auth.user.storeAdmin);

	console.log(user);
	return (
		<div>
			<div>프로필</div>
			<div>{user.userName}</div>
			<div>{user.adminGrade}</div>
		</div>
	);
};

export default Profile;

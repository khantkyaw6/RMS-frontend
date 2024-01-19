import React from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../../features/user/userSlice';

const Dashboard = () => {
	const token = useSelector(selectToken);

	console.log('token in dashboard', token);
	return <div>Dashboard</div>;
};

export default Dashboard;

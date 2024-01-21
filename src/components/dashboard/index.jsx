import { useGetAdminsQuery } from '../../features/admin/adminApi';

const Dashboard = () => {
	const { data } = useGetAdminsQuery();

	console.log(data);

	return <div>Dashboard</div>;
};

export default Dashboard;

import { Table } from 'antd';
import { useGetAdminsQuery } from '../../features/admin/adminApi';

const Dashboard = () => {
	const { data: adminData } = useGetAdminsQuery();

	console.log(adminData);

	const columns = [
		{ title: 'Admin Email', dataIndex: 'email', key: 'email' },
	];

	const formattedData = adminData?.data.map((admin, index) => ({
		email: admin.email,
		key: index,
	}));

	return (
		<div>
			<h3>This Dashboard Show Admin List</h3>

			<hr />
			<Table columns={columns} dataSource={formattedData} />
		</div>
	);
};

export default Dashboard;

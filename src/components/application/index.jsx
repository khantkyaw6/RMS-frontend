import React, { useState } from 'react';
import {
	useGetApplicationQuery,
	useGetApplicationDetailQuery,
	useDeleteApplicationMutation,
} from '../../features/application/applicationApi';
import { Space, Table, Button, Tooltip, Typography, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import ApplicationDetail from './ApplicationDetail';

const Application = () => {
	const { data: appData } = useGetApplicationQuery();
	const [deleteApplication] = useDeleteApplicationMutation();
	const [detailFlag, setDetailFlag] = useState(false);
	const [appDetailId, setAppDetailId] = useState(null);

	const deleteHandler = (id) => {
		deleteApplication(id);
	};

	const detailHandler = (id) => {
		setDetailFlag(true);
		setAppDetailId(id);
	};

	const formattedData = appData?.data.map((item, index) => ({
		...item,
		key: index,
	}));

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (text, record) => (
				<a onClick={() => detailHandler(record._id)}>{text}</a>
			),
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
		},
		{
			title: 'Gender',
			dataIndex: 'gender',
			key: 'gender',
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>
					<Popconfirm
						title='Are your sure to delete this application?'
						okText='Delete'
						cancelText='Cancle'
						onConfirm={() => deleteHandler(record._id)}
					>
						<>
							<Tooltip title='delete'>
								<Button
									type='text'
									danger
									icon={<DeleteOutlined />}
								/>
							</Tooltip>
						</>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<>
			<Typography.Title
				level={4}
				style={{ marginTop: 0, marginBottom: 30 }}
			>
				Application List
			</Typography.Title>
			<Table columns={columns} dataSource={formattedData} />
			{detailFlag && (
				<>
					<Typography.Title
						level={4}
						style={{ marginTop: 0, marginBottom: 30 }}
					>
						Application Detail
					</Typography.Title>
					<ApplicationDetail id={appDetailId} />
				</>
			)}
		</>
	);
};

export default Application;

import React, { useState } from 'react';
import {
	useGetApplicationQuery,
	useDeleteApplicationMutation,
} from '../../features/application/applicationApi';
import {
	Space,
	Table,
	Button,
	Tooltip,
	Typography,
	Popconfirm,
	Flex,
} from 'antd';
import {
	DeleteOutlined,
	CloseOutlined,
	EditOutlined,
	FileAddOutlined,
} from '@ant-design/icons';
import ApplicationDetail from './ApplicationDetail';
import CommonModal from '../common/modal';
import ApplicationForm from './ApplicationForm';

const Application = () => {
	const { data: appData } = useGetApplicationQuery();
	const [deleteApplication] = useDeleteApplicationMutation();
	const [updateForm, setUpdateForm] = useState('');
	const [detailFlag, setDetailFlag] = useState(false);
	const [appDetailId, setAppDetailId] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setUpdateForm('');
	};

	const deleteHandler = (id) => {
		deleteApplication(id);
	};

	const editHandler = (data) => {
		showModal();
		setUpdateForm(data);
	};

	const detailHandler = (id) => {
		setDetailFlag(true);
		setAppDetailId(id);
	};

	const detailCloseHandler = () => {
		setDetailFlag(false);
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
					<Tooltip title='edit'>
						<Button
							onClick={() => editHandler(record)}
							type='text'
							style={{ color: 'green' }}
							icon={<EditOutlined />}
						/>
					</Tooltip>
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
			<Flex
				justify='space-between'
				align='center'
				style={{ margin: '20px 0' }}
			>
				<Typography.Title
					level={4}
					style={{ marginTop: 0, marginBottom: 30 }}
				>
					Application List
				</Typography.Title>
				<Button
					onClick={showModal}
					type='dashed'
					icon={<FileAddOutlined />}
					size='large'
				>
					Create
				</Button>
			</Flex>

			<CommonModal
				title={
					updateForm != ''
						? 'Update Application'
						: 'Create Application'
				}
				isModalOpen={isModalOpen}
				handleCancel={handleCancel}
				handleOk={handleOk}
			>
				<ApplicationForm updateForm={updateForm} handleOk={handleOk} />
			</CommonModal>
			<Table columns={columns} dataSource={formattedData} />
			{detailFlag && (
				<>
					<hr />
					<Flex
						justify='space-between'
						align='center'
						style={{ margin: '20px 0' }}
					>
						<Typography.Title
							level={4}
							style={{ marginTop: 20, marginBottom: 30 }}
						>
							Application Detail
						</Typography.Title>
						<Button
							onClick={detailCloseHandler}
							type='text'
							shape='circle'
							style={{ color: 'red' }}
							icon={<CloseOutlined />}
						/>
					</Flex>
					<ApplicationDetail id={appDetailId} />
				</>
			)}
		</>
	);
};

export default Application;

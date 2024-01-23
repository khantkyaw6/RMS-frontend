import {
	Button,
	Flex,
	Popconfirm,
	Space,
	Table,
	Tooltip,
	Typography,
} from 'antd';
import {
	DeleteOutlined,
	CloseOutlined,
	EditOutlined,
	FileAddOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import { useGetExperienceQuery } from '../../features/work-experience/workExperienceApi';
import CommonModal from '../common/modal';
import WorkExperienceForm from './WorkExperienceForm';

const WorkExperience = () => {
	const [updateForm, setUpdateForm] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data: expData } = useGetExperienceQuery();

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
		console.log(id);
	};

	const editHandler = (data) => {
		showModal();
		setUpdateForm(data);
	};

	function formatDateString(dateString) {
		const originalDate = new Date(dateString);
		const formattedDate = originalDate.toLocaleDateString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});

		return formattedDate;
	}

	const formattedData = expData?.data.map((item, index) => ({
		...item,
		startDate: formatDateString(item.startDate),
		endDate: formatDateString(item.endDate),
		key: index,
	}));

	const columns = [
		{
			title: 'Company Name',
			dataIndex: 'companyName',
			key: 'companyName',
		},
		{
			title: 'Position',
			dataIndex: 'position',
			key: 'position',
		},
		{
			title: 'Start Date',
			dataIndex: 'startDate',
			key: 'startDate',
		},
		{
			title: 'End Date',
			dataIndex: 'endDate',
			key: 'endDate',
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
					Working Experience List
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
						? 'Update Work Experience'
						: 'Create Work Experience'
				}
				isModalOpen={isModalOpen}
				handleCancel={handleCancel}
				handleOk={handleOk}
			>
				<WorkExperienceForm
					updateForm={updateForm}
					handleOk={handleOk}
				/>
			</CommonModal>
			<Table columns={columns} dataSource={formattedData} />
		</>
	);
};

export default WorkExperience;

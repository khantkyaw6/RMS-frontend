import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import moment from 'moment';
import {
	useCreateExperienceMutation,
	useUpdateExperienceMutation,
} from '../../features/work-experience/workExperienceApi';
import {
	useGetApplicationDetailQuery,
	useGetApplicationQuery,
} from '../../features/application/applicationApi';

const formItemLayout = {
	labelCol: { span: 24 },
	wrapperCol: { span: 24 },
};

const WorkExperienceForm = ({ updateForm, handleOk }) => {
	const [form] = Form.useForm();
	const [createExperience] = useCreateExperienceMutation();
	const { data: appData } = useGetApplicationQuery();
	const { data: appDetail, isLoading } = useGetApplicationDetailQuery(
		updateForm?.application_id
	);
	const [updateExperience] = useUpdateExperienceMutation();

	const options = appData?.data.map(({ _id, name }) => ({
		value: _id,
		label: name,
	}));

	const updateOptions = [
		{
			value: updateForm && appDetail?.data?._id,
			label: updateForm && appDetail?.data?.name,
		},
	];

	const formattedDate = (dateString) =>
		moment(dateString).format('MM/DD/YYYY');

	useEffect(() => {
		if (updateForm !== null) {
			form.setFieldsValue({
				application_id: updateForm.application_id,
				companyName: updateForm.companyName,
				position: updateForm.position,
				startDate: moment(updateForm.startDate, 'MM/DD/YYYY').format(
					'YYYY-MM-DD'
				),
				endDate: moment(updateForm.endDate, 'MM/DD/YYYY').format(
					'YYYY-MM-DD'
				),
			});
		}
	}, [updateForm, form]);

	const onFinish = async (values) => {
		if (values.startDate && values.endDate) {
			values.startDate = formattedDate(values.startDate);
			values.endDate = formattedDate(values.endDate);
		}
		try {
			if (updateForm == null) {
				const data = await createExperience(values);
				if (data?.data.isSuccess) {
					await form.resetFields();
					await handleOk();
				}
			} else {
				const data = await updateExperience({
					id: updateForm._id,
					data: values,
				});

				if (data?.data.isSuccess) {
					await form.resetFields();
					await handleOk();
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onFinishFailed = () => {
		console.log('on onFinishFailed');
	};

	return (
		<Form
			form={form}
			name='experience form'
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete='off'
			style={{ display: 'flex', flexDirection: 'column' }}
			initialValues={{ application_id: updateForm && updateForm._id }}
		>
			<Row gutter={16}>
				<Col xs={24} sm={12}>
					<Form.Item
						{...formItemLayout}
						label='Applicant'
						name='application_id'
						rules={[
							{
								required: true,
								message: 'Please select your applicant name!',
							},
						]}
					>
						<Select
							disabled={updateForm && true}
							options={updateForm ? updateOptions : options}
						/>
					</Form.Item>
				</Col>
				<Col xs={24} sm={12}>
					<Form.Item
						{...formItemLayout}
						label='Company Name'
						name='companyName'
						rules={[
							{
								required: true,
								message: 'Please input your company name!',
							},
						]}
					>
						<Input placeholder='Company Name' />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col xs={24} sm={12}>
					<Form.Item
						{...formItemLayout}
						label='Start Date'
						name='startDate'
					>
						<input
							type='date'
							style={{
								width: '90%',
								padding: '10px',
								border: '1px solid #d9d9d9',
								borderRadius: '4px',
								fontSize: '16px',
								lineHeight: '1.5',
								color: '#000000',
								backgroundColor: '#fff',
								boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
								transition:
									'border-color 0.3s, box-shadow 0.3s',
								outline: 'none',
							}}
							onFocus={(e) => {
								e.target.style.borderColor = '#1890ff';
							}}
							onBlur={(e) => {
								e.target.style.borderColor = '#d9d9d9';
							}}
						/>
					</Form.Item>
				</Col>
				<Col xs={24} sm={12}>
					<Form.Item
						{...formItemLayout}
						label='End Date'
						name='endDate'
					>
						<input
							type='date'
							style={{
								width: '90%',
								padding: '10px',
								border: '1px solid #d9d9d9',
								borderRadius: '4px',
								fontSize: '16px',
								lineHeight: '1.5',
								color: '#000000',
								backgroundColor: '#fff',
								boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
								transition:
									'border-color 0.3s, box-shadow 0.3s',
								outline: 'none',
							}}
							onFocus={(e) => {
								e.target.style.borderColor = '#1890ff';
							}}
							onBlur={(e) => {
								e.target.style.borderColor = '#d9d9d9';
							}}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col xs={24} sm={12}>
					<Form.Item
						{...formItemLayout}
						label='Position'
						name='position'
						rules={[
							{
								required: true,
								message: 'Please input your job position!',
							},
						]}
					>
						<Input placeholder='Position' />
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<Form.Item wrapperCol={{ offset: 18, span: 6 }}>
						<Button
							type='primary'
							htmlType='submit'
							style={{ width: '100%' }}
						>
							{updateForm == null ? 'Create' : 'Update'}
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default WorkExperienceForm;

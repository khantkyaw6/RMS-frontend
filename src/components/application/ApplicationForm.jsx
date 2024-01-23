import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import {
	useCreateApplicationMutation,
	useUpdateApplicationMutation,
} from '../../features/application/applicationApi';
import { useEffect, useState } from 'react';

const ApplicationForm = ({ updateForm, handleOk }) => {
	const [createApplication, { isLoading }] = useCreateApplicationMutation();
	const [updateApplication, { isLoading: updateLoading }] =
		useUpdateApplicationMutation();
	const [updateApplicationId, setUpdateApplicationId] = useState(null);

	const options = [
		{
			label: 'Male',
			value: 'Male',
		},
		{
			label: 'Female',
			value: 'Female',
		},
		{
			label: 'Other',
			value: 'Other',
		},
	];

	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue({
			name: updateForm.name,
			email: updateForm.email,
			phone: updateForm.phone,
			gender: updateForm.gender,
			education: updateForm.education,
			skills: updateForm.skills,
		});
		setUpdateApplicationId(updateForm._id);
	}, [updateForm, form]);

	const validateSkills = (_, value) => {
		// Check if the input contains a comma
		if (!value.includes(',') && !Array.isArray(value)) {
			return Promise.reject('Please input your skills set with commas!');
		}

		// You can add additional validation for each skill if needed

		// Return a resolved Promise
		return Promise.resolve();
	};

	const onFinish = async (values) => {
		try {
			if (updateForm == '') {
				if (values.skills && typeof values.skills === 'string') {
					values.skills = values.skills
						.split(',')
						.map((skill) => skill.trim());
				}
				//Create api call
				const data = await createApplication(values);

				if (data?.data.isSuccess) {
					await form.resetFields();
					await handleOk();
				}
			} else {
				if (values.skills && typeof values.skills === 'string') {
					values.skills = values.skills
						.split(',')
						.map((skill) => skill.trim());
				} else {
					values.skills = values.skills;
				}

				//update api call
				const data = await updateApplication({
					id: updateApplicationId,
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
		console.log('failed');
	};

	return (
		<Form
			form={form}
			name='application form'
			labelCol={{
				span: 8,
			}}
			wrapperCol={{
				span: 16,
			}}
			style={{ maxWidth: 800, margin: '20px 0' }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete='off'
		>
			<Row gutter={60} justify={'center'}>
				<Col span={12}>
					<Form.Item
						label='Name'
						name='name'
						rules={[
							{
								required: true,
								message: 'Please input your applicant name!',
							},
						]}
					>
						<Input placeholder='Name' />
					</Form.Item>
					<Form.Item
						label='Email'
						name='email'
						rules={[
							{
								required: true,
								message: 'Please enter your Email',
							},
						]}
					>
						<Input
							prefix={
								<MailOutlined className='site-form-item-icon' />
							}
							placeholder='Email'
							type='email'
						/>
					</Form.Item>
					<Form.Item
						label='Phone'
						name='phone'
						rules={[
							{
								required: true,
								message: 'Please input your phone number!',
							},
							{
								max: 13,
								message:
									'Phone field cannot exceed 13 characters.',
							},
						]}
					>
						<Input
							placeholder='Phone'
							prefix={
								<PhoneOutlined className='site-form-item-icon' />
							}
						/>
					</Form.Item>

					<Form.Item
						label='Gender'
						name='gender'
						rules={[
							{
								required: true,
								message: 'Please select your gender!',
							},
						]}
					>
						<Select
							style={{
								width: '100%',
							}}
							placeholder='Please select gender'
							options={options}
						/>
					</Form.Item>
					<Form.Item
						name='image'
						hidden
						initialValue='' // Set the default image path
					>
						<Input type='hidden' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						label='Education'
						name='education'
						rules={[
							{
								required: true,
								message:
									'Please input your education background!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Skills'
						name='skills'
						extra='Skills must be separate with comma'
						rules={[
							{
								required: true,
								message: 'Please input your skills set!',
							},
							{
								validator: validateSkills,
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
			</Row>

			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
				style={{ textAlign: 'right' }}
			>
				<Button type='primary' htmlType='submit'>
					{updateForm == '' ? '	Create' : 'Update'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default ApplicationForm;

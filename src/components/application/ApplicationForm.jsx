import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useCreateApplicationMutation } from '../../features/application/applicationApi';

const ApplicationForm = ({ handleOk }) => {
	const [createApplication, { isLoading }] = useCreateApplicationMutation();

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

	const validateSkills = (_, value) => {
		// Check if the input contains a comma
		if (!value.includes(',')) {
			return Promise.reject('Please input your skills set with commas!');
		}

		// You can add additional validation for each skill if needed

		// Return a resolved Promise
		return Promise.resolve();
	};

	const onFinish = async (values) => {
		try {
			if (values.skills && typeof values.skills === 'string') {
				values.skills = values.skills
					.split(',')
					.map((skill) => skill.trim());
			}

			if (values.working_exp && values.working_exp != undefined) {
				values.working_exp.forEach((exp) => {
					exp.startDate = moment(new Date(exp?.startDate.$d)).format(
						// 'DD/MM/YYYY'
						'YYYY/MM/DD'
					);
					exp.endDate = moment(new Date(exp?.endDate.$d)).format(
						// 'DD/MM/YYYY'
						'YYYY/MM/DD'
					);
				});
			} else {
				values.working_exp = [];
			}

			const data = await createApplication(values);

			console.log(data);

			console.log(data.isSuccess);
			if (data?.data.isSuccess) {
				console.log('success');
				await form.resetFields();
				await handleOk();
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

					{/* Working Experience Form.List */}
					<Form.List name='working_exp'>
						{(fields, { add, remove }) => (
							<div
								style={{
									display: 'flex',
									rowGap: 16,
									flexDirection: 'column',
								}}
							>
								{fields.map((field) => (
									<Card key={field.key}>
										<Form.Item
											label='Company Name'
											name={[field.name, 'companyName']}
										>
											<Input />
										</Form.Item>
										<Form.Item
											label='Postition'
											name={[field.name, 'position']}
										>
											<Input />
										</Form.Item>
										<Form.Item
											label='Start Date'
											name={[field.name, 'startDate']}
											rules={[
												{
													required: true,
													message:
														'Please select start date!',
												},
											]}
										>
											<DatePicker
												style={{ width: '100%' }}
											/>
										</Form.Item>
										<Form.Item
											label='End Date'
											name={[field.name, 'endDate']}
											rules={[
												{
													required: true,
													message:
														'Please select end date!',
												},
											]}
										>
											<DatePicker
												style={{ width: '100%' }}
											/>
										</Form.Item>
										<Button
											type='link'
											onClick={() => remove(field.name)}
										>
											Remove
										</Button>
									</Card>
								))}

								<Button
									style={{ margin: '10px 0' }}
									type='dashed'
									onClick={() => add()}
									block
								>
									Add Working Experience
								</Button>
							</div>
						)}
					</Form.List>
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
					Create
				</Button>
			</Form.Item>
		</Form>
	);
};

export default ApplicationForm;

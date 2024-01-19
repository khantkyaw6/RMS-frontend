import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { loginLayoutStyle } from './style';
import { usePostLoginMutation } from '../../../features/login/loginApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, setToken } from '../../../features/user/userSlice';

const Login = () => {
	const [postLogin, { isLoading }] = usePostLoginMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token = useSelector(selectToken);

	console.log(token);

	const onFinish = async (values) => {
		const { email, password } = values;
		console.log({ email, password });
		try {
			const { data } = await postLogin(values);

			console.log(data);

			if (!data.isSuccess) {
				console.log(data.message);
			}

			if (data.isSuccess) {
				dispatch(setToken(data.data.token));
				navigate('/dashboard');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div style={loginLayoutStyle.form}>
			<Form
				name='normal_login'
				className='login-form'
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
			>
				<div style={loginLayoutStyle.iconContainer}>
					<div style={loginLayoutStyle.icon}>
						<LockOutlined />
					</div>
				</div>
				<Form.Item
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
							<UserOutlined className='site-form-item-icon' />
						}
						placeholder='Email'
						type='email'
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[
						{
							required: true,
							message: 'Please enter your Password!',
						},
					]}
				>
					<Input.Password
						prefix={
							<LockOutlined className='site-form-item-icon' />
						}
						type='password'
						placeholder='Password'
					/>
				</Form.Item>

				<Form.Item>
					<Button
						block
						type='primary'
						htmlType='submit'
						className='login-form-button'
						// disabled={isLoading}
					>
						Log in
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;

import React from 'react';
import defaultError404 from '../../images/error-page/error404.png';
import { useNavigate } from 'react-router';
import './errstyle.css';
import { Button } from 'antd';

const ErrorPage = () => {
	const navigate = useNavigate();

	const errorPageHandler = () => {
		navigate('/');
	};

	return (
		<div className='error-container'>
			<img src={defaultError404} alt='Error' />
			<div className='text'>
				{/* Make changes here when more error status codes are added */}
				<h1>Ooops!...Page Not Found</h1>

				<Button type='primary' onClick={errorPageHandler}>
					Go To Dashboard
				</Button>
			</div>
		</div>
	);
};
export default ErrorPage;

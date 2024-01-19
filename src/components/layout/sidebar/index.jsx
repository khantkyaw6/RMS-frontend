import React from 'react';
import Sider from 'antd/es/layout/Sider';
import { Menu } from 'antd';
import {
	UserOutlined,
	HomeOutlined,
	CopyOutlined,
	UnorderedListOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useStore from '../../../store';

const sidebar = [];

function getItem(label, key, path, icon, children, type) {
	return {
		key,
		icon,
		children,
		label: <Link to={path}>{label}</Link>,
		type,
	};
}

const items = [
	getItem('Dashboard', 'home', '/dashboard', <HomeOutlined />),
	getItem(
		'Application',
		'application',
		'/application',
		<UnorderedListOutlined />
	),
	{ type: 'divider' },
	getItem('Logout', 'logout', '/logout', <LogoutOutlined />),
];

const Sidebar = () => {
	const MenuHandler = () => {};
	const { sidebar } = useStore();

	return (
		<Sider trigger={null} collapsible collapsed={sidebar}>
			<div className='demo-logo-vertical'>
				<h1
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						fontWeight: 'bold',
						marginTop: '5px',
						color: 'wheat',
					}}
				>
					RMS
				</h1>
			</div>
			<Menu
				onClick={MenuHandler}
				theme='dark'
				mode='inline'
				defaultSelectedKeys={['home']}
				items={items}
			/>
		</Sider>
	);
};

export default Sidebar;

import React from 'react';
import { Button, Layout, theme } from 'antd';
const { Header } = Layout;
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCollapsed } from '../../../features/layout/collapsedSlice';
import Profile from './Profile';

const AppHeader = () => {
	const dispatch = useDispatch();
	const collapsed = useSelector((state) => state.collapsedReducer);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const handleCollapse = () => {
		dispatch(toggleCollapsed());
	};

	const iconStyle = {
		fontSize: '16px',
		width: 64,
		height: 64,
	};

	return (
		<Header
			style={{
				padding: 0,
				background: colorBgContainer,
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<Button
				type='text'
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={handleCollapse}
				style={iconStyle}
			/>
			<Profile />
			{/* <Button
				icon={<UserOutlined />}
				style={iconStyle}
				type='text'
				shape='circle'
			/> */}
		</Header>
	);
};

export default AppHeader;

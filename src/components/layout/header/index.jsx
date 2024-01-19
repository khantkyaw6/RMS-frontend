import React from 'react';
import useStore from '../../../store';
import { Button, Layout, theme } from 'antd';
const { Header } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const AppHeader = () => {
	const { sidebar, sidebarTrigger } = useStore();
	const {
		token: { colorBgContainer },
	} = theme.useToken();

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
				icon={sidebar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={() => sidebarTrigger()}
				style={{
					fontSize: '16px',
					width: 64,
					height: 64,
				}}
			/>
			<Button />
		</Header>
	);
};

export default AppHeader;

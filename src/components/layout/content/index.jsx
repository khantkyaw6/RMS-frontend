import { Col, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AppContent = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	return (
		<Content
			style={{
				margin: '24px 16px',
				padding: 24,
				minHeight: 280,
				background: colorBgContainer,
				borderRadius: borderRadiusLG,
				overflow: 'auto',
			}}
		>
			<Col span={24}>
				<Outlet />
			</Col>
		</Content>
	);
};

export default AppContent;

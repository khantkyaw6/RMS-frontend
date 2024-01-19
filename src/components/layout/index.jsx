import React from 'react';
import { Layout, theme } from 'antd';
import Sidebar from './sidebar';
import AppContent from './content';
import AppHeader from './header';

const AppLayout = () => {
	return (
		<Layout
			style={{
				height: '100vh',
			}}
		>
			<Sidebar />
			<Layout>
				<AppHeader />
				<AppContent />
			</Layout>
		</Layout>
	);
};

export default AppLayout;

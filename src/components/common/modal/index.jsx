import { Button, Modal } from 'antd';
import React from 'react';

const CommonModal = ({
	title,
	children,
	isModalOpen,
	handleOk,
	handleCancel,
}) => {
	return (
		<Modal
			title={title}
			open={isModalOpen}
			onOk={handleOk}
			onCancel={handleCancel}
			width={1000}
			footer={[]}
		>
			{children}
		</Modal>
	);
};

export default CommonModal;

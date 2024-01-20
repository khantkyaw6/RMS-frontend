import { Card, Col, Row } from 'antd';
import React from 'react';
import { useGetApplicationDetailQuery } from '../../features/application/applicationApi';
const { Meta } = Card;

const ApplicationDetail = ({ id }) => {
	console.log('app detail', id);
	const { data: appDetail, isLoading } = useGetApplicationDetailQuery(id);

	console.log(appDetail);

	return (
		<div>
			<Row>
				<Col span={8}>
					<Card
						hoverable
						style={{
							width: 300,
						}}
						cover={
							<img
								alt={appDetail?.data.name}
								src={`http://localhost:7000/${appDetail?.data.image}`}
							/>
						}
					>
						<Meta
							title={appDetail?.data.name}
							description={`Email - ${appDetail?.data.email}`}
						/>
						<p>Phone - {appDetail?.data.phone}</p>
						<p>Gender - {appDetail?.data.gender}</p>
					</Card>
				</Col>
				<Col span={16}>
					<p>Education - {appDetail?.data.education}</p>
					<p>Skill - {appDetail?.data.skills.join(', ')}</p>
					<br />
					<p style={{ fontWeight: 'bold' }}>Working Experience</p>

					{appDetail?.data.working_exp.map((exp, index) => (
						<div key={index}>
							<h5>Company Name - {exp.companyName}</h5>
							<p>Position - {exp.position}</p>
							<p>
								Start Date -
								{exp.startDate
									? new Date(
											exp.startDate
									  ).toLocaleDateString('en-GB')
									: 'N/A'}
							</p>
							<p>
								End Date -
								{exp.endDate
									? new Date(exp.endDate).toLocaleDateString(
											'en-GB'
									  )
									: 'N/A'}
							</p>
							<br />
						</div>
					))}
				</Col>
			</Row>
		</div>
	);
};

export default ApplicationDetail;

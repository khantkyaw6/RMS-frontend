import { Card, Col, Row } from 'antd';
import React from 'react';
import { useGetApplicationDetailQuery } from '../../features/application/applicationApi';
import { checkProfileImageLink } from '../../helper/checkImage';
const { Meta } = Card;

const ApplicationDetail = ({ id }) => {
	const { data: appDetail, isLoading } = useGetApplicationDetailQuery(id);

	return (
		<div>
			<Row>
				<Col span={10}>
					<Card
						hoverable
						style={{
							width: 350,
						}}
						cover={
							<img
								alt={appDetail?.data.name}
								src={
									appDetail?.data.image == ''
										? checkProfileImageLink()
										: `http://localhost:7000/${appDetail?.data.image}`
								}
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
				<Col span={14}>
					<p>Education - {appDetail?.data.education}</p>
					<p>Skill - {appDetail?.data.skills.join(', ')}</p>
					<br />
					{appDetail?.data.working_exp.length > 0 && (
						<p style={{ fontWeight: 'bold' }}>Working Experience</p>
					)}

					{appDetail?.data.working_exp.map((exp, index) => (
						<div key={index}>
							<h5>Company Name - {exp.companyName}</h5>
							<p>Position - {exp.position}</p>
							<p>
								Start Date - {` `}
								{exp.startDate
									? new Date(
											exp.startDate
									  ).toLocaleDateString('en-US', {
											month: '2-digit',
											day: '2-digit',
											year: 'numeric',
									  })
									: 'N/A'}
							</p>
							<p>
								End Date - {` `}
								{exp.endDate
									? new Date(exp.endDate).toLocaleDateString(
											'en-US',
											{
												month: '2-digit',
												day: '2-digit',
												year: 'numeric',
											}
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

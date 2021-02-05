import React from 'react';
import './Dashboard.scss';
import { Statistic, Card, Row, Col } from 'antd';
import { StockOutlined, PieChartOutlined } from '@ant-design/icons';
import { DvdCard } from '../index';

const Dashboard = () => {
    return (
        <div>
            <div className="site-statistic-demo-card">
                <Row gutter={20}>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Total Movie"
                                value={55}

                                valueStyle={{ color: '#3f8600' }}
                                prefix={<StockOutlined />}
                                suffix="Items"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Western Category"
                                value={40}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<PieChartOutlined />}
                                suffix="Items"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Indonesia Category"
                                value={10}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<PieChartOutlined />}
                                suffix="Items"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Others Category"
                                value={5}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<PieChartOutlined />}
                                suffix="Items"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
            <div>
                <DvdCard />
            </div>
        </div>
    )
}

export default Dashboard;

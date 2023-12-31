import React from 'react';
import { Layout, Button, Input, Form, Row, Col, Card } from 'antd';
import { ReactComponent as Logo } from '../assets/twilio-mark-red.svg';
import { UserOutlined } from '@ant-design/icons';

const { Content } = Layout;

const LoginPage = ({onSubmit}) => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        const { identity } = values;
        onSubmit(identity)
        console.log(identity);
    };

    return (
        <Layout>
            <Content style={{ height: '100vh' }}>
                <Row type="flex" justify="space-around" align="middle" style={{ height: '100%' }}>
                    <Col span={12} offset={6}>
                        <Card style={{ maxWidth: '404px' }}>
                            <Row type="flex" justify="center" align="middle" style={{ marginBottom: '30px' }}>
                                <Logo />
                            </Row>

                            <Form form={form} onFinish={handleSubmit}>
                                <Form.Item
                                    name="identity"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input
                                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button block type="primary" htmlType="submit">
                                        Sign in
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default LoginPage;

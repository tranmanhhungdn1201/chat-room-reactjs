import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import authApi from 'api/authApi';
import registerImage from 'assets/images/img_register.svg';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Register.scss';

function Register() {
    const [form] = Form.useForm();
    const history = useHistory();

    const onRegister = (data) => {
        authApi.register(data).then( res => {
            if (res.success) {
                toast.success(res.message);
                form.resetFields();
                history.push('/');
            } else {
                toast.error(res.message);
            }
        }).catch(res => {
            toast.error('Error');
            console.log(res);
        });
    }

    return (
        <div className="container">
            <Row className="register">
                <Col span={12}>
                    <div className="register__image">
                        <img src={registerImage} alt="register" />
                    </div>
                </Col>
                <Col span={12}>
                    <div className="register__form">
                        <h1>Register</h1>
                        <Form
                            name="normal_Register"
                            className="Register-form"
                            onFinish={onRegister}
                        >
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your Email!' }]}
                            >
                                <Input
                                    prefix={<MailOutlined className="site-form-item-icon" />}
                                    type="email"
                                    placeholder="Email"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="repassword"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                    }),
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="repassword"
                                    placeholder="Confirm Password"
                                />
                            </Form.Item>

                            <Form.Item className="register__formAction">
                                <Button type="primary" htmlType="submit" className="register-form-button">
                                    Sign up
                                </Button>
                                    Or <Link to="/login">Login now!</Link>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Register;
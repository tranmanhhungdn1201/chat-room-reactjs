import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import authApi from 'api/authApi';
import loginImage from 'assets/images/img_login.svg';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';

function Login() {
    const [form] = Form.useForm();
    const history = useHistory();
    
    const onLogin = ({email, password}) => {
        authApi.login({ email, password}).then( res => {
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
            <Row className="login">
                <Col span={12}>
                    <div className="login__form">
                        <h1>Login</h1>
                        <Form
                            form={form}
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: false }}
                            onFinish={onLogin}
                        >
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
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <a className="login-form-forgot" href="">
                                Forgot password
                                </a>
                            </Form.Item>

                            <Form.Item className="login__formAction">
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                                    Or <Link to="/register">register now!</Link>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="login__image">
                        <img src={loginImage} alt="login" />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
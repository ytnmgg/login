import React, { Component } from 'react'
import { Row, Col, Input, Button, Space, Card, Divider } from 'antd';

class Login extends Component {
    render() {
        return (
            <div>
                <Card title="密码登录" style={{width: "300px"}}>
                    <Row gutter={[0, 16]}>
                        <Col span={24}>
                            <Input placeholder="输入登录名" ></Input>
                        </Col>
                        <Col span={24}>
                            <Input.Password placeholder="输入登录密码" />
                        </Col>
                        <Col span={24}>
                            <Button type="primary" block>登录</Button>
                        </Col>
                    </Row>
                </Card>








            </div>
        )
    }
}

export default Login;

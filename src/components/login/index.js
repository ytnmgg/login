import React, { Component } from "react";
import { Row, Col, Input, Button, Spin, Card } from "antd";
import { withRouter } from "react-router-dom";
import { JSEncrypt } from "jsencrypt";

import login_with_password from "../../data/login";
import get_encrypt_key from "../../data/encrypt";
import get_url_param from "../../common/getUrlParam";

class Login extends Component {
  nameAndPassword = {
    name: "",
    password: "",
    rawPwd: "",
  };

  state = {
    loading: false,
    showError: false,
    errorMsg: "",
  };

  showUnknownError = () => {
    this.showError("服务器异常，请稍后重试...");
  };

  showError = (msg) => {
    this.setState({
      ...this.state,
      showError: true,
      errorMsg: msg,
      loading: false,
    });
  };
  sendLoginRequest = () => {
    const { name, password } = this.nameAndPassword;
    login_with_password({ name, password })
      .then((result) => {
        //状态为fulfilled时执行
        if (result.success) {
          const { search } = this.props.location;
          const callback = get_url_param("callback", search);
          const redirectUrl =
            callback !== undefined && callback !== null ? callback : "/index";
          window.location.replace(redirectUrl);

        } else {
          this.showError(result.message);
        }
      })
      .catch((reason) => {
        //状态为rejected时执行
        this.showUnknownError();
      });
  };

  doLogin = () => {
    this.setState({ ...this.state, loading: true });

    get_encrypt_key()
      .then((result) => {
        if (result.success) {
          // 用rsa公钥加密用户登录密码
          var encrypt = new JSEncrypt();
          encrypt.setPublicKey(result.data);
          this.nameAndPassword.password = encrypt.encrypt(
            this.nameAndPassword.rawPwd
          );

          // 登录
          this.sendLoginRequest();
        } else {
          this.showError(result.message);
        }
      })
      .catch((result) => {
        this.showUnknownError();
      });
  };

  nameOnChange = (e) => {
    this.setState({ ...this.state, showError: false });
    this.nameAndPassword.name = e.target.value;
  };

  passwordOnChange = (e) => {
    this.setState({ ...this.state, showError: false });
    this.nameAndPassword.rawPwd = e.target.value;
  };

  render() {
    return (
      <div>
        <Card title="密码登录" style={{ width: "300px" }}>
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Input
                maxLength={16}
                onChange={this.nameOnChange}
                placeholder="输入登录名"
              ></Input>
            </Col>
            <Col span={24}>
              <Input.Password
                maxLength={16}
                onChange={this.passwordOnChange}
                placeholder="输入登录密码"
              />
            </Col>
            <Col
              span={24}
              style={{
                color: "red",
                fontSize: "4px",
                display: this.state.showError ? "block" : "none",
              }}
            >
              <div>{this.state.errorMsg}</div>
            </Col>
            <Col span={24}>
              <Spin spinning={this.state.loading}>
                <Button type="primary" onClick={this.doLogin} block>
                  登录
                </Button>
              </Spin>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default withRouter(Login);

import './App.css';
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col } from 'antd';

import Login from './components/login'

export const myProps = {
  history:{}
};

class App extends Component {
  render() {
    myProps.history = this.props.history;
    return (
      <div>
        <Row style={{ height: "60px" }}>
        </Row>
        <Row style={{ backgroundColor: "#f0f0f0" }}>
          <Col span={14} />
          <Col span={6}>
            <Login />
          </Col>
        </Row>

      </div>
    );
  }
}

export default withRouter(App);

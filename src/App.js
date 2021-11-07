import logo from './logo.svg';
import './App.css';

import { Row, Col } from 'antd';

import Login from './login'

function App() {
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

export default App;

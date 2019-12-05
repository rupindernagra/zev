import React, { Component } from 'react';
import API from '../Common/API';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import { Content, Row, Col, Box } from 'adminlte-2-react';


export default class DashboardHome extends Component {
    constructor() {
        super();
        this.state = {};
        this.api = new API();
    }
    render() {
        return (<Content title="Dashboard" subTitle="Let's Start" browserTitle="Zev Rector :: Dashboard">
            <Row>
                <Col xs={12}>
                    <Box title="Notification Area" type="primary" closable collapsable>
                        <ul>
                            <li>Welcome to the Zev Rector Homepage</li>
                            <li>You Can Add Spaces</li>
                            <li>You Can Send Forms To Users &amp; Select</li>
                        </ul>
                    </Box>
                </Col>
            </Row>
        </Content>);
    }
}
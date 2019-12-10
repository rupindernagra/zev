import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../Common/API';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import { Content, Row, Col, Box } from 'adminlte-2-react';
import { ApplStatus } from './Config';


export default class DashboardHome extends Component {
    constructor() {
        super();
        this.state = {
            spaces: [],
            applicants: []
        };
        this.api = new API();
    }

    componentDidMount() {
        // Get all Spaces for dashboard area
        this.api.getMySpaces().then(
            res => res.json()
        ).then(data => {
            if (data.status) {
                this.setState({
                    spaces: data.result.slice(0, 10)
                });
            }
        }).catch(err => {
            console.log(err);
        });

        this.api.getMyApplicants().then(
            res => res.json()
        ).then(data => {
            if (data.status) {
                this.setState({
                    applicants: data.result.slice(0, 10),
                    status: data.status
                });
            }
        }).catch(err => {
            console.log('ERR: ', err);
        });
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
            <Row>
                <Col sm={6} xs={12}>
                    <Box title="Recent Spaces" type="primary" collapsable>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Space Name</th>
                                        <th>Space Status</th>
                                        <th># Views</th>
                                        <th># Applicants</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.spaces.map((space, index) => (
                                        <tr key={space.id}>
                                            <td><Link to={`/admin/spaces/view/${space.id}`}>{space.space_name}</Link></td>
                                            <td>{space.space_status}</td>
                                            <td>{space.views}</td>
                                            <td>{space.applicants}</td>
                                            <td>{space.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </Col>
                <Col sm={6} xs={12}>
                    <Box title="Recent Applicants" type="primary" collapsable>
                        <div className="table-responsive">
                            <table className="table table-striped applicant-list">
                                <thead>
                                    <tr>
                                        <th>Applicant Name</th>
                                        <th>Email</th>
                                        <th>Space Name</th>
                                        <th>Reports</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.applicants.map((applicant, index) => (
                                        <tr key={index}>
                                            <td>{applicant.firstname} {applicant.lastname ? applicant.lastname : ''}</td>
                                            <td>{applicant.email}</td>
                                            <td><Link to={`/admin/spaces/view/${applicant.id}`}>{applicant.space_name}</Link></td>
                                            <td><Link to="/admin/applicants">Report Link</Link></td>
                                            <td>
                                                <span className={ApplStatus[applicant.status].spanClass}>
                                                    <i className={`mr-2 fa ${ApplStatus[applicant.status].iconName}`}></i>
                                                    {applicant.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </Col>
            </Row>
        </Content>);
    }
}
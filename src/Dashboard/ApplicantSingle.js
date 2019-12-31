import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../Common/API';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Content, Row, Col, Box } from 'adminlte-2-react';
import ApplicantStatus from './ApplicantStatus';
import AdminMobileFooter from './AdminMobileFooter';
import ChartComponent from './ChartComponent';

export default class ApplicantSingle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicant: '',
            status: false
        };
        this.applId = props.match.params.applId;
        this.api = new API();
        console.log(this.applId);
    }

    componentDidMount() {
        this.api.getMyApplicants(this.applId).then(
            res => res.json()
        ).then(data => {
            console.log('app', data);
            if (data.status) {
                this.setState({
                    applicant: data.result,
                    status: data.status
                })
            }
        }).catch(err => {
            console.log('ERR: ', err);
        })
    }

    render() {
        const { applicant } = this.state;
        return (
            <Content title={applicant.fullname} subTitle="Applicant" browserTitle={`Zev Rector :: Applicant`}>
                <Row>
                    <Col xs={12}>
                        <Box title={applicant.fullname} type="primary">
                            <div className="form-group"></div>
                            <div className="table-responsive">
                                {applicant ? (

                                    <table className="table table-striped applicant-list">
                                        <tbody>
                                            <tr>
                                                <th>Applicant</th>
                                                <td>{applicant.fullname}</td>
                                            </tr>
                                            <tr>
                                                <th>Space Name</th>
                                                <td>{applicant.space_name}</td>
                                            </tr>
                                            <tr>
                                                <th>Status</th>
                                                <td><ApplicantStatus title={applicant.status} /></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                ) : (
                                    <p>Applicant is not found with {this.applId} id. Go back to the <Link to="/admin/applicants">Applicants</Link>.</p>
                                )}
                            </div>
                        </Box>
                        <Row>
                            <Col sm={12} xs={12}>
                                <Box title={applicant.fullname} type="secondary">
                                    <ChartComponent />
                                </Box>
                            </Col>
                        </Row>
                    </Col>

                    <AdminMobileFooter />

                </Row>
            </Content>
        );
    }
}
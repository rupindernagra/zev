import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../Common/API';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Content, Row, Col, Box } from 'adminlte-2-react';
import SearchBar from '../Components/Modules/SearchBar';
import ApplicantStatus from './ApplicantStatus';
import AdminMobileFooter from './AdminMobileFooter';

export default class Applicants extends Component {
    constructor() {
        super()
        this.state = {
            applicants: [],
            status: false
        };
        this.api = new API();
    }

    componentDidMount() {
        this.api.getMyApplicants().then(
            res => res.json()
        ).then(data => {
            console.log('app', data);
            if (data.status) {
                this.setState({
                    applicants: data.result,
                    status: data.status
                })
            }
        }).catch(err => {
            console.log('ERR: ', err);
        })
    }

    // Callback return
    onSearchSubmit = (term) => {
        // API - Search applicants
        this.api.searchMyApplicants(term).then(
            res => res.json()
        ).then(search => {
            if (search.status) {
                this.setState({ applicants: search.result })
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <Content title="Applicants" subTitle="Applicants" browserTitle="Zev Rector :: Applicants">
                <Row>
                    <Col xs={12}>
                        <Box title="List of Applicants" type="primary">
                            <SearchBar onSubmit={this.onSearchSubmit} placeholder="Search Applicants..." />
                            <div className="form-group"></div>
                            <div className="table-responsive">
                                <table className="table table-striped applicant-list">
                                    <thead>
                                        <tr>
                                            <th>Applicant Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Space Name</th>
                                            <th>Space Type</th>
                                            <th>Reports</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.applicants.map((applicant, index) => (
                                            <tr key={index}>
                                                <td><Link to={`/admin/applicants/view/${applicant.id}`}>{applicant.fullname}</Link></td>
                                                <td>{applicant.email}</td>
                                                <td>{applicant.phone}</td>
                                                <td><Link to={`/admin/spaces/view/${applicant.id}`}>{applicant.space_name}</Link></td>
                                                <td>{applicant.space_type}</td>
                                                <td><Link to="/admin/applicants">Report Link</Link></td>
                                                <td><ApplicantStatus title={applicant.status} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Box>
                    </Col>

                    <AdminMobileFooter />

                </Row>
            </Content>
        );
    }
}
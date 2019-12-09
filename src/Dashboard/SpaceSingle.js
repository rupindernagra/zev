import React, { Component } from 'react';
import API from '../Common/API';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Content, Row, Col, Box } from 'adminlte-2-react';
import { ApplStatus } from './Config';


export default class SpaceSingle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            space: '',
            status: false,
            applicants: [],
            applicantsStatus: false
        };
        this.api = new API();
    }
    componentDidMount() {
        const { match: { params: { spaceId } } } = this.props;

        // Get single Space
        this.api.getMySpaces(spaceId)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    console.log('single', data)

                    // Get Applicants for single space
                    if (data.status) {

                        this.api.getMyApplicantsBySpaceId(data.result.id).then(
                            response => response.json()
                        ).then(appl => {
                            if (appl.status) {
                                this.setState({
                                    applicants: appl.result,
                                    applicantsStatus: appl.status
                                })
                            }
                        }).catch(err => {
                            console.log('ERR: ', err);
                        })
                    }

                    this.setState({
                        space: data.result,
                        status: data.status
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })

    }

    render() {
        let space_status = this.state.status;
        let space = {};
        if (space_status) {
            space = this.state.space;
        }

        return (
            <Content title="Space" subTitle={space.space_name} browserTitle="Zev Rector :: Spaces">
                {/* {space_status ? ( */}
                <Row>
                    <Col xs={12}>
                        <Box title={space.space_name} type="primary">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <th>Image</th>
                                            <td>Image</td>
                                        </tr>
                                        <tr>
                                            <th>Space Name</th>
                                            <td>{space.space_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Description</th>
                                            <td>{space.description}</td>
                                        </tr>
                                        <tr>
                                            <th>City</th>
                                            <td>{space.city}</td>
                                        </tr>
                                        <tr>
                                            <th>Space Type</th>
                                            <td>{space.space_type}</td>
                                        </tr>
                                        <tr>
                                            <th>No of Balconies</th>
                                            <td>{space.no_of_balconies}</td>
                                        </tr>
                                        <tr>
                                            <th>Balconies Space</th>
                                            <td>{space.balconies_space}</td>
                                        </tr>
                                        <tr>
                                            <th>No of Bedrooms</th>
                                            <td>{space.no_of_bedrooms}</td>
                                        </tr>
                                        <tr>
                                            <th>no of Bathrooms</th>
                                            <td>{space.no_of_bathrooms}</td>
                                        </tr>
                                        <tr>
                                            <th>No of Garages</th>
                                            <td>{space.no_of_garages}</td>
                                        </tr>
                                        <tr>
                                            <th>No of Parkings</th>
                                            <td>{space.no_of_parkings}</td>
                                        </tr>
                                        <tr>
                                            <th>Pets Allowed</th>
                                            <td>{space.pets_allowed ? "Yes" : "No"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Box>
                    </Col>
                </Row>

                {/* Show Applicants */}
                {(!this.state.applicantsStatus) && this.state.applicants.length === 0 ? '' : (
                    <Row>
                        <Col xs={12}>
                            <Box title="List of Applicants" type="secondarys">
                                <div className="table-responsive">
                                    <table className="table table-striped applicant-list">
                                        <thead>
                                            <tr>
                                                <th>Applicant Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Reports</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.applicants.map((applicant, index) => (
                                                <tr key={index}>
                                                    <td>{applicant.firstname} {applicant.lastname ? applicant.lastname : ''}</td>
                                                    <td>{applicant.email}</td>
                                                    <td>{applicant.phone}</td>
                                                    <td><a href="/applicants">Report Link</a></td>
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
                )}

                {/* ) : (
            <Redirect to="/spaces" />
          ) } */}
            </Content>
        );
    }
}
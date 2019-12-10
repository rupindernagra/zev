import React, { Component } from 'react';
import API from '../Common/API';
import './dashboard.css';
import { Content, Row, Col, Box } from 'adminlte-2-react';
import AdminMobileFooter from './AdminMobileFooter';
const JSAlert = require('js-alert');

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            file: null,
            saveButtonVisible: false
        }
        this.api = new API();
    }

    componentDidMount() {
        this.api.getCurrentUserData().then(
            res => res.json()
        ).then(userData => {
            this.setState({ user: userData.result });
        }).catch(err => {
            console.log('ERR: ', err);
        })
    }

    fileSelectedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            avatarUpdated: false,
            file: URL.createObjectURL(event.target.files[0]),
            saveButtonVisible: true
        });
    }

    fileSubmitHandler = () => {
        const avatarData = new FormData();
        avatarData.append('avatar', this.state.selectedFile, this.state.selectedFile.name, {
            onUploadProgress: ProgressEvent => {
                console.log(`Upload Progress: ${Math.round(ProgressEvent.loaded / ProgressEvent.total * 100)}`);
            }
        });

        this.api.uploadAvatar(avatarData).then(res => {
            return res.json()
        }).then(data => {
            console.log('up', data);
            this.setState({
                saveButtonVisible: false
            });
            JSAlert.alert("Avatar uploaded!", "", JSAlert.Icons.Success).dismissIn(2000);
        }).catch(err => {
            console.log('Upload ERR: ', err);
        })
    }

    render() {
        const user = this.state.user;
        return (<Content title="Profile" subTitle="Manager Profile" browserTitle="Zev Rector :: Manager Profile">
            <Row>
                <Col xs={12}>
                    <Box title="Profile" type="primary">
                        <Col xs={{ span: 8, offset: 2 }} className="text-center">
                            <div className="userDP" onClick={() => this.fileInput.click()}>
                                {this.state.file || user.image ? (
                                    <img className="avatar" alt="avatar" src={this.state.file || (this.api.avatarUrl + user.image)} />
                                ) : (
                                        <i className="fa fa-user user"></i>
                                    )}
                            </div>
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                onChange={this.fileSelectedHandler}
                                ref={fileInput => this.fileInput = fileInput} />

                            {this.state.saveButtonVisible ? (
                                // <button onClick={this.fileSubmitHandler}>Save Image</button>
                                <button onClick={this.fileSubmitHandler} class="ui labeled icon primary big button">
                                    <i class="icon save"></i>
                                    Save Avatar
                                </button>
                            ) : null}
                            <div className="userName mt-3">
                                {/* <input type="text" name="username" value="Kevin Parker" readOnly="true" />  */}
                                {user.firstname}
                                {user.lastname ? ` ${user.lastname}` : ''}
                                <i className="fa fa-pencil"></i>
                            </div>
                            {/* <Button type="primary" text="Save" /> */}
                        </Col>
                    </Box>
                </Col>

                <AdminMobileFooter />
                
            </Row>
        </Content>);
    }
}
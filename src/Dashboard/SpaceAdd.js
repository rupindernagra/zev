import React, { Component } from 'react';
import API from '../Common/API';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Content, Row, Col, Box, Button, Inputs } from 'adminlte-2-react';
import ImageUploader from 'react-images-upload';
const { Text } = Inputs;
var JSAlert = require("js-alert");

export default class SpaceAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            space_name: '',
            description: '',
            city: '',
            price: '0.00',
            space_status: '',
            space_type: '',
            no_of_balconies: 0,
            balconies_space: '0.00',
            no_of_bedrooms: 0,
            no_of_bathrooms: 0,
            no_of_garages: 0,
            no_of_parkings: 0,
            gallery: [],
        };
        this.imageUrl = '';
        this.api = new API();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        // set state with updated gallery
        this.setState({
            gallery: picture,
            loaded: 0,
        });
    }

    handleChange(event) {
        event.preventDefault();

        const { name, value } = event.target;
        switch (name) {
            case 'space_name':
                this.setState({ space_name: value });
                break;
            case 'description':
                this.setState({ description: value });
                break;
            case 'city':
                this.setState({ city: value });
                break;
            case 'price':
                this.setState({ price: value });
                break;
            case 'space_status':
                this.setState({ space_status: value });
                break;
            case 'space_type':
                this.setState({ space_type: value });
                break;
            case 'no_of_balconies':
                this.setState({ no_of_balconies: value });
                break;
            case 'balconies_space':
                this.setState({ balconies_space: value });
                break;
            case 'no_of_bedrooms':
                this.setState({ no_of_bedrooms: value });
                break;
            case 'no_of_bathrooms':
                this.setState({ no_of_bathrooms: value });
                break;
            case 'no_of_garages':
                this.setState({ no_of_garages: value });
                break;
            case 'no_of_parkings':
                this.setState({ no_of_parkings: value });
                break;
            default:
                break;
        }

    }

    handleSubmit(event) {
        event.preventDefault();

        var formData = {
            space_name: this.state.space_name,
            description: this.state.description,
            city: this.state.city,
            price: this.state.price,
            space_status: this.state.space_status,
            space_type: this.state.space_type,
            no_of_balconies: this.state.no_of_balconies,
            balconies_space: this.state.balconies_space,
            no_of_bedrooms: this.state.no_of_bedrooms,
            no_of_bathrooms: this.state.no_of_bathrooms,
            no_of_garages: this.state.no_of_garages,
            no_of_parkings: this.state.no_of_parkings,
            user_id: this.api.currentUserId
        };

        const uploadData = new FormData()

        for (let x = 0; x < this.state.gallery.length; x++) {
            uploadData.append('file', this.state.gallery[x]);
        }

        this.api.uploadSpaceImage(uploadData)
            .then(res => {
                return res.json()
            }).then(uploaded => {
                if (uploaded.result !== undefined) {

                    this.imageUrl = uploaded.result.map(res => {
                        return encodeURI(res.filename)
                    });
                    formData.gallery = JSON.stringify(this.imageUrl);

                    // Add new space with image url
                    this.api.addSpace(formData).then(
                        res => res.json()
                    ).then(data => {
                        console.log(data);
                        if (data.status) {
                            JSAlert.alert("Space successfully added").then(function () {
                                window.location.href = "/spaces";
                            });
                        }
                    }).catch(err => {
                        console.log(err);
                        console.log(err.status);
                    });

                }
            }).catch(err => {
                console.log('Upload ERR: ', err);
            });

    }

    render() {
        // const { errors, formValid } = this.state;
        return (<Content title="Space" subTitle="Add new Space" browserTitle="Zev Rector :: Add new Space">
            <Row>
                <Col xs={12}>
                    <Box title="Add New Space" type="primary">
                        <form id="myForm" className="add-space-form">

                            <div className="form-group has-text">
                                <label>Space Image</label>
                                <ImageUploader
                                    label="Max file size: 5mb, accepted: jpg|gif|png, Dimesion: 3:2"
                                    name="gallery"
                                    withIcon={true}
                                    buttonText='Choose images'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.gif', '.png']}
                                    maxFileSize={5242880}
                                    singleImage={false}
                                    withPreview={true}
                                />
                            </div>

                            <Text label="Space Name" labelPosition="above" type="text" placeholder="Space Name" sm={12} name="space_name" onChange={(e) => this.handleChange(e)} required noValidate />
                                {/* {errors.firstname.length > 0 &&
                                <span className='error pr-15 text-right text-danger d-block'>{errors.firstname}</span>} */}

                            <div className="form-group has-text">
                                <label>Description</label>
                                <textarea className="form-control" style={{ resize: "none", width: "100%", height: "80px" }} placeholder="Description" name="description" onChange={(e) => this.handleChange(e)} noValidate />
                                {/* {errors.lastname.length > 0 &&
                                <span className='error pr-15 text-right text-danger d-block'>{errors.lastname}</span>} */}
                            </div>

                            <Row>
                                <Col sm={6}>
                                    <Text label="City" labelPosition="above" type="text" placeholder="City" sm={12} name="city" onChange={(e) => this.handleChange(e)} required noValidate />
                                </Col>
                                <Col sm={6}>
                                    <Text label="Price" labelPosition="above" type="text" onChange={(e) => this.handleChange(e)} noValidate className="form-control" name="price" />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <Text label="Space Status" labelPosition="above" type="text" onChange={(e) => this.handleChange(e)} noValidate className="form-control" name="space_status" />
                                </Col>
                                <Col sm={6}>
                                    <Text label="Space Type" labelPosition="above" type="text" onChange={(e) => this.handleChange(e)} noValidate className="form-control" name="space_type" />
                                    {/* {errors.email.length > 0 &&
                                    <span className='error pr-15 text-right text-danger d-block'>{errors.email}</span>} */}
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <div className="form-group has-text">
                                        <label>No of Balconies</label>
                                        <div className="input-group">
                                            <input type="number" pattern="[0-9]" className="form-control" placeholder="No. of balconies" name="no_of_balconies" onChange={(e) => this.handleChange(e)} noValidate />
                                        </div>
                                        {/* {errors.brokerage.length > 0 &&
                                        <span className='error pr-15 text-right text-danger d-block'>{errors.brokerage}</span>} */}
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <Text label="Balconies Space" labelPosition="above" type="text" onChange={(e) => this.handleChange(e)} noValidate className="form-control" name="balconies_space" placeholder="Balconies Space" />
                                    {/* {errors.email.length > 0 &&
                                    <span className='error pr-15 text-right text-danger d-block'>{errors.email}</span>} */}
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={3}>
                                    <div className="form-group">
                                        <label>No of Bedrooms</label>
                                        <div className="input-group">
                                            <input type="number" className="form-control" name="no_of_bedrooms" onChange={(e) => this.handleChange(e)} noValidate />
                                        </div>
                                        {/* {errors.password.length > 0 &&
                                        <span className='error pr-15 text-right text-danger d-block'>{errors.password}</span>} */}
                                    </div>
                                </Col>
                                <Col sm={3}>
                                    <div className="form-group">
                                        <label>No of Bathrooms</label>
                                        <div className="input-group">
                                            <input type="number" className="form-control" name="no_of_bathrooms" onChange={(e) => this.handleChange(e)} noValidate />
                                        </div>
                                        {/* {errors.password.length > 0 &&
                                        <span className='error pr-15 text-right text-danger d-block'>{errors.password}</span>} */}
                                    </div>
                                </Col>
                                <Col sm={3}>
                                    <div className="form-group">
                                        <label>No of Garages</label>
                                        <div className="input-group">
                                            <input type="number" className="form-control" name="no_of_garages" onChange={(e) => this.handleChange(e)} noValidate />
                                        </div>
                                        {/* {errors.password.length > 0 &&
                                        <span className='error pr-15 text-right text-danger d-block'>{errors.password}</span>} */}
                                    </div>
                                </Col>
                                <Col sm={3}>
                                    <div className="form-group">
                                        <label>No of Parkings</label>
                                        <div className="input-group">
                                            <input type="number" className="form-control" name="no_of_parkings" onChange={(e) => this.handleChange(e)} noValidate />
                                        </div>
                                        {/* {errors.password.length > 0 &&
                                        <span className='error pr-15 text-right text-danger d-block'>{errors.password}</span>} */}
                                    </div>
                                </Col>
                            </Row>


                            {/* <Box > */}
                            <div style={{ padding: "15px 0" }}>
                                <Button text="Publish" onClick={this.handleSubmit} size="lg" type="primary" className=" tx-white " />
                                {/* {this.state.errorCount !== null ? <p className="form-status">Form is {formValid ? 'valid ✅' : 'invalid ❌'}</p> : ''} */}
                            </div>
                            {/* </Box> */}
                        </form>
                    </Box>
                </Col>
            </Row>
        </Content>);
    }
}
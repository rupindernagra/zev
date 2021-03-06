import React, { Component } from 'react';
import API from '../Common/API';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
import SocialShare from '../Components/Modules/SocialShare';
import SearchBar from '../Components/Modules/SearchBar';
import Modal from '../Components/Modules/Modal';
import AdminMobileFooter from './AdminMobileFooter';
import placeholderImg from '../Public/images/placeholder-space.jpg';
const { $ } = window;

export default class Spaces extends Component {
    constructor() {
        super();
        this.state = {
            spaces: [],
            spaceUrl: '',
            copySuccess: false
        };
        this.api = new API();
    }

    openModal = (spaceId) => {
        let path = `/spaces/${spaceId}`;
        this.setState({ spaceUrl: window.location.origin + path });
        $('.ui.modal.share-modal').modal('show');
    }

    copyCodeToClipboard = () => {
        const el = this.urlText
        el.select()
        document.execCommand("copy")
        this.setState({ copySuccess: true })
    }

    componentDidMount() {
        // Get all Spaces
        this.api.getMySpaces().then(
            res => res.json()
        ).then(data => {
            if (data.status) {
                console.log('spaces', data)
                this.setState({
                    spaces: data.result
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }

    // Callback return
    onSearchSubmit = (term) => {
        // API - Search spaces
        this.api.searchMySpaces(term).then(
            res => res.json()
        ).then(search => {
            if (search.status) {
                this.setState({ spaces: search.result })
            }
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <Content title="Spaces" subTitle="Spaces" browserTitle="Zev Rector :: Spaces">
                <Row>
                    <Col xs={12}>
                        <Box title="List of spaces" type="primary">
                            <SearchBar onSubmit={this.onSearchSubmit} placeholder="Search Spaces..." />
                            <Button type="primary" text="Add New Space" to="/admin/spaces/add" />
                            <div className="form-group"></div>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Space Name</th>
                                            {/* <th>Space Status</th> */}
                                            <th>Space Type</th>
                                            <th># Views</th>
                                            <th># Applicants</th>
                                            {/* <th>Price</th> */}
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.spaces.map((space, index) => (
                                            <tr key={space.id}>
                                                <td style={{ maxWidth: '100px' }}>
                                                    {this.api.getSpaceGallery(space.gallery).length === 0 ? (
                                                        <img
                                                            className="ui fluid image"
                                                            alt="slide"
                                                            src={placeholderImg} />
                                                    ) : (
                                                        <img
                                                            className="ui fluid image"
                                                            alt="slide"
                                                            src={this.api.getSpaceGallery(space.gallery)[0]}
                                                            onError={ev => ev.target.src = placeholderImg} />
                                                    )}
                                                </td>
                                                <td>{space.space_name}</td>
                                                {/* <td>{space.space_status}</td> */}
                                                <td>{space.space_type}</td>
                                                <td>{space.views}</td>
                                                <td>{space.applicants}</td>
                                                {/* <td>{space.price}</td> */}
                                                <td>
                                                    <Button type="success" text="Share" onClick={this.openModal.bind(null, space.id)} />
                                                    <Button className="ml-3" type="primary" text="View/Edit" to={`/admin/spaces/view/${space.id}`} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Modal title="Share Space URL" className="share-modal">
                                <div className="ui action big input">
                                    <input
                                        type="text" readOnly size={40}
                                        ref={(text) => this.urlText = text}
                                        value={this.state.spaceUrl}
                                    />
                                    <button onClick={() => this.copyCodeToClipboard()} className="ui teal right labeled icon button">
                                        <i className="copy icon"></i>
                                        Copy
                                    </button>
                                    {this.state.copySuccess ?
                                        <div style={{ "color": "green" }}>
                                            Success!
                                        </div> : null}
                                </div>

                                <div className="share-onSocial">
                                    <h4>Share on Social Media</h4>
                                    <SocialShare url={this.state.spaceUrl} />
                                </div>
                            </Modal>
                        </Box>
                    </Col>

                    <AdminMobileFooter />

                </Row>
            </Content>
        );
    }
}
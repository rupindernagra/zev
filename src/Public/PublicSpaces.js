import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../Registration/registration.css';
import './public.css';
import API from '../Common/API';
import { Container, Row, Col } from 'react-bootstrap';
import PublicMenu from './PublicMenu';
import Spinner from '../Components/Modules/Spinner';
import SpaceListing from './SpaceListing';
import Modal from '../Components/Modules/Modal';
import ApplicationForm from '../Components/Form/ApplicationForm';
import GallerySlider from './GallerySlider';
// import Placeholder from '../Components/Modules/Placeholder';
const { $ } = window;
// var JSAlert = require("js-alert");

export default class PublicSpaces extends Component {

  constructor(props) {
    super(props);

    this.state = {
      space: {},
      status: false,
      similarSpaces: []
    };
    this.api = new API();
  }

  openModal(e) {
    e.preventDefault();

    $('.ui.modal.application-form').modal('show');
  }

  componentDidMount() {
    // Get single Space
    const { match: { params: { spaceId } } } = this.props;

    this.api.getSpaceWithUpdateViews(spaceId)
      .then(res => res.json())
      .then(data => {
        console.log('data', data)
        if (data.status) {

          this.api.getMySpaces()
            .then(res => res.json())
            .then(response => {
              let spaces = [];
              spaces = response.result.filter(space => space.space_type === data.result.space_type);
              console.log('all spaces', spaces);
              this.setState({
                similarSpaces: spaces.slice(0, 3)
              });
            })
            .catch(err => {
              console.log('ERR: ', err);
            });

          // set state for space
          this.setState({
            status: data.status,
            space: data.result,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });

    // Get similar applicants
  }

  render() {
    const space = this.state.space;
    let gallery = [];
    if (this.state.status & space.gallery !== '') {
      gallery = space.gallery.split(', ');
      gallery = gallery.map(img => this.api.spaceImageUrl + img);
    }

    return (
      <div>
        {!this.state.status ? <Spinner message="Preparing Space data..." type="indeterminate" /> : (
          <div className="public-view-space">
            <PublicMenu />
            {/* <Placeholder type="line" /> */}
            <section className="space-address pb-3">
              <Container>
                <Row>
                  <Col sm={{ offset: 1, span: 10 }} xs={12}>
                    <div className="ui vertical segment">
                      <Row>
                        <Col sm={9} xs={12} className="main-column">
                          <div className="ui header">
                            <h1 className="street">
                              {space.space_name}
                              {space.city ? `, ${space.city}` : ''}
                            </h1>
                          </div>
                          <div className="ui raised">
                            <h4 className="home-features">
                              {space.space_status ? space.space_status : ''}
                              {space.no_of_bedrooms ? ` . ${space.no_of_bedrooms} bed` : ''}
                              {space.no_of_bathrooms ? ` . ${space.no_of_bathrooms} bath` : ''}
                              {space.floor_space ? ` . ${space.floor_space} ft²` : ''}
                            </h4>
                          </div>
                        </Col>
                        <Col sm={3} xs={12} className="price-box-container">
                          <div className="price-box text-center">
                            <h3 className="space-price">{`$${space.price}`}</h3>
                            <div className="browse-more">
                              <a id="" href="/" target="_self" className="ui button primary" onClick={this.openModal}>Submit Application</a>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
                {/* {this.props.children} */}
              </Container>
            </section>
            <section className="space-gallery-slider">
              <Container>
                <Row>
                  <Col sm={12}>
                    <GallerySlider slidesUrl={gallery} />
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="space-description">
              <Container>
                <Row>
                  <Col sm={{ offset: 1, span: 10 }} xs={12}>
                    {/* <h3>Description</h3> */}
                    {/* <hr /> */}
                    <p>
                      {space.description ? space.description : ''}
                    </p>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="space-features">
              <Container>
                <Row>
                  <Col sm={{ offset: 1, span: 10 }} xs={12}>
                    <Row>
                      <Col sm={12}>
                        <h4 className="ui header small">About Space</h4>
                        <div className="ui divider"></div>
                      </Col>
                      <Col sm={6}>
                        <div className="ui list">
                          {space.no_of_bedrooms ? (
                            <div className="item">
                              <div className="feature-label"># of Bedrooms: </div>
                              <strong>
                                {space.no_of_bedrooms}
                              </strong>
                            </div>
                          ) : ''}

                          {space.no_of_bathrooms ? (
                            <div className="item">
                              <div className="feature-label"># of Bathrooms: </div>
                              <strong>
                                {space.no_of_bathrooms}
                              </strong>
                            </div>
                          ) : ''}

                          {space.no_of_balconies ? (
                            <div className="item">
                              <div className="feature-label"># of Balconies: </div>
                              <strong>
                                {space.no_of_balconies}
                              </strong>
                            </div>
                          ) : ''}

                          {space.no_of_garages ? (
                            <div className="item">
                              <div className="feature-label"># of Garages: </div>
                              <strong>
                                {space.no_of_garages}
                              </strong>
                            </div>
                          ) : ''}

                          {space.no_of_parkings ? (
                            <div className="item">
                              <div className="feature-label"># of Parkings: </div>
                              <strong>

                              </strong>
                            </div>
                          ) : ''}
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="ui list">
                          {space.space_type ? (
                            <div className="item">
                              <div className="feature-label">Space type: </div>
                              <strong>
                                {space.space_type}
                              </strong>
                            </div>
                          ) : ''}

                          {space.floor_space ? (
                            <div className="item">
                              <div className="feature-label">Space size: </div>
                              <strong>
                                {`${space.floor_space} ft²`}
                              </strong>
                            </div>
                          ) : ''}

                          {space.balconies_space ? (
                            <div className="item">
                              <div className="feature-label">Balcony size: </div>
                              <strong>
                                {`${space.balconies_space} ft²`}
                              </strong>
                            </div>
                          ) : ''}

                          <div className="item">
                            <div className="feature-label">Pets allowed: </div>
                            <strong>
                              {space.pets_allowed ? 'Yes' : 'No'}
                            </strong>
                          </div>

                          <div className="item">
                            <div className="feature-label">Pool: </div>
                            <strong>
                              {space.pets_allowed ? 'Yes' : 'None'}
                            </strong>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="space-features">
              <Container>
                <Row>
                  <Col sm={{ offset: 1, span: 10 }} xs={12}>
                    <h4 className="ui header small">Features</h4>
                    <div className="ui divider"></div>
                    <Row>
                      <Col sm={6}>
                        <div className="ui list">
                          <div className="item">
                            <div className="feature-label">Space type: </div>
                            <strong>Single family home</strong>
                          </div>
                          <div className="item">
                            <div className="feature-label">Space type: </div>
                            <strong>Single family home</strong>
                          </div>
                          <div className="item">
                            <div className="feature-label">Space type: </div>
                            <strong>Single family home</strong>
                          </div>
                          <div className="item">
                            <div className="feature-label">Space type: </div>
                            <strong>Single family home</strong>
                          </div>
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="ui list">
                          <div className="item">
                            <div className="feature-label">Space type: </div>
                            <strong>Single family home</strong>
                          </div>
                          <div className="item">
                            <div className="feature-label">Space type: </div>
                            <strong>Single family home</strong>
                          </div>
                          <div className="item">
                            <div className="feature-label">Space type: </div>
                            <strong>Single family home</strong>
                          </div>
                          <div className="item">
                            <div className="feature-label">Space type: </div>
                            <strong>Single family home</strong>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </section>
            {this.state.similarSpaces.length > 0 ? (
              <section className="space-similar">
                <Container>
                  <Row>
                    <Col sm={12}>
                      <Modal title="Submit Application" className="application-form">
                        <ApplicationForm spaceId={space.id} />
                      </Modal>
                      <h4 className="ui header small">Similar Spaces</h4>
                      <div className="ui divider"></div>
                    </Col>
                    {this.state.similarSpaces.map(space => (
                      <Col key={space.id} sm={4}>
                        <SpaceListing space={space} />
                      </Col>
                    ) )}
                  </Row>
                </Container>
              </section>
            ) : null}
            
            <section id="about">
              <Container>
                <Row>
                  <Col sm={{ offset: 3, span: 6 }} xs={12}>
                    <h2>About [Real Estate]</h2>
                    <p>We're a team dedicated to changing the real estate business by making
                    buying and selling dramatically easier. Moving has been one of the most
                    stressful events in our lives. With a traditional home sale lasting months
                    full of headaches and uncertainty, we knew there had to be a better
                    experience for buyers and sellers.</p>
                  </Col>
                </Row>
              </Container>
            </section>
          </div>
        )}
      </div>
    )
  }

}

import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import { Row, Col, Inputs, Button } from 'adminlte-2-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../App.css';
import '../Registration/registration.css';
import './public.css';
import API from '../Common/API';
import PublicMenu from './PublicMenu';
import SpaceListing from './SpaceListing';
import Modal from '../Components/Modules/Modal';
import ApplicationForm from '../Components/Form/ApplicationForm';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import faker from 'faker';
// const { Text } = Inputs;
const {$} = window;
var JSAlert = require("js-alert");

export default class PublicSpaces extends Component {

  constructor(props) {
    super(props);

    this.api = new API();
  }

  openModal(e) {
    e.preventDefault();

    $('.ui.modal').modal('show');
  }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    
    return (
      <div>
        <PublicMenu />
        <div className="public-view-space">
          <section className="space-address pb-3">
            <Container>
              <Row>
                <Col sm={{ offset: 1, span: 10 }} xs={12}>
                  <div className="ui vertical segment">
                    <Row>
                      <Col sm={9} xs={12} className="main-column">
                        <div className="ui header">
                          <h1 className="street">1005 S 115th Dr, Avondale, AZ 85323</h1>
                        </div>
                        <div className="ui raised">
                          <h4 className="home-features">
                            Active ·
                            3 bed
                            2 bath ·
                            1,495 ft² ·
                            5,750 ft² lot
                          </h4>
                        </div>
                      </Col>
                      <Col sm={3} xs={12} className="price-box-container">
                        <div className="price-box text-center">
                          <h3 className="space-price">$239,000</h3>
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
          <section className="space-images">
            <Container>
              <Row>
                <Col sm={12}>
                  <Slider {...settings}>
                    <div>
                      <img className="ui fluid image" alt="gallery" src="http://www.gbexclusiverealestate.com/wp-content/uploads/2019/07/2019-07-01_84699_Windsor_at_Westside_Castaway_5933.crop-box-16-9-1200x676.jpg" />
                    </div>
                    <div>
                      <img className="ui fluid image" alt="gallery" src="https://www.urbansplash.co.uk/images/placeholder-16-9.jpg" />
                    </div>
                    <div>
                      <img className="ui fluid image" alt="gallery" src="https://wallpaperplay.com/walls/full/e/d/4/98365.jpg" />
                    </div>
                  </Slider>
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
                    Here is description
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
                        <div className="item">
                          <div className="feature-label">Space type: </div>
                          <strong>Single family home</strong>
                        </div>
                        <div className="item">
                          <div className="feature-label"># of Bedrooms: </div>
                          <strong>3</strong>
                        </div>
                        <div className="item">
                          <div className="feature-label"># of Bathrooms: </div>
                          <strong>3</strong>
                        </div>
                        <div className="item">
                          <div className="feature-label"># of Balconies: </div>
                          <strong>3</strong>
                        </div>
                        <div className="item">
                          <div className="feature-label"># of Garages: </div>
                          <strong>3</strong>
                        </div>
                        <div className="item">
                          <div className="feature-label"># of Parkings: </div>
                          <strong>3</strong>
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="ui list">
                        <div className="item">
                          <div className="feature-label">Space size: </div>
                          <strong>5,750 ft²</strong>
                        </div>
                        <div className="item">
                          <div className="feature-label">Balcony size: </div>
                          <strong>1,495 ft²</strong>
                        </div>
                        <div className="item">
                          <div className="feature-label">Pets allowed: </div>
                          <strong>Yes</strong>
                        </div>
                        <div className="item">
                          <div className="feature-label">Pool: </div>
                          <strong>None</strong>
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
                    {/* <Col sm={12}>
                      
                    </Col> */}
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
          <section className="space-similar">
            <Container>
              <Row>
                <Col sm={12}>
                  <Modal>
                    <ApplicationForm />
                  </Modal>
                  <h4 className="ui header small">Similar Spaces</h4>
                  <div className="ui divider"></div>
                </Col>
                <Col sm={4}>
                  <SpaceListing />
                </Col>
                <Col sm={4}>
                  <SpaceListing image="" />
                </Col>
                <Col sm={4}>
                  <SpaceListing image="" />
                </Col>
              </Row>
            </Container>
          </section>
          <section id="about">
            <Container>
              <Row>
                <Col sm={{ offset:3, span:6 }} xs={12}>
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
      </div>
    )
  }

}

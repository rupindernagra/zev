import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

export default class Homepage extends Component {
    masthead = React.createRef();

    componentDidMount() {
        this.masthead.addEventListener('load', this.isInViewport);
        const bottom = this.masthead.getBoundingClientRect().bottom;
        console.log('viewrport bottom', bottom);
    }

    isInViewport(offset = 0) {
        // if (!this.masthead) return false;
        const top = this.masthead.getBoundingClientRect().top;
        console.log('viewrport run top', top);
        return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
    }

    render() {

        return (
            <React.Fragment>
                {/* <!-- Following Menu --> */}
                <div className="ui large top fixed menu transition hidden">
                    <div className="ui container">
                        <Link to="/" className="active item">Home</Link>
                        <Link to="#" className="item">Spaces</Link>
                        <Link to="#" className="item">About</Link>
                        <Link to="#" className="item">Contact</Link>
                        <div className="right menu">
                            <div className="item">
                                <Link to="/login" className="ui button">Log in</Link>
                            </div>
                            <div className="item">
                                <Link to="/register" className="ui primary button">Register</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Sidebar Menu --> */}
                <div className="ui vertical inverted sidebar menu left" >
                    <Link to="/" className="active item">Home</Link>
                    <Link to="#" className="item">Spaces</Link>
                    <Link to="#" className="item">About</Link>
                    <Link to="#" className="item">Contact</Link>
                    <Link to="/login" className="item">Login</Link>
                    <Link to="/register" className="item">Register</Link>
                </div>


                {/* <!-- Page Contents --> */}
                <div className="pusher">
                    <div ref={(el) => this.masthead = el} className="ui inverted vertical masthead center aligned segment">

                        <div className="ui container">
                            <div className="ui large secondary inverted pointing menu">
                                <Link to="" className="toc item">
                                    <i className="sidebar icon"></i>
                                </Link>
                                <Link to="/" className="active item">Home</Link>
                                <Link to="#" className="item">Work</Link>
                                <Link to="#" className="item">About</Link>
                                <Link to="#" className="item">Contact</Link>
                                <div className="right item">
                                    <Link to="/login" className="ui inverted button">Log in</Link>
                                    <Link to="/register" className="ui inverted button">Register</Link>
                                </div>
                            </div>
                        </div>

                        <div className="ui text container">
                            <h1 className="ui inverted header">
                                Imagine-a-Company
                            </h1>
                            <h2>Do whatever you want when you want to.</h2>
                            <div className="ui huge primary button">Get Started <i className="right arrow icon"></i></div>
                        </div>

                    </div>

                    <div className="ui vertical stripe segment">
                        <div className="ui middle aligned stackable grid container">
                            <div className="row">
                                <div className="eight wide column">
                                    <h3 className="ui header">We Help Companies and Companions</h3>
                                    <p>We can give your company superpowers to do things that they never thought possible. Let us delight your customers and empower your needs...through pure data analytics.</p>
                                    <h3 className="ui header">We Make Bananas That Can Dance</h3>
                                    <p>Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.</p>
                                </div>
                                <div className="six wide right floated column">
                                    <img alt="alt" src="https://semantic-ui.com/examples/assets/images/wireframe/white-image.png" className="ui large bordered rounded image" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="center aligned column">
                                    <Link to="#" className="ui huge button">Check Them Out</Link>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="ui vertical stripe quote segment">
                        <div className="ui equal width stackable internally celled grid">
                            <div className="center aligned row">
                                <div className="column">
                                    <h3>"What a Company"</h3>
                                    <p>That is what they all say about us</p>
                                </div>
                                <div className="column">
                                    <h3>"I shouldn't have gone with their competitor."</h3>
                                    <p>
                                        <img alt="nan" src="https://semantic-ui.com/examples/assets/images/avatar/nan.jpg" className="ui avatar image" /> <b>Nan</b> Chief Fun Officer Acme Toys
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ui vertical stripe segment">
                        <div className="ui text container">
                            <h3 className="ui header">Breaking The Grid, Grabs Your Attention</h3>
                            <p>Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.</p>
                            <Link to="#" className="ui large button">Read More</Link>
                            <h4 className="ui horizontal header divider">
                                <Link to="#" >Case Studies</Link>
                            </h4>
                            <h3 className="ui header">Did We Tell You About Our Bananas?</h3>
                            <p>Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but its really true. It took years of gene splicing and combinatory DNA research, but our bananas can really dance.</p>
                            <Link to="#" className="ui large button">I'm Still Quite Interested</Link>
                        </div>
                    </div>


                    <div className="ui inverted vertical footer segment">
                        <div className="ui container">
                            <div className="ui stackable inverted divided equal height stackable grid">
                                <div className="three wide column">
                                    <h4 className="ui inverted header">About</h4>
                                    <div className="ui inverted link list">
                                        <Link to="#" className="item">Sitemap</Link>
                                        <Link to="#" className="item">Contact Us</Link>
                                        <Link to="#" className="item">Religious Ceremonies</Link>
                                        <Link to="#" className="item">Gazebo Plans</Link>
                                    </div>
                                </div>
                                <div className="three wide column">
                                    <h4 className="ui inverted header">Services</h4>
                                    <div className="ui inverted link list">
                                        <Link to="#" className="item">Banana Pre-Order</Link>
                                        <Link to="#" className="item">DNA FAQ</Link>
                                        <Link to="#" className="item">How To Access</Link>
                                        <Link to="#" className="item">Favorite X-Men</Link>
                                    </div>
                                </div>
                                <div className="seven wide column">
                                    <h4 className="ui inverted header">Footer Header</h4>
                                    <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
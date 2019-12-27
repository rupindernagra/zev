import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import placeholderImg from './images/placeholder-space.jpg';

export default class GallerySlider extends Component {
    static defaultProps = {
        slidesUrl: []
    };
    constructor(props) {
        super(props);
        this.state = {
            thumbView: null,
            fullView: null
        };
    }

    componentDidMount() {
        // slider Navigations
        this.setState({
            thumbView: this.slider1,
            fullView: this.slider2
        });
    }

    render() {
        const { slidesUrl } = this.props;

        var thumbViewSettings = {
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: false,
            focusOnSelect: true,
            infinite: true,
            centerMode: true,
        };
        var fullViewSettings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            infinite: true,
        };
        return (
            <div>
                {slidesUrl.length >= 5 ? (
                    <Slider
                        asNavFor={this.state.fullView}
                        ref={slider => (this.slider1 = slider)}
                        {...thumbViewSettings}
                        className="thumb-slider"
                    >
                        {slidesUrl.length > 0 ? (
                            slidesUrl.map((slide, index) => {
                                return (
                                    <div key={index}>
                                        <img className="ui fluid image" alt="slide" src={slide} onError={ev => ev.target.src=placeholderImg} />
                                    </div>
                                )
                            })
                        ) : (
                            <div>
                                <img className="ui fluid image" alt="slide" src={placeholderImg} />
                            </div>
                        )}
                    </Slider>
                ) : ''}

                <Slider
                    asNavFor={this.state.thumbView}
                    ref={slider => (this.slider2 = slider)}
                    {...fullViewSettings}
                    className="full-slider"
                >
                    {slidesUrl.length > 0 ? (
                        slidesUrl.map((slide, index) => {
                            return (
                                <div key={index}>
                                    <img
                                        style={{ width: '100%', height: '550px', objectFit: 'cover' }}
                                        className="ui fluid image"
                                        alt="slide"
                                        src={slide}
                                        onError={ev => ev.target.src={placeholderImg}}/>
                                </div>
                            )
                        })
                    ) : (
                        <div>
                            <img
                                style={{ width: '100%', height: '550px', objectFit: 'cover' }}
                                className="ui fluid image"
                                alt="slide"
                                src={placeholderImg} />
                        </div>
                    )}
                </Slider>
            </div>
        );
    }
}
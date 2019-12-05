import React, { Component } from "react";
import Slider from "react-slick";

export default class GallerySlider extends Component {
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
        var thumbViewSettings = {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            focusOnSelect: true,
            infinite: true,
        }
        var fullViewSettings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            infinite: true,
        };
        return (
            <div>
                <Slider
                    asNavFor={this.state.fullView}
                    ref={slider => (this.slider1 = slider)}
                    {...thumbViewSettings}
                    className="thumb-slider"
                >
                    <div>
                        <img className="ui fluid image" alt="gallery" src="http://www.gbexclusiverealestate.com/wp-content/uploads/2019/07/2019-07-01_84699_Windsor_at_Westside_Castaway_5933.crop-box-16-9-1200x676.jpg" />
                    </div>
                    <div>
                        <img className="ui fluid image" alt="gallery" src="https://www.urbansplash.co.uk/images/placeholder-16-9.jpg" />
                    </div>
                    <div>
                        <img className="ui fluid image" alt="gallery" src="https://wallpaperplay.com/walls/full/e/d/4/98365.jpg" />
                    </div>
                    <div>
                        <img className="ui fluid image" alt="gallery" src="https://www.urbansplash.co.uk/images/placeholder-16-9.jpg" />
                    </div>
                </Slider>
                <Slider
                    asNavFor={this.state.thumbView}
                    ref={slider => (this.slider2 = slider)}
                    {...fullViewSettings}
                    className="full-slider"
                >
                    <div>
                        <img className="ui fluid image" alt="gallery" src="http://www.gbexclusiverealestate.com/wp-content/uploads/2019/07/2019-07-01_84699_Windsor_at_Westside_Castaway_5933.crop-box-16-9-1200x676.jpg" />
                    </div>
                    <div>
                        <img className="ui fluid image" alt="gallery" src="https://www.urbansplash.co.uk/images/placeholder-16-9.jpg" />
                    </div>
                    <div>
                        <img className="ui fluid image" alt="gallery" src="https://wallpaperplay.com/walls/full/e/d/4/98365.jpg" />
                    </div>
                    <div>
                        <img className="ui fluid image" alt="gallery" src="https://www.urbansplash.co.uk/images/placeholder-16-9.jpg" />
                    </div>
                </Slider>
            </div>
        );
    }
}
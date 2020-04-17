import React from 'react';

import './TabGallery.css';

export default class TabGallery extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      imageSrc: "",
      imageText: "",
    }

    this.containerElm = React.createRef();
    this.containerBottomElm = React.createRef();

    const ratioWHArray = this.props.ratio.split(":");
    this.ratioWH = ratioWHArray[0] / ratioWHArray[1];

    this.updateDimensions = this.updateDimensions.bind(this);
    this.showImage = this.showImage.bind(this);
    this.hideImage = this.hideImage.bind(this);
  }

  showImage(image) {
    this.setState({
      imageSrc: image.src,
      imageText: image.caption,
    });
  }


  hideImage() {
    this.setState({
      imageSrc: "",
      imageText: "",
    });


    this.containerBottomElm.style.display = "none";
    this.updateDimensions();
  }


  updateDimensions() {
    const tabHeight = this.containerElm.current.offsetWidth / this.props.input.length / this.ratioWH;
    this.containerElm.current.style.height = `${tabHeight}px`;

    const bottomHeight = this.containerBottomElm.current.offsetWidth / this.ratioWH;
    this.containerBottomElm.current.style.height = `${bottomHeight}px`;
  }


  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }


  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }


  componentDidUpdate() {
    if (this.state.imageSrc !== "") {
      this.containerBottomElm.current.style.display = "block";
      this.updateDimensions();
    }
  }

  render() {
    return (
      <div className="lp-tab-gallery">
        <div className="container" ref={this.containerElm}>
          {
            this.props.input.map((image, index) => {
              return (
                <div
                  key={index}
                  className="image-wrapper"
                  style={{
                    width: `${1 / this.props.input.length * 100}%`,
                    height: `100%`
                  }}
                >
                  <img
                    className="image"
                    src={image.src}
                    alt={image.caption}
                    onClick={() => this.showImage(image)}
                  />
                </div>
              )
            })
          }
        </div>

        <div className="container-bottom" ref={this.containerBottomElm}>
          <img 
            className="image" 
            src={this.state.imageSrc} 
            alt={this.state.imageText} 
          />
          <span className="close-btn" onClick={() => this.hideImage()}>×</span>
          <div className="image-text">{this.state.imageText}</div>
        </div>
      </div>
    )
  }
}
import React, { Component } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import classes from './ImageCarousel.module.css';
import { connect } from 'react-redux';

class ImageCarousel extends Component {
  state = {
    active: this.props.images.length + 1,
    size: 100,
    // defaultImg: this.props.defaultImg,
  };

  imageRefs = [];
  displayRef = React.createRef();
  slide = React.createRef();

  handleNextClick = () => {
    let counter = this.state.active;
    if (counter >= this.imageRefs.length - 1) return;
    this.slide.current.style.transition = 'transform 0.2s ease-in-out';
    counter++;
    this.setState((prevState) => ({ ...prevState, active: counter }));
    this.slide.current.style.transform =
      'translateX(' + -this.state.size * counter + 'px)';
  };

  handlePrevClick = () => {
    let counter = this.state.active;
    if (counter <= 0) return;
    this.slide.current.style.transition = 'transform 0.2s ease-in-out';
    counter--;
    this.setState((prevState) => ({ ...prevState, active: counter }));
    this.slide.current.style.transform =
      'translateX(' + -this.state.size * counter + 'px)';
  };

  handleTransition = () => {
    if (this.imageRefs[this.state.active - 1].current.id === 'lastitem') {
      this.slide.current.style.transition = 'none';
      this.setState({ ...this.state, active: this.props.images.length + 1 });
      this.slide.current.style.transform = `translateX(${
        -this.state.size * this.state.active
      }px)`;
    }

    if (
      this.imageRefs[this.state.active + this.props.images.length - 1].current
        .id === 'firstitem'
    ) {
      this.slide.current.style.transition = 'none';
      this.setState((prevState) => ({
        ...prevState,
        active: this.props.images.length,
      }));
      this.slide.current.style.transform = `translateX(${
        -this.state.size * this.state.active
      }px)`;
    }
  };

  handleSelectPic = (evt) => {
    const selectedPic = evt.target.style.backgroundImage;
    this.displayRef.current.style.backgroundImage =
      evt.target.style.backgroundImage;
  };

  render() {
    const carouselImages = [
      this.props.images[this.props.images.length - 1],
      ...this.props.images,
      ...this.props.images,
      ...this.props.images.slice(0, this.props.images.length - 1),
    ];

    carouselImages.forEach((img) => {
      if (
        !this.imageRefs.length ||
        this.imageRefs.length < this.props.images.length * 3
      )
        this.imageRefs.push(React.createRef());
    });

    return (
      <Container fluid>
        <Row className="justify-content-center align-items-center">
          <Container
            className={classes['picture-display']}
            style={{ backgroundImage: `url(${this.props.defaultImg})` }}
            ref={this.displayRef}
          ></Container>
        </Row>
        <Row className="justify-content-center align-items-center mt-2 mb-2">
          {this.props.images.length > 3 && (
            <>
              <div className={classes['arrow']} onClick={this.handlePrevClick}>
                <span>&#8678;</span>
              </div>

              <Row className={classes['slide-control']}>
                <div
                  className={classes['slider']}
                  ref={this.slide}
                  style={{
                    transform: `translateX(${
                      -this.state.size * this.state.active
                    }px)`,
                  }}
                  onTransitionEnd={this.handleTransition}
                >
                  {carouselImages.map((image, idx) => {
                    return (
                      <div
                        id={
                          idx === 0
                            ? 'lastitem'
                            : idx === carouselImages.length - 1
                            ? 'firstitem'
                            : ''
                        }
                        key={`pic${idx}`}
                        className={classes['slider-controll-pic']}
                        style={{
                          backgroundImage: `url(${image ? image.url : ''})`,
                        }}
                        ref={this.imageRefs[idx]}
                        onClick={this.handleSelectPic}
                      ></div>
                    );
                  })}
                </div>
              </Row>

              <div className={classes['arrow']} onClick={this.handleNextClick}>
                <span>&#8680;</span>
              </div>
            </>
          )}

          {this.props.images.length <= 3 && (
            <Row className="d-flex flex-row justify-content-center align-items-center">
              {this.props.images.map((image, idx) => (
                <Col
                  key={`pic_${idx}`}
                  className={classes['slider-controll-pic']}
                  style={{
                    backgroundImage: `url(${image ? image.url : ''})`,
                  }}
                  onClick={this.handleSelectPic}
                ></Col>
              ))}
            </Row>
          )}
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const productSku = ownProps.productSKU;
  const productImages = state.images.filter(
    (image) => image.product_sku === productSku
  );

  let defaultImg;

  if (productImages.length) {
    defaultImg = productImages.find((image) => image.is_primary === 1);
  }

  return {
    images: productImages
      ? productImages
      : [{ url: '/assets/images/no-image-found.png' }],
    defaultImg: defaultImg
      ? defaultImg.url
      : '/assets/images/no-image-found.png',
  };
}

export default connect(mapStateToProps)(ImageCarousel);

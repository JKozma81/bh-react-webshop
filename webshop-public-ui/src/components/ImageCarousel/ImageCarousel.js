import React, { Component } from 'react';
import { Button, Row, Image, Container } from 'react-bootstrap';
import classes from './ImageCarousel.module.css';

class ImageCarousel extends Component {
  state = {
    images: [...this.props.images],
    active: this.props.images.length + 1,
    size: 100,
  };

  imageRefs = [];
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

  render() {
    const carouselImages = [
      this.state.images[this.state.images.length - 1],
      ...this.state.images,
      ...this.state.images,
      ...this.state.images.slice(0, this.state.images.length - 1),
    ];

    carouselImages.forEach((img) => {
      if (
        !this.imageRefs.length ||
        this.imageRefs.length < this.state.images.length * 3
      )
        this.imageRefs.push(React.createRef());
    });

    return (
      <div>
        <Button onClick={this.handlePrevClick}>Prev</Button>
        <div className={classes['slide-control']}>
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
                  style={{ backgroundImage: `url(${image.url})` }}
                  ref={this.imageRefs[idx]}
                ></div>
              );
            })}
          </div>
        </div>
        <Button onClick={this.handleNextClick}>Next</Button>
      </div>
    );
  }
}

export default ImageCarousel;

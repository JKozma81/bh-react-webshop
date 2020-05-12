import React, { Component } from 'react';
import { Button, Row, Image, Container } from 'react-bootstrap';

export default class ImageCarousel extends Component {
  state = {
    // images: [...this.props.images],
    images: [],
    active: 1,
  };

  handleInc = () => {
    const index = this.state.active;
    if (index + 1 > this.state.images.length) return;
    this.setState({ active: index + 1 });
  };

  handleDec = () => {
    const index = this.state.active;
    if (index - 1 <= 0) return;
    this.setState(() => ({
      active: index - 1,
    }));
  };

  handleClick = (index) => {
    this.setState(() => ({ active: index }));
  };

  render() {
    return (
      <Container className="p-3">
        <Row>
          <img
            src={this.state.images[this.state.active - 1].url}
            alt="product"
            className="big-img mr-auto ml-auto"
          />
        </Row>
        <Row>
          <Button className="ml-auto" onClick={this.handleDec}>
            &#8656;
          </Button>{' '}
          {this.state.images.map((image, idx) => (
            <Image
              onClick={() => {
                this.handleClick(idx + 1);
              }}
              className="tiny-img mr-2 ml-2"
              key={`img_${idx}`}
              src={image.url}
              thumbnail
            />
          ))}
          <Button className="mr-auto" onClick={this.handleInc}>
            &#8658;
          </Button>
        </Row>
      </Container>
    );
  }
}

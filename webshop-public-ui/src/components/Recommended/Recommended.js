import React, { Component } from 'react';
import { Row, Container } from 'react-bootstrap';
import classes from './Recommended.module.css';
import { connect } from 'react-redux';
import ProductBox from '../ProductBox/ProductBox';

class Recommended extends Component {
  state = {
    active: this.props.recommendedProducts.length + 1,
    size: 304,
  };

  prodCardRefs = [];
  slide = React.createRef();

  handleNextClick = () => {
    let counter = this.state.active;
    if (counter >= this.prodCardRefs.length - 1) return;
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
    if (this.prodCardRefs[this.state.active - 1].current.id === 'lastitem') {
      this.slide.current.style.transition = 'none';
      this.setState({
        ...this.state,
        active: this.props.recommendedProducts.length + 1,
      });
      this.slide.current.style.transform = `translateX(${
        -this.state.size * this.state.active
      }px)`;
    }

    if (
      this.prodCardRefs[
        this.state.active + this.props.recommendedProducts.length - 1
      ].current.id === 'firstitem'
    ) {
      this.slide.current.style.transition = 'none';
      this.setState((prevState) => ({
        ...prevState,
        active: this.props.recommendedProducts.length,
      }));
      this.slide.current.style.transform = `translateX(${
        -this.state.size * this.state.active
      }px)`;
    }
  };

  render() {
    const carouselCards = [
      this.props.recommendedProducts[this.props.recommendedProducts.length - 1],
      ...this.props.recommendedProducts,
      ...this.props.recommendedProducts,
      ...this.props.recommendedProducts.slice(
        0,
        this.props.recommendedProducts.length - 1
      ),
    ];

    carouselCards.forEach((card) => {
      if (
        !this.prodCardRefs.length ||
        this.prodCardRefs.length < this.props.recommendedProducts.length * 3
      )
        this.prodCardRefs.push(React.createRef());
    });

    return (
      <Container
        fluid
        className={`${classes['recommended-container']} border d-flex flex-row justify-content-center align-items-center`}
      >
        <Row
          className={`justify-content-center align-items-center mt-2 mb-2 } ${classes['slider-container']}`}
        >
          {this.props.recommendedProducts.length === 0 && (
            <Row>
              <h1>
                <em>No recommended products!</em>
              </h1>
            </Row>
          )}

          {this.props.recommendedProducts.length > 0 &&
            this.props.recommendedProducts.length < 5 && (
              <Row className="justify-content-center align-items-center">
                <Row className="justify-content-center align-items-center">
                  {this.props.recommendedProducts.map((product, idx) => (
                    <div key={`card_${idx}`} className={classes['slider-item']}>
                      {product && <ProductBox product={product} />}
                    </div>
                  ))}
                </Row>
              </Row>
            )}

          {this.props.recommendedProducts.length > 5 && (
            <>
              <div
                className={`${classes['big-arrow']} ${classes['left-arrow']}`}
                onClick={this.handlePrevClick}
              >
                <span>&#8678;</span>
              </div>

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
                  {carouselCards.map((product, idx) => (
                    <div
                      id={
                        idx === 0
                          ? 'lastitem'
                          : idx === carouselCards.length - 1
                          ? 'firstitem'
                          : ''
                      }
                      key={`card_${idx}`}
                      className={classes['slider-item']}
                      ref={this.prodCardRefs[idx]}
                    >
                      {product && <ProductBox product={product} />}
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`${classes['big-arrow']} ${classes['right-arrow']}`}
                onClick={this.handleNextClick}
              >
                <span>&#8680;</span>
              </div>
            </>
          )}
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const productSku = ownProps.productSKU;

  const recommendations = state.recommendations.filter(
    (recom) => recom.main_sku === productSku
  );

  let recommendedProducts = recommendations.map((recommended) => {
    const product = state.products.find(
      (product) => product.sku === recommended.product_sku
    );
    if (!product) return {};
    return product;
  });

  recommendedProducts = recommendedProducts.map((item) => {
    const primaryPicture = state.images.find(
      (picture) => picture.product_sku === item.sku && picture.is_primary === 1
    );
    return {
      ...item,
      picture: primaryPicture ? primaryPicture : { url: '' },
    };
  });

  return {
    recommendedProducts,
  };
}

export default connect(mapStateToProps)(Recommended);

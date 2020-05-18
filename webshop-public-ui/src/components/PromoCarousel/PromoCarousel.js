import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import classes from './PromoCarouse.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PromoCarousel extends Component {
  state = {
    active: 0,
    size: 1280,
    timerId: 0,
  };

  promoRefs = [];
  slide = React.createRef();

  componentDidMount() {
    const timer = setInterval(this.increaseCounter, 3000);
    this.setState((prevState) => ({ ...prevState, timerId: timer }));
  }

  increaseCounter = () => {
    let counter = this.state.active;
    if (counter >= this.promoRefs.length - 1) return;
    this.slide.current.style.transition = 'transform 0.2s linear';
    counter++;
    this.setState((prevState) => ({ ...prevState, active: counter }));
    this.slide.current.style.transform =
      'translateX(' + -this.state.size * counter + 'px)';
  };

  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }

  handleTransition = () => {
    if (this.promoRefs[this.state.active].current.id === 'firstitem') {
      this.slide.current.style.transition = 'none';
      this.setState((prevState) => ({
        ...prevState,
        active: 0,
      }));
      this.slide.current.style.transform = `translateX(${
        -this.state.size * this.state.active
      }px)`;
    }
  };

  handleClick = (idx) => {
    this.setState((prevState) => ({ ...prevState, active: idx }));
  };

  render() {
    const promos = [...this.props.promotions, this.props.promotions[0]];

    promos.forEach((promo) => {
      if (
        !this.promoRefs.length ||
        this.promoRefs.length < this.props.promotions.length + 1
      )
        this.promoRefs.push(React.createRef());
    });

    return (
      this.props.promotions && (
        <Container
          fluid
          className={`justify-content-center align-items-center ${classes['promo-container']} mt-5`}
        >
          <Row className={classes['promo-display']}>
            <div
              className={classes['promo-slider']}
              ref={this.slide}
              style={{
                transform: `translateX(${
                  -this.state.size * this.state.active
                }px)`,
              }}
              onTransitionEnd={this.handleTransition}
            >
              {promos.map((promo, idx) => {
                return (
                  <div
                    className={`${classes['promo-img']}`}
                    id={idx === promos.length - 1 ? 'firstitem' : ''}
                    key={`promo_${idx}`}
                    style={{
                      backgroundImage: `url(${promo ? promo.picture : ''})`,
                    }}
                    ref={this.promoRefs[idx]}
                  >
                    <h1 className={classes['promo-slogen']}>
                      {promo ? promo.promo_text : ''}
                    </h1>
                    <Link
                      to={`/products/${promo ? promo.product_sku : ''}`}
                      className={classes['promo-link']}
                    >
                      See details
                    </Link>
                  </div>
                );
              })}
            </div>
          </Row>

          <Row
            className={`justify-content-center align-items-center ${classes['promo-control']}`}
          >
            {this.props.promotions.map((promo, idx) => {
              return (
                <div
                  key={`btn_${idx}`}
                  className={`${classes['promo-btn']} ${
                    idx === this.state.active ? classes['promo-btn-active'] : ''
                  }`}
                  onClick={() => this.handleClick(idx)}
                ></div>
              );
            })}
          </Row>
        </Container>
      )
    );
  }
}

function mapStaeToProps(state) {
  return {
    promotions: state.promotions,
  };
}

export default connect(mapStaeToProps)(PromoCarousel);

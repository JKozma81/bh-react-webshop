import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import classes from './HeaderCart.module.css';

export default class HeaderCart extends Component {
  render() {
    return (
      <Container
        className={`d-flex flex-row justify-content-center align-items-center ${classes.Cart}`}
      >
        <Row className="d-flex flex-row justify-content-center align-items-center">
          <p>Your cart is empty</p>
          <img
            src="/assets/images/cart.png"
            alt="cart"
            className={classes['Cart-img']}
          />
        </Row>
      </Container>
    );
  }
}

import React, { Component } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import CartItem from '../CartItem/CartItem';
import { emptyCart } from '../../actions/Actions';
import { Redirect, Link } from 'react-router-dom';

class CartPage extends Component {
  render() {
    const totalPrice =
      this.props.cart.length > 0
        ? this.props.cart.reduce(
            (total, item) => (total += item.price * item.qty),
            0
          )
        : 0;
    return (
      <Container className="mt-5 text-center p-3">
        <h1>Your cart</h1>
        {this.props.cart.map((item, idx) => (
          <Row className="justify-content-center align-items-center mt-3 mb-3 border p-3">
            <CartItem key={`item_${idx}`} {...item} />
          </Row>
        ))}
        <Row className="justify-content-end">
          <p>
            <strong>Total price: {totalPrice} &#8364;</strong>
          </p>
        </Row>
        <Row className="justify-content-between">
          <Button variant={'danger'} onClick={() => this.props.emptyOutCart()}>
            Empty cart
          </Button>
          <Link to="/checkout" className="btn btn-primary">
            Checkout
          </Link>
        </Row>
        {this.props.cart.length <= 0 && <Redirect to="/" />}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const modifiedCart = state.cart.map((cartItem) => {
    const searchResult = state.images.find(
      (image) => image.product_sku === cartItem.sku
    );

    if (!searchResult) {
      return {
        ...cartItem,
        image: '',
      };
    }

    return {
      ...cartItem,
      image: searchResult.url,
    };
  });

  return {
    cart: modifiedCart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    emptyOutCart: () => dispatch(emptyCart()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);

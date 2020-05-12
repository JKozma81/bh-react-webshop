import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/Actions';

class CartControl extends Component {
  render() {
    return (
      <Container>
        {this.props.cart.find(
          (item) => item.sku === this.props.product.sku
        ) && <Button>Remove one</Button>}
        {this.props.product.qty}
        {this.props.product.qty ? (
          <Button onClick={() => this.props.addToCart(this.props.product.sku)}>
            Add To Cart
          </Button>
        ) : (
          <span>Out of stock</span>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (itemSku) => dispatch(addToCart(itemSku)),
    // removeFromCart: (itemSku) => dispatch(),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartControl);

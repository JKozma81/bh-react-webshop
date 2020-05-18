import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap';
import { addToCart, removeOne } from '../../actions/Actions';
import { connect } from 'react-redux';
import classes from './CartItem.module.css';

class CartItem extends Component {
  render() {
    const productInStock = this.props.products.find(
      (item) => item.sku === this.props.sku
    );

    return (
      <>
        <Col xs={3}>
          <div
            className={classes['cart-item-image']}
            style={{ backgroundImage: `url(${this.props.image})` }}
          ></div>
        </Col>
        <Col xs={3}>
          <strong>
            {this.props.name} ({this.props.sku})
          </strong>
        </Col>
        <Col
          xs={3}
          className="d-flex flex-row justify-content-between align-items-center"
        >
          <Button onClick={() => this.props.removeOneFromCart(this.props.sku)}>
            -
          </Button>
          {this.props.qty}
          {this.props.qty <= productInStock.qty + 1 && (
            <Button onClick={() => this.props.addToCart(this.props.sku)}>
              +
            </Button>
          )}
          =
        </Col>
        <Col xs={3}>
          Items total price: {this.props.price * this.props.qty} &#8364;
        </Col>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (itemSku) => dispatch(addToCart(itemSku)),
    removeOneFromCart: (itemSku) => dispatch(removeOne(itemSku)),
  };
}

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);

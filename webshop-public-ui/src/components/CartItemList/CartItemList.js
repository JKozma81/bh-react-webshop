import React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

function CartItemList(props) {
  const totalPrice =
    props.cart.length > 0
      ? props.cart.reduce((total, item) => (total += item.price * item.qty), 0)
      : 0;
  return (
    <>
      <p>Your order: </p>
      <ListGroup>
        {props.cart.map((item, idx) => (
          <ListGroup.Item key={`item_${idx}`}>
            {item.qty} x {item.name} ({item.sku}) = {item.qty * item.price}{' '}
            &#8364;
          </ListGroup.Item>
        ))}
        <ListGroup.Item className="text-right">
          <strong>Total price: {totalPrice} &#8364;</strong>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

export default connect(mapStateToProps)(CartItemList);

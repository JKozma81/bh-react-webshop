import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import CartControl from '../CartControl/CartControl';

export default class ProductBox extends Component {
  render() {
    return (
      <Card className="container product-card p-2">
        <Card.Img
          variant="top"
          src={this.props.product.image}
          className="product-img"
        />
        <Card.Body>
          <Card.Text>
            <span>{this.props.product.name}</span>
            <span>{this.props.product.sku}</span>
            <span>{this.props.product.price}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <CartControl product={this.props.product} />
        </Card.Footer>
      </Card>
    );
  }
}

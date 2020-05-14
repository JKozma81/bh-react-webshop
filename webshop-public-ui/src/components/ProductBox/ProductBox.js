import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartControl from '../CartControl/CartControl';
import classes from './ProductBox.module.css';

export default class ProductBox extends Component {
  render() {
    return (
      <Card className={`w-100 h-100 p-2 ${classes.Box}`}>
        <Link to={`/products/${this.props.product.sku}`}>
          <Card.Img
            variant="bottom"
            src={this.props.product.picture.url}
            className="w-100 h-100"
          />
        </Link>
        <Card.Body>
          <Card.Text className="d-flex flex-row justify-content-between">
            <Link
              to={`/products/${this.props.product.sku}`}
              className={classes['Product-link']}
            >
              {this.props.product.name}
            </Link>
            <span>{this.props.product.sku}</span>
            <span>{this.props.product.price}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex flex-row">
          <CartControl product={this.props.product} />
        </Card.Footer>
      </Card>
    );
  }
}

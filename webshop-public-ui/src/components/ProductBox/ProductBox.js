import React, { Component } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartControl from '../CartControl/CartControl';
import classes from './ProductBox.module.css';

export default class ProductBox extends Component {
  render() {
    return (
      <Card className={`w-100 h-100 ${classes.Box}`}>
        <Container
          className={`d-flex flex-row justify-content-center align-items-center ${classes['Card-image-container']} p-3`}
        >
          <Link to={`/products/${this.props.product.sku}`}>
            <Card.Img
              variant="bottom"
              src={
                this.props.product.picture.url
                  ? this.props.product.picture.url
                  : '/assets/images/no-image-found.png'
              }
              className={classes['Card-image']}
            />
          </Link>
        </Container>
        <Card.Body className="p-3 h-25">
          <Card.Text className="d-flex flex-row justify-content-between">
            <Link
              to={`/products/${this.props.product.sku}`}
              className={classes['Product-link']}
            >
              {this.props.product.name}
            </Link>
            <span>{this.props.product.sku}</span>
            <span>
              <strong>{this.props.product.price} &#8364;</strong>{' '}
            </span>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex flex-row justify-content-between align-items-center">
          <CartControl product={this.props.product} />
        </Card.Footer>
      </Card>
    );
  }
}

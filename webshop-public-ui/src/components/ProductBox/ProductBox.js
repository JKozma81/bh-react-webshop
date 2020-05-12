import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

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
          <Card.Title>{this.props.product.name}</Card.Title>
          <Card.Text>
            <span>Ár: €{this.props.product.price}</span>
            <br />
            <span>Leírás: {this.props.product.shortSpec}</span>
            <br />
            <span>
              Raktáron:
              {this.props.product.qty > 0 ? (
                <b>{` ${this.props.product.qty} db`}</b>
              ) : (
                <b style={{ color: 'red' }}>Elfogyott</b>
              )}
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

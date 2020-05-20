import React, { Component } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/Actions';

class ProductInfo extends Component {
  render() {
    return (
      <Container style={{ minHeight: '250px' }}>
        <Row style={{ minHeight: '60px' }}>
          <h1>
            {this.props.name} ({this.props.sku})
          </h1>
        </Row>
        <Row style={{ minHeight: '150px' }}>
          <p>
            <strong>
              In stock: {this.props.qty ? this.props.qty : 'Out of stock!'}
            </strong>
          </p>
          <br />
          <p>{this.props.desc}</p>
        </Row>
        <Row className="justify-content-end" style={{ minHeight: '40px' }}>
          {this.props.qty > 0 && (
            <Button
              variant="primary"
              onClick={() => this.props.addItemToCart(this.props.sku)}
            >
              Add to cart
            </Button>
          )}
          {this.props.qty === 0 && (
            <span style={{ color: 'red', fontWeight: 'bold' }}>
              Out of stock
            </span>
          )}
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const productSku = ownProps.productSKU;

  const product = state.products.find((prod) => prod.sku === productSku);

  return {
    ...product,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addItemToCart: (sku) => dispatch(addToCart(sku)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);

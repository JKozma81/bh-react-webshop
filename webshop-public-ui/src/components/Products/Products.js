import React, { Component } from 'react';
import { Container, Col, CardDeck } from 'react-bootstrap';
import classes from './Products.module.css';
import { connect } from 'react-redux';

import ProductBox from '../ProductBox/ProductBox';

class Products extends Component {
  async componentDidMount() {}

  render() {
    return (
      <Container className={`${classes.Products} mt-5`}>
        <CardDeck>
          {this.props.products.map((product, idx) => (
            <Col xs={3} key={`prod_${idx}`}>
              <ProductBox product={product} />
            </Col>
          ))}
        </CardDeck>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.map((item) => {
      const primaryPicture = state.images.find(
        (picture) =>
          picture.product_sku === item.sku && picture.is_primary === 1
      );
      return {
        ...item,
        picture: primaryPicture,
      };
    }),
  };
}

export default connect(mapStateToProps)(Products);

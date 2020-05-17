import React, { Component } from 'react';
import { Container, Col, CardDeck, Row } from 'react-bootstrap';
import classes from './Products.module.css';
import { connect } from 'react-redux';

import ProductBox from '../ProductBox/ProductBox';

class Products extends Component {
  async componentDidMount() {}

  render() {
    return (
      <Container fluid className={`${classes.Products} p-5`}>
        <Row xs={5}>
          {this.props.products.map((product, idx) => (
            <Col key={`prod_${idx}`} className={`p-3 ${classes['Card']}`}>
              <ProductBox product={product} />
            </Col>
          ))}
        </Row>
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

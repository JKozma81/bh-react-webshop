import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ProductInfo from '../ProductInfo/ProductInfo';
import ProductSpec from '../ProductSpec/ProductSpec';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import classes from './ProductDetail.module.css';
import Recommended from '../Recommended/Recommended';

class ProductDetail extends Component {
  render() {
    const productSKU = this.props.productId;
    return (
      <Container fluid className={`mt-5 ${classes['Product-detail']} p-5`}>
        <Row>
          <Col md={6} className="border">
            <ImageCarousel productSKU={productSKU} />
          </Col>
          <Col md={6} className="p-3 border">
            <ProductInfo productSKU={productSKU} />
          </Col>
        </Row>
        <Row>
          <Col className="height-300 border p-3">
            <ProductSpec productSKU={productSKU} />
          </Col>
        </Row>
        <Row>
          <Recommended productSKU={productSKU} />
        </Row>
      </Container>
    );
  }
}

export default ProductDetail;

import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ProductInfo from '../ProductInfo/ProductInfo';
import ProductSpec from '../ProductSpec/ProductSpec';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import { connect } from 'react-redux';
import classes from './ProductDetail.module.css';

class ProductDetail extends Component {
  state = {
    product: {},
  };
  async componentDidMount() {
    const productSKU = this.props.productId;
    this.setState((prevState) => ({
      ...prevState,
      product: this.props.products.find((item) => item.sku === productSKU),
    }));
  }

  render() {
    return (
      <Container className={`mt-5 ${classes['Product-detail']}`}>
        <Row>
          <Col md={6} className="border">
            {/* <ImageCarousel images={images} /> */}
          </Col>
          <Col md={6} className="p-3 border">
            <ProductInfo {...this.state.product} />
          </Col>
        </Row>
        <Row>
          <Col className="height-300 border p-3">
            <ProductSpec
              params={this.state.product ? this.state.product.specs : ''}
            />
          </Col>
        </Row>
        <Row>
          <Col className="height-300 border">Ajánlott termékek</Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

export default connect(mapStateToProps)(ProductDetail);

import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ProductInfo from '../ProductInfo/ProductInfo';
import ProductSpec from '../ProductSpec/ProductSpec';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import { connect } from 'react-redux';
import classes from './ProductDetail.module.css';

class ProductDetail extends Component {
  state = {
    // product: {},
    // images: [],
  };

  async componentDidMount() {
    const productSKU = this.props.productId;

    const productImages = this.props.images.filter(
      (image) => image.product_sku === productSKU
    );
    const product = this.props.products.find((item) => item.sku === productSKU);

    this.setState((prevState) => ({
      ...prevState,
      product,
      images: productImages,
    }));
  }

  render() {
    return (
      <Container fluid className={`mt-5 ${classes['Product-detail']} p-5`}>
        <Row>
          <Col md={6} className="border">
            {this.state.images && (
              <ImageCarousel
                images={this.state.images}
                productSKU={
                  Object.keys(this.state.product).length
                    ? this.state.product.sku
                    : ''
                }
              />
            )}
          </Col>
          <Col md={6} className="p-3 border">
            {this.state.product && <ProductInfo {...this.state.product} />}
          </Col>
        </Row>
        <Row>
          <Col className="height-300 border p-3">
            {this.state.product && (
              <ProductSpec
                params={this.state.product ? this.state.product.specs : ''}
              />
            )}
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
    images: state.images,
  };
}

export default connect(mapStateToProps)(ProductDetail);

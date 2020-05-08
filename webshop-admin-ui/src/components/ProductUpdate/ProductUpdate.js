import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import ProductImageUpload from '../ProductImageUpload/ProductImageUpload';
import ProductEditForm from '../ProductEditForm/ProductEditForm';
import ProductImages from '../ProductImages/ProductImages';

export default class ProductUpdate extends Component {
  render() {
    const productSKU = this.props.match.params.sku;
    return (
      <Container className="p-3">
        <ProductEditForm sku={productSKU} />
        <ProductImages sku={productSKU} />
        <ProductImageUpload sku={productSKU} />
      </Container>
    );
  }
}

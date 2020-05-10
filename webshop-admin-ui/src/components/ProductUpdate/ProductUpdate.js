import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import ProductImageUpload from '../ProductImageUpload/ProductImageUpload';
import ProductEditForm from '../ProductEditForm/ProductEditForm';
import ProductImages from '../ProductImages/ProductImages';
import { connect } from 'react-redux';
import { getSingleProductData, clearProductData } from '../../actions/Actions';

class ProductUpdate extends Component {
  state = {
    error: {},
  };

  async componentDidMount() {
    const productSKU = this.props.match.params.sku;
    const dataStream = await fetch(
      `http://localhost:5000/products/${productSKU}/files`
    );

    const productDataFromDB = await dataStream.json();

    console.log(productDataFromDB);

    if (productDataFromDB.error) {
      this.setState(() => ({ ...this.state, error: productDataFromDB.error }));
      return;
    }

    const { productData, imageData } = productDataFromDB;
    this.props.getProdutData(productData, imageData);
  }

  componentWillUnmount() {
    this.props.clearData();
  }

  render() {
    const productSKU = this.props.match.params.sku;
    return (
      <Container className="p-3">
        {Object.keys(this.state.error).length ? (
          <Container
            className="d-flex flex-column justify-content-center align-items-center error"
            style={{ height: '640px' }}
          >
            <h1>{this.state.error.message}</h1>
          </Container>
        ) : (
          <>
            <ProductEditForm />
            <ProductImages />
            <ProductImageUpload sku={productSKU} />
          </>
        )}
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProdutData: (productData, images) =>
      dispatch(getSingleProductData(productData, images)),
    clearData: () => dispatch(clearProductData()),
  };
}

export default connect(null, mapDispatchToProps)(ProductUpdate);

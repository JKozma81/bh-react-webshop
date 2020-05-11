import React, { Component } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import ProductImageUpload from '../ProductImageUpload/ProductImageUpload';
import ProductEditForm from '../ProductEditForm/ProductEditForm';
import ProductImages from '../ProductImages/ProductImages';
import { connect } from 'react-redux';
import { getSingleProductData, clearProductData } from '../../actions/Actions';
import DeleteModal from '../DeleteModal/DeleteModal';

class ProductUpdate extends Component {
  state = {
    error: {},
    showModal: false,
  };

  async componentDidMount() {
    const productSKU = this.props.match.params.sku;
    const dataStream = await fetch(
      `http://localhost:5000/products/${productSKU}/files`
    );

    const productDataFromDB = await dataStream.json();

    if (productDataFromDB.error) {
      this.setState(() => ({
        ...this.state,
        error: productDataFromDB.error,
      }));
      return;
    }

    const { productData, imageData } = productDataFromDB;
    this.props.getProdutData(productData, imageData);
  }

  componentWillUnmount() {
    this.props.clearData();
  }

  showModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      showModal: true,
    }));
  };

  hideModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      showModal: false,
    }));
  };

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
            <Row>
              {this.state.showModal && (
                <DeleteModal sku={productSKU} hideModal={this.hideModal} />
              )}
              <ProductEditForm />
              <ProductImages />
              <ProductImageUpload sku={productSKU} />
            </Row>
            <Row className="d-flex justify-content-center">
              <Button className="btn-danger w-50" onClick={this.showModal}>
                Delete Product
              </Button>
            </Row>
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

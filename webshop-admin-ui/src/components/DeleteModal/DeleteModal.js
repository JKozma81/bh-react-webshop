import React, { Component } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteProduct } from '../../actions/Actions';
import { Link, Redirect } from 'react-router-dom';

class DeleteModal extends Component {
  state = {
    productsData: [],
    imagesData: [],
    deleted: false,
  };

  removeProduct = async (sku) => {
    const deleteStream = await fetch(
      `http://localhost:5000/product/${this.props.sku}`,
      {
        method: 'DELETE',
        mode: 'cors',
      }
    );

    if (deleteStream.ok) {
      const dataFromDB = await deleteStream.json();
      const { productsData, imagesData } = dataFromDB;

      this.setState((prevState) => ({
        ...prevState,
        productsData,
        imagesData,
        deleted: true,
      }));
    }
  };

  componentWillUnmount() {
    this.props.delProduct(this.state.productsData, this.state.imagesData);
  }

  render() {
    return (
      <Container className="confirm-modal">
        <Container
          className="w-50 d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: '300px', backgroundColor: 'white' }}
        >
          <Row className="d-flex justify-content-center">
            <h2>Are You sure, You want to delete this product?</h2>
          </Row>
          <Row className="d-flex flex-row justify-content-around w-100 mt-5">
            <Button className="w-25" onClick={this.props.hideModal}>
              No
            </Button>
            <Button
              className="btn btn-danger w-25"
              onClick={() => this.removeProduct(this.props.sku)}
            >
              Yes
            </Button>
            {this.state.deleted && <Redirect to="/products" />}
          </Row>
        </Container>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    delProduct: (productsData, imagesData) =>
      dispatch(deleteProduct(productsData, imagesData)),
  };
}

export default connect(null, mapDispatchToProps)(DeleteModal);

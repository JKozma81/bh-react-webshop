import React, { Component } from 'react';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import { Form, Container, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { modifyProductInfo } from '../../actions/Actions';

class ProductEditForm extends Component {
  state = {
    product: {},
    errors: [],
    missingFields: [],
    updated: false,
  };

  updateData = async () => {
    const result = await fetch(
      `http://localhost:5000/products/${this.props.product.sku}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(this.state.product),
      }
    );

    if (result.ok) {
      const results = await result.json();
      if (results.errors) {
        this.setState((prevState) => ({
          ...prevState,
          errors: results.errors
            ? [...prevState.errors, ...results.errors]
            : [],
          product: results.productData
            ? { ...prevState.product, ...results.productData }
            : {},
          missingFields: results.missingFields
            ? [...prevState.missingFields, ...results.missingFields]
            : [],
        }));
        return;
      }

      this.props.modifyProduct(results);

      this.setState((prevState) => ({
        ...prevState,
        updated: true,
      }));

      const timer = setTimeout(() => {
        this.setState((prevState) => ({
          ...prevState,
          updated: false,
        }));
        clearTimeout(timer);
      }, 4500);
    } else {
      this.setState((prevState) => ({
        ...prevState,
        errors: [...prevState, { message: result.statusText }],
      }));
    }
  };

  validate = (e) => {
    let validate = true;
    e.preventDefault();
    const specs = document.querySelector('.specs');
    const specText = specs.value;

    if (specs.value && !specText.includes('=')) {
      this.setState((prevState) => ({
        ...prevState,
        errors: [
          ...prevState.errors,
          {
            type: 'validation',
            message: 'Product specs must include a "=" character!',
          },
        ],
      }));
      validate = false;
    }

    if (!Object.keys(this.state.product).length) {
      validate = false;
      this.setState((prevState) => ({
        ...prevState,
        errors: [
          ...prevState.errors,
          {
            type: 'validation',
            message: 'No modified information to update!',
          },
        ],
      }));
    }

    if (validate) {
      this.updateData();
    }
  };

  handleSKUInput = (e) => {
    const regex = new RegExp('^[a-zA-Z0-9]*$');
    const key = String.fromCharCode(e.charCode);
    if (!regex.test(key)) {
      e.preventDefault();
    }
  };

  handleSpecsInput = (e) => {
    const key = String.fromCharCode(e.charCode);
    if (key === ' ') {
      e.preventDefault();
    }
  };

  handleChange = (evt) => {
    this.setState({
      ...this.state,
      product: {
        ...this.state.product,
        [evt.target.name]: evt.target.value,
      },
    });
  };

  render() {
    return (
      <Container className="p-3">
        <Form className="edit-form" onSubmit={this.validate}>
          <Form.Group>
            <Form.Label>SKU</Form.Label>
            <Form.Control
              className="sku"
              type="text"
              name="sku"
              onKeyPress={this.handleSKUInput}
              maxLength="12"
              defaultValue={this.props.product.sku}
              disabled
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product name:</Form.Label>
            <Form.Control
              className="name"
              type="text"
              name="name"
              defaultValue={this.props.product.name}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product price:</Form.Label>
            <Form.Control
              className="price"
              type="number"
              name="price"
              defaultValue={this.props.product.price}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product description:</Form.Label>
            <Form.Control
              className="desc"
              as="textarea"
              name="desc"
              maxLength="240"
              defaultValue={this.props.product.desc}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product specifications:</Form.Label>{' '}
            <span id="specsErr" className="d-none error"></span>
            <Form.Control
              className="specs"
              as="textarea"
              name="specs"
              required
              onKeyPress={this.handleSpecsInput}
              defaultValue={this.props.product.specs}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group className="text-right">
            {this.state.updated && (
              <span className="mr-2">
                <strong style={{ color: 'green' }}>
                  Product informations updated!
                </strong>
              </span>
            )}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
        <ErrorDisplay
          errors={this.state.errors}
          missingFields={this.state.missingFields}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.singleProductData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    modifyProduct: (productInfo) => dispatch(modifyProductInfo(productInfo)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditForm);

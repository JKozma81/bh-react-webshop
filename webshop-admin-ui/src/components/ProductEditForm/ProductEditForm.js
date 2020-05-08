import React, { Component } from 'react';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import { Form, Container, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class ProductEditForm extends Component {
  state = {
    product: {},
    errors: [],
    missingFields: [],
  };

  componentDidMount() {}

  updateData = async () => {
    const formData = new FormData();
    formData.append('sku', this.state.product.sku);
    formData.append('name', this.state.product.name);
    formData.append('price', this.state.product.price);
    formData.append('desc', this.state.product.desc);
    formData.append('spec', this.state.product.spec);
    // const result = await fetch('http://localhost:5000/product', {
    //   method: 'POST',
    //   mode: 'cors',
    //   body: formData,
    // });

    // if (result.ok) {
    //   const results = await result.json();
    //   this.setState({
    //     ...this.state,
    //     product: {},
    //     errors: [],
    //     missingFields: [],
    //   });
    // } else {
    //   const results = await result.json();
    //   this.setState({
    //     ...this.state,
    //     errors: [...this.state.errors, ...results.errors],
    //     product: { ...this.state.product, ...results.productData },
    //   });
    // }
  };

  validate = (e) => {
    let validate = true;
    e.preventDefault();
    const specs = document.querySelector('.specs');
    const specText = specs.value;

    if (specs.value && !specText.includes('=')) {
      this.setState(() => ({
        ...this.state,
        errors: [
          ...this.state.errors,
          {
            type: 'validation',
            message: 'Product specs must include a "=" character!',
          },
        ],
      }));
      validate = false;
    }

    if (validate) {
      this.uploadData();
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
        <Form
          className="edit-form"
          onSubmit={this.validate}
          encType="multipart/form-data"
        >
          <Form.Group>
            <Form.Label>SKU</Form.Label>
            <Form.Control
              className="sku"
              type="text"
              name="sku"
              onKeyPress={this.handleSKUInput}
              maxLength="12"
              defaultValue={this.props.product.sku}
              onChange={this.handleChange}
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
              name="spec"
              required
              onKeyPress={this.handleSpecsInput}
              defaultValue={this.props.product.specs}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group className="text-right">
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
  return {};
}

export default connect(mapStateToProps)(ProductEditForm);

import React, { Component } from 'react';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';
import { Form, Container, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewProduct } from '../../actions/Actions';

class UploadProductForm extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      promo_text: '',
      product_sku: '',
      errors: [],
      missingFields: [],
      uploaded: false,
    };
  }

  uploadData = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('images', this.fileInput.current.files[0]);
    formData.append('promo_text', this.state.promo_text);
    formData.append('product_sku', this.state.product_sku);

    const result = await fetch('http://localhost:5000/products/promotions', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });

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

      this.setState((prevState) => ({
        ...prevState,
        promo_text: '',
        product_sku: '',
        errors: [],
        missingFields: [],
        uploaded: true,
      }));

      // this.props.addProduct(results);
    } else {
      this.setState((prevState) => ({
        ...prevState,
        errors: [...prevState, { message: result.statusText }],
      }));
    }
  };

  handleChange = (evt) => {
    this.setState({
      ...this.state,
      [evt.target.name]: evt.target.value,
    });
  };

  render() {
    return (
      <Container className="p-3">
        <Form
          className="Upload-form"
          onSubmit={this.uploadData}
          encType="multipart/form-data"
        >
          <Form.Group>
            <Form.Label>Promotion Text</Form.Label>
            <Form.Control
              className="promo_text"
              type="text"
              name="promo_text"
              maxLength="200"
              defaultValue={this.state.promo_text}
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Product</Form.Label>
            <Form.Control
              as="select"
              defaultValue={this.state.product_sku}
              name="product_sku"
              onChange={this.handleChange}
              required
            >
              {this.props.products.map((item, idx) => (
                <option
                  key={`opt_${idx}`}
                  value={`${item.sku}, ${item.product_name}`}
                >
                  {`${item.sku}, ${item.product_name}`}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.File
              id="custom-file"
              label="Images"
              custom
              name="images"
              required
              ref={this.fileInput}
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
        {this.state.uploaded && <Redirect to="/products" />}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.map((item) => ({
      sku: item.sku,
      product_name: item.name,
    })),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addProduct: (newProduct) => dispatch(addNewProduct(newProduct)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadProductForm);

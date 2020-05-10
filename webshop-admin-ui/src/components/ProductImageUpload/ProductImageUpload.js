import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addImages, getImages } from '../../actions/Actions';

class ProductImageUpload extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      error: {},
    };
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    if (this.fileInput.current.files.length) {
      const formData = new FormData();

      for (let i = 0; i < this.fileInput.current.files.length; i++) {
        formData.append('images', this.fileInput.current.files[i]);
      }
      formData.append('sku', this.props.sku);

      const imageStream = await fetch(
        `http://localhost:5000/products/${this.props.sku}/files/`,
        {
          method: 'POST',
          mode: 'cors',
          body: formData,
        }
      );

      if (imageStream.ok) {
        const imageResults = await imageStream.json();
        if (imageResults.errors) {
          this.setState((prevState) => ({
            ...prevState,
            errors: imageResults.errors
              ? [...prevState.errors, ...imageStream.errors]
              : [],
          }));
          return;
        }

        console.log('inc img', imageResults);

        this.props.addImages(imageResults);
        this.props.getImages(this.props.sku);
        return;
      }

      this.setState((prevState) => ({
        ...prevState,
        error: {
          ...prevState.error,
          message: imageStream.statusText,
        },
      }));
    }

    this.setState((prevState) => ({
      ...prevState,
      error: {
        ...prevState.error,
        message: 'No image provided!',
      },
    }));
  };

  render() {
    return (
      <Form
        className="Upload-form"
        encType="multipart/form-data"
        onSubmit={this.handleSubmit}
      >
        <Form.Group>
          <Form.File
            id="custom-file"
            label="Images"
            multiple
            custom
            name="images"
            ref={this.fileInput}
          />
        </Form.Group>
        <Form.Group className="text-right">
          {Object.keys(this.state.error).length > 0 && (
            <span className="mr-2">
              <strong className="error">{this.state.error.message}</strong>
            </span>
          )}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addImages: (images) => dispatch(addImages(images)),
    getImages: (sku) => dispatch(getImages(sku)),
  };
}

export default connect(null, mapDispatchToProps)(ProductImageUpload);

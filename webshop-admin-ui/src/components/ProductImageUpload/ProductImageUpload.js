import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class ProductImageUpload extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < this.fileInput.current.files.length; i++) {
      formData.append('images', this.fileInput.current.files[i]);
    }
    formData.append('sku', this.props.sku);

    await fetch(`http://localhost:5000/products/${this.props.sku}/files/`, {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Spinner } from 'react-bootstrap';

// import ProductBox from '../ProductBox/ProductBox';

export default class Products extends Component {
  state = {
    productsData: [],
    loading: false,
  };

  async componentDidMount() {
    // this.setState({ loading: true });
    // const dataStream = await fetch('http://localhost:5000/products');
    // const productsData = await dataStream.json();
    // this.setState((state) => ({
    //   productsData: productsData.products,
    //   loading: false,
    // }));
  }

  createProductBoxes = (data) => {
    return data.map((product, idx) => {
      return (
        <Col md={4} className="p-3" key={idx}>
          <Link
            key={`link_${idx}`}
            // to={`/products/${product.id}`}
            className="prod-link"
          >
            {/* <ProductBox product={product} key={`product_${idx}`} /> */}
            <div> Product Box</div>
          </Link>
        </Col>
      );
    });
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <Spinner animation="border" />
        ) : (
          this.createProductBoxes(this.state.productsData)
        )}
      </>
    );
  }
}

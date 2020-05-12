import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Spinner, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import ProductBox from '../ProductBox/ProductBox';

class Products extends Component {
  async componentDidMount() {}

  render() {
    return (
      <Container>
        {this.props.products.map((product, idx) => (
          <ProductBox key={`prod_${idx}`} product={product} />
        ))}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

export default connect(mapStateToProps)(Products);

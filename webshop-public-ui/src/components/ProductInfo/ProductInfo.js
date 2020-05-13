import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/Actions';

class ProductInfo extends Component {
	render() {
		return (
			<Container>
				<h1>
					{this.props.name} ({this.props.sku})
				</h1>
				<h3>
					In Stock:{' '}
					{this.props.qty ? this.props.qty : 'Out of stock!'}
				</h3>
				<p>{this.props.desc}</p>
				<Button
					variant="primary"
					onClick={() => this.props.addItemToCart(this.props.sku)}
				>
					Add to cart
				</Button>
			</Container>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		addItemToCart: (sku) => dispatch(addToCart(sku)),
	};
}

export default connect(null, mapDispatchToProps)(ProductInfo);

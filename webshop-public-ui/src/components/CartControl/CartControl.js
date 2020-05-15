import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addToCart, removeOne } from '../../actions/Actions';

class CartControl extends Component {
	render() {
		return (
			<>
				<Col xs={5} className="p-0">
					{this.props.cart.find(
						(item) => item.sku === this.props.product.sku
					) && (
						<Button
							className="btn-sm"
							onClick={() =>
								this.props.removeOneFromCart(
									this.props.product.sku
								)
							}
						>
							Remove one
						</Button>
					)}
				</Col>
				<Col xs={2} className="p-0 text-center">
					{this.props.product.qty}
				</Col>
				<Col xs={5} className="p-0 text-center">
					{this.props.product.qty ? (
						<Button
							className="btn-sm"
							onClick={() =>
								this.props.addToCart(this.props.product.sku)
							}
						>
							Add To Cart
						</Button>
					) : (
						<span>Out of stock</span>
					)}
				</Col>
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		cart: state.cart,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addToCart: (itemSku) => dispatch(addToCart(itemSku)),
		removeOneFromCart: (itemSku) => dispatch(removeOne(itemSku)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CartControl);

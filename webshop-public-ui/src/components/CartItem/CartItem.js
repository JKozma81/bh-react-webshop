import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { addToCart, removeOne } from '../../actions/Actions';
import { connect } from 'react-redux';

class CartItem extends Component {
	render() {
		const productInStock = this.props.products.find(
			(item) => item.sku === this.props.sku
		);
		return (
			<Row>
				<Col xs={3}>
					<img
						src="https://devicecloudexplorer.appspot.com/img/entry/computer.png"
						alt="product"
					/>
				</Col>
				<Col xs={3}>
					<p>
						<strong>
							{this.props.name} ({this.props.sku})
						</strong>
					</p>
				</Col>
				<Col xs={3}>
					<Button
						onClick={() =>
							this.props.removeOneFromCart(this.props.sku)
						}
					>
						-
					</Button>
					<p>{this.props.qty}</p>
					{this.props.qty <= productInStock.qty + 1 && (
						<Button
							onClick={() => this.props.addToCart(this.props.sku)}
						>
							+
						</Button>
					)}
					=
				</Col>
				<Col xs={3}>
					Items total price: {this.props.price * this.props.qty}
				</Col>
			</Row>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		addToCart: (itemSku) => dispatch(addToCart(itemSku)),
		removeOneFromCart: (itemSku) => dispatch(removeOne(itemSku)),
	};
}

function mapStateToProps(state) {
	return {
		products: state.products,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);

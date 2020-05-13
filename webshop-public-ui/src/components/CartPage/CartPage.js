import React, { Component } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import CartItem from '../CartItem/CartItem';
import { emptyCart } from '../../actions/Actions';
import { Redirect, Link } from 'react-router-dom';

class CartPage extends Component {
	render() {
		const totalPrice =
			this.props.cart.length > 0
				? this.props.cart.reduce(
						(total, item) => (total += item.price * item.qty),
						0
				  )
				: 0;
		return (
			<Container>
				<h1>Your cart</h1>
				<Row>
					{this.props.cart.map((item, idx) => (
						<CartItem key={`item_${idx}`} {...item} />
					))}
				</Row>
				<Row>
					<p>
						<strong>Total price: {totalPrice}</strong>
					</p>
				</Row>
				<Row>
					<Button
						variant={'danger'}
						onClick={() => this.props.emptyOutCart()}
					>
						Empty cart
					</Button>
					<Link to="/checkout" className="btn btn-primary">
						Checkout
					</Link>
				</Row>
				{this.props.cart.length <= 0 && <Redirect to="/" />}
			</Container>
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
		emptyOutCart: () => dispatch(emptyCart()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);

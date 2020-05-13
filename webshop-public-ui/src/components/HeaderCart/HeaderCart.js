import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import classes from './HeaderCart.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class HeaderCart extends Component {
	render() {
		return (
			<Container
				className={`d-flex flex-row justify-content-center align-items-center ${classes.Cart}`}
			>
				<Row className="d-flex flex-row justify-content-center align-items-center">
					{!this.props.cart.length ? (
						<p>Your cart is empty</p>
					) : (
						<p>
							Total:{' '}
							{this.props.cart.reduce(
								(total, item) => total + item.price * item.qty,
								0
							)}
						</p>
					)}
					<Link to="/cart">
						<img
							src="/assets/images/cart.png"
							alt="cart"
							className={classes['Cart-img']}
						/>
					</Link>
				</Row>
				<div className={classes['Cart-popup']}>
					<ul>
						{this.props.cart.map((item, idx) => (
							<li key={`cartItem_${idx}`}>
								{item.qty} x {item.name} ={' '}
								{item.qty * item.price}
							</li>
						))}
					</ul>
					<p>
						{`Total: ${this.props.cart.reduce(
							(total, item) => total + item.price * item.qty,
							0
						)}`}
					</p>
				</div>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		cart: state.cart,
	};
}

export default connect(mapStateToProps)(HeaderCart);

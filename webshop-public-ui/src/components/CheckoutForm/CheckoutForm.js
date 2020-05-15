import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class CheckoutForm extends Component {
	state = {
		name: '',
		email: '',
		address: '',
		cartError: '',
		submitted: false,
	};

	handleChange = (evt) => {
		this.setState({
			...this.state,
			[evt.target.name]: evt.target.value,
		});
	};

	handleSubmit = async (evt) => {
		evt.preventDefault();

		if (this.props.cartItemsAndSkus.length <= 0) {
			this.setState({
				...this.state,
				cartError: 'Your cart is empty!',
			});
			return;
		}

		const resp = await fetch('http://localhost:5000/orders', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				orderDetails: this.props.cartItemsAndSkus,
				name: this.state.name,
				email: this.state.email,
				address: this.state.address,
			}),
		});

		if (resp.ok) {
			console.log(resp);
		}
	};

	render() {
		return (
			<>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId="formName">
						<Form.Label>Your name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter your name"
							required
							onChange={this.handleChange}
							value={this.state.name}
							name="name"
						/>
					</Form.Group>
					<Form.Group controlId="formEmail">
						<Form.Label>Your email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter your email"
							required
							onChange={this.handleChange}
							value={this.state.email}
							name="email"
						/>
					</Form.Group>
					<Form.Group controlId="formAddress">
						<Form.Label>Your address</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter your address"
							required
							onChange={this.handleChange}
							value={this.state.address}
							name="address"
						/>
					</Form.Group>
					<span>{this.state.cartError}</span>
					<Button variant="primary" type="submit">
						Order
					</Button>
				</Form>
				{this.state.submitted && <Redirect to="/" />}
			</>
		);
	}
}

function mapStateToProps(state) {
	return {
		cartItemsAndSkus: state.cart.map((item) => ({
			sku: item.sku,
			qty: item.qty,
		})),
	};
}

export default connect(mapStateToProps)(CheckoutForm);

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CartItemList from '../../actions/CartItemList/CartItemList';
import CheckoutForm from '../../actions/CheckoutForm/CheckoutForm';

export default function CheckoutPage(props) {
	return (
		<Container className="mt-5">
			<Row>
				<Col xs={6}>
					<CartItemList />
				</Col>
				<Col xs={6}>
					<CheckoutForm />
				</Col>
			</Row>
		</Container>
	);
}

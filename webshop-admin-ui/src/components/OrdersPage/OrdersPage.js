import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

class OrdersPage extends Component {
	state = {
		orders: [],
	};

	async componentDidMount() {
		const dataStream = await fetch('http://localhost:5000/orders');

		if (dataStream.ok) {
			const newOrders = await dataStream.json();

			this.setState({
				...this.state,
				orders: newOrders,
			});
		}
	}

	render() {
		return (
			<Container className="text-center p-3">
				<h1 className="pb-3">Orders</h1>

				{!this.state.orders.length ? (
					<Container className="d-flex flex-column justify-content-center align-items-center">
						<p>No orders received</p>
					</Container>
				) : (
					<Table bordered hover size="sm" className="text-center">
						<thead className="thead-light">
							<tr>
								<th>Order ID</th>
								<th>Customer Name</th>
								<th>Customer Email</th>
								<th>Customer Address</th>
								<th>Ordered Items SKUs</th>
							</tr>
						</thead>
						<tbody>
							{this.state.orders.map((order, idx) => {
								return (
									<tr
										key={`row_${idx}`}
										className="text-center"
									>
										<td>{order.orderId}</td>
										<td>{order.name}</td>
										<td>{order.email}</td>
										<td>{order.address}</td>
										<td>{order.products}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				)}
			</Container>
		);
	}
}

export default OrdersPage;

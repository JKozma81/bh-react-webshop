import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

export default class Products extends Component {
	state = {
		products: [],
	};

	async componentDidMount() {
		const dataStream = await fetch('http://localhost:5000/products');
		const productsData = await dataStream.json();
		this.setState({ products: productsData });
	}

	render() {
		return (
			<Container className="text-center">
				<h1>Products</h1>

				{!this.state.products.length ? (
					<>
						<p>You have not added any products</p>
						<br />
						<p>
							Click <Link to="/products-upload">here</Link> add
							one
						</p>
					</>
				) : (
					<Table bordered hover size="sm" className="text-center">
						<thead>
							<tr>
								<th>Main Image</th>
								<th>SKU</th>
								<th>Name</th>
								<th>Price</th>
								<th>Operations</th>
							</tr>
						</thead>
						<tbody>
							{this.state.products.map((product, idx) => {
								return (
									<tr key={`cell_${idx}`}>
										<td key={`cell_${idx + 5}`}>
											<img
												src={product.picture}
												alt="something"
											/>
										</td>
										<td key={`cell_${idx + 1}`}>
											{product.sku}
										</td>
										<td key={`cell_${idx + 2}`}>
											{product.name}
										</td>
										<td key={`cell_${idx + 3}`}>
											{product.price}
										</td>
										<td key={`cell_${idx + 4}`}>
											<Link
												to={`/product/${product.sku}`}
												className="btn btn-primary"
											>
												Edit
											</Link>
										</td>
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

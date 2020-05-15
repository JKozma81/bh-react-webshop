import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';

class Products extends Component {
	render() {
		let products;

		if (this.props.products.length > 0 && this.props.images.length > 0) {
			products = this.props.products.map((product) => {
				return {
					...product,
					picture: this.props.images.find(
						(image) =>
							image.product_sku === product.sku &&
							image.is_primary === 1
					)
						? this.props.images.find(
								(image) =>
									image.product_sku === product.sku &&
									image.is_primary === 1
						  ).url
						: '',
				};
			});
		}

		return (
			<Container className="text-center p-3">
				<h1 className="pb-3">Products</h1>

				{!this.props.products.length ? (
					<Container className="d-flex flex-column justify-content-center align-items-center">
						<p>You have not added any products</p>
						<br />
						<p>
							Click <Link to="/products-upload">here</Link> add
							one
						</p>
					</Container>
				) : (
					<Table bordered hover size="sm" className="text-center">
						<thead className="thead-light">
							<tr>
								<th>Main Image</th>
								<th>SKU</th>
								<th>Name</th>
								<th>Price</th>
								<th>Stock</th>
								<th>Operations</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product, idx) => {
								return (
									<tr
										key={`cell_${idx}`}
										className={`${
											product.qty === 0
												? 'table-danger'
												: product.qty <=
												  product.warning_at
												? 'table-warning'
												: ''
										}`}
									>
										<td>
											{product.picture ? (
												<img
													src={product.picture}
													alt="something"
													style={{
														maxWidth: '150px',
													}}
												/>
											) : (
												<Container
													style={{ height: '170px' }}
													className="d-flex justify-content-center align-items-center"
												>
													<p className="error">
														No image uploaded!
													</p>
												</Container>
											)}
										</td>
										<td>{product.sku}</td>
										<td>{product.name}</td>
										<td>{`${product.price}$`}</td>
										{product.qty ? (
											<td>{product.qty}</td>
										) : (
											<td>Out of stock</td>
										)}
										<td>
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

function mapStateToProps(state) {
	return {
		products: state.products,
		images: state.images,
	};
}

export default connect(mapStateToProps)(Products);

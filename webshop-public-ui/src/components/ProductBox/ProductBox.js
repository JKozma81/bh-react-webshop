import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartControl from '../CartControl/CartControl';

export default class ProductBox extends Component {
	render() {
		return (
			<Card className="container product-card p-2">
				<Link to={`/products/${this.props.product.sku}`}>
					<Card.Img
						variant="top"
						src={this.props.product.picture.url}
						className="product-img"
					/>
				</Link>
				<Card.Body>
					<Card.Text>
						<Link to={`/products/${this.props.product.sku}`}>
							<span>{this.props.product.name}</span>
						</Link>
						<span>{this.props.product.sku}</span>
						<span>{this.props.product.price}</span>
					</Card.Text>
				</Card.Body>
				<Card.Footer>
					<CartControl product={this.props.product} />
				</Card.Footer>
			</Card>
		);
	}
}

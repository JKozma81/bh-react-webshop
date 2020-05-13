import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ProductInfo from '../ProductInfo/ProductInfo';
import ProductSpec from '../ProductSpec/ProductSpec';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import { connect } from 'react-redux';

class ProductDetail extends Component {
	state = {
		product: {},
	};
	async componentDidMount() {
		const productSKU = this.props.productId;
		this.setState((prevState) => ({
			...prevState,
			product: this.props.products.find(
				(item) => item.sku === productSKU
			),
		}));
	}

	render() {
		return (
			<Container className="prod-details-container mt-5">
				<Row>
					<Col md={6} className="height-300 border">
						{/* <ImageCarousel images={images} /> */}
					</Col>
					<Col md={6} className="p-3 height-300 border">
						<ProductInfo {...this.state.product} />
					</Col>
				</Row>
				<Row>
					<Col className="height-300 border p-3">
						<ProductSpec params={this.state.product.specs} />
					</Col>
				</Row>
				<Row>
					<Col className="height-300 border">Ajánlott termékek</Col>
				</Row>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		products: state.products,
	};
}

export default connect(mapStateToProps)(ProductDetail);

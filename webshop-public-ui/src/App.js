import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import Header from './components/Header/Header';
import Products from './components/Products/Products';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Footer from './components/Footer/Footer';

class App extends Component {
	render() {
		return (
			<Container fluid>
				<Router>
					<Row>
						<Header />
					</Row>
					<Row className="main-content">
						<Switch>
							<Route exact path="/">
								<Col xs={9}>
									<Container>Offerings</Container>
									<Products className="main-content" />
								</Col>
							</Route>
							<Route
								path="/products/:id"
								component={(routProps) => (
									<ProductDetail
										productId={routProps.match.params.id}
									/>
								)}
							></Route>
							{/* <Route path="/orders">Orders</Route> */}
						</Switch>
					</Row>
					<Row>
						<Footer />
					</Row>
				</Router>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return {
		products: state.products,
		cart: state.cart,
	};
}

export default connect(mapStateToProps)(App);

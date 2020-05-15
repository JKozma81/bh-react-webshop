import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Products from './components/Products/Products';
import UploadProductForm from './components/UploadProductForm/UploadProductForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getProductsAndImages } from './actions/Actions';
import ProductUpdate from './components/ProductUpdate/ProductUpdate';
import OrdersPage from './components/OrdersPage/OrdersPage';

class App extends Component {
	async componentDidMount() {
		const dataStream = await fetch('http://localhost:5000/products');
		const dataFromDb = await dataStream.json();
		const { imageData, productsData } = dataFromDb;
		this.props.getItems(productsData, imageData);
	}
	render() {
		return (
			<div className="App" style={{ position: 'relative' }}>
				<Router>
					<Header />
					<Container fluid>
						<Switch>
							<Route path="/products">
								<Products />
							</Route>
							<Route path="/upload-product">
								<UploadProductForm />
							</Route>
							<Route
								path="/product/:sku"
								component={(routProps) => (
									<ProductUpdate {...routProps} />
								)}
							/>
							<Route path="/orders">
								<OrdersPage />
							</Route>
							<Route path="/">
								<Dashboard />
							</Route>
						</Switch>
					</Container>
				</Router>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getItems: (productsData, imagesData) =>
			dispatch(getProductsAndImages(productsData, imagesData)),
	};
}

export default connect(null, mapDispatchToProps)(App);

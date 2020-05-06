import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Products from './components/Products/Products';
// import ProductUpload from './ProductUpload';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
// import ProductEdit from './ProductEdit';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<Header />
					<Container fluid>
						<Switch>
							<Route path="/products">
								<Products />
							</Route>
							<Route path="/products-upload">
								{/* <ProductUpload /> */}
							</Route>
							{/* <Route
								path="/product/:sku"
								component={(routProps) => (
									<ProductEdit {...routProps} />
								)}
							/> */}
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

export default App;

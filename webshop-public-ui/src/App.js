import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Row, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import Header from './components/Header/Header';
import Products from './components/Products/Products';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Footer from './components/Footer/Footer';
import CartPage from './components/CartPage/CartPage';
import CheckoutPage from './components/CheckoutPage/CheckoutPage';
import { getItemsFromServer } from './actions/Actions';
import PromoCarousel from './components/PromoCarousel/PromoCarousel';

class App extends Component {
  state = {
    backendError: '',
  };

  async componentDidMount() {
    const dataStream = await fetch('http://localhost:5000/products');
    if (!dataStream.ok) {
      this.setState({
        ...this.state,
        backendError: dataStream.statusText,
      });
      return;
    }

    if (dataStream.ok) {
      const productsAndImages = await dataStream.json();
      this.props.getItems(productsAndImages);
      console.log(productsAndImages);
    }
  }

  render() {
    return (
      <Container fluid>
        <Router>
          <Row>
            <Header />
          </Row>
          {this.state.backendError && <span>{this.state.backendError}</span>}
          <Row className="Main-content">
            <Switch>
              <Route exact path="/">
                <PromoCarousel />
                <Products />
              </Route>
              <Route exact path="/cart">
                <CartPage />
              </Route>
              <Route
                path="/products/:id"
                component={(routProps) => (
                  <ProductDetail productId={routProps.match.params.id} />
                )}
              ></Route>
              <Route path="/checkout">
                <CheckoutPage />
              </Route>
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

function mapDispatchToProps(dispatch) {
  return {
    getItems: (items) => dispatch(getItemsFromServer(items)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

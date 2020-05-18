import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CartItemList from '../CartItemList/CartItemList';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import classes from './CheckoutPage.module.css';

export default function CheckoutPage(props) {
  return (
    <Container className={`mt-5 ${classes['page-content']}`}>
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

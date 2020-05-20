import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import classes from './Header.module.css';
import Logo from '../Logo/Logo';
import HeaderCart from '../HeaderCart/HeaderCart';

export default class Header extends Component {
  render() {
    return (
      <Container
        fluid
        className={`d-flex flex-row justify-content-between align-items-center ${classes['main-header']}`}
      >
        <Logo />
        <h1>BH React Webshop</h1>
        <HeaderCart />
      </Container>
    );
  }
}

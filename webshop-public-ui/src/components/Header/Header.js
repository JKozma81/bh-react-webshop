import React, { Component } from 'react';
import { Navbar, Container, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import Logo from '../Logo/Logo';
import HeaderCart from '../HeaderCart/HeaderCart';

export default class Header extends Component {
  render() {
    return (
      <Container
        fluid
        className={`d-flex flex-row justify-content-between align-items-center ${classes['Main-header']}`}
      >
        <Logo />
        <h1>BH React Webshop</h1>
        <HeaderCart />
      </Container>
    );
  }
}

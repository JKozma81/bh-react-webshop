import React from 'react';
import { Container, Image } from 'react-bootstrap';
import classes from './Logo.module.css';

export default function Logo(props) {
  return (
    <Container className={classes['Main-logo']}>
      <img src="/assets/images/logo.png" alt="logo" className="w-100" />
    </Container>
  );
}

import React from 'react';
import { Container } from 'react-bootstrap';
import classes from './Logo.module.css';
import { Link } from 'react-router-dom';

export default function Logo(props) {
  return (
    <Container className={classes['Main-logo']}>
      <Link to="/">
        <img src="/assets/images/logo.png" alt="logo" className="w-100" />
      </Link>
    </Container>
  );
}

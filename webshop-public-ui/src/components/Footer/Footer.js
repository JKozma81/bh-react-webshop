import React from 'react';
import { Container } from 'react-bootstrap';
import classes from './Footer.module.css';

export default function footer() {
  return (
    <Container
      fluid
      className={`${classes['main-footer']} d-flex flex-row justify-content-center align-items-center`}
    >
      <p>&copy; 2020.05. Created by Janos Kozma</p>
    </Container>
  );
}

import React from 'react';
import classes from './Custom404.module.css';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Custom404(props) {
  return (
    <Container
      className={`${classes['error-page']} d-flex flex-column justify-content-between align-items-center mt-5`}
      style={{ backgroundImage: 'url(/assets/images/404.png)' }}
    >
      <h1>Oops, something went wrong!</h1>
      <Link to="/" className="btn btn-primary">
        Back to home
      </Link>
    </Container>
  );
}

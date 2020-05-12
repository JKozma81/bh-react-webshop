import React from 'react';
import { Button } from 'react-bootstrap';

export default function productInfo(props) {
  return (
    <>
      <p className="d-flex flex-row justify-content-between">
        <span>Termék neve: {props.name}</span>{' '}
        <span>
          {props.qty ? (
            <Button variant="primary">Kosárba</Button>
          ) : (
            <b style={{ color: 'red' }}>Elfogyott</b>
          )}
        </span>
      </p>
      <p>Termék ára: €{props.price}</p>
      <p>Leírás: {props.shortSpec}</p>
    </>
  );
}

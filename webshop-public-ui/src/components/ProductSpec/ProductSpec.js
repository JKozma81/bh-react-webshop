import React from 'react';
import { Container, Table } from 'react-bootstrap';

export default function productSpec(props) {
  return (
    <Container>
      <Table striped bordered hover size="sm">
        <thead className="text-center">
          <tr>
            {Object.keys(JSON.parse(props.params)).map((key, idx) => (
              <th key={`th_${idx}`}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(JSON.parse(props.params)).map((key, idx) => (
              <td key={`td_${idx}`}>{JSON.parse(props.params)[key]}</td>
            ))}
          </tr>
        </tbody>
      </Table>
      <p>
        Gyártó oldala:{' '}
        <a href={props.url} target="_blank" rel="noopener noreferrer">
          link
        </a>
      </p>
    </Container>
  );
}

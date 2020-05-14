import React from 'react';
import { Container, Table } from 'react-bootstrap';

export default function productSpec(props) {
  let parameters;
  const paramsTableHeads = [];
  const paramsTableRow = [];
  //  = props.params ? props.params.split(',') : ' ';

  if (props.params) {
    parameters = props.params.split(',');
    parameters = parameters.map((param) => param.split('='));

    parameters.forEach((parameter) => {
      paramsTableHeads.push(parameter[0]);
      paramsTableRow.push(parameter[1]);
    });
  }

  return (
    <Container style={{ minHeight: '250px' }} className="p-3">
      <Table striped bordered hover size="sm">
        <thead className="text-center">
          <tr>
            {paramsTableHeads.map((heading, idx) => (
              <th key={`th_${idx}`}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {paramsTableRow.map((parameter, idx) => (
              <td key={`td_${idx}`} className="text-center">
                {parameter}
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

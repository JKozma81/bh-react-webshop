import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

class ProductSpec extends Component {
  render() {
    let parameters;
    const paramsTableHeads = [];
    const paramsTableRow = [];

    if (this.props.params) {
      parameters = this.props.params.split(',');
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
}

function mapStateToProps(state, ownProps) {
  const productSku = ownProps.productSKU;

  const product = state.products.find((prod) => prod.sku === productSku);

  return {
    params: product ? product.specs : '',
  };
}

export default connect(mapStateToProps)(ProductSpec);

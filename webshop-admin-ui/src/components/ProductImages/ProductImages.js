import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default class ProductImages extends Component {
  state = {
    sku: this.props.sku,
    pictures: [],
  };

  async componentDidMount() {
    // const dataStream = await fetch(
    //   `http://localhost:5000/products/${this.state.sku}/pictures`
    // );
    // const pictures = await dataStream.json();
    // this.setState({ pictures });
  }

  handleSetPrimary = async (id) => {
    const result = await fetch(`http://localhost:5000/files/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sku: this.state.sku }),
    });

    if (result.ok) {
      const newPictures = this.state.pictures.map((picture) => {
        if (picture.id === id) {
          picture.is_primary = 1;
          return picture;
        }
        picture.is_primary = 0;
        return picture;
      });
      this.setState({ pictures: newPictures });
    }
  };

  handleDelete = async (id) => {
    const result = await fetch(`http://localhost:5000/files/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileId: id }),
    });

    if (result.ok) {
      const newPictures = this.state.pictures.filter(
        (picture) => picture.id !== id
      );
      this.setState({ pictures: newPictures });
    }
  };

  render() {
    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Path</th>
            <th>URL</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {this.state.pictures.map((picture, idx) => {
            return (
              <tr
                key={`row_${idx}`}
                className={picture.is_primary ? 'bg-info' : ''}
              >
                <td>{<img src={picture.url} alt="product" />}</td>
                <td>
                  {picture.url
                    .split('/')
                    .slice(0, picture.url.split('/').length - 1)
                    .join('/')}
                </td>
                <td>
                  {
                    <>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={picture.url}
                      >
                        {picture.url}
                      </a>
                    </>
                  }
                </td>
                <td>
                  {
                    <>
                      <Button onClick={() => this.handleSetPrimary(picture.id)}>
                        Primary
                      </Button>{' '}
                      <Button
                        onClick={() => this.handleDelete(picture.id)}
                        variant="danger"
                      >
                        Delete &#10006;
                      </Button>
                    </>
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';

function DeleteModal(props) {
	return (
		<Container className="confirm-modal">
			<Container
				className="w-50 d-flex flex-column justify-content-center align-items-center"
				style={{ minHeight: '300px', backgroundColor: 'white' }}
			>
				<Row className="d-flex justify-content-center">
					<h2>Are You sure, You want to delete this product?</h2>
				</Row>
				<Row className="d-flex flex-row justify-content-around w-100 mt-5">
					<Button className="w-25" onClick={props.hideModal}>
						No
					</Button>
					<Button className="btn-danger w-25">Yes</Button>
				</Row>
			</Container>
		</Container>
	);
}

export default DeleteModal;

import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
	modifyPrimaryPicture,
	getImages,
	addImages,
	removeImagesForProduct,
} from '../../actions/Actions';

class ProductImages extends Component {
	handleSetPrimary = async (id) => {
		const result = await fetch(`http://localhost:5000/files/${id}`, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id }),
		});

		if (result.ok) {
			const pictureResult = await result.json();

			this.props.modifyPrimary(pictureResult);
			this.props.getImages(pictureResult.product_sku);
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
			const remainingImages = await result.json();

			if (
				remainingImages.length === 1 &&
				!remainingImages[0].hasOwnProperty('id')
			) {
				this.props.removeImages(remainingImages[0].product_sku);
				this.props.getImages(remainingImages[0].product_sku);
				return;
			}

			this.props.addImages(remainingImages);
			this.props.getImages(remainingImages[0].product_sku);
		}
	};

	render() {
		return (
			<Table bordered hover>
				<thead className="thead-light">
					<tr>
						<th>Image</th>
						<th>Path</th>
						<th>URL</th>
						<th>Operations</th>
					</tr>
				</thead>
				<tbody>
					{this.props.images.length ? (
						this.props.images.map((picture, idx) => {
							return (
								<tr
									key={`row_${idx}`}
									className={
										picture.is_primary ? 'bg-info' : ''
									}
								>
									<td>
										{
											<img
												src={picture.url}
												alt="product"
												style={{ maxWidth: '150px' }}
											/>
										}
									</td>
									<td>
										{picture.url
											.split('/')
											.slice(
												0,
												picture.url.split('/').length -
													1
											)
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
												<Button
													onClick={() =>
														this.handleSetPrimary(
															picture.id
														)
													}
												>
													Primary
												</Button>{' '}
												<Button
													onClick={() =>
														this.handleDelete(
															picture.id
														)
													}
													variant="danger"
												>
													Delete &#10006;
												</Button>
											</>
										}
									</td>
								</tr>
							);
						})
					) : (
						<tr>
							<td colSpan="4">
								<p className="error text-center">
									No images uploaded!
								</p>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		);
	}
}

function mapStateToProps(state) {
	return {
		images: state.imagesForSingleProduct,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		modifyPrimary: (picture) => dispatch(modifyPrimaryPicture(picture)),
		getImages: (sku) => dispatch(getImages(sku)),
		addImages: (images) => dispatch(addImages(images)),
		removeImages: (sku) => dispatch(removeImagesForProduct(sku)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductImages);

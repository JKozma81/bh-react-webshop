import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay';

export default class UploadProductForm extends Component {
	constructor(props) {
		super(props);
		this.fileInput = React.createRef();
		this.state = {
			errors: [],
			missingFields: [],
		};
	}

	uploadData = async () => {
		const formData = new FormData();
		for (let i = 0; i < this.fileInput.current.files.length; i++) {
			formData.append('images', this.fileInput.current.files[i]);
		}
		formData.append('sku', document.querySelector('.sku').value);
		formData.append('name', document.querySelector('.name').value);
		formData.append('price', document.querySelector('.price').value);
		formData.append('desc', document.querySelector('.desc').value);
		formData.append('spec', document.querySelector('.specs').value);
		const result = await fetch('http://localhost:5000/product', {
			method: 'POST',
			mode: 'cors',
			body: formData,
		});

		if (result.ok) {
			const results = await result.json();
			document.querySelector('.sku').value = '';
			document.querySelector('.name').value = '';
			document.querySelector('.price').value = '';
			document.querySelector('.desc').value = '';
			document.querySelector('.specs').value = '';
			this.fileInput.current.files = [];
			console.log('data', results);
		}
	};

	validate = (e) => {
		let validate = true;
		e.preventDefault();
		const specs = document.querySelector('.specs');
		const specText = specs.value;

		if (specs.value && !specText.includes('=')) {
			this.setState(() => ({
				...this.state,
				errors: [
					...this.state.errors,
					{
						type: 'validation',
						message: 'Product specs must include a "=" character!',
					},
				],
			}));
			validate = false;
		}

		if (validate) {
			this.uploadData();
		}
	};

	// fillData(params) {
	// 	const sku = document.querySelector('.sku');
	// 	const price = document.querySelector('.price');
	// 	const desc = document.querySelector('.desc');
	// 	const name = document.querySelector('.name');
	// 	const specs = document.querySelector('.specs');
	// 	sku.value = params[0];
	// 	price.value = params[1];
	// 	desc.textContent = params[2];
	// 	if (params[3].includes('name=')) {
	// 		name.value = params[3].split('=')[1];
	// 		specs.textContent = params[4];
	// 	} else specs.textContent = params[3];
	// }

	componentDidMount() {
		// const serverErr = document.getElementById('serverErr');
		// if (window.location.search) {
		// 	const data = window.location.search.split('&');
		// 	const params = data.slice(1);
		// 	if (data[0] === '?error=noNameAndSpec') {
		// 		serverErr.classList.remove('d-none');
		// 		serverErr.textContent = 'Name and spec is missing';
		// 		this.fillData(params);
		// 	}
		// 	if (data[0] === '?error=noName') {
		// 		serverErr.classList.remove('d-none');
		// 		serverErr.textContent = 'Name is missing';
		// 		this.fillData(params);
		// 	}
		// 	if (data[0] === '?error=noSpec') {
		// 		serverErr.classList.remove('d-none');
		// 		serverErr.textContent = 'Spec is missing';
		// 		this.fillData(params);
		// 	}
		// 	if (data[0] === '?error=priceNum') {
		// 		serverErr.classList.remove('d-none');
		// 		serverErr.textContent = 'Price must be a number';
		// 		this.fillData(params);
		// 	}
		// 	if (data[0] === '?error=skuGen') {
		// 		serverErr.classList.remove('d-none');
		// 		serverErr.textContent = 'SKU already exists';
		// 		this.fillData(params);
		// 	}
		// 	if (data[0] === '?error=minFiles') {
		// 		serverErr.classList.remove('d-none');
		// 		serverErr.textContent = 'Minimum one picture is a must';
		// 		this.fillData(params);
		// 	}
		// 	if (data[0] === '?error=fileError') {
		// 		serverErr.classList.remove('d-none');
		// 		serverErr.textContent = 'File upload error';
		// 		this.fillData(params);
		// 	}
		// 	if (data[0] === '?error=longDesc') {
		// 		serverErr.classList.remove('d-none');
		// 		serverErr.textContent =
		// 			'Description cannot be longer than 240 characters';
		// 		this.fillData(params);
		// 	}
		// 	if (data[0] === '?error=longSku') {
		// 		serverErr.classList.remove('d-none');
		// 		serverErr.textContent =
		// 			'SKU cannot be longer than 12 characters';
		// 		this.fillData(params);
		// 	}
		// 	if (data[0] === '?error=spaceInSpec') {
		// 		serverErr.classList.remove('d-none');
		// 		serverErr.textContent =
		// 			'Specification cannot inclue space character';
		// 		this.fillData(params);
		// 	}
		// }
	}

	handleSKUInput = (e) => {
		const regex = new RegExp('^[a-zA-Z0-9]*$');
		const key = String.fromCharCode(e.charCode);
		if (!regex.test(key)) {
			e.preventDefault();
		}
	};

	handleSpecsInput = (e) => {
		const key = String.fromCharCode(e.charCode);
		if (key === ' ') {
			e.preventDefault();
		}
	};

	render() {
		return (
			<Container className="p-3">
				<Form
					className="Upload-form"
					onSubmit={this.validate}
					method="POST"
					action="http://localhost:5000/product"
					encType="multipart/form-data"
				>
					<Form.Group>
						<Form.Label>SKU</Form.Label>
						<Form.Control
							className="sku"
							type="text"
							name="sku"
							onKeyPress={this.handleSKUInput}
							maxLength="12"
							defaultValue={
								this.props.productData.sku
									? this.props.productData.sku
									: ''
							}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Product name:</Form.Label>
						<Form.Control
							className="name"
							type="text"
							name="name"
							defaultValue={
								this.props.productData.name
									? this.props.productData.name
									: ''
							}
							required
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Product price:</Form.Label>
						<Form.Control
							className="price"
							type="number"
							name="price"
							defaultValue={
								this.props.productData.price
									? this.props.productData.price
									: ''
							}
							required
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Product description:</Form.Label>
						<Form.Control
							className="desc"
							as="textarea"
							name="desc"
							maxLength="240"
							defaultValue={
								this.props.productData.desc
									? this.props.productData.desc
									: ''
							}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Product specifications:</Form.Label>{' '}
						<span id="specsErr" className="d-none error"></span>
						<Form.Control
							className="specs"
							as="textarea"
							name="spec"
							required
							onKeyPress={this.handleSpecsInput}
							defaultValue={
								this.props.productData.specs
									? this.props.productData.specs
									: ''
							}
						/>
					</Form.Group>
					<Form.Group>
						<Form.File
							id="custom-file"
							label="Images"
							multiple
							custom
							name="images"
							ref={this.fileInput}
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
				<ErrorDisplay
					errors={this.state.errors}
					missingFields={this.state.missingFields}
				/>
			</Container>
		);
	}
}

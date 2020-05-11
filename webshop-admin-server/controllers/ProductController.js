const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

class ProductController {
	static addProduct(options) {
		const productService = options.productService;
		const skuService = options.skuService;
		const imageService = options.imageService;

		return async (req, res) => {
			try {
				const form = formidable({ multiples: true });

				form.parse(req, async (err, fields, files) => {
					let newSku = '';
					const newProduct = {};
					const images = [];
					const missingFields = [];
					if (err) {
						console.error(err);
						throw {
							errors: [
								{
									message: `Form data parse error: ${err.toString()}`,
								},
							],
							productData: {
								...fields,
							},
						};
					}
					const { sku, name, price, desc, spec } = fields;

					if (!name) missingFields.push('Name');
					if (isNaN(Number(price))) missingFields.push('Price');
					if (!spec) missingFields.push('Specs');
					if (missingFields.length)
						throw { missingFields, productData: { ...fields } };

					if (desc.length >= 240) {
						throw {
							errors: [
								{
									type: 'validation',
									message:
										'Description must be below 240 character long!',
								},
							],
							productData: { ...fields },
						};
					}

					newProduct.price = price;

					if (spec.includes(' ')) {
						throw {
							errors: [
								{
									type: 'validation',
									message: 'Spaces not allowed in specs!',
								},
							],
							productData: { ...fields },
						};
					}

					newProduct.name = name;
					newProduct.desc = desc;
					newProduct.specs = spec;
					if (!sku || sku === 'undefined') {
						newSku = skuService.generateSKU(name.toUpperCase());
						if (skuService.checkSKUExists(newSku)) {
							throw {
								errors: [
									{
										message: 'SKU allready exists!',
									},
								],
								productData: { ...fields },
							};
						}
						newProduct.sku = newSku;
					} else {
						if (skuService.checkSKUExists(sku)) {
							throw {
								errors: [
									{
										message: 'SKU allready exists!',
									},
								],
								productData: { ...fields },
							};
						}
						newProduct.sku = sku.toUpperCase();
					}

					if (sku.length > 12) {
						throw {
							errors: [
								{
									type: 'validation',
									message:
										'SKU must be below 12 character long!',
								},
							],
							productData: { ...fields },
						};
					}

					try {
						let imageSrc = 'http://localhost:5000/img/';
						if (!sku || sku === 'undefined') {
							fs.mkdirSync(
								`./static/img/${newSku.toUpperCase()}`
							);
							imageSrc += newSku;
						} else {
							fs.mkdirSync(`./static/img/${sku.toUpperCase()}`);
							imageSrc += sku.toUpperCase();
						}

						if (files.images instanceof Array) {
							files.images.forEach((f) => {
								images.push(imageSrc + '/' + f.name);
								if (!sku || sku === 'undefined') {
									fs.copyFileSync(
										f.path,
										`./static/img/${newSku}/${f.name}`,
										(err) => {
											throw {
												errors: [
													{
														message: `File upload error: ${err.toString()}`,
													},
												],
												productData: { ...fields },
											};
										}
									);
									return;
								}

								fs.copyFileSync(
									f.path,
									`./static/img/${sku}/${f.name}`,
									(err) => {
										throw {
											errors: [
												{
													message: `File upload error: ${err.toString()}`,
												},
											],
											productData: { ...fields },
										};
									}
								);
							});

							const productResult = await productService.addProductToDB(
								newProduct
							);

							const imageResults = await imageService.addImagesToDb(
								{
									sku: productResult.sku,
									images,
								}
							);

							res.json({
								product: { ...productResult },
								images: imageResults,
							});
							return;
						} else {
							if (files.images) {
								if (!sku || sku === 'undefined') {
									fs.copyFileSync(
										files.images.path,
										`./static/img/${newSku}/${files.images.name}`,
										(err) => {
											throw {
												errors: [
													{
														message: `File upload error: ${err.toString()}`,
													},
												],
												productData: { ...fields },
											};
										}
									);
								} else {
									fs.copyFileSync(
										files.images.path,
										`./static/img/${sku}/${files.images.name}`,
										(err) => {
											throw {
												errors: [
													{
														message: `File upload error: ${err.toString()}`,
													},
												],
												productData: { ...fields },
											};
										}
									);
								}
								images.push(imageSrc + '/' + files.images.name);

								const productResult = await productService.addProductToDB(
									newProduct
								);

								const imageResults = await imageService.addImagesToDb(
									{
										sku: productResult.sku,
										images,
									}
								);

								res.json({
									product: { ...productResult },
									images: imageResults,
								});
								return;
							}

							const productResult = await productService.addProductToDB(
								newProduct
							);

							res.json({
								product: { ...productResult },
								images: [],
							});
						}
					} catch (e) {
						console.error('File operation error:', e.message);
						res.json(e);
					}
				});
			} catch (err) {
				console.error('Application error:', err.message);
				res.json(err);
			}
		};
	}

	static getProductsAndImages(options) {
		const productService = options.productService;
		const imageService = options.imageService;

		return async (req, res) => {
			try {
				const productsData = await productService.getAllProducts();
				const imageData = await imageService.getAllImages();

				res.json({ productsData, imageData });
			} catch (err) {
				console.error(err.message);
				res.json(err);
			}
		};
	}

	static getProductBySKU(options) {
		const productService = options.productService;
		const imageService = options.imageService;
		const skuService = options.skuService;

		return async (req, res) => {
			try {
				const prodSku = req.params.sku;

				const skuExists = skuService.checkSKUExists(prodSku);

				if (!skuExists) {
					res.json({
						error: {
							type: 'nosku',
							message: 'Sku does not exists!',
						},
					});
					return;
				}

				const productData = await productService.getProductBySku(
					prodSku
				);
				const imageData = await imageService.getImagesBySKU(prodSku);
				res.json({ productData, imageData });
			} catch (err) {
				console.error(err.message);
				res.json(err);
			}
		};
	}

	static modifyProduct(options) {
		const productService = options.productService;

		return async (req, res) => {
			try {
				const modifiedData = req.body;
				const productSKU = req.params.sku;
				const result = await productService.modifyProductData({
					modifiedData,
					productSKU,
				});
				res.json(result);
			} catch (err) {
				console.log(err.message);
				res.json(err);
			}
		};
	}

	static uploadNewPictures(options) {
		const imageService = options.imageService;

		return async (req, res) => {
			try {
				const form = formidable({ multiples: true });

				await form.parse(req, async (err, fields, files) => {
					const images = [];
					if (err) {
						console.error(err);
						throw {
							errors: [
								{
									message: `Form data parse error: ${err.toString()}`,
								},
							],
						};
					}

					const { sku } = fields;

					try {
						let imageSrc = `http://localhost:5000/img/${sku}`;

						if (files.images instanceof Array) {
							files.images.forEach((f) => {
								images.push(imageSrc + '/' + f.name);
								fs.copyFileSync(
									f.path,
									`./static/img/${sku}/${f.name}`,
									(err) => {
										throw {
											errors: [
												{
													message: `File upload error: ${err.toString()}`,
												},
											],
										};
									}
								);
							});
							const result = await imageService.addImagesToDb({
								sku,
								images,
							});

							res.json(result);
						} else {
							fs.copyFileSync(
								files.images.path,
								`./static/img/${sku}/${files.images.name}`,
								(err) => {
									throw {
										errors: [
											{
												message: `File upload error: ${err.toString()}`,
											},
										],
									};
								}
							);

							images.push(imageSrc + '/' + files.images.name);
							const result = await imageService.addImagesToDb({
								sku,
								images,
							});

							res.json(result);
						}
					} catch (e) {
						console.error(e.message);
						res.json(e);
					}
				});
			} catch (err) {
				console.error(err.message);
				res.json(err);
			}
		};
	}

	static modifyPrimaryPicture(options) {
		const imageService = options.imageService;

		return async (req, res) => {
			try {
				const fileId = Number(req.params.id);
				const result = await imageService.modifyProductPrimaryPicture(
					fileId
				);
				res.json(result);
			} catch (err) {
				console.error(err.toString());
				res.json(err);
			}
		};
	}

	static deleteImageFromDB(options) {
		const imageService = options.imageService;

		return async (req, res) => {
			try {
				const fileInfo = await imageService.deleteImage(
					Number(req.params.id)
				);

				const fileName = await fileInfo.deleted.url.split('/');

				fs.unlinkSync(
					`${path.join(
						__dirname,
						'..',
						'static',
						'img',
						fileInfo.deleted.product_sku,
						fileName[fileName.length - 1]
					)}`
				);

				res.json(fileInfo.remaining);
			} catch (err) {
				console.error(err.toString());
				res.json(err);
			}
		};
	}

	static deleteProduct(options) {
		const imageService = options.imageService;
		const productService = options.productService;

		return async (req, res) => {
			try {
				const deleteSku = req.params.sku;

				const remainingProducts = await productService.deleteProduct(
					deleteSku
				);
				const remainingImages = await imageService.deleteAllImages(
					deleteSku
				);

				const filesToRemove = fs.readdirSync(
					`${path.join(__dirname, '..', 'static', 'img', deleteSku)}`
				);

				filesToRemove.forEach((fileName) => {
					fs.unlinkSync(
						`${path.join(
							__dirname,
							'..',
							'static',
							'img',
							deleteSku,
							fileName
						)}`
					);
				});

				fs.rmdirSync(
					`${path.join(__dirname, '..', 'static', 'img', deleteSku)}`
				);

				res.json({
					productsData: remainingProducts,
					imagesData: remainingImages,
				});
			} catch (err) {
				console.error(err.toString());
				res.json(err);
			}
		};
	}
}

module.exports = ProductController;

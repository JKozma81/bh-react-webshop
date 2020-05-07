const Product = require('../domains/Product');

class ProductRepository {
	constructor(database) {
		this.dataBase = database;
	}

	addProduct(productData) {
		return new Promise((resolve, reject) => {
			try {
				this.dataBase.serialize(() => {
					this.dataBase.run(
						'INSERT INTO products(sku, name, price, desc, specs) VALUES(?, ?, ?, ?, ?)',
						[
							productData.sku,
							productData.name,
							Number(productData.price),
							productData.desc,
							productData.specs,
						],
						(err) => {
							if (err !== null) reject(err);
						}
					);

					// for (const [i, picture] of productData.images.entries()) {
					// 	if (i === 0) {
					// 		this.dataBase.run(
					// 			'INSERT INTO images(url, product_sku, is_primary) VALUES(?, ?, ?)',
					// 			[picture, productData.sku, 1],
					// 			(err) => {
					// 				if (err !== null) reject(err);
					// 			}
					// 		);
					// 	} else {
					// 		this.dataBase.run(
					// 			'INSERT INTO images(url, product_sku, is_primary) VALUES(?, ?, ?)',
					// 			[picture, productData.sku, 0],
					// 			(err) => {
					// 				if (err !== null) reject(err);
					// 			}
					// 		);
					// 	}
					// }

					this.dataBase.get(
						'SELECT sku, name, price, desc, specs FROM products WHERE sku = ?',
						productData.sku,
						(err, result) => {
							if (err !== null) reject(err);
							const newProduct = new Product(
								result.sku,
								result.name,
								result.price,
								result.desc,
								result.specs
							);
							resolve(newProduct);
						}
					);
				});
			} catch (err) {
				console.error(err);
				reject(err);
			}
		});
	}

	// getAllProducts() {
	// 	return new Promise((resolve, reject) => {
	// 		try {
	// 			this.dataBase.serialize(() => {
	// 				this.dataBase.all(
	// 					'SELECT sku, name, price, desc, specs FROM products',
	// 					(err, results) => {
	// 						if (err !== null) reject(err);
	// 						this.dataBase.all(
	// 							'SELECT id, url, product_sku, is_primary FROM images',
	// 							(err, picResuts) => {
	// 								if (err !== null) reject(err);
	// 								const resultProductData = [];
	// 								for (const result of results) {
	// 									const tempProduct = new Product(
	// 										result.sku,
	// 										result.name,
	// 										result.price,
	// 										result.desc,
	// 										result.specs
	// 									);
	// 									tempProduct.images = picResuts.filter(
	// 										(picture) =>
	// 											picture.product_sku ===
	// 											tempProduct.sku
	// 									);
	// 									resultProductData.push(tempProduct);
	// 								}
	// 								resolve(resultProductData);
	// 							}
	// 						);
	// 					}
	// 				);
	// 			});
	// 		} catch (err) {
	// 			console.error(err);
	// 			reject(err);
	// 		}
	// 	});
	// }

	// getProduct(sku) {
	// 	return new Promise((resolve, reject) => {
	// 		try {
	// 			this.dataBase.serialize(() => {
	// 				this.dataBase.get(
	// 					'SELECT sku, name, price, desc, specs FROM products WHERE sku = ?',
	// 					sku,
	// 					(err, result) => {
	// 						if (err !== null) reject(err);
	// 						this.dataBase.all(
	// 							'SELECT id, url, product_sku, is_primary FROM images WHERE product_sku = ?',
	// 							sku,
	// 							(err, picResuts) => {
	// 								if (err !== null) reject(err);
	// 								const tempProduct = new Product(
	// 									result.sku,
	// 									result.name,
	// 									result.price,
	// 									result.desc,
	// 									result.specs
	// 								);
	// 								tempProduct.images = [...picResuts];

	// 								resolve(tempProduct);
	// 							}
	// 						);
	// 					}
	// 				);
	// 			});
	// 		} catch (err) {
	// 			console.error(err);
	// 			reject(err);
	// 		}
	// 	});
	// }

	// getProductPictures(sku) {
	// 	return new Promise((resolve, reject) => {
	// 		try {
	// 			this.dataBase.serialize(() => {
	// 				this.dataBase.all(
	// 					'SELECT id, url, product_sku, is_primary FROM images WHERE product_sku = ?',
	// 					sku,
	// 					(err, picResuts) => {
	// 						if (err !== null) reject(err);
	// 						resolve(picResuts);
	// 					}
	// 				);
	// 			});
	// 		} catch (err) {
	// 			console.error(err);
	// 			reject(err);
	// 		}
	// 	});
	// }

	// modifyProduct(newData) {
	// 	return new Promise((resolve, reject) => {
	// 		try {
	// 			this.dataBase.serialize(() => {
	// 				this.dataBase.run(
	// 					'UPDATE products SET name = ?, price = ?, desc = ?, specs = ? WHERE sku = ?',
	// 					[
	// 						newData.name,
	// 						Number(newData.price),
	// 						newData.desc,
	// 						newData.specs,
	// 						newData.sku,
	// 					],
	// 					(err) => {
	// 						if (err !== null) reject(err);
	// 					}
	// 				);
	// 				this.dataBase.get(
	// 					'SELECT sku, name, price, desc, specs FROM products WHERE sku = ?',
	// 					newData.sku,
	// 					(err, result) => {
	// 						if (err !== null) reject(err);
	// 						this.dataBase.all(
	// 							'SELECT id, url, product_sku, is_primary FROM images WHERE product_sku = ?',
	// 							newData.sku,
	// 							(err, imageResults) => {
	// 								if (err !== null) reject(err);
	// 								const updatedProduct = new Product(
	// 									result.sku,
	// 									result.name,
	// 									result.price,
	// 									result.desc,
	// 									result.specs,
	// 									imageResults
	// 								);
	// 								resolve(updatedProduct);
	// 							}
	// 						);
	// 					}
	// 				);
	// 			});
	// 		} catch (err) {
	// 			console.error(err);
	// 			reject(err);
	// 		}
	// 	});
	// }

	// modifyPrimary(fileInfo) {
	// 	return new Promise((resolve, reject) => {
	// 		try {
	// 			this.dataBase.serialize(() => {
	// 				this.dataBase.run(
	// 					'UPDATE images SET is_primary = ? WHERE product_sku = ?',
	// 					[0, fileInfo.sku],
	// 					(err) => {
	// 						if (err !== null) reject(err);
	// 					}
	// 				);
	// 				this.dataBase.run(
	// 					'UPDATE images SET is_primary = ? WHERE id = ?',
	// 					[1, fileInfo.fileId],
	// 					(err) => {
	// 						if (err !== null) reject(err);
	// 					}
	// 				);
	// 				this.dataBase.all(
	// 					'SELECT id, url, product_sku, is_primary FROM images WHERE product_sku = ?',
	// 					fileInfo.sku,
	// 					(err, imageResults) => {
	// 						if (err !== null) reject(err);
	// 						resolve(imageResults);
	// 					}
	// 				);
	// 			});
	// 		} catch (err) {
	// 			console.error(err);
	// 			reject(err);
	// 		}
	// 	});
	// }

	// addImagesToProduct(imageData) {
	// 	return new Promise((resolve, reject) => {
	// 		try {
	// 			this.dataBase.serialize(() => {
	// 				for (const picture of imageData.images) {
	// 					this.dataBase.run(
	// 						'INSERT INTO images(url, product_sku, is_primary) VALUES(?, ?, ?)',
	// 						[picture, imageData.sku, 0],
	// 						(err) => {
	// 							if (err !== null) reject(err);
	// 						}
	// 					);
	// 				}
	// 				this.dataBase.all(
	// 					'SELECT id, url, product_sku, is_primary FROM images WHERE product_sku = ?',
	// 					imageData.sku,
	// 					(err, imageResults) => {
	// 						if (err !== null) reject(err);
	// 						resolve(imageResults);
	// 					}
	// 				);
	// 			});
	// 		} catch (err) {
	// 			console.error(err);
	// 			reject(err);
	// 		}
	// 	});
	// }

	// deleteImage(imageId) {
	// 	return new Promise((resolve, reject) => {
	// 		try {
	// 			this.dataBase.serialize(() => {
	// 				this.dataBase.get(
	// 					'SELECT id, url, is_primary, product_sku FROM images WHERE id = ?',
	// 					imageId,
	// 					(err, result) => {
	// 						(err) => {
	// 							if (err !== null) reject(err);
	// 						};
	// 						this.dataBase.run(
	// 							'DELETE FROM images WHERE id = ?',
	// 							imageId,
	// 							(err) => {
	// 								if (err !== null) reject(err);
	// 							}
	// 						);
	// 						resolve(result);
	// 					}
	// 				);
	// 			});
	// 		} catch (err) {
	// 			console.error(err);
	// 			reject(err);
	// 		}
	// 	});
	// }
}

module.exports = ProductRepository;

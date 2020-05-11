class ImageRepository {
	constructor(database) {
		this.dataBase = database;
	}

	addImages(ImagesWithSku) {
		return new Promise((resolve, reject) => {
			try {
				this.dataBase.serialize(() => {
					this.dataBase.get(
						'SELECT id FROM images WHERE product_sku = ? AND is_primary = 1',
						[ImagesWithSku.sku],
						(err, imageId) => {
							if (err !== null)
								reject({
									errors: [
										{
											type: 'application',
											message: `Application error at checking primary image: ${err.toString()}`,
										},
									],
								});

							for (const [
								i,
								picture,
							] of ImagesWithSku.images.entries()) {
								if (!imageId && i === 0) {
									this.dataBase.run(
										'INSERT INTO images(url, product_sku, is_primary) VALUES(?, ?, ?)',
										[picture, ImagesWithSku.sku, 1],
										(err) => {
											if (err !== null)
												reject({
													errors: [
														{
															type: 'application',
															message: `Application error at inserting images into the database: ${err.toString()}`,
														},
													],
												});
										}
									);
								} else {
									this.dataBase.run(
										'INSERT INTO images(url, product_sku, is_primary) VALUES(?, ?, ?)',
										[picture, ImagesWithSku.sku, 0],
										(err) => {
											if (err !== null)
												reject({
													errors: [
														{
															type: 'application',
															message: `Application error at inserting images into the database: ${err.toString()}`,
														},
													],
												});
										}
									);
								}
							}

							this.dataBase.all(
								'SELECT id, url, product_sku, is_primary FROM images WHERE product_sku = ?',
								ImagesWithSku.sku,
								(err, imageResults) => {
									if (err !== null)
										reject({
											errors: [
												{
													type: 'application',
													message: `Application error at getting images from database: ${err.toString()}`,
												},
											],
										});
									resolve(imageResults);
								}
							);
						}
					);
				});
			} catch (err) {
				console.error(err);
				reject({
					errors: [
						{
							type: 'application',
							message: `Application error at database operation: ${err.toString()}`,
						},
					],
				});
			}
		});
	}

	getAllImages() {
		return new Promise((resolve, reject) => {
			try {
				this.dataBase.serialize(() => {
					this.dataBase.all(
						'SELECT id, url, product_sku, is_primary FROM images',
						(err, imageResults) => {
							if (err !== null)
								reject({
									errors: [
										{
											type: 'application',
											message: `Application error at getting images from database: ${err.toString()}`,
										},
									],
								});
							resolve(imageResults);
						}
					);
				});
			} catch (err) {
				console.error(err);
				reject({
					errors: [
						{
							type: 'application',
							message: `Application error at database operation: ${err.toString()}`,
						},
					],
				});
			}
		});
	}

	getImagesBySKU(prodSku) {
		return new Promise((resolve, reject) => {
			try {
				this.dataBase.serialize(() => {
					this.dataBase.all(
						'SELECT id, url, product_sku, is_primary FROM images WHERE product_sku = ?',
						prodSku,
						(err, imageResult) => {
							if (err !== null)
								reject({
									errors: [
										{
											type: 'application',
											message: `Application error at getting images form product by SKU: ${err.toString()}`,
										},
									],
								});
							resolve(imageResult);
						}
					);
				});
			} catch (err) {
				console.error(err);
				reject({
					errors: [
						{
							type: 'application',
							message: `Application error at database operation: ${err.toString()}`,
						},
					],
				});
			}
		});
	}

	modifyProductPrimaryPicture(imageId) {
		return new Promise((resolve, reject) => {
			try {
				this.dataBase.serialize(() => {
					this.dataBase.get(
						'SELECT id, url, product_sku, is_primary FROM images WHERE id = ?',
						[imageId],
						(err, imageResult) => {
							if (err !== null)
								reject({
									errors: [
										{
											type: 'application',
											message: `Application error at getting images form product by ID: ${err.toString()}`,
										},
									],
								});

							this.dataBase.serialize(() => {
								this.dataBase.run(
									'UPDATE images SET is_primary = 0 WHERE product_sku = ?',
									[imageResult.product_sku],
									(err) => {
										if (err !== null)
											reject({
												errors: [
													{
														type: 'application',
														message: `Application error at setting image primary state to 0: ${err.toString()}`,
													},
												],
											});
									}
								);

								this.dataBase.run(
									'UPDATE images SET is_primary = 1 WHERE id = ?',
									[imageId],
									(err) => {
										if (err !== null)
											reject({
												errors: [
													{
														type: 'application',
														message: `Application error at setting image primary state to 1: ${err.toString()}`,
													},
												],
											});
									}
								);

								this.dataBase.get(
									'SELECT id, url, product_sku, is_primary FROM images WHERE id = ?',
									[imageId],
									(err, imageResult) => {
										if (err !== null)
											reject({
												errors: [
													{
														type: 'application',
														message: `Application error at getting images form product by ID: ${err.toString()}`,
													},
												],
											});
										resolve(imageResult);
									}
								);
							});
						}
					);
				});
			} catch (err) {
				console.error(err);
				reject({
					errors: [
						{
							type: 'application',
							message: `Application error at database operation: ${err.toString()}`,
						},
					],
				});
			}
		});
	}

	deleteImage(imageInfo) {
		return new Promise((resolve, reject) => {
			try {
				this.dataBase.serialize(() => {
					this.dataBase.get(
						'SELECT id, url, is_primary, product_sku FROM images WHERE id = ?',
						[imageInfo],
						(err, imageResult) => {
							if (err !== null)
								reject({
									errors: [
										{
											type: 'application',
											message: `Application error at getting info on deleting image : ${err.toString()}`,
										},
									],
								});

							this.dataBase.run(
								'DELETE FROM images WHERE id = ?',
								[imageInfo],
								(err) => {
									if (err !== null)
										reject({
											errors: [
												{
													type: 'application',
													message: `Application error at deleting image : ${err.toString()}`,
												},
											],
										});
								}
							);

							if (imageResult.is_primary === 1) {
								this.dataBase.all(
									'SELECT id, url, product_sku, is_primary FROM images WHERE product_sku = ?',
									[imageResult.product_sku],
									(err, images) => {
										if (err !== null)
											reject({
												errors: [
													{
														type: 'application',
														message: `Application error at getting images to set primary : ${err.toString()}`,
													},
												],
											});

										if (!images.length) {
											resolve({
												deleted: imageResult,
												remaining: [
													{
														product_sku:
															imageResult.product_sku,
													},
												],
											});
											return;
										}

										this.dataBase.run(
											'UPDATE images SET is_primary = 1 WHERE id = ?',
											[images[0].id],
											(err) => {
												if (err !== null)
													reject({
														errors: [
															{
																type:
																	'application',
																message: `Application error at setting primary image : ${err.toString()}`,
															},
														],
													});
											}
										);

										this.dataBase.all(
											'SELECT id, url, product_sku, is_primary FROM images WHERE product_sku = ?',
											[imageResult.product_sku],
											(err, results) => {
												if (err !== null)
													reject({
														errors: [
															{
																type:
																	'application',
																message: `Application error at getting modified images : ${err.toString()}`,
															},
														],
													});
												resolve({
													deleted: imageResult,
													remaining: results,
												});
											}
										);
									}
								);
								return;
							}

							this.dataBase.all(
								'SELECT id, url, product_sku, is_primary FROM images WHERE product_sku = ?',
								[imageResult.product_sku],
								(err, results) => {
									if (err !== null)
										reject({
											errors: [
												{
													type: 'application',
													message: `Application error at getting remaining images : ${err.toString()}`,
												},
											],
										});

									resolve({
										deleted: imageResult,
										remaining: results,
									});
								}
							);
						}
					);
				});
			} catch (err) {
				console.error(err);
				reject({
					errors: [
						{
							type: 'application',
							message: `Application error at database operation: ${err.toString()}`,
						},
					],
				});
			}
		});
	}
}

module.exports = ImageRepository;

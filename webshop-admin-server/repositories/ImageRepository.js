class ImageRepository {
	constructor(database) {
		this.dataBase = database;
	}

	addImages(ImagesWithSku) {
		return new Promise((resolve, reject) => {
			try {
				this.dataBase.serialize(() => {
					for (const [i, picture] of ImagesWithSku.images.entries()) {
						if (i === 0) {
							this.dataBase.run(
								'INSERT INTO images(url, product_sku, is_primary) VALUES(?, ?, ?)',
								[picture, ImagesWithSku.sku, 1],
								(err) => {
									if (err !== null) reject(err);
								}
							);
						} else {
							this.dataBase.run(
								'INSERT INTO images(url, product_sku, is_primary) VALUES(?, ?, ?)',
								[picture, ImagesWithSku.sku, 0],
								(err) => {
									if (err !== null) reject(err);
								}
							);
						}
					}

					this.dataBase.all(
						'SELECT id, url, product_sku, is_primary FROM images WHERE product_sku = ?',
						ImagesWithSku.sku,
						(err, imageResults) => {
							if (err !== null) reject(err);
							resolve(imageResults);
						}
					);
				});
			} catch (err) {
				console.error(err);
				reject(err);
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
							if (err !== null) reject(err);
							resolve(imageResults);
						}
					);
				});
			} catch (err) {
				console.error(err);
				reject(err);
			}
		});
	}
}

module.exports = ImageRepository;

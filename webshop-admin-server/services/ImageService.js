class ImageService {
	constructor(repository) {
		this.repository = repository;
	}

	async addImagesToDb(ImagesWithSku) {
		try {
			return await this.repository.addImages(ImagesWithSku);
		} catch (err) {
			console.error(err.message);
		}
	}

	async getAllImages() {
		try {
			return await this.repository.getAllImages();
		} catch (err) {
			console.error(err.message);
		}
	}

	async getImagesBySKU(prodSku) {
		try {
			return await this.repository.getImagesBySKU(prodSku);
		} catch (err) {
			console.error(err.message);
		}
	}

	async modifyProductPrimaryPicture(imageId) {
		try {
			return await this.repository.modifyProductPrimaryPicture(imageId);
		} catch (err) {
			console.error(err.message);
		}
	}

	async deleteImage(imageInfo) {
		try {
			return await this.repository.deleteImage(imageInfo);
		} catch (err) {
			console.error(err.message);
		}
	}

	async deleteAllImages(sku) {
		try {
			return await this.repository.deleteAllImages(sku);
		} catch (err) {
			console.error(err.message);
		}
	}
}

module.exports = ImageService;

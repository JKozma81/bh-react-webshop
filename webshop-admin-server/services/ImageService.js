class ImageService {
	constructor(repository) {
		this.repository = repository;
	}

	async addImagesToDb(ImagesWithSku) {
		return await this.repository.addImages(ImagesWithSku);
	}

	async getAllImages() {
		return await this.repository.getAllImages();
	}
}

module.exports = ImageService;

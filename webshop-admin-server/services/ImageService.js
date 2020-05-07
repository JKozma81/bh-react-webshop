class ImageService {
	constructor(repository) {
		this.repository = repository;
	}

	async addImagesToDb(ImagesWithSku) {
		return await this.repository.addImages(ImagesWithSku);
	}
}

module.exports = ImageService;

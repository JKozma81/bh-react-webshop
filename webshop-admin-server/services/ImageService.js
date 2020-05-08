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

  async getImagesBySKU(prodSku) {
    return await this.repository.getImagesBySKU(prodSku);
  }
}

module.exports = ImageService;

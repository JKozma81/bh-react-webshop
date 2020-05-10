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
}

module.exports = ImageService;

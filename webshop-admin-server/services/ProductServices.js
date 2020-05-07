class ProductServices {
  constructor(repository) {
    this.repository = repository;
  }
  async addProductToDB(productData) {
    return await this.repository.addProduct(productData);
  }

  async getAllProducts() {
    const results = await this.repository.getAllProducts();
    return results;
  }

  async getProductBySku(sku) {
    const result = await this.repository.getProduct(sku);
    return result;
  }

  async modifyProductData(newData) {
    return await this.repository.modifyProduct(newData);
  }

  async modifyProductPrimaryPicture(fileInfo) {
    return await this.repository.modifyPrimary(fileInfo);
  }

  async addImages(imageData) {
    return await this.repository.addImagesToProduct(imageData);
  }

  async deleteImage(imageId) {
    return await this.repository.deleteImage(imageId);
  }

  async getProductImages(productSKU) {
    return await this.repository.getProductPictures(productSKU);
  }
}

module.exports = ProductServices;

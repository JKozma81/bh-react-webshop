class ProductServices {
  constructor(repository) {
    this.repository = repository;
  }
  async addProductToDB(productData) {
    try {
      return await this.repository.addProduct(productData);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getAllProducts() {
    try {
      return await this.repository.getAllProducts();
    } catch (err) {
      console.error(err.message);
    }
  }

  async getProductBySku(sku) {
    try {
      return await this.repository.getProduct(sku);
    } catch (err) {
      console.error(err.message);
    }
  }

  async modifyProductData(newData) {
    try {
      return await this.repository.modifyProduct(newData);
    } catch (err) {
      console.error(err.message);
    }
  }

  async modifyProductPrimaryPicture(fileInfo) {
    try {
      return await this.repository.modifyPrimary(fileInfo);
    } catch (err) {
      console.error(err.message);
    }
  }

  async addImages(imageData) {
    try {
      return await this.repository.addImagesToProduct(imageData);
    } catch (err) {
      console.error(err.message);
    }
  }

  async deleteImage(imageId) {
    try {
      return await this.repository.deleteImage(imageId);
    } catch (err) {
      console.error(err.message);
    }
  }

  async getProductImages(productSKU) {
    try {
      return await this.repository.getProductPictures(productSKU);
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = ProductServices;

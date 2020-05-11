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

	async deleteProduct(sku) {
		try {
			return await this.repository.deleteProduct(sku);
		} catch (err) {
			console.error(err.message);
		}
	}
}

module.exports = ProductServices;

class Product {
	constructor(sku, name, price, desc, specs) {
		this.sku = sku || '';
		this.name = name || '';
		this.price = price || 0;
		this.desc = desc || '';
		this.specs = specs || '';
	}
}

module.exports = Product;

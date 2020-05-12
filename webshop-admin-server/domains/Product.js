class Product {
  constructor(sku, name, price, desc, specs, qty, warning_at) {
    this.sku = sku || '';
    this.name = name || '';
    this.price = price || 0;
    this.desc = desc || '';
    this.specs = specs || '';
    this.qty = qty || 0;
    this.warning_at = warning_at || 0;
  }
}

module.exports = Product;

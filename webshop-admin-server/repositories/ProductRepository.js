const Product = require('../domains/Product');

class ProductRepository {
  constructor(database) {
    this.dataBase = database;
  }

  addProduct(productData) {
    return new Promise((resolve, reject) => {
      try {
        this.dataBase.serialize(() => {
          this.dataBase.run(
            'INSERT INTO products(sku, name, price, desc, specs) VALUES(?, ?, ?, ?, ?)',
            [
              productData.sku,
              productData.name,
              Number(productData.price),
              productData.desc,
              productData.specs,
            ],
            (err) => {
              if (err !== null)
                reject({
                  errors: [
                    {
                      type: 'application',
                      message: `Application error at adding product to database: ${err.toString()}`,
                    },
                  ],
                });
            }
          );

          this.dataBase.get(
            'SELECT sku, name, price, desc, specs FROM products WHERE sku = ?',
            productData.sku,
            (err, result) => {
              if (err !== null)
                reject({
                  errors: [
                    {
                      type: 'application',
                      message: `Application error at geting product data from database: ${err.toString()}`,
                    },
                  ],
                });
              const newProduct = new Product(
                result.sku,
                result.name,
                result.price,
                result.desc,
                result.specs
              );
              resolve(newProduct);
            }
          );
        });
      } catch (err) {
        console.error(err.errors ? err.error.message : err.message);
        reject({
          errors: [
            {
              type: 'application',
              message: `Application error at database operation: ${err.toString()}`,
            },
          ],
        });
      }
    });
  }

  getAllProducts() {
    return new Promise((resolve, reject) => {
      try {
        this.dataBase.serialize(() => {
          this.dataBase.all(
            'SELECT sku, name, price, desc, specs FROM products',
            (err, results) => {
              if (err !== null)
                reject({
                  errors: [
                    {
                      type: 'application',
                      message: `Application error at getting product data from database: ${err.toString()}`,
                    },
                  ],
                });

              const resultProductData = [];
              for (const result of results) {
                const tempProduct = new Product(
                  result.sku,
                  result.name,
                  result.price,
                  result.desc,
                  result.specs
                );

                resultProductData.push(tempProduct);
              }
              resolve(resultProductData);
            }
          );
        });
      } catch (err) {
        console.error(err.errors ? err.error.message : err.message);
        reject({
          errors: [
            {
              type: 'application',
              message: `Application error at database operation : ${err.toString()}`,
            },
          ],
        });
      }
    });
  }

  getProduct(sku) {
    return new Promise((resolve, reject) => {
      try {
        this.dataBase.serialize(() => {
          this.dataBase.get(
            'SELECT sku, name, price, desc, specs FROM products WHERE sku = ?',
            sku,
            (err, result) => {
              if (err !== null)
                reject({
                  errors: [
                    {
                      type: 'application',
                      message: `Application error at getting product data from database with SKU info: ${err.toString()}`,
                    },
                  ],
                });
              const tempProduct = new Product(
                result.sku,
                result.name,
                result.price,
                result.desc,
                result.specs
              );
              resolve(tempProduct);
            }
          );
        });
      } catch (err) {
        console.error(err.errors ? err.error.message : err.message);
        reject({
          errors: [
            {
              type: 'application',
              message: `Application error at database operation: ${err.toString()}`,
            },
          ],
        });
      }
    });
  }

  modifyProduct(newData) {
    return new Promise((resolve, reject) => {
      try {
        this.dataBase.serialize(() => {
          for (const property in newData.modifiedData) {
            this.dataBase.run(
              `UPDATE products SET ${property} = ? WHERE sku = ?`,
              [newData.modifiedData[property], newData.productSKU],
              (err) => {
                if (err !== null)
                  reject({
                    errors: [
                      {
                        type: 'application',
                        message: `Application error at modifying product informations ${property}: ${err.toString()}`,
                      },
                    ],
                  });
              }
            );
          }

          this.dataBase.get(
            'SELECT sku, name, price, desc, specs FROM products WHERE sku = ?',
            newData.productSKU,
            (err, result) => {
              if (err !== null)
                reject({
                  errors: [
                    {
                      type: 'application',
                      message: `Application error at getting getting modifyed product information: ${err.toString()}`,
                    },
                  ],
                });
              const updatedProduct = new Product(
                result.sku,
                result.name,
                result.price,
                result.desc,
                result.specs
              );
              resolve(updatedProduct);
            }
          );
        });
      } catch (err) {
        console.error(err.errors ? err.error.message : err.message);
        reject({
          errors: [
            {
              type: 'application',
              message: `Application error at database operation: ${err.toString()}`,
            },
          ],
        });
      }
    });
  }

  // deleteImage(imageId) {
  // 	return new Promise((resolve, reject) => {
  // 		try {
  // 			this.dataBase.serialize(() => {
  // 				this.dataBase.get(
  // 					'SELECT id, url, is_primary, product_sku FROM images WHERE id = ?',
  // 					imageId,
  // 					(err, result) => {
  // 						(err) => {
  // 							if (err !== null) reject(err);
  // 						};
  // 						this.dataBase.run(
  // 							'DELETE FROM images WHERE id = ?',
  // 							imageId,
  // 							(err) => {
  // 								if (err !== null) reject(err);
  // 							}
  // 						);
  // 						resolve(result);
  // 					}
  // 				);
  // 			});
  // 		} catch (err) {
  // 			console.error(err);
  // 			reject(err);
  // 		}
  // 	});
  // }
}

module.exports = ProductRepository;

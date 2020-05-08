class ImageRepository {
  constructor(database) {
    this.dataBase = database;
  }

  addImages(ImagesWithSku) {
    return new Promise((resolve, reject) => {
      try {
        this.dataBase.serialize(() => {
          for (const [i, picture] of ImagesWithSku.images.entries()) {
            if (i === 0) {
              this.dataBase.run(
                'INSERT INTO images(url, product_sku, is_primary) VALUES(?, ?, ?)',
                [picture, ImagesWithSku.sku, 1],
                (err) => {
                  if (err !== null)
                    reject({
                      errors: [
                        {
                          type: 'application',
                          message: `Application error at inserting images into the database: ${err.toString()}`,
                        },
                      ],
                    });
                }
              );
            } else {
              this.dataBase.run(
                'INSERT INTO images(url, product_sku, is_primary) VALUES(?, ?, ?)',
                [picture, ImagesWithSku.sku, 0],
                (err) => {
                  if (err !== null)
                    reject({
                      errors: [
                        {
                          type: 'application',
                          message: `Application error at inserting images into the database: ${err.toString()}`,
                        },
                      ],
                    });
                }
              );
            }
          }

          this.dataBase.all(
            'SELECT id, url, product_sku, is_primary FROM images WHERE product_sku = ?',
            ImagesWithSku.sku,
            (err, imageResults) => {
              if (err !== null)
                reject({
                  errors: [
                    {
                      type: 'application',
                      message: `Application error at getting images from database: ${err.toString()}`,
                    },
                  ],
                });
              resolve(imageResults);
            }
          );
        });
      } catch (err) {
        console.error(err);
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

  getAllImages() {
    return new Promise((resolve, reject) => {
      try {
        this.dataBase.serialize(() => {
          this.dataBase.all(
            'SELECT id, url, product_sku, is_primary FROM images',
            (err, imageResults) => {
              if (err !== null)
                reject({
                  errors: [
                    {
                      type: 'application',
                      message: `Application error at getting images from database: ${err.toString()}`,
                    },
                  ],
                });
              resolve(imageResults);
            }
          );
        });
      } catch (err) {
        console.error(err);
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

  getImagesBySKU(prodSku) {
    return new Promise((resolve, reject) => {
      try {
        this.dataBase.serialize(() => {
          this.dataBase.all(
            'SELECT id, url, product_sku, is_primary FROM images WHERE product_sku = ?',
            prodSku,
            (err, imageResult) => {
              if (err !== null)
                reject({
                  errors: [
                    {
                      type: 'application',
                      message: `Application error at getting images form product by SKU: ${err.toString()}`,
                    },
                  ],
                });
              resolve(imageResult);
            }
          );
        });
      } catch (err) {
        console.error(err);
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
}

module.exports = ImageRepository;

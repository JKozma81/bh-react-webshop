class PromotionsRepository {
  constructor(database) {
    this.dataBase = database;
  }

  getAllPromos() {
    return new Promise((resolve, reject) => {
      try {
        this.dataBase.serialize(() => {
          this.dataBase.all(
            'SELECT product_sku, promo_text, picture FROM promotions',
            (err, results) => {
              if (err !== null)
                reject({
                  errors: [
                    {
                      type: 'application',
                      message: `Application error at getting promotions data from database: ${err.toString()}`,
                    },
                  ],
                });
              resolve(results);
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

  addPromotion(promotionData) {
    return new Promise((resolve, reject) => {
      try {
        this.dataBase.serialize(() => {
          this.dataBase.run(
            'INSERT INTO promotions(product_sku, promo_text, picture) VALUES(?, ?, ?)',
            [
              promotionData.productSKU,
              promotionData.promo_text,
              promotionData.picture,
            ],
            (err) => {
              if (err !== null)
                reject({
                  errors: [
                    {
                      type: 'application',
                      message: `Application error at adding promotions data to database: ${err.toString()}`,
                    },
                  ],
                });
            }
          );

          this.dataBase.all(
            'SELECT product_sku, promo_text, picture FROM promotions',
            (err, results) => {
              if (err !== null)
                reject({
                  errors: [
                    {
                      type: 'application',
                      message: `Application error at getting promotions data from database: ${err.toString()}`,
                    },
                  ],
                });
              resolve(results);
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
}

module.exports = PromotionsRepository;

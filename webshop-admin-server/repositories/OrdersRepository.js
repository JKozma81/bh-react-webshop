class OrdersRepository {
  constructor(database) {
    this.dataBase = database;
  }

  getAllOrders() {
    return new Promise((resolve, reject) => {
      try {
        this.dataBase.serialize(() => {
          this.dataBase.all(
            'SELECT DISTINCT order_id, GROUP_CONCAT(product_sku, ", ") AS products, name, email, address FROM orders',
            (err, results) => {
              if (err !== null)
                reject({
                  errors: [
                    {
                      type: 'application',
                      message: `Application error at getting orders data from database: ${err.toString()}`,
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

  addOrder(orderData) {
    return new Promise((resolve, reject) => {
      try {
        this.dataBase.serialize(() => {
          for (const orderItem of orderData.orderDetails) {
            this.dataBase.run(
              'INSERT INTO orders(order_id, name, email, address, product_sku, qty) VALUES(?, ?, ?, ?, ?, ?)',
              [
                orderData.orderId,
                orderData.name,
                orderData.email,
                orderData.address,
                orderItem.sku,
                orderItem.qty,
              ],
              (err) => {
                if (err !== null)
                  reject({
                    errors: [
                      {
                        type: 'application',
                        message: `Application error at adding orders data to database: ${err.toString()}`,
                      },
                    ],
                  });
              }
            );
          }
          resolve();
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

module.exports = OrdersRepository;

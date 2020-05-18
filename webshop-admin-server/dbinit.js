const sqlite3 = require('sqlite3').verbose();

const dataBase = new sqlite3.Database('./model/webshop.db');
try {
  dataBase.serialize(() => {
    dataBase.run(
      `CREATE TABLE IF NOT EXISTS
            products (sku VARCHAR(12) PRIMARY KEY,
                   name VARCHAR(100) NOT NULL,
                   desc VARCHAR(240) NOT NULL,
                   specs TEXT NOT NULL,
                   qty INTEGER NOT NULL,
                   warning_at INTEGER NOT NULL,
                   price INTEGER NOT NULL)`
    );

    dataBase.run(
      `CREATE TABLE IF NOT EXISTS
            images (id INTEGER PRIMARY KEY AUTOINCREMENT,
                   url VARCHAR(150) NOT NULL,
                   product_sku VARCHAR(12),
                   is_primary INTEGER,
                   FOREIGN KEY (product_sku) REFERENCES products (sku)
                  )`
    );

    dataBase.run(
      `CREATE TABLE IF NOT EXISTS
            orders (order_id INTEGER NOT NULL,
                   product_sku VARCHAR(12),
                   qty INTEGER NOT NULL,
                   name VARCHAR(120),
                   email VARCHAR(120),
                   address VARCHAR(200),
                   FOREIGN KEY (product_sku) REFERENCES products (sku)
                  )`
    );

    dataBase.run(
      `CREATE TABLE IF NOT EXISTS
            promotions (id INTEGER PRIMARY KEY AUTOINCREMENT,
                   product_sku VARCHAR(12),
                   promo_text TEXT NOT NULL,
                   picture VARCHAR(250) NOT NULL,
                   FOREIGN KEY (product_sku) REFERENCES products (sku)
                  )`
    );

    dataBase.run(
      `CREATE TABLE IF NOT EXISTS
            recommended (id INTEGER PRIMARY KEY AUTOINCREMENT,
                   main_sku VARCHAR(12) NOT NULL,
                   product_sku VARCHAR(12) NOT NULL,
                   FOREIGN KEY (main_sku) REFERENCES products (sku),
                   FOREIGN KEY (product_sku) REFERENCES products (sku)
                  )`
    );

    dataBase.run(
      'INSERT INTO promotions(product_sku, promo_text, picture) VALUES("AI1", "Just the right amount of everything.", "http://localhost:5000/img/promotions/promotion_iphone.jpg")'
    );
    dataBase.run(
      'INSERT INTO promotions(product_sku, promo_text, picture) VALUES("ND", "Capture Exquisitely. Connect Immediately.", "http://localhost:5000/img/promotions/promotion_d5600.jpg")'
    );
    dataBase.run(
      'INSERT INTO promotions(product_sku, promo_text, picture) VALUES("ST", "4K makes a real world of difference.", "http://localhost:5000/img/promotions/promotion_tu7000.jpg")'
    );

    dataBase.run(
      'INSERT INTO recommended(main_sku, product_sku) VALUES("ST", "CE4")'
    );
    dataBase.run(
      'INSERT INTO recommended(main_sku, product_sku) VALUES("ST", "OH")'
    );
    dataBase.run(
      'INSERT INTO recommended(main_sku, product_sku) VALUES("ST", "ND")'
    );
    dataBase.run(
      'INSERT INTO recommended(main_sku, product_sku) VALUES("ST", "PS")'
    );
    dataBase.run(
      'INSERT INTO recommended(main_sku, product_sku) VALUES("ST", "VV")'
    );
    dataBase.run(
      'INSERT INTO recommended(main_sku, product_sku) VALUES("ST", "SGA")'
    );
    dataBase.run(
      'INSERT INTO recommended(main_sku, product_sku) VALUES("ST", "GVS")'
    );

    dataBase.run(
      'INSERT INTO recommended(main_sku, product_sku) VALUES("A6", "ST")'
    );
    dataBase.run(
      'INSERT INTO recommended(main_sku, product_sku) VALUES("A6", "PS")'
    );
    dataBase.run(
      'INSERT INTO recommended(main_sku, product_sku) VALUES("A6", "ND")'
    );
    dataBase.run(
      'INSERT INTO recommended(main_sku, product_sku) VALUES("A6", "VV")'
    );

    dataBase.run(
      'INSERT INTO recommended(main_sku, product_sku) VALUES("L3", "GVS")'
    );
    dataBase.run(
      'INSERT INTO recommended(main_sku, product_sku) VALUES("L3", "ND")'
    );
    dataBase.run(
      'INSERT INTO recommended(main_sku, product_sku) VALUES("L3", "SGA")'
    );
  });
} catch (err) {
  console.error(err);
}

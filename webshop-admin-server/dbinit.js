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

    dataBase.run(`INSERT INTO products(sku, name, desc, specs, price, qty, warning_at)
                      VALUES("I1P", "iPhone 11 Pro", "The iPhone 11 Pro and iPhone 11 Pro Max are smartphones designed, developed and marketed by Apple Inc.", "Capacity=256GB,Height=144.0mm,Width=71.4mm,Depth=8.1mm,Weight=188grams,Display=5.8‑inch,Chip=A13", 1499, 5, 2)`);
    dataBase.run(`INSERT INTO images(url, product_sku, is_primary)
                      VALUES("http://localhost:5000/img/I1P/images_2.jpg", "I1P", 1)`);
    dataBase.run(`INSERT INTO images(url, product_sku, is_primary)
                      VALUES("http://localhost:5000/img/I1P/download_1.jpg", "I1P", 0)`);
    dataBase.run(`INSERT INTO images(url, product_sku, is_primary)
                      VALUES("http://localhost:5000/img/I1P/images_1.jpg", "I1P", 0)`);
  });
} catch (err) {
  console.error(err);
}

const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'zilazol_DB',
  password: 'hothot1212',
  port: 5432,
});

const getMerchants = (table, user) => {
  console.log(table);
  console.log("cishalon");
  if (table == "Products") {
    return new Promise(function (resolve, reject) {
      pool.query('SELECT * FROM public."ProductsWithPrices" ORDER BY "ItemCode" ASC LIMIT 1000;', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    })
  }
  if (table == "Users") {
    return new Promise(function (resolve, reject) {
      pool.query('SELECT * FROM public."UsersT" ORDER BY "userName" ASC;', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    })
  }
  if (table == "FavoritsT") {
    return new Promise(function (resolve, reject) {
      pool.query('SELECT "productID" FROM public."FavoritsT"  WHERE "userName" = $1;', [user], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    })
  }
  if (table == "usersViewsT") {
    console.log("came45");
    return new Promise(function (resolve, reject) {
      pool.query('SELECT "usersViewsT"."productID","usersViewsT"."count"  FROM public."usersViewsT" WHERE "userName" = $1;', [user], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    })
  }
}
const updateDB = (table, user, prod, count) => {
  console.log(user);
  if (table == "UsersT") {
    const userName = user.split(":")[0];
    const password = user.split(":")[1];
    return new Promise(function (resolve, reject) {
      pool.query('INSERT INTO public."UsersT" VALUES ($1, $2);', [userName, password], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve('user is added to the users DB table');
      })
    })
  }
  if (table == "FavoritsT") {
    return new Promise(function (resolve, reject) {
      pool.query('INSERT INTO public."FavoritsT" VALUES ($1, $2);', [prod, user], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve('favorite for current user is added to the favorites DB table');
      })
    })
  }
  if (table == "usersViewsT") {
    console.log("came85");
    return new Promise(function (resolve, reject) {
      pool.query('INSERT INTO public."usersViewsT" ("productID", "userName", "count") VALUES ($1, $2, $3);', [prod, user, count], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve('special for current user is added to the favorites DB table');
      })
    })
  }
  if (table == "usersViewsTUpdate") {
    return new Promise(function (resolve, reject) {
      pool.query('UPDATE public."usersViewsT" SET "count" = $1 WHERE "usersViewsT"."productID" = $2 AND "usersViewsT"."userName" = $3;', [count, prod, user], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve('favorite for current user is added to the favorites DB table');
      })
    })
  }

}
const deleteFromDB = (table, user, prod) => {
  console.log(user);
  if (table == "FavoritsT") {
    return new Promise(function (resolve, reject) {
      pool.query('DELETE FROM public."FavoritsT" WHERE "FavoritsT"."productID" = $1 AND "FavoritsT"."userName" = $2;', [prod, user], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve('המוצר המועדף נמחק מרשימת המועדפים שלך');
      })
    })
  }
  if (table == "FavoritsTAll") {
    return new Promise(function (resolve, reject) {
      pool.query('DELETE FROM public."FavoritsT" WHERE "FavoritsT"."userName" = $1;', [user], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve('רשימת המוצרים המועדפים שלך נוקתה');
      })
    })
  }
}


module.exports = {
  getMerchants, updateDB, deleteFromDB

}
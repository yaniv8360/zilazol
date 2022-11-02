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
}
const updateDB = (table, user, prod) => {
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
      // pool.query('INSERT INTO public."UsersT" VALUES ($1, $2);', [userName, password], (error, results) => {
      pool.query('INSERT INTO public."FavoritsT" VALUES ($1, $2);', [prod, user], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve('favorite for current user is added to the favorites DB table');
      })
    })
  }

  // if (table == "Users") {
  //   return new Promise(function (resolve, reject) {
  //     pool.query('SELECT * FROM public."UsersT" ORDER BY "userName" ASC;', (error, results) => {
  //       if (error) {
  //         reject(error)
  //       }
  //       resolve(results.rows);
  //     })
  //   })
  // }
}
// const addFavoriteToDB = (prod, user) => {
//   console.log(user);
//   const userName = user.split(":")[0];
//   const password = user.split(":")[1];
//   return new Promise(function (resolve, reject) {
//     // pool.query('INSERT INTO public."UsersT" VALUES ($1, $2);', [userName, password], (error, results) => {
//     pool.query('INSERT INTO public."FavoritsT" VALUES ($1, $2);', [prod, user], (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve('favorite for current user is added to the favorites DB table');
//     })
//   })
// }

// const getUsers = () => {
//   return new Promise(function (resolve, reject) {
//     pool.query('SELECT * FROM public."UsersT" ORDER BY "userName" ASC;', (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(results.rows);
//     })
//   })
// }

// const createMerchant = (body) => {
//   return new Promise(function(resolve, reject) {
//     const { name, email } = body

//     pool.query('INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(`A new merchant has been added added: ${JSON.stringify(results.rows[0])}`)
//     })
//   })
// }

// const deleteMerchant = (merchantId) => {
//   return new Promise(function(resolve, reject) {
//     const id = parseInt(merchantId)

//     pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(`Merchant deleted with ID: ${id}`)
//     })
//   })
// }

module.exports = {
  getMerchants, updateDB
  // createMerchant,
  // deleteMerchant,
}
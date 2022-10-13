const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'zilazol_DB',
  password: 'hothot1212',
  port: 5432,
});

const getMerchants = () => {
  return new Promise(function(resolve, reject) {  
    pool.query('SELECT * FROM public.products ORDER BY "ItemCode" ASC LIMIT 1000;', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

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
  getMerchants
  // createMerchant,
  // deleteMerchant,
}
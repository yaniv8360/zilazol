const express = require('express')
const app = express()
const port = 3001
const merchant_model = require('./merchant_model')
app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/:table/:user', (req, res) => {
  merchant_model.getMerchants(req.params.table, req.params.user)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.post('/:table/:user/:prod', (req, res) => {
  merchant_model.updateDB(req.params.table, req.params.user, req.params.prod)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
app.delete('/:table/:user/:prod', (req, res) => {
  merchant_model.deleteFromDB(req.params.table, req.params.user, req.params.prod)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// app.delete('/merchants/:id', (req, res) => {
//   merchant_model.deleteMerchant(req.params.id)
//   .then(response => {
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
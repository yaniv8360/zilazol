// file to be removed
import { App1, App3, App4, App5 } from "./App"
import { str } from "./App";
import React, { useState, useEffect } from 'react';

export const str1 = 'abcdefg';
export const hoser_moh = 'Hello worlddididdd';
function App32() {
  return ('abcd');
}
let x = 'no_moh_lahalotin';

function App7() {
  const [merchants, setMerchants] = useState(false);
  useEffect(() => {
    getMerchant();
  }, []);
  function getMerchant() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data[0].name);
        setMerchants(data[0].name);
        x = data[0].name;
      });
  }
  return (

    { merchants }

  );
}
let storeProducts;

function getDetails(resolve) {
  fetch('http://localhost:3001').then(res => res.json()).then(data => {
    console.log(data[0].name);
    storeProducts = data[0].name;
    console.log(storeProducts);
    resolve();
  });

}

const detailsPromise = new Promise((resolve) => {
  getDetails(resolve);
}).then(() => {
  console.log("data51");
console.log(storeProducts);
})

let allProducts = [{
  id: 1,
  title: "dani_the_king",
  image: 'images/1.jpg',
  price: 10000,
  count: 1,
  isInterest: false,
  category: 'میوه جات'
},
{
  id: 2,
  title: 'پیاز',
  image: 'images/2.jpg',
  price: 13000,
  count: 1,
  isInterest: false,
  category: 'سبزیجات'
}]
export default allProducts
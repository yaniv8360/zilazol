import { App1, App3, App4, App5 } from "./App"
import { str } from "./App";
import React, { useState, useEffect } from 'react';

// const y = ${x};
const str1 = 'abcdefg';
export const hoser_moh = 'Hello worlddididdd';
// exports.hoser_moh = "hoser_moh";
// var hoser_new = require("./App").hoser_moh_im;
// var str2 = hoser_new;
// var chishalon = require("./App").hoser_moh_im;
function App32() {
    return ('abcd');
}
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
          console.log(data[0].name)
          setMerchants(data[0].name);
        });
    }
    return (
      
        {merchants}
      
    );
  }

let allProducts = [{
    id: 1,
    title: "no_chance",
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
},
{
    id: 3,
    title: 'گوجه فرنگی',
    image: 'images/3.jpg',
    price: 15000,
    count: 1,
    isInterest: false,
    category: 'سبزیجات'
},
{
    id: 4,
    title: 'بادمجان',
    image: 'images/4.jpg',
    price: 12500,
    count: 1,
    isInterest: false,
    category: 'سبزیجات'
},
{
    id: 5,
    title: 'کلم بروکلی',
    image: 'images/5.jpg',
    price: 8500,
    count: 1,
    isInterest: false,
    category: 'سبزیجات'
},
{
    id: 7,
    title: 'هویج',
    image: 'images/7.jpg',
    price: 12000,
    count: 1,
    isInterest: false,
    category: 'سبزیجات'
},
{
    id: 8,
    title: 'گل کلم',
    image: 'images/8.jpg',
    price: 8000,
    count: 1,
    isInterest: false,
    category: 'سبزیجات'
},
{
    id: 9,
    title: 'خیار',
    image: 'images/9.jpg',
    price: 4000,
    count: 1,
    isInterest: false,
    category: 'میوه جات'
},
{
    id: 10,
    title: 'سیر',
    image: 'images/10.jpg',
    price: 16500,
    count: 1,
    isInterest: false,
    category: 'سبزیجات'
},
{
    id: 11,
    title: 'فلفل دلمه',
    image: 'images/11.jpg',
    price: 7000,
    count: 1,
    isInterest: false,
    category: 'سبزیجات'
},
{
    id: 12,
    title: 'کاهو',
    image: 'images/12.jpg',
    price: 18000,
    count: 1,
    isInterest: false,
    category: 'سبزیجات'
},
{
    id: 13,
    title: 'فلفل قرمز',
    image: 'images/13.jpg',
    price: 20000,
    count: 1,
    isInterest: false,
    category: 'سبزیجات'
},
{
    id: 14,
    title: 'هندوانه',
    image: 'images/14.jpg',
    price: 8000,
    count: 1,
    isInterest: false,
    category: 'میوه جات'
},
{
    id: 15,
    title: 'قارچ',
    image: 'images/15.jpg',
    price: 25000,
    count: 1,
    isInterest: false,
    category: 'سبزیجات'
},
{
    id: 16,
    title: 'موز',
    image: 'images/16.jpg',
    price: 47000,
    count: 1,
    isInterest: false,
    category: 'میوه جات'
},
{
    id: 17,
    title: 'کدو',
    image: 'images/17.jpg',
    price: 13500,
    count: 1,
    isInterest: false,
    category: 'سبزیجات'
},
{
    id: 18,
    title: 'آناناس',
    image: 'images/18.jpg',
    price: 25500,
    count: 1,
    isInterest: false,
    category: 'میوه جات'
},
{
    id: 19,
    title: 'بادام',
    image: 'images/19.jpg',
    price: 55000,
    count: 1,
    isInterest: false,
    category: 'خشکبار'
},
{
    id: 20,
    title: 'سیب',
    image: 'images/20.jpg',
    price: 12500,
    count: 1,
    isInterest: false,
    category: 'میوه جات'
},
{
    id: 21,
    title: 'فندق',
    image: 'images/21.jpg',
    price: 45000,
    count: 1,
    isInterest: false,
    category: 'خشکبار'
},
{
    id: 22,
    title: 'پسته',
    image: 'images/22.jpg',
    price: 150000,
    count: 1,
    isInterest: false,
    category: 'خشکبار'
},
{
    id: 23,
    title: 'پرتقال',
    image: 'images/23.jpg',
    price: 12000,
    count: 1,
    isInterest: false,
    category: 'میوه جات'
},
{
    id: 24,
    title: 'تخمه آفتابگردان',
    image: 'images/24.jpg',
    price: 40000,
    count: 1,
    isInterest: false,
    category: 'خشکبار'
},
{
    id: 25,
    title: 'گردو',
    image: 'images/25.jpg',
    price: 50000,
    count: 1,
    isInterest: false,
    category: 'خشکبار'
},
{
    id: 26,
    title: 'گیلاس',
    image: 'images/26.jpg',
    price: 60000,
    count: 1,
    isInterest: false,
    category: 'میوه جات'
},
{
    id: 27,
    title: 'انجیر',
    image: 'images/27.jpg',
    price: 55000,
    count: 1,
    isInterest: false,
    category: 'میوه جات'
},
{
    id: 28,
    title: 'نخود سبز',
    image: 'images/28.jpg',
    price: 30000,
    count: 1,
    isInterest: false,
    category: 'حبوبات'
},
{
    id: 29,
    title: 'کیوی',
    image: 'images/29.jpg',
    price: 20000,
    count: 1,
    isInterest: false,
    category: 'میوه جات'
},
{
    id: 30,
    title: 'لوبیا سبز',
    image: 'images/30.jpg',
    price: 17000,
    count: 1,
    isInterest: false,
    category: 'حبوبات'
},
{
    id: 31,
    title: 'لوبیا قرمز',
    image: 'images/31.jpg',
    price: 22000,
    count: 1,
    isInterest: false,
    category: 'حبوبات'
},
{
    id: 32,
    title: 'انگور',
    image: 'images/32.jpg',
    price: 24000,
    count: 1,
    isInterest: false,
    category: 'میوه جات'
},
{
    id: 33,
    title: 'لیمو',
    image: 'images/33.jpg',
    price: 55000,
    count: 1,
    isInterest: false,
    category: 'میوه جات'
},
{
    id: 34,
    title: 'طالبی',
    image: 'images/34.jpg',
    price: 8000,
    count: 1,
    isInterest: false,
    category: 'میوه جات'
},
{
    id: 35,
    title: 'عدس',
    image: 'images/35.jpg',
    price: 13000,
    count: 1,
    isInterest: false,
    category: 'حبوبات'
},
{
    id: 36,
    title: 'تربچه',
    image: 'images/36.jpg',
    price: 4000,
    count: 1,
    isInterest: false,
    category: 'سبزیجات'
},
{
    id: 37,
    title: 'ذرت',
    image: 'images/37.jpg',
    price: 12000,
    count: 1,
    isInterest: false,
    category: 'سبزیجات'
},
]

export default allProducts
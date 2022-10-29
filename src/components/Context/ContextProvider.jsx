import React, { createContext, useReducer, useState, useEffect } from "react";
// import allProducts from "../../Data";
import offerCode from "../../Offer";
import { sendPrice } from "../../Offer";
// import App32 from "../../Data";
// import { str42 } from "../../App";
// console.log("imhere");
// let str2 = sendPrice;
// console.log(str42);

// let allProducts = [{
//   id: 1,
//   title: "dani_the_king",
//   image: 'images/1.jpg',
//   price: 10000,
//   count: 1,
//   isInterest: false,
//   category: 'میوه جات'
// },
// {
//   id: 2,
//   title: 'پیاز',
//   image: 'images/2.jpg',
//   price: 13000,
//   count: 1,
//   isInterest: false,
//   category: 'سبزیجات'
// }]
let allProducts = [];
let allAllProducts = [];


const initialState = {
  allProducts,
  allAllProducts,
  favorites: [],
  basket: [],
  totalPrice: 0,
  totalPriceAfterOffer: 0,
  offerPrice: 0,
  totalPriceFainal: 0,
  isFavorite: false,
  isEnterOfferCode: false,
  offerMessage: "",
  net: "שופרסל",
  userName: "",
  users: [{userName: "bob", password: "123"}, {userName: "Alice", password: "132"}]
};

const sumPrice = (items, isOffer) => {
  const totalPrice = items.reduce((totalPrice, product) => {
    return totalPrice + product.price * product.count;
  }, 0);

  if (isOffer) {
    const offerPrice = (totalPrice * offerCode.disCount) / 100;
    const totalPriceAfterOffer = totalPrice - offerPrice;

    return {
      totalPrice,
      offerPrice,
      totalPriceAfterOffer,
      ...sumPriceWithSend(totalPrice, offerPrice)
    };
  } else {
    return { totalPrice, ...sumPriceWithSend(totalPrice) };
  }
};

// calc Price With shopping cost
const sumPriceWithSend = (totalPrice, offerPrice = 0) => {
  let totalPriceFainal = null;

  if (totalPrice - offerPrice <= 100_000) {
    totalPriceFainal = totalPrice + sendPrice - offerPrice;
  } else {
    totalPriceFainal = totalPrice - offerPrice;
  }

  return { totalPriceFainal };
};

const reduce = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE": {
      state.allProducts.forEach((product) => {
        if (product.id === action.payload) {
          product.isInterest = !product.isInterest;
          state.favorites = allProducts.filter((product) => product.isInterest);
          state.isFavorite = true;
        }
      });
      return {
        ...state
      };
    }
    case "REMOVE_ALL_FAVORITE": {
      state.favorites = [];
      state.allProducts.forEach((product) => {
        product.isInterest = false;
      });

      return {
        ...state
      };
    }
    case "ADD_TO_BASKET": {
      const hasProduct = state.basket.some(
        (product) => product.id === action.payload
      );
      if (!hasProduct) {
        const mainItem = state.allProducts.find(
          (product) => product.id === action.payload
        );
        state.basket.push(mainItem);
      }

      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };
    }
    case "REMOVE_FROM_BASKET": {
      const indexDelete = state.basket.findIndex(
        (product) => product.id === action.payload
      );
      state.basket[indexDelete].count = 1;
      state.basket = state.basket.filter(
        (product) => product.id !== action.payload
      );

      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };
    }
    case "INCREASE": {
      const indexPlus = state.basket.findIndex(
        (product) => product.id === action.payload
      );
      state.basket[indexPlus].count++;

      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };
    }
    case "DECREASE": {
      const indexMinus = state.basket.findIndex(
        (product) => product.id === action.payload
      );
      if (state.basket[indexMinus].count > 1) {
        state.basket[indexMinus].count--;
      }

      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };
    }
    case "EMPTY_BASKET": {
      state.basket = state.basket.forEach((product) => (product.count = 1));
      state.basket = [];
      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };
    }
    case "REMOVE_CLASS": {
      state.isFavorite = false;
      return {
        ...state
      };
    }
    // case "CHANGE_NET": {
    //   const isRamy = (item) => item.RamCur != null;
    //   const isshuf = (item) => item.ShufCur != null;
    //   // if state.net == 
    //   if (state.net === "שופרסל") {
    //     state.net = "רמי לוי";
    //     state.allProducts = state.allAllProducts.filter(isRamy);
    //   }
    //   else {
    //     state.net = "שופרסל";
    //     state.allProducts = state.allAllProducts.filter(isshuf);
    //     // console.log(state.net)
    //   }
    //   return {
    //     ...state
    //   };
    // }
    case "LOGIN_USER": {
      state.userName = action.payload;
      console.log(state.userName);
      return {
        ...state
      };
    }
    case "NEW_USER": {
      state.userName = action.payload.split(":")[0];
      console.log(state.userName);
      state.users = [{userName: state.userName, password: action.payload.split(":")[1]},...state.users]
      console.log(state.users);
      return {
        ...state
      };
    }
    case "OFFER_CODE": {
      if (offerCode.code === action.payload) {
        state.isEnterOfferCode = true;
        state.offerMessage = "تخفیف اعمال شد";
      } else {
        state.offerMessage = "کد وارد شده صحیح نیست";
      }
      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };
    }
    default:
      return state;
  }
};

export const ProductContext = createContext();
export const ProductDispath = createContext();

export default function ContextProvider({ children }) {
  const [state, dispath] = useReducer(reduce, initialState);
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

        // const records = data.map((item) => ({ id: item.ItemCode, title: item.ItemName, image: 'https://m.pricez.co.il/ProductPictures/200x/'+item.ItemCode+'.jpg', price: item.ItemCode, count: 1, isInterest: false, category: 'سبزیجات' }));
        // console.log(records);
        const records = data.map((item) => {
          let imag = 'https://m.pricez.co.il/ProductPictures/200x/' + item.ItemCode + '.jpg';
          if (item.Image != null) {
            imag = item.Image;
          }
          return ({
            id: item.ItemCode, title: item.ItemName, image: imag, price: item.ItemCode,
            count: 1, isInterest: false, category: 'سبزیجات', RamAve: item.RamAve,
            RamCur: item.RamCur, ShufAve: item.ShufAve, ShufCur: item.ShufCur
          })
        });
        // console.log(data[0].ItemName);
        const isRamy = (item) => item.RamCur != null;
        const isshuf = (item) => item.ShufCur != null;
        const srtShuf = function (a, b) {
          if (1 - a["ShufCur"] / a["ShufAve"] < 1 - b["ShufCur"] / b["ShufAve"]) {
            return 1;
          } else if (1 - a["ShufCur"] / a["ShufAve"] > 1 - b["ShufCur"] / b["ShufAve"]) {
            return -1;
          }
          return 0;
        }
        const srtRamy = function (a, b) {
          if (1 - a["RamCur"] / a["RamAve"] < 1 - b["RamCur"] / b["RamAve"]) {
            return 1;
          } else if (1 - a["RamCur"] / a["RamAve"] > 1 - b["RamCur"] / b["RamAve"]) {
            return -1;
          }
          return 0;
        }
        setMerchants(records);

        // initialFilterState.filteredItems = records;
        // console.log(data[0].ItemName);
        // setMerchants(data[0].ItemName);
        // console.log(merchants);

        state.allAllProducts = records;
        if (state.net === "שופרסל") {
          state.allProducts = records.filter(isshuf);
          state.allProducts = state.allProducts.sort(srtShuf);

        }
        else {
          state.allProducts = records.filter(isRamy);
          state.allProducts = state.allProducts.sort(srtRamy);

        }

        // state.filteredItems = records.filter(isshuf);
        // console.log(state.allProducts);
        // console.log(state.filteredItems[0].title);

      });
    console.log(merchants);

  }
  // console.log(merchants);
  // state.totalPrice = 8;
  // console.log(state.totalPrice);
  // state.allProducts = merchants;
  // console.log(state.allProducts[0].title);
  // console.log(state.allProducts);
  // // state.allProducts = [{id: 3,
  // //   title: 'abc',
  // //   image: 'images/3.jpg',
  // //   price: 15000,
  // //   count: 1,
  // //   isInterest: false,
  // //   category: 'سبزیجات'}];
  // console.log(state.allProducts);

  return (
    <ProductContext.Provider value={{ state }}>
      <ProductDispath.Provider value={{ dispath }}>
        {children}
      </ProductDispath.Provider>
    </ProductContext.Provider>
  );
}

// export {allProducts};
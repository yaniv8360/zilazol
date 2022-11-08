import React, { createContext, useReducer, useState, useEffect } from "react";
import offerCode from "../../Offer";
import { sendPrice } from "../../Offer";
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
  users: []
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
  function addUser(user) {
    fetch('http://localhost:3001/UsersT/' + user + '/1', { method: 'POST', })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
      });
  }
  function getFavoritsFromDB(user) {
    fetch('http://localhost:3001/FavoritsT/' + user)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const records = data.map((item) => {
          return (
            item.productID
          )
        });
        state.favorites = records;
        console.log(state.favorites);
      });
  }
  switch (action.type) {
    case "ADD_FAVORITE": {
      if (state.user != "") {
        state.favorites = [action.payload, ...state.favorites];

      }
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
    case "DELAY": {

      return {
        ...state
      };
    }

    case "LOGIN_USER": {
      state.userName = action.payload;
      console.log(state.userName);
      getFavoritsFromDB(state.userName);
      console.log(state.favorites);
      return {
        ...state
      };
    }
    case "NEW_USER": {
      addUser(action.payload);
      state.userName = action.payload.split(":")[0];
      console.log(state.userName);
      state.users = [{ userName: state.userName, password: action.payload.split(":")[1] }, ...state.users]
      console.log(state.users);
      state.favorites = [];
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

  useEffect(() => {
    getMerchant();
    getUsers();
  }, []);
  function getMerchant() {
    fetch('http://localhost:3001/Products/1')
      .then(response => {
        return response.json();
      })
      .then(data => {

        const records = data.map((item) => {
          let imag = 'https://m.pricez.co.il/ProductPictures/200x/' + item.ItemCode + '.jpg';
          if (item.Image != null) {
            imag = item.Image;
          }
          return ({
            id: item.ItemCode, title: item.ItemName, image: imag, price: item.ItemCode,
            count: 1, category: 'سبزیجات', RamAve: item.RamAve,
            RamCur: item.RamCur, ShufAve: item.ShufAve, ShufCur: item.ShufCur
          })
        });
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

        state.allAllProducts = records;
        if (state.net === "שופרסל") {
          state.allProducts = records.filter(isshuf);
          state.allProducts = state.allProducts.sort(srtShuf);

        }
        else {
          state.allProducts = records.filter(isRamy);
          state.allProducts = state.allProducts.sort(srtRamy);

        }

      });

  }

  function getUsers() {
    fetch('http://localhost:3001/Users/1')
      .then(response => {
        return response.json();
      })
      .then(data => {

        const records = data.map((item) => {
          return ({
            userName: item.userName, password: item.password
          })
        });
        state.users = records;
        console.log(state.users);
      });
  }

  return (
    <ProductContext.Provider value={{ state }}>
      <ProductDispath.Provider value={{ dispath }}>
        {children}
      </ProductDispath.Provider>
    </ProductContext.Provider>
  );
}

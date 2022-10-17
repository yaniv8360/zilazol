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

const initialState = {
  allProducts,
  favorites: [],
  basket: [],
  totalPrice: 0,
  totalPriceAfterOffer: 0,
  offerPrice: 0,
  totalPriceFainal: 0,
  isFavorite: false,
  isEnterOfferCode: false,
  offerMessage: "",
  net: "שופרסל"
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
    case "CHANGE_NET": {
      // if state.net == 
      if (state.net === "שופרסל") {
        state.net = "רמי לוי";
      }
      else {
        state.net = "שופרסל";
        // console.log(state.net)
      }
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
  }, [state]);
  function getMerchant() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.json();
      })
      .then(data => {
        // const doubled = numbers.map((number) => number * 2);
        const records = data.map((item) => ({ id: item.ItemCode, title: item.ItemName, image: 'https://img.rami-levy.co.il/product/021231828294/small.jpg', price: item.ItemCode, count: 1, isInterest: false, category: 'سبزیجات' }));
        // console.log(records);
        // console.log(data[0].ItemName);
        setMerchants(records);
        state.allProducts = records;
      });
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
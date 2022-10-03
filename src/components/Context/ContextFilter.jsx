import React, { createContext, useReducer, useState, useEffect } from "react";

// import allProducts from "../Context/ContextProvider";

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
console.log(allProducts);

const initialFilterState = {
  filteredItems: [...allProducts],
  searchKey: ""
};

const filterItemsHandler = (key) => {
  const filteredItems = allProducts.filter((product) => {
    return product.category === key;
  });

  return { filteredItems };
};

const filterReduce = (state, action) => {
  switch (action.type) {
    case "SEARCH_KEYWORD":
      state.searchKey = action.payload;
      return {
        ...state
      };
    case "ALL":
      state.filteredItems = [...allProducts];
      return {
        ...state
      };
    case "VEGETABLE":
      return {
        ...filterItemsHandler("سبزیجات")
      };
    case "FRUIT":
      return {
        ...filterItemsHandler("میوه جات")
      };
    case "NUTS":
      return {
        ...filterItemsHandler("خشکبار")
      };
    case "BEANS":
      return {
        ...filterItemsHandler("حبوبات")
      };
    default:
      return state;
  }
};

export const FilterContext = createContext();
export const FilterDispath = createContext();

export default function ContextFilter({ children }) {
  console.log("came76");
  const [merchants, setMerchants] = useState(false);
  const [state, dispath] = useReducer(filterReduce, initialFilterState);

  useEffect(() => {
    getMerchant();
  }, [state]);
  function getMerchant() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.json();
      })
      .then(data => {

        const records = data.map((item) => ({ id: item.ItemCode, title: item.ItemName, image: 'https://img.rami-levy.co.il/product/'+item.ItemCode+'/small.jpg', price: 1000, count: 1, isInterest: false, category: 'سبزیجات' }));
        console.log(records);
        // console.log(data[0].ItemName);
        setMerchants(records);
        // initialFilterState.filteredItems = records;


        // console.log(data[0].ItemName);
        // setMerchants(data[0].ItemName);
        // console.log(merchants);

        state.filteredItems = records;
        // console.log(state.allProducts);
        // console.log(state.filteredItems[0].title);

      });
    console.log(merchants);

  }
  // console.log(initialFilterState)
  // console.log(merchants);
  console.log(state);
  // state.totalPrice = 8;

  // console.log(state.totalPrice);
  // filteredItems: [...allProducts]
  // state.filteredItems[0].title = 'abc';
  // console.log(state.filteredItems[0].title);
  // state.filteredItems.allProducts[0].title = merchants;
  // console.log(state.allProducts[0].title);
  // console.log(state.allProducts);
  return (
    <FilterContext.Provider value={{ state }}>
      <FilterDispath.Provider value={{ dispath }}>
        {children}
      </FilterDispath.Provider>
    </FilterContext.Provider>
  );
}

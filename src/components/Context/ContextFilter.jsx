import React, { createContext, useReducer, useState, useEffect } from "react";

let allProducts = [];
let allAllProducts = [];

console.log(allProducts);

const initialFilterState = {
  filteredItems: [],
  allItems: [],
  searchKey: "",
  net: "שופרסל",
  userName: "",
  favorites: [],
  users: [],
  basket: [],
  totalPrice: 0,
  specials: []
};
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


const filterItemsHandler = (key) => {
  const filteredItems = allProducts.filter((product) => {
    return product.category === key;
  });

  return { filteredItems };
};

const filterReduce = (state, action) => {
  function addUser(user) {
    fetch('http://localhost:3001/UsersT/' + user + '/1/1', { method: 'POST', })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
      });
  }
  function updateSpecial(prod, user, count) {
    console.log("came80CF");
    fetch('http://localhost:3001/usersViewsTUpdate/' + user + '/' + prod + '/' + count, { method: 'POST', })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
      });
  }
  function addSpecial(prod, user) {
    fetch('http://localhost:3001/usersViewsT/' + user + '/' + prod + '/1', { method: 'POST', })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
      });
  }
  function addFavorite(prod, user) {
    fetch('http://localhost:3001/FavoritsT/' + user + '/' + prod + '/1', { method: 'POST', })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
      });
  }
  function removeFavorite(prod, user) {
    fetch('http://localhost:3001/FavoritsT/' + user + '/' + prod, { method: 'DELETE', })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
      });
  }
  function removeAllFavorites(user) {
    fetch('http://localhost:3001/FavoritsTAll/' + user + '/1', { method: 'DELETE', })
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
  function getSpecialsFromDB(user) {
    console.log("came141");
    fetch('http://localhost:3001/usersViewsT/' + user)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const records = data.map((item) => {
          return ({ "id": item.productID, "count": item.count })
        });
        state.specials = records;
        console.log(state.specials);
      });
      console.log("came153");
  }
  const sumPrice = (items) => {
    const totalPrice = items.reduce((totalPrice, product) => {
      if (state.net === "שופרסל")
        return totalPrice + product.ShufCur * product.count;
      else {
        return totalPrice + product.RamCur * product.count;
      }

    }, 0);


    return totalPrice;
  };
  switch (action.type) {
    case "SEARCH_KEYWORD":
      state.searchKey = action.payload;
      return {
        ...state
      };
    case "CHANGE_NET": {

      if (state.net === "שופרסל") {
        state.net = "רמי לוי";
        state.filteredItems = state.allItems.filter(isRamy);
        state.filteredItems = state.filteredItems.sort(srtRamy);
      }
      else {
        state.net = "שופרסל";
        state.filteredItems = state.allItems.filter(isshuf);
        state.filteredItems = state.filteredItems.sort(srtShuf);

      }
      state.basket = state.basket.forEach((product) => (product.count = 1));
      state.basket = [];
      state.totalPrice = 0;
      return {
        ...state
      };
    }
    case "ALL":
      if (state.net === "שופרסל") {
        state.filteredItems = state.allItems.filter(isshuf);
        state.filteredItems = state.filteredItems.sort(srtShuf);
      }
      else {
        state.filteredItems = state.allItems.filter(isRamy);
        state.filteredItems = state.filteredItems.sort(srtRamy);
      }
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
    case "LOGIN_USER": {
      state.userName = action.payload;
      console.log(state.userName);

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
    case "GET_USER_SPECIALS": {
      getSpecialsFromDB(state.userName);

      return {
        ...state
      };
    }
    case "GET_USER_FAVORITES": {

      getFavoritsFromDB(state.userName);
      console.log(state.userName);
      console.log(state.favorites);
      return {
        ...state
      };
    }
    case "ADD_SPECIAL": {
      if (state.user != null) {
        if (state.specials.filter(item => item.id == action.payload).length == 0) {
          addSpecial(action.payload, state.user);

          state.specials = [{ "id": action.payload, "count": 1 }, ...state.specials];
        } else {

          const elm = state.specials.find(item => item.id = action.payload);
          console.log("came285CF");
          updateSpecial(action.payload, state.user, 5);


          console.log(state.specials);




        }
      }
      return {
        ...state
      };
    }
    case "ADD_FAVORITE": {
      if (state.user != "" && state.favorites.filter
        (item => item == action.payload).length == 0) {
        addFavorite(action.payload, state.user);
        state.favorites = [action.payload, ...state.favorites];
      }
      return {
        ...state
      };
    }
    case "REMOVE_FAVORITE": {
      if (state.user != "" && state.favorites.filter
        (item => item == action.payload).length > 0) {
        removeFavorite(action.payload, state.user);
        state.favorites = state.favorites.filter
          (item => item != action.payload);
      }
      return {
        ...state
      };
    }
    case "REMOVE_ALL_FAVORITE": {
      if (state.user != "" && state.favorites.length > 0) {
        removeAllFavorites(state.user);
        state.favorites = [];
      }
      return {
        ...state
      };
    }
    case "ADD_TO_BASKET": {
      const hasProduct = state.basket.some(
        (product) => product.id === action.payload
      );
      if (!hasProduct) {
        const mainItem = state.allItems.find(
          (product) => product.id === action.payload
        );
        state.basket.push(mainItem);
      }
      state.totalPrice = sumPrice(state.basket);

      return {
        ...state

      };
    }
    case "INCREASE": {
      const indexPlus = state.basket.findIndex(
        (product) => product.id === action.payload
      );
      state.basket[indexPlus].count++;
      state.totalPrice = sumPrice(state.basket);

      return {
        ...state

      };
    }
    case "DECREASE": {
      const indexMinus = state.basket.findIndex(
        (product) => product.id === action.payload
      );
      if (state.basket[indexMinus].count > 1) {
        state.basket[indexMinus].count--;
      }
      state.totalPrice = sumPrice(state.basket);

      return {
        ...state

      };
    }
    case "EMPTY_BASKET": {
      state.basket = state.basket.forEach((product) => (product.count = 1));
      state.basket = [];
      state.totalPrice = 0;

      return {
        ...state

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
      state.totalPrice = sumPrice(state.basket);

      return {
        ...state

      };
    }
    default:
      return state;
  }
};

export const FilterContext = createContext();
export const FilterDispath = createContext();

export default function ContextFilter({ children }) {

  const [state, dispath] = useReducer(filterReduce, initialFilterState);

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
        console.log(records);

        console.log(records);

        state.allItems = records;

        // }
        setTimeout(() => {
          dispath({ type: "ALL" });
        }, 1000);




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
    setTimeout(() => {
      dispath({ type: "ALL" });
    }, 100);
  }

  console.log(state);

  return (
    <FilterContext.Provider value={{ state }}>
      <FilterDispath.Provider value={{ dispath }}>
        {children}
      </FilterDispath.Provider>
    </FilterContext.Provider>
  );
}
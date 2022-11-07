import React, { useContext, useEffect, useRef, useState } from "react";
import "./Products.css";
import Filter from "./Filter/Filter";
import { FilterContext } from "../Context/ContextFilter";
import Card from "./Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";



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
export default function Products(props) {
  // const [prod, setProd] = useState("");
  const { state } = useContext(FilterContext);
  const prodExistsInFavorits = (prod) => state.favorites.find((item) => {
    return item === prod;
  }) != null;
  // ).length > 0;
  // const didMount = useRef(false);
  // state.init = "b";
  // getMerchant();
  console.log(state.specials);
  if (props.user != "" && state.specials.length == 0)
  {
    lockSpecialDBT();
    getSpecialsFromDB(props.user);

  }

  // setTimeout(() => {
  //   }, 100);
  useEffect(() => {
    // if (didMount.current == false) {
    getMerchant();
    if (props.user != "") {
      getFavoritsFromDB(props.user);
      console.log(state.specials);
      if (state.specials.length == 0)
        getSpecialsFromDB(props.user);

      // setTimeout(() => {
      // }, 100);
    }
    // }
  }, [state.filteredItems]);
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
            count: 1, isInterest: false, category: 'سبزیجات', RamAve: item.RamAve,
            RamCur: item.RamCur, ShufAve: item.ShufAve, ShufCur: item.ShufCur
          })
        });
        const isRamy = (item) => item.RamCur != null;
        const isshuf = (item) => item.ShufCur != null;
        // console.log(records);
        // setMerchants1(records);
        // console.log(records);
        state.allItems = records;
        if (state.net === "שופרסל") {
          state.filteredItems = records.filter(isshuf);
          state.filteredItems = state.filteredItems.sort(srtShuf);
          // console.log(state.filteredItems);
        }
        else {
          state.filteredItems = records.filter(isRamy);
          state.filteredItems = state.filteredItems.sort(srtRamy);
        }
      });

  }
  console.log(props.user);

  // props.fn("bob");
  console.log(state.filteredItems);
  const productsList = state.filteredItems.filter((product) => {
    return product.title.includes(state.searchKey) || !state.searchKey;
  });
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
        console.log(state.specials);
        state.specials = records;
        console.log(state.specials);
      });
    console.log("came153");
    // setTimeout(() => {
    //   // console.log(state.specials);
    //   console.log(state.specials);
    // }, 100);
  }
  function lockSpecialDBT() {
    console.log("came141");
    fetch('http://localhost:3001/usersViewsTLock/1/1', { method: 'POST', });
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     const records = data.map((item) => {
    //       return ({ "id": item.productID, "count": item.count })
    //     });
    //     console.log(state.specials);
    //     state.specials = records;
    //     console.log(state.specials);
    //   });
    // console.log("came153");
    // setTimeout(() => {
    //   // console.log(state.specials);
    //   console.log(state.specials);
    // }, 100);
  }
  console.log(state.favorites);
  return (
    <>
      <Filter />
      <div className="search_Container">
        <div className="search_box">
          <SearchBar />
        </div>
      </div>
      <div className="product_container">
        {productsList.length > 0 ? (
          productsList.map((product) =>
            <Card net={state.net}
              // isInterest={state.favorites.filter(item => item === '16000281684').length > 0}
              key={product.id} {...product}
              isInterest={state.favorites.filter(item => item === product.id).length > 0} />)
        ) : (
          <div className="not_products">
            <img
              className="products_empty_img"
              src="images/bare-tree.png"
              alt=""
            />
            <span className="products_empty_title">
              با عرض پوزش هیچ محصولی با جستجوی شما مطابقت نداشت!
            </span>
            <span className="products_empty_guide">
              کلمه کلیدی دیگری را وارد کرده و امتحان کنید
            </span>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

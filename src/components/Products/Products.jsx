import React, { useContext, useEffect, useRef } from "react";
import "./Products.css";
import Filter from "./Filter/Filter";
import { FilterContext } from "../Context/ContextFilter";
import Card from "./Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";

const srtShuf = function(a, b) {
  if (1-a["ShufCur"]/a["ShufAve"] < 1-b["ShufCur"]/b["ShufAve"]) {
    return 1;
  } else if (1-a["ShufCur"]/a["ShufAve"] > 1-b["ShufCur"]/b["ShufAve"]) {
    return -1;
  }
  return 0;
}
const srtRamy = function(a, b) {
  if (1-a["RamCur"]/a["RamAve"] < 1-b["RamCur"]/b["RamAve"]) {
    return 1;
  } else if (1-a["RamCur"]/a["RamAve"] > 1-b["RamCur"]/b["RamAve"]) {
    return -1;
  }
  return 0;
}
export default function Products() {
  const { state } = useContext(FilterContext);
  // const didMount = useRef(false);
  // state.init = "b";
  // getMerchant();
  useEffect(() => {
    // if (didMount.current == false) {
      getMerchant();
    // }
  }, [state]);
  function getMerchant() {
    fetch('http://localhost:3001/Products')
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
 
  console.log(state.filteredItems);
  const productsList = state.filteredItems.filter((product) => {
    return product.title.includes(state.searchKey) || !state.searchKey;
  });
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
          productsList.map((product) => <Card net = {state.net} key={product.id} {...product} />)
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

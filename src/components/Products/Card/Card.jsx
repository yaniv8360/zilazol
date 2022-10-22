import React, { useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import Interest from "./Interest";
import { Link } from "react-router-dom";
import { ProductContext, ProductDispath } from "../../Context/ContextProvider";
import Buttons from "../../Buttons/Buttons";
import { FilterContext } from "../../Context/ContextFilter";

export default function Card(props) {
  const { dispath } = useContext(ProductDispath);
  const { state } = useContext(ProductContext);
  // const { state1 } = useContext(FilterContext);

  const datas = state.allProducts.find((product) => product.id === props.id);
  const checkBasket = state.basket.some((product) => product.id === props.id);

  return (
    <div key={props.id} className="box">
      <Link to={`/${props.id}`}>
        <img className="product_img" src={props.image} alt="product" />
        <div className="content">
          <div className="title">
            <span>{props.title}</span>
          </div>
          <div className="price">
            {/* <span>{props.price.toLocaleString()} تومان</span> */}
            <span>{
              props.net === "שופרסל" ?
                (props.ShufCur != null ? (props.ShufCur.toLocaleString()) :
                  ("לא ידוע")) :
                (props.RamCur != null ? (props.RamCur.toLocaleString()) :
                  ("לא ידוע"))
            }
              מחיר</span>
          </div>
        </div>
      </Link>
      {checkBasket ? (
        <Buttons {...datas} />
      ) : (
        <button
          onClick={() => dispath({ type: "ADD_TO_BASKET", payload: props.id })}
          className="products_button buy_button"
        >
          خرید
          <FiShoppingCart className="buy_icon" />
        </button>
      )}
      <Interest interest={props.isInterest} id={props.id} />
    </div>
  );
}

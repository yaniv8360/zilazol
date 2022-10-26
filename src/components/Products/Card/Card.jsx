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
        {/* <div className="discount"><span>מחיר משתלם</span></div> */}
        <img className="product_img" src={props.image} alt="product" />
        <div className="content">
          <div className="title">
            <span>{props.title}</span>
          </div>
          <div className="price">
            {/* <span>{props.price.toLocaleString()} تومان</span> */}
            <span>
              מחיר ממוצע&nbsp;
              {
                // Number(props.density).toFixed(2)
                props.net === "שופרסל" ?
                  (props.ShufAve != null ? (Number(props.ShufAve).toFixed(1)) :
                    ("לא ידוע")) :
                  (props.RamAve != null ? (Number(props.RamAve).toFixed(1)) :
                    ("לא ידוע"))
              }</span>
            <span>
              &nbsp;מחיר&nbsp;
              {
                props.net === "שופרסל" ?
                  (props.ShufCur != null ? (Number(props.ShufCur).toFixed(1)) :
                    ("לא ידוע")) :
                  (props.RamCur != null ? (Number(props.RamCur).toFixed(1)) :
                    ("לא ידוע"))
              }</span>
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
      <div className="discount"><span>הנחה&nbsp;{
        props.net === "שופרסל" ?
          (props.ShufCur != null && props.ShufAve != null ?
            (Number(props.ShufCur) <= Number(props.ShufAve) ?
              (Number(100 * (1 - props.ShufCur / props.ShufAve)).toFixed(0).toString() + '%') :
              (Number(100 * (props.ShufCur / props.ShufAve - 1)).toFixed(0).toString() + '%-')
            ) :
            ("לא ידוע")) :
          (props.RamCur != null && props.RamAve != null ?
            (Number(props.RamCur) <= Number(props.RamAve) ?
              (Number(100 * (1 - props.RamCur / props.RamAve)).toFixed(0).toString() + '%') :
              (Number(100 * (props.RamCur / props.RamAve - 1)).toFixed(0).toString() + '%-')
            ) :
            ("לא ידוע"))
      }
      </span></div>
    </div>
  );
}

import React, { useContext } from "react";
import "./Basket.css";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { ProductContext, ProductDispath } from "../Context/ContextProvider";
import BasketItem from "./BasketItem";
import Offer from "./Offer";
import OfferBadge from "./OfferBadge";
import SendProducts from "./SendProducts";
import { FilterContext, FilterDispath } from "../Context/ContextFilter";


export default function Basket() {
  const { state } = useContext(FilterContext);
  const { dispath } = useContext(FilterDispath);
  return (
    <>
      <div className="favorite_container_linkBar">
        <div className="favorite_linkBar">
          <span>סל הקניות</span>
          <Link className="favorite_backLink" to={"/"}>
            <HiArrowRight />
            חזור אחורה
          </Link>
        </div>
        {state.basket.length > 0 && (
          <div className="favorite_linkBar">
            <div className="free_send_title">
              <img src="images/sound(1).jpg" alt="" />
              <span>
                שמחים שבחרתם מערכת זיל הזול!
              </span>
            </div>
          </div>
        )}
      </div>
      {state.basket.length > 0 ? (
        <div className="basket_container">
          <div className="basket_itemBox">
            {state.basket.map((product) => (
              <BasketItem net = {state.net} key={product.id} {...product} />
            ))}
          </div>
          <div className="basket_priceBox">
            {/* <OfferBadge /> */}
            <div className="basket_price">
              <span>מחיר הסל הכולל:</span>
              <span>|</span>
              <span>{state.totalPrice.toLocaleString()} ש"ח</span>
            </div>
            {/* {state.totalPriceAfterOffer > 0 && (
              <div className="basket_offer">
                <span>قیمت با تخفیف</span>
                <span>{state.totalPriceAfterOffer.toLocaleString()} تومان</span>
              </div>
            )}
            <Offer />
            <SendProducts />
            <div className="basket_send">
              <span>مجموع مبلغ قابل پرداخت</span>
              <span>{state.totalPriceFainal.toLocaleString()} تومان</span>
            </div> */}
            {/* <Link className="favorite_backLink" to={"/"}>
            <HiArrowRight />
            חזור אחורה
          </Link> */}
            <Link className="basket_button_buy" to={"/"}>המשך בתהליך הרכישה</Link>
            <button
              onClick={() => dispath({ type: "EMPTY_BASKET" })}
              className="basket_button_remove"
            >
              מחק {state.basket.length} פריטים מסל הקניות
            </button>
          </div>
        </div>
      ) : (
        <div className="favorite_empty">
          <img
            className="favorite_empty_img"
            src="images/empty-cart.png"
            alt=""
          />
          <span className="favorite_empty_title">סל הקניות ריק כעת</span>
        </div>
      )}
    </>
  );
}

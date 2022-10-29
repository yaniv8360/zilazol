import React, { useContext, useState } from "react";
// import "./Basket.css";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { ProductContext, ProductDispath } from "../Context/ContextProvider";
import BasketItem from "./BasketItem";
import Offer from "./Offer";
import OfferBadge from "./OfferBadge";
import SendProducts from "./SendProducts";

export default function Login() {
  const { state } = useContext(ProductContext);
  const { dispath } = useContext(ProductDispath);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const userExists = (item) => item.userName == username && item.password == password;
  const userNameExists = (item) => item.userName == username;
  const handleSubmit = (e) => {
    e.preventDefault();
    // const usr = { username: username, password: password };
    console.log(state.users.filter(userExists));
    if (state.users.filter(userNameExists).length != 0) {


      if (state.users.filter(userExists).length != 0) {
        dispath({ type: "LOGIN_USER", payload: username });

      }
      else {
        alert("userName " + username + " exists but password is wrong");
      }
    } else {
      dispath({ type: "NEW_USER", payload: username + ":" + password });
    }
  };

  return (
    <>
      <div className="favorite_container_linkBar">
        <div className="favorite_linkBar">
          <span>התחברות</span>
          <Link className="favorite_backLink" to={"/"}>
            <HiArrowRight />
            חזור אחורה
          </Link>
        </div>
      </div>
      {/* {state.basket.length > 0 ? (
        <div className="basket_container">
          <div className="basket_itemBox">
            {state.basket.map((product) => (
              <BasketItem key={product.id} {...product} />
            ))}
          </div>
          <div className="basket_priceBox">
            <OfferBadge />
            <div className="basket_price">
              <span>جمع سبد خرید</span>
              <span>|</span>
              <span>{state.totalPrice.toLocaleString()} تومان</span>
            </div>
            {state.totalPriceAfterOffer > 0 && (
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
            </div>
            <button className="basket_button_buy">ادامه فرایند خرید</button>
            <button
              onClick={() => dispath({ type: "EMPTY_BASKET" })}
              className="basket_button_remove"
            >
              حذف {state.basket.length} کالا از سبد خرید
            </button>
          </div>
        </div>
      ) : ( */}
      <div className="favorite_empty">
        <img
          className="favorite_empty_img"
          src="images/empty-cart.png"
          alt=""
        />
        <span className="favorite_empty_title">سبد خرید خالی است</span>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            value={username}
            placeholder="enter a username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <div>
            <label htmlFor="password">password: </label>
            <input
              type="password"
              value={password}
              placeholder="enter a password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      {/* )} */}
    </>
  );
}

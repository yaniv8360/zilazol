import React, { useContext, useEffect } from "react";
import { ProductContext, ProductDispath } from "../Context/ContextProvider";
import "./FavoritePage.css";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import FavoriteCard from "./FavoriteCard";
import ContextFilter, { FilterContext, FilterDispath } from "../Context/ContextFilter";

export default function FavoritePage(props) {
  const { state } = useContext(FilterContext);
  const { dispath } = useContext(FilterDispath);
  console.log(state.net);
  console.log(state.allItems);
  console.log(props.user);
  state.user = props.user;
  getFavoritsFromDB(state.user);
  useEffect(() => {
    getFavoritsFromDB(state.user);

  }, [state.favorites, state.user]);
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
  return (
    <>
      <div className="favorite_container_linkBar">
        <div className="favorite_linkBar">
          <span>מועדפים</span>
          <Link className="favorite_backLink" to={"/"}>
            <HiArrowRight />
            חזור אחורה
          </Link>
        </div>
      </div>
      <div className="favorite-wrapper">
        {state.favorites.length > 0 ? (
          <>
            <div>
              <button
                onClick={() => dispath({ type: "REMOVE_ALL_FAVORITE" })}
                className="favorite_removeAll"
              >
                מחק את כל המועדפים
              </button>
            </div>
            <div className="favorite_container">
              {state.favorites.map((product) => (
                <FavoriteCard key={product} {...state.allItems.find((prod) => prod.id === product)} user = {state.user} />
              ))}
            </div>
          </>
        ) : (
          <div className="favorite_empty">
            <img
              className="favorite_empty_img"
              src="images/empty_favorite.svg"
              alt=""
            />
            <span className="favorite_empty_title">רשימת המועדפים ריקה כעת</span>
          </div>
        )}
      </div>
    </>
  );
}

import React, { useContext, useEffect } from "react";
import { ProductContext, ProductDispath } from "../Context/ContextProvider";
import "./SpecialPage.css";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import SpecialCard from "./SpecialCard";
import ContextFilter, { FilterContext, FilterDispath } from "../Context/ContextFilter";

export default function SpecialPage(props) {
  const { state } = useContext(FilterContext);
  const { dispath } = useContext(FilterDispath);
  console.log(state.net);
  console.log(state.allItems);
  console.log(props.user);
  state.user = props.user;
  useEffect(() => {
  }, []);
  function getSpecialsFromDB(user) {
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
  }
  return (
    <>
      <div className="favorite_container_linkBar">
        <div className="favorite_linkBar">
          <span>במיוחד עבורך</span>
          <Link className="favorite_backLink" to={"/"}>
            <HiArrowRight />
            חזור אחורה
          </Link>
        </div>
      </div>
      <div className="favorite-wrapper">
        {state.specials.length > 0 ? (
          <>
            <div className="favorite_container">
              {state.specials.map((product) => (
                <SpecialCard key={product} {...state.allItems.find((prod) => prod.id === product)} user={state.user} />
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
            <span className="favorite_empty_title">רשימת המומלצים עבורך ריקה כעת</span>
          </div>
        )}
      </div>
    </>
  );
}

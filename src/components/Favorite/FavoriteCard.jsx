import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FilterContext, FilterDispath } from "../Context/ContextFilter";
import { ProductDispath } from "../Context/ContextProvider";

export default function FavoriteCard(props) {
  const { dispath } = useContext(FilterDispath);
  const { state } = useContext(FilterContext);
  console.log(props.user);
  state.user = props.user;

  return (
    <>
      {state.user != null && (
          <div key={props.id} className="favorite_card">
            <Link to={`/${props.id}`}>
              <img className="favorite_img" src={props.image} alt="favorite_image" />
              <div className="favorite_content">
                <div className="favorite_title">
                  <span>{props.title}</span>
                </div>
              </div>
            </Link>
            {/* {(props.user != null) && ( */}
            <button
              onClick={() => dispath({ type: "REMOVE_FAVORITE", payload: props.id })}
              className="favorite_button"
            >
              מחק מועדף
            </button>
          </div>)}
    </>

  );

}

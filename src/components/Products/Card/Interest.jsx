import React, { useContext } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FilterContext, FilterDispath } from "../../Context/ContextFilter";
import { ProductContext, ProductDispath } from "../../Context/ContextProvider";

export default function Interest(props) {
  const { state } = useContext(FilterContext);
  const { dispath } = useContext(FilterDispath);
  if (props.isInterest) {
  }
  return (
    <>
      {state.user != null && (
        <div
          onClick={() => dispath({ type: "ADD_FAVORITE", payload: props.id })}
          className="Interest"
        >
          {props.isInterest ? (
            <BsHeartFill className="heart_Fill" />
          ) : (
            <BsHeart className="heart" />
          )}
        </div>)}
    </>
  );
}

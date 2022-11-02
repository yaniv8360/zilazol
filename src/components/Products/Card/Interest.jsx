import React, { useContext } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FilterContext, FilterDispath } from "../../Context/ContextFilter";
import { ProductContext, ProductDispath } from "../../Context/ContextProvider";

export default function Interest(props) {
  const { state } = useContext(FilterContext);
  // const { state } = useContext(ProductContext);
  const { dispath } = useContext(FilterDispath);
  // const { dispath } = useContext(ProductDispath);
  // const isAddFavorite = state.allItems.find(
  //   (product) => product.id === props.id
  if (props.isInterest) {
    // console.log(props.isInterest);
  }
  // );
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

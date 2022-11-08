import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FilterContext, FilterDispath } from "../Context/ContextFilter";
import { ProductDispath } from "../Context/ContextProvider";

export default function SpecialCard(props) {
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
                  <span>{props.title}<br></br></span>
                  {props.RamCur != null && (
                  <span>מחיר רמי לוי: {Number(props.RamCur).toFixed(1)} ש"ח<br></br></span>)}
                  {props.ShufCur != null && (
                  <span>מחיר שופרסל: {Number(props.ShufCur).toFixed(1)} ש"ח<br></br></span>)}
                </div>
              </div>
            </Link>
          </div>)}
    </>

  );

}

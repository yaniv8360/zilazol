import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext, ProductDispath } from "../Context/ContextProvider";
import { HiArrowRight } from "react-icons/hi";
import "./Details.css";
import Buttons from "../Buttons/Buttons";
import { FilterContext, FilterDispath } from "../Context/ContextFilter";

export default function Details() {
  const navigate = useNavigate();
  const { state } = useContext(FilterContext);
  const { dispath } = useContext(FilterDispath);
  const params = useParams();
  const datas = state.allItems.find((product) => product.id == params.id);
  const checkBasket = state.basket.some((product) => product.id == params.id);

  return (
    <div className="details_container">
      <div className="details_linkBar">
        <span onClick={() => navigate(-1)} className="details_backLink">
          <HiArrowRight />
          بازگشت
        </span>
      </div>
      <div className="datails_card">
        <div className="image_box">
          <img className="card_image" src={datas.image} alt="card_image" />
          {/* <img src="images/kg.png" alt="" className="kg_image" /> */}
        </div>
        <div className="main_content_box">
          {/* <span className="card_category">{datas.category}</span> */}
          <div className="card_content">
            <span className="card_title">{datas.title}</span>
            <span style={{ color: "#8fc700" }}>|</span>
            {/* {datas.RamCur != null && (
              <div className="card_price">
                {datas.RamCur.toLocaleString()} מחיר רמי לוי
              </div>)}
            {datas.ShufCur != null && (
              <div className="card_price">
                {datas.ShufCur.toLocaleString()} מחיר שופרסל
              </div>)} */}
          </div>
          <div className="card_information">
            <ul>
              {datas.RamCur != null && (<li>{datas.RamCur.toLocaleString()}
              &nbsp;מחיר רמי לוי </li>)}
              {datas.ShufCur != null && (<li>{datas.ShufCur.toLocaleString()} 
              &nbsp;מחיר שופרסל </li>)}
            </ul>
          </div>
          {checkBasket && <Buttons {...datas} />}
          <button
            onClick={() =>
              dispath({ type: "ADD_TO_BASKET", payload: datas.id })
            }
            className="card_buy"
          >
            הוסף לסל
          </button>
        </div>
      </div>
    </div>
  );
}

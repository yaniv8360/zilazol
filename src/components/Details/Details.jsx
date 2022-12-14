import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext, ProductDispath } from "../Context/ContextProvider";
import { HiArrowRight } from "react-icons/hi";
import "./Details.css";
import Buttons from "../Buttons/Buttons";
import { FilterContext, FilterDispath } from "../Context/ContextFilter";

export default function Details(props) {
  const navigate = useNavigate();
  const { state } = useContext(FilterContext);
  const { dispath } = useContext(FilterDispath);
  const params = useParams();
  const datas = state.allItems.find((product) => product.id == params.id);
  const checkBasket = state.basket.some((product) => product.id == params.id);
  console.log(params.id);
  state.user = props.user;
  console.log(state.user);
  if (state.user != "") {
    console.log("came23DT");
    handleSpecials(state.user, params.id);
  }
  function handleSpecials(user, prod) {
    console.log("came38DT");
    getSpecialsFromDB(user);
    if (state.specials.filter(item => item.id == prod).length == 0) {
      console.log("came40DT");
      addSpecial(prod, state.user);
      console.log("came42DT");
      state.specials = [{ "id": prod, "count": 1 }, ...state.specials];
    } else {
      const elm = state.specials.find(item => item.id = prod);
      console.log("came285CF");
      updateSpecial(prod, state.user, elm.count + 1);

      state.specials = state.specials.map(item => item.id === prod ? {
        ...item, "count": item.count + 1
      } : item);
      console.log(state.specials);



    }
  }
  function addSpecial(prod, user) {
    console.log("came 65DT");
    console.log(prod);
    console.log(user);
    fetch('http://localhost:3001/usersViewsT/' + user + '/' + prod + '/1', { method: 'POST', })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
      });
    console.log("came 73DT");
  }
  function updateSpecial(prod, user, count) {
    console.log("came80CF");
    fetch('http://localhost:3001/usersViewsTUpdate/' + user + '/' + prod + '/' + count, { method: 'POST', })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
      });
  }
  function getSpecialsFromDB(user) {
    console.log("came84DT");
    fetch('http://localhost:3001/usersViewsT/' + user)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const records = data.map((item) => {
          return ({ "id": item.productID, "count": item.count })
        });
        console.log("came 93DT");
        state.specials = records;
        console.log(state.specials);
      });
    console.log("came 97DT");
  }


  return (
    <div className="details_container">
      <div className="details_linkBar">
        <span onClick={() => navigate(-1)} className="details_backLink">
          <HiArrowRight />
          ???????? ??????????
        </span>
      </div>
      <div className="datails_card">
        <div className="image_box">
          <img className="card_image" src={datas.image} alt="card_image" />
        </div>
        <div className="main_content_box">
          <div className="card_content">
            <span className="card_title">{datas.title}</span>
            <span style={{ color: "#8fc700" }}>|</span>
          </div>
          <div className="card_information">
            <ul>
              {datas.RamCur != null && (<li>{datas.RamCur.toLocaleString()}
                &nbsp;???????? ?????? ?????? </li>)}
              {datas.ShufCur != null && (<li>{datas.ShufCur.toLocaleString()}
                &nbsp;???????? ???????????? </li>)}
            </ul>
          </div>
          {checkBasket && <Buttons {...datas} />}
          <button
            onClick={() =>
              dispath({ type: "ADD_TO_BASKET", payload: datas.id })
            }
            className="card_buy"
          >
            ???????? ??????
          </button>
        </div>
      </div>
    </div>
  );
}
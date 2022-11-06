import React, { useContext, useEffect, useRef } from "react";
import "./Header.css";
import { AiOutlineShopping } from "react-icons/ai";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { BiHomeHeart } from "react-icons/bi";
import { ProductContext, ProductDispath } from "../Context/ContextProvider";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { FilterContext, FilterDispath } from "../Context/ContextFilter";

function Header() {
  // const { state } = useContext(ProductContext);
  const { state } = useContext(FilterContext);
  // const { dispath } = useContext(ProductDispath);
  const { dispath } = useContext(FilterDispath);
  // Get location for hide & show SearchBar Component
  const location = useLocation();
  const { pathname } = location;

  // run only if state changes and Not Mount
  const didMount = useRef(false);
  useEffect(() => {
    // if (didMount.current) {
    //   setTimeout(() => {
    //     dispath({ type: "REMOVE_CLASS" });
    //   }, 1000);
    // } else {
    //   didMount.current = true;
    // }
  }, [dispath, state.favorites, state]);

  const handleClick = () => { }
  //   setTimeout(() => {
  //     dispath({ type: "CHANGE_NET" });
  //   }, 1000);
  // state.net = "רמי לוי";
  // if (state.net == "שופרסל") {
  //   state = {
  //     ...state,
  //     net: "רמי לוי"
  //   };
  // } else {
  //   state = {
  //     ...state,
  //     net: "שופרסל"
  //   };
  //   console.log(state.net)
  // }
  // }
  return (
    <header className="header">
      <nav className="nav">
        <Link to={"/"} className="logo">
          מערכת זיל הזול
        </Link>
        {state.userName == "" ? (<><div>שלום אורח</div><div>
          {/* <button type="button" onClick={handleClick}>
            התחבר
          </button> */}
          <Link to={"/login"} >התחבר</Link>
        </div></>
        ) :
          (<div>שלום {state.userName}</div>)}

        {/* {state.net}
        <div>
          <button type="button" onClick={handleClick}>
            "החלף רשת"
          </button>
        </div> */}
        <div className="search_header">{pathname === "/" && <SearchBar />}</div>
        <div className="icon_Sopping_box">
          <Link to={"/basket"} className="shoppe_icon_box">
            <AiOutlineShopping className="shop_icon" />
            {state.basket.length > 0 && (
              <span className="badge_shope">{state.basket.length}</span>
            )}
          </Link>
          <Link
            to={"/favorite"}
            className={`mark_icon_box ${state.favorites.length > 0 ? "tada" : ""}`}
          >
            <BsFillBookmarkHeartFill className="mark_icon" />
            {state.favorites.length > 0 && (
              <span className="badge_mark">{state.favorites.length}</span>
            )}
          </Link>
          <Link
            to={"/special"}
            // className={`mark_icon_box ${state.specials.length > 0 ? "tada" : ""}`}
          >
            <BiHomeHeart className="mark_icon" />
            {/* {state.favorites.length > 0 && (
              <span className="badge_mark">{state.favorites.length}</span> */}
            {/* )} */}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;

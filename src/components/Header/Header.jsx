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
  const { state } = useContext(FilterContext);
  const { dispath } = useContext(FilterDispath);
  const location = useLocation();
  const { pathname } = location;

  const didMount = useRef(false);
  useEffect(() => {
  }, [dispath, state.favorites, state]);

  const handleClick = () => { }
  return (
    <header className="header">
      <nav className="nav">
        <Link to={"/"} className="logo">
          מערכת זיל הזול
        </Link>
        {state.userName == "" ? (<><div>שלום אורח</div><div>
          <Link to={"/login"} >התחבר</Link>
        </div></>
        ) :
          (<div>שלום {state.userName}</div>)}
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
          >
            <BiHomeHeart className="mark_icon" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;

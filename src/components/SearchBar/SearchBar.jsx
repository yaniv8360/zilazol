import React, { useContext, useEffect } from "react";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";
import { FilterContext, FilterDispath } from "../Context/ContextFilter";
import { useLocation } from "react-router-dom";

export default function SearchBar() {
  const { state } = useContext(FilterContext);
  const { dispath } = useContext(FilterDispath);

  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    dispath({ type: "SEARCH_KEYWORD", payload: "" });
  }, [pathname]);

  const searchKeywordHandler = (e) => {
    dispath({ type: "SEARCH_KEYWORD", payload: e.target.value });
  };
  return (
    <div className="searchBar_box">
      <input
        onChange={(e) => searchKeywordHandler(e)}
        type="text"
        placeholder="חיפוש מוצר ..."
        value={state.searchKey}
      />
      <span>
        <FiSearch />
      </span>
    </div>
  );
}

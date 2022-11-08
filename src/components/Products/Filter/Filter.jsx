import React, { useContext } from "react";
import { FilterContext, FilterDispath } from "../../Context/ContextFilter";
import { ProductContext } from "../../Context/ContextProvider";
import "./Filter.css";

export default function Filter() {
  const { dispath } = useContext(FilterDispath);
  const { state } = useContext(FilterContext);
  return (
    <div className="filter_container">
      <div className="filter_btnBox">
      <button
          onClick={() => {
            dispath({ type: "CHANGE_NET" })
          }
          }
          className="filter_btn"
        >
          החלף רשת
        </button>
        {state.net}
        <button onClick={() => dispath({ type: "ALL" })} className="filter_btn">
          כל המוצרים
        </button>
        <button
          onClick={() => dispath({ type: "VEGETABLE" })}
          className="filter_btn"
        >
          פירות וירקות
        </button>
        <button
          onClick={() => dispath({ type: "FRUIT" })}
          className="filter_btn"
        >
          חלב, ביצים וסלטים
        </button>
        <button
          onClick={() => dispath({ type: "NUTS" })}
          className="filter_btn"
        >
          בשר ודגים
        </button>
        <button
          onClick={() => dispath({ type: "BEANS" })}
          className="filter_btn"
        >
          שימורים, בישול ואפיה
        </button>
       
        
      </div>
    </div>
  );
}

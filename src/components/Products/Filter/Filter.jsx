import React, { useContext } from "react";
import { FilterContext, FilterDispath } from "../../Context/ContextFilter";
import { ProductContext } from "../../Context/ContextProvider";
import "./Filter.css";

export default function Filter() {
  const { dispath } = useContext(FilterDispath);
  const { state } = useContext(FilterContext);
  // const { state1 } = useContext(ProductContext);
  return (
    <div className="filter_container">
      <div className="filter_btnBox">
        <button onClick={() => dispath({ type: "ALL" })} className="filter_btn">
          همه
        </button>
        <button
          onClick={() => dispath({ type: "VEGETABLE" })}
          className="filter_btn"
        >
          سبزیجات
        </button>
        <button
          onClick={() => dispath({ type: "FRUIT" })}
          className="filter_btn"
        >
          میوه
        </button>
        <button
          onClick={() => dispath({ type: "NUTS" })}
          className="filter_btn"
        >
          خشکبار
        </button>
        <button
          onClick={() => dispath({ type: "BEANS" })}
          className="filter_btn"
        >
          حبوبات
        </button>
        <button
          onClick={() => {
            // if (state1 != null) {
            //   console.log("came");
            //   if (state1.net == "שופרסל") {
            //     state1.net = "רמי לוי";
            //   } else {
            //     state1.net = "שופרסל";
            //   }
            // }
            dispath({ type: "CHANGE_NET" })
          }
          }
          className="filter_btn"
        >
          החלף רשת
        </button>
        {state.net}
      </div>
    </div>
  );
}

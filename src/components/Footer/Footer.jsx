import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const handelToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer className="footer">
      <span onClick={handelToTop} className="go_top">
        <FaArrowUp />
      </span>
      <div className="footer_first">
        <img src="images/memory.png" alt="Memory Game" />
        <div className="footer_btn_title_box">
          <p>
            שמחים שבחרת במערכת זיל הזול, מקווים שהמידע שלנו יהיה לך לעזר במטרה לחסוך ולהקל על יוקר המחיה!
          </p>
          <a
            target={"_blank"}
            href="https://www.shufersal.co.il/online/he/A"
            className="btn_link_to_game"
            rel="noreferrer"
          >
           שופרסל אונליין
          </a>
          <a
            target={"_blank"}
            href="https://www.rami-levy.co.il/he/online/market"
            className="btn_link_to_game"
            rel="noreferrer"
          >
            רמי לוי אונליין
          </a>
        </div>
      </div>
      <div className="footer_last">
        <span>גישה מהירה</span>
        <div className="footer_link_box">
          <Link to={"/basket"}>סל הקניות</Link>
          <Link to={"/favorite"}>רשימת המועדפים</Link>
          <a
            target={"_blank"}
            href="https://github.com/yaniv8360/zilazol"
            rel="noreferrer"
          >
          קוד המקור של הפרויקט
          </a>
        </div>
      </div>
    </footer>
  );
}

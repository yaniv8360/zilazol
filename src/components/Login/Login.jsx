import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import "./Login.css";
import { ProductContext, ProductDispath } from "../Context/ContextProvider";
import { FilterContext, FilterDispath } from "../Context/ContextFilter";

export default function Login(props) {
  const { state } = useContext(FilterContext);
  const { dispath } = useContext(FilterDispath);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const userExists = (item) => item.userName === username && item.password === password;
  const userNameExists = (item) => item.userName === username;
  useEffect(() => {
    getUsers();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state.users.filter(userExists));
    if (state.users.filter(userNameExists).length != 0) {
      if (state.users.filter(userExists).length != 0) {
        dispath({ type: "LOGIN_USER", payload: username });
        props.fn(username);
      }
      else {
        alert("userName " + username + " exists but password is wrong");
      }
    } else {
      dispath({ type: "NEW_USER", payload: username + ":" + password });
    }
  };
  function getUsers() {
    fetch('http://localhost:3001/Users/1')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const records = data.map((item) => {
          return ({
            userName: item.userName, password: item.password
          })
        });
        state.users = records;
        console.log(state.users);
      });
    setTimeout(() => {
      dispath({ type: "ALL" });
    }, 100);
  }
  return (
    <>
      <div className="favorite_container_linkBar">
        <div className="favorite_linkBar">
          <span>התחברות</span>
          <Link className="favorite_backLink" to={"/"}>
            <HiArrowRight />
            חזור אחורה
          </Link>
        </div>
      </div>
      <div className="login_Place">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">שם משתמש: </label>
          <input
            type="text"
            value={username}
            placeholder="הכנס שם משתמש"
            onChange={({ target }) => setUsername(target.value)}
          />
          <div>
            <label htmlFor="password">סיסמה: </label>
            <input
              type="password"
              value={password}
              placeholder="הכנס סיסמה"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">התחבר</button>
        </form>
      </div>
    </>
  );
}

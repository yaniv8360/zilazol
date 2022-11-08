import { Navigate, useRoutes } from 'react-router-dom';
import Basket from './components/Basket/Basket';
import Login from './components/Login/Login';
import ContextFilter from './components/Context/ContextFilter';
import ContextProvider from './components/Context/ContextProvider';
import Details from './components/Details/Details';
import FavoritePage from './components/Favorite/FavoritePage';
import SpecialPage from './components/special/SpecialPage';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import React, { useState, useEffect } from 'react';



function App() {
  const [user, setUser] = useState("");
  let router = useRoutes([
    { path: '/', element: <Products user={user} /> },
    { path: '/:id', element: <Details user={user} /> },
    { path: '/favorite', element: <FavoritePage user={user} /> },
    { path: '/special', element: <SpecialPage user={user} /> },
    { path: '/basket', element: <Basket /> },
    { path: '/login', element: <Login user={user} fn={(usr) => setUser(usr)} /> },
    { path: '*', element: <Navigate to={'/'} /> },
  ])
  return (
      <ContextFilter>
        <Header />
        {router}
      </ContextFilter>
  );
}
function App1() {
  return ('abcdefghijklmnop');
}
let str42 = 'abcdefghijklmnopqrst';
export { str42 }
export default App;
export { App1 };

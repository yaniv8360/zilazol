import { Navigate, useRoutes } from 'react-router-dom';
import Basket from './components/Basket/Basket';
import ContextFilter from './components/Context/ContextFilter';
import ContextProvider from './components/Context/ContextProvider';
import Details from './components/Details/Details';
import FavoritePage from './components/Favorite/FavoritePage';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import React, { useState, useEffect } from 'react';
// import { hoser_moh } from './Data';
// import { type } from '@testing-library/user-event/dist/type';



function App() {
  let router = useRoutes([
    { path: '/', element: <Products /> },
    { path: '/:id', element: <Details /> },
    { path: '/favorite', element: <FavoritePage /> },
    { path: '/basket', element: <Basket /> },
    { path: '*', element: <Navigate to={'/'} /> },
  ])
  return (
    <ContextProvider>
      <ContextFilter>
        <Header />
        {router}
        {/* {App6()} */}
      </ContextFilter>
    </ContextProvider>
  );
}
function App1() {
  // return (<div>no_chance</div>);
  // console.log('sb');
  // var hosein = 'sb';
  // var hoser = require("./Data").hoser_moh;

  return ('abcdefghijklmnop');

}
function App2() {
  const [merchants, setMerchants] = useState(false);
  useEffect(() => {
    getMerchant();
  }, []);
  function getMerchant() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setMerchants(data);
      });
  }
  function createMerchant() {
    let name = prompt('Enter merchant name');
    let email = prompt('Enter merchant email');
    fetch('http://localhost:3001/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }
  function deleteMerchant() {
    let id = prompt('Enter merchant id');
    fetch(`http://localhost:3001/merchants/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }
  return (
    <div>
      {merchants ? merchants : 'There is no merchant data available'}
      <br />
      <button onClick={createMerchant}>Add merchant</button>
      <br />
      <button onClick={deleteMerchant}>Delete merchant</button>
    </div>
  );
}
function getMerchant1() {
  fetch('http://localhost:3001')
    .then(response => {
      return response.text();
    })
    .then(data => {
      App1();
    });
}
function App3() {
  const [merchants, setMerchants] = useState(false);
  useEffect(() => {
    getMerchant();
  }, []);
  function getMerchant() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setMerchants(data);
      });
  }
  function createMerchant() {
    let name = prompt('Enter merchant name');
    let email = prompt('Enter merchant email');
    fetch('http://localhost:3001/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }
  function deleteMerchant() {
    let id = prompt('Enter merchant id');
    fetch(`http://localhost:3001/merchants/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }
  return ("no_chance");
}

function App4() {
  console.log('sb');
  // fetch('http://localhost:3001')
  //   .then((response) => response.json())
  //   .then((actualData) => console.log(actualData));
  // return "no_chance at evning";

  const [merchants, setMerchants] = useState(false);
  useEffect(() => {
    getMerchant();
  }, []);
  function getMerchant() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setMerchants(data);
      });
  }
  return (
    <div>
      {merchants ? merchants : 'There is no merchant data available'}

    </div>
  );
}
function App5() {
  const [merchants, setMerchants] = useState(false);
  useEffect(() => {
    getMerchant();
  }, []);
  function getMerchant() {
    fetch('http://localhost:3001')
      .then(response => {
        // liel is the king
        return response.json();
      })
      .then(data => {
        console.log("id is:");
        console.log(data[0].id);
        console.log("name is:");
        console.log(data[0].name);
        console.log("email is:");
        console.log(data[0].email);
        setMerchants(data);
      });
  }
  function createMerchant() {
    let name = prompt('Enter merchant name');
    let email = prompt('Enter merchant email');
    fetch('http://localhost:3001/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }
  function deleteMerchant() {
    let id = prompt('Enter merchant id');
    fetch(`http://localhost:3001/merchants/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }
  // const myJSON = '{"name":"John", "age":30, "car":null}';
  // const myObj = JSON.parse(myJSON);
  // const x = myObj.name;
  // console.log(x);
  // const obj = JSON.parse('{"name":"John", "age":30, "car":null}');
  // const data = JSON.parse(merchants)
  // console.log(data);
  // console.log(data.name);



  // console.log(obj);
  // const chishalon = obj.age;
  // console.log(chishalon);
  // const y = JSON.parse(eval(merchants)[0]);
  // console.log(merchants);
  // console.log("hi");

  // console.log(eval(merchants)[0]);
  // console.log(eval(merchants)[0].name);



  // console.log(eval(merchants)[0]);
  // console.log(obj.);
  return (
    <div>
      {/* {merchants ? merchants : 'There is no merchant data available'} */}
      {/* {console.log(merchants.type)} */}
      {console.log("chishalon_hadash")}
      {"chishalon"}
      {/* {merchants} */}
      {"chishalon movhak"}

    </div>
  );
}

function App6() {
  const [merchants, setMerchants] = useState(false);
  useEffect(() => {
    getMerchant();
  }, []);
  function getMerchant() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data[0].name)
        setMerchants(data[0].name);
      });
  }
  function createMerchant() {
    let name = prompt('Enter merchant name');
    let email = prompt('Enter merchant email');
    fetch('http://localhost:3001/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }
  function deleteMerchant() {
    let id = prompt('Enter merchant id');
    fetch(`http://localhost:3001/merchants/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }
  return (
    <div>
      {/* {merchants ? merchants : 'There is no merchant data available'}
      <br />
      <button onClick={createMerchant}>Add merchant</button>
      <br />
      <button onClick={deleteMerchant}>Delete merchant</button> */}
      {/* {merchants} */}
      {/* {console.log(getMerchant())} */}
      {merchants}
      {"ein moh"}
    </div>
  );
}
function getMerchant12() {
  var z = "abcdsefg";

  fetch('http://localhost:3001')
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data[0].name)
      // setMerchants(data);
      z = data;
      console.log("print the z:");
      console.log(z);
      // return(data[0].email);
    });
    return(z);
}
// const x = 'no_succesd';
let str42 = 'abcdefghijklmnopqrst';
export {str42}

// export { x };


export default App;
export { App1 };
// export { App3 };
// export { App4 };
// export { App5 };
// // export { x };
// // export const str = 'Helopwlo world';
// // export const hoser_moh_new = 'Hello world';
// export const hoser_moh_im = 'Hello_i_m';





// export { getMerchant1 };

// export  {getMerchant} from App2;




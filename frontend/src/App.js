import React from 'react';


function App() {

async function createCart(url) {

    console.log("New cart created");

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });

    return response;

  }

async function updateCart(url) {

    console.log("Cart updated");

    const response = await fetch(url, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });

    return response;

  }

  return (
    <div>
     <button onClick={() => createCart("http://localhost:8080/my-second-hand/carts")}>Create cart</button>
     <button onClick={() => updateCart("http://localhost:8080/my-second-hand/carts/id/2022313285?name=prod4&quantity=1")}>Update cart</button>
    </div>
  );
}

export default App;

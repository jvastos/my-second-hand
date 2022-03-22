import React from 'react';
import { useState, useEffect } from 'react';


function App() {

const baseURL = "http://localhost:8080/my-second-hand/carts";

const [cart, setCart] = useState("cart initiated");  

/* useEffect(() => {
  setCart("cart changed by useEffect");
}, []) */

async function createCart() {

    console.log("New cart created");

    const response = await fetch(baseURL, {
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

async function getCart() {

    const response = await fetch(baseURL + "/id/2022313285");
    let responseFormat = await response.json();
    setCart(responseFormat[0].productsList.map(i => <li key={Math.random()}> {"name: " + i.name.toString() + " " + "quantity: " + i.quantity.toString()}</li>));
    console.log(responseFormat[0].productsList.map(i => i.name + " x " + i.quantity.toString()));

  }

  /* function test() {
    setCart("cart changed by test function");
    console.log(cart);
  } */

async function updateCart() {

    console.log("Cart updated");

    const response = await fetch(baseURL + "/id/2022313285?name=prod4&quantity=1", {
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
      <button onClick={createCart}>Create cart</button>
      <button onClick={() => getCart("http://localhost:8080/my-second-hand/carts/id/2022313285")}>Get cart</button>
      <button onClick={updateCart}>Update cart</button>
      <ul>
        {cart}
      </ul>
    </div>
  );
}

export default App;

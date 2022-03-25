import React from 'react';
import { useState, useEffect } from 'react';
import Products from './components/Products'
import AddToCartButton from './components/AddToCartButton';
import Cart from './components/Cart';


function App() {

/* const baseURLcarts = "http://localhost:8080/my-second-hand/carts"; */

const [searchTerm, setSearchTerm] = useState("");
const [termToBeSearched, setTermToBeSearched] = useState();

/* async function getCart() {

    const response = await fetch(baseURLcarts + "/id/2022313285");
    let responseFormat = await response.json();
    setCart(responseFormat[0].productsList.map(i =>
        <tr key={Math.random()}>
          <td>{i.name}</td>
          <td>{i.quantity}</td>
        </tr>
    ));
    console.log(responseFormat[0].productsList);

  } */

/* async function updateCart() {

    console.log("Cart updated");

    const response = await fetch(baseURLcarts + "/id/2022313285?name=prod4&quantity=1", {
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

  } */

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleClick() {
    const termToBeSearched = searchTerm;
    setTermToBeSearched(termToBeSearched);
  }

  return (
    <>
      {/* <button 
      onClick={getCart} 
      className="btn btn-primary">Get cart</button>
      <button 
      onClick={updateCart} 
      className="btn btn-primary">Update cart</button> */}
      <div className="d-flex justify-content-end">
        <Cart />
      </div>
      <table>
       {/*  <tbody>
          {cart}
        </tbody> */}
      </table>
      <div className="container">
        <div className="input-group m-3">
          <input 
          type="text" 
          className="form-control" 
          placeholder="Search for product names" 
          aria-label="Search" 
          aria-describedby="button-search" 
          onChange={handleChange}/>
          <button 
          className="btn btn-outline-secondary" 
          type="button" 
          id="button-search" 
          onClick={handleClick}>Search</button>
        </div>
        <div className="row">
          <Products termtobesearched={termToBeSearched}/>
        </div>
      </div>
    </>
  );
}

export default App;
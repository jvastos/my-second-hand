import React from 'react';
import { useState, useEffect } from 'react';
import Products from './components/Products'
import AddToCartButton from './components/AddToCartButton';
import Cart from './components/Cart';

const CartIdContext = React.createContext();
const CartContentContext = React.createContext();

function App() {

/* const baseURLcarts = "http://localhost:8080/my-second-hand/carts"; */
const [cartId, setCartId] = useState("");
const [cartContent, setCartContent] = useState("Cart is empty");
const [searchTerm, setSearchTerm] = useState("");
const [termToBeSearched, setTermToBeSearched] = useState();

useEffect(() => {
    async function createCart() {

        const date = new Date();

        const todaysDate =`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;

        const randomNumber = Math.floor(Math.random() * 1000);

        const generatedCartId = `${todaysDate}${randomNumber}`;

        const cart = { 
            _id : generatedCartId,
            productsList: []
        };

        const response = await fetch("http://localhost:8080/my-second-hand/carts", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(cart)
        }
    )

    console.log("New cart created");
    setCartId(generatedCartId);
    console.log(generatedCartId);

    return response
    }
    createCart();
}, [])

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
      <CartIdContext.Provider value={cartId}>
      <CartContentContext.Provider value={cartContent}>
        <div className="d-flex justify-content-end">
          <Cart cartcontent={cartContent} />
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
            <Products
            setcartcontent={setCartContent}
            termtobesearched={termToBeSearched}
            cartcontent={cartContent}/>
          </div>
        </div>
      </CartContentContext.Provider>
      </CartIdContext.Provider>
    </>
  );
}

export { App, CartIdContext, CartContentContext } ;
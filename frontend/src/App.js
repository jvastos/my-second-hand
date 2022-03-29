import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Products from './components/Products'
import CartPreview from './components/CartPreview';
import Cart from './components/Cart';

const CartIdContext = React.createContext();
const CartContentContext = React.createContext();

function App() {

const baseURLcarts = 'http://localhost:8080/my-second-hand/carts';
const [cartId, setCartId] = useState('');
const [cartContent, setCartContent] = useState('Cart is empty');
const [searchTerm, setSearchTerm] = useState('');
const [termToBeSearched, setTermToBeSearched] = useState();

console.log('cartContent =', cartContent);

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

        const response = await fetch(baseURLcarts, {
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

    console.log('New cart created');
    setCartId(generatedCartId);
    console.log(generatedCartId);

    return response
    }
    createCart();
}, [])

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleClick() {
    const termToBeSearched = searchTerm;
    setTermToBeSearched(termToBeSearched);
  }

  return (
    <>
      <Router>
        <CartIdContext.Provider value={cartId}>
        <CartContentContext.Provider value={cartContent}>
          <Switch>
            <Route exact path='/'>
              <div className='d-flex justify-content-end'>
                <CartPreview 
                cartid={cartId}
                cartContent={cartContent} />
              </div>
              <div className='container'>
                <div className='input-group m-3'>
                  <input 
                  type='text' 
                  className='form-control' 
                  placeholder='Search for product names' 
                  aria-label='Search' 
                  aria-describedby='button-search' 
                  onChange={handleChange}/>
                  <button 
                  className='btn btn-outline-secondary' 
                  type='button' 
                  id='button-search' 
                  onClick={handleClick}>Search</button>
                </div>
                <div className='row'>
                  <Products
                  setCartContent={setCartContent}
                  cartContent={cartContent}
                  termToBeSearched={termToBeSearched}/>
                </div>
              </div>
            </Route>
            <Route path='/cart'>
              <Cart cartContent={cartContent}/>
            </Route>
          </Switch>
        </CartContentContext.Provider>
        </CartIdContext.Provider>
      </Router>
    </>
  );
}

export { App, CartIdContext, CartContentContext } ;
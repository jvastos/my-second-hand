import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home'
import Orders from './components/Orders'
import Cart from './components/Cart';
import { API_BASE_URL } from './config';

const CartIdContext = React.createContext();

function App() {

const baseURLcarts = `${API_BASE_URL}/carts`;
const [cartId, setCartId] = useState('');
const [cartContent, setCartContent] = useState('Cart is empty');

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
}, [baseURLcarts])

  return (
    <>
      <Router>
        <CartIdContext.Provider value={cartId}>
          <Switch>
            <Route exact path='/'>
              <Home 
              cartId={cartId}
              cartContent={cartContent}
              setCartContent={setCartContent}/>
            </Route>
            <Route path='/cart'>
              <Cart cartContent={cartContent}/>
            </Route>
            <Route path='/orders'>
              <Orders />
            </Route>
          </Switch>
        </CartIdContext.Provider>
      </Router>
    </>
  );
}

export { App, CartIdContext } ;
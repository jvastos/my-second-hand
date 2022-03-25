import React from "react";
import { useState, useEffect } from "react"
import Cart from "./Cart";

function AddToCartButton(props) {

    const baseURLcarts = "http://localhost:8080/my-second-hand/carts";

    function updateCart() {

        fetch(baseURLcarts + `/id/${Cart.cartId}` + "?name=" + `${props.prodname}`, { //NEED TO SOLVE THIS: HOW TO CHECK THE Cart.cartId VALUE
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
        console.log('added to cart');
        console.log(props);
    }
    
    return (
    <button 
    onClick={updateCart}
    className="btn btn-primary col-4 m-1">Add to cart</button>
    )
}

export default AddToCartButton;
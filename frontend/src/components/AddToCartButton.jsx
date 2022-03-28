import React from "react";
import { useState, useEffect, useContext } from "react"
import Cart from "./Cart";
import { CartIdContext, CartContentContext } from "../App";

function AddToCartButton(props) {
    const cartId = useContext(CartIdContext);
    const setCartContent = props.setcartcontent;
    const baseURLcarts = "http://localhost:8080/my-second-hand/carts";

    async function updateCart() {

        await fetch(baseURLcarts + `/id/${cartId}` + "?name=" + `${props.prodname}`, {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
          })
          .catch (error => {console.log("There was an error", error)});
    
        console.log('added to cart');
        await fetch(baseURLcarts + `/id/${cartId}`)
        .then(response => response.json())
        .then(data => {setCartContent(data[0].productsList); console.log("data[0].productsList =", data[0].productsList)})
        .catch (error => {console.log("There was an error", error)});
    }
    
    return (
    <button 
    onClick={updateCart}
    className="btn btn-primary col-4 m-1">Add to cart</button>
    )
}

export default AddToCartButton;
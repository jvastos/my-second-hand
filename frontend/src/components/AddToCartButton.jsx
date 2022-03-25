import React from "react";
import { useState, useEffect } from "react"
import Cart from "./Cart";

function AddToCartButton(props) {

    const baseURLcarts = "http://localhost:8080/my-second-hand/carts";

    function updateCart() {

        fetch(baseURLcarts + `/id/2022313285` + "?name=" + `${props.prodname}`, {
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
        console.log(props);
    }
    
    return (
    <button 
    onClick={updateCart}
    className="btn btn-primary col-4 m-1">Add to cart</button>
    )
}

export default AddToCartButton;
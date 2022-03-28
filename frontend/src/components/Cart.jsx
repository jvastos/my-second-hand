import React from "react";
import { useState, useEffect, useContext, useRef } from "react"
import { CartIdContext, CartContentContext } from "../App";


function Cart(props) {

    let currentCartContent = props.cartcontent;

    /* const cartId = useContext(CartIdContext);
    const baseURLcarts = "http://localhost:8080/my-second-hand/carts";

    let currentCartContent;

    console.log("props.cartcontent =", props.cartcontent);

    useEffect(() => {

        async function getCurrentCart() {

        await fetch(baseURLcarts + `/id/${cartId}`)
        .then(response => response.json())
        .then(data => currentCartContent = (data[0].productsList))
        .catch (error => {console.log("There was an error", error)});

        }
        getCurrentCart();
    }) */

    return (    
    <div className="card col-1 text-center m-2">
        {currentCartContent != "Cart is empty"?currentCartContent.map(i => 
            <div key={Math.random()}>
                <h3 >{i.name} x {i.quantity}</h3>
        </div>
        )
        :<h3>Cart is empty</h3>}
    </div>
    )
}

export default Cart;

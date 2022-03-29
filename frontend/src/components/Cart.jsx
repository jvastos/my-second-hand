import React from "react";
import { useState, useEffect, useContext, useRef } from "react"
import { CartIdContext, CartContentContext } from "../App";


function Cart(props) {

    let currentCartContent = props.cartcontent;

    const [currrentCartQuantity, setCurrrentCartQuantity] = useState(0);

    useEffect(() => {
        if(currentCartContent != "Cart is empty") {
            setCurrrentCartQuantity(currentCartContent.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0));
        }
    })

    return (    
    <div className="card col-1 text-center m-2">
        {currentCartContent != "Cart is empty"?<h6>Your cart has {currrentCartQuantity} items.</h6>:<h3>Cart is empty</h3>}
    </div>
    )
}

export default Cart;

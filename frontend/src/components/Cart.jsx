import React from "react";
import { useState, useEffect, useContext, useRef } from "react"
import { CartIdContext, CartContentContext } from "../App";


function Cart(props) {

    console.log("cart content", props.cartcontent);

    return (    
    <div className="card col-1 text-center m-2">
        {props.cartcontent!="Cart is empty"?props.cartcontent.map(i => 
            <div key={Math.random()}>
                <h3 >{i.name} x {i.quantity}</h3>
        </div>
        )
        :<h3>Cart is empty</h3>}
    </div>
    )
}

export default Cart;

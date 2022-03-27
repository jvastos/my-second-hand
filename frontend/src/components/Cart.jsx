import React from "react";
import { useState, useEffect, useContext } from "react"
import { CartContentContext } from "../App";


function Cart() {

    let cartContent = useContext(CartContentContext);

    console.log("cartcontent", cartContent);
   

    return (    
    <div className="card col-1 text-center m-2">
        {cartContent!="Cart is empty"?cartContent.map(i => 
            <div key={Math.random()}>
                <h3 >{i.name} x {i.quantity}</h3>
        </div>
        )
        :<h3>Cart is empty</h3>}
    </div>
    )
}

export default Cart;

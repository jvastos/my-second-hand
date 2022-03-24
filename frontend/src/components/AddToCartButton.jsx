import React from "react";
import { useState, useEffect } from "react"

function AddToCartButton() {

    function handleClick() {
        console.log('added to cart');
    }
    
    return (
    <button 
    onClick={handleClick}
    className="btn btn-primary col-4 m-1">Add to cart</button>
    )

}

export default AddToCartButton;
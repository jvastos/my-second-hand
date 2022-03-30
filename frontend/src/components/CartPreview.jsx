import React from "react";
import { useState, useEffect} from "react"
import { Link } from "react-router-dom";


function CartPreview(props) {

    let currentCartContent = props.cartContent;

    const [currrentCartQuantity, setCurrrentCartQuantity] = useState(0);

    useEffect(() => {
        if(currentCartContent !== "Cart is empty") {
            setCurrrentCartQuantity(currentCartContent.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0));
        }
    }, [currentCartContent])

    return (    
    <Link 
    to='/cart' 
    className="d-flex card col-2 text-center m-2">
        <div>
            {currentCartContent !== "Cart is empty"?
            <h6 className="card-title m-2">Your cart has {currrentCartQuantity} {currrentCartQuantity>1?'items':'item'}</h6>
            :<h6 className="card-title m-2">Cart is empty</h6>}
        </div>
    </Link>
    )
}

export default CartPreview;

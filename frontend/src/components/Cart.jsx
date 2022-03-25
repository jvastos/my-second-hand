import React from "react";
import { useState, useEffect } from "react"

function Cart() {

    const [cart, setCart] = useState("cart initiated");
    const [cartId, setCartId] = useState("");
    const [numberOfItemsInCart, setNumberOfItemsInCart] = useState("Cart is empty");

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

            const response = await fetch("http://localhost:8080/my-second-hand/carts", {
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

        console.log("New cart created");
        setCartId(generatedCartId);
        console.log(generatedCartId);

        return response
        }
        createCart();
    }, [])
    

    return (    
    <div className="card col-1 text-center m-2">
        <h3>{numberOfItemsInCart!="Cart is empty"?`Your cart has ${numberOfItemsInCart} items}`:"Cart is empty"}</h3>
    </div>
    )
}

export default Cart;

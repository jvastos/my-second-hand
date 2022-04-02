import React from "react";
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from "../config";

function CheckoutButton (props) {

    const currentCart = props.cartContent;
    const baseURLorders = `${API_BASE_URL}/orders`;
    const history = useHistory();

    async function createOrder(){

        const date = new Date();

        const todaysDate =`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;

        const randomNumber = Math.floor(Math.random() * 1000);

        const orderId = `${todaysDate}${randomNumber}`;

        const order = {  
            _id : orderId,
            isShipped: false,
            productsList: currentCart
        };

        await fetch(baseURLorders, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(order)
        })
        .catch (error => {console.log('There was an error while posting the order', error)});
        alert('Order created. Thank you for shopping with us!');
        history.push('/');
        window.location.reload(false);
    }
    
    return (
        <button 
        onClick={createOrder}
        className='btn btn-primary col-5 m-3'>Checkout</button>
    )
}

export default CheckoutButton;
import React from 'react';
import { useContext } from 'react'
import { CartIdContext } from '../App';
import { API_BASE_URL } from '../config';

function DeleteFromCartButton(props) {
    const cartId = useContext(CartIdContext);
    const setCartContent = props.setCartContent;
    const prodName = props.prodName
    const baseURLcarts = `${API_BASE_URL}/carts`;

    async function deleteProdFromCart(e) {

        await fetch(baseURLcarts + `/id/${cartId}/deleteProd/${prodName}`, {
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
          .catch (error => {console.log('There was an error deleting the product from the cart', error)});
    
        console.log('deleted from cart');
        await fetch(baseURLcarts + `/id/${cartId}`)
        .then(response => response.json())
        .then(data => {setCartContent(data[0].productsList); console.log('data[0].productsList =', data[0].productsList)})
        .catch (error => {console.log('There was an error while fetching the cart to update cartContent', error)});
    }
    
    return (
    <button 
    onClick={deleteProdFromCart}
    className='btn btn-outline-secondary btn-sm m-3'>x</button>
    )
}

export default DeleteFromCartButton;
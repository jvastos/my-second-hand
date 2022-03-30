import React from 'react';
import { Link } from 'react-router-dom';
import CheckoutButton from './CheckoutButton';

function Cart(props) {
    let currentCartContent = props.cartContent;

    return (
    <div className='d-flex justify-content-center'>

        <div className='card col-1 text-center m-5 w-50 d-block'>

        <Link to='/' className='m-3 d-block'>back to home</Link>

        {currentCartContent !== 'Cart is empty'?
        currentCartContent.map(i => 
            <div key={Math.random()}>
                <h3>{i.name} x {i.quantity}</h3>
            </div>)
        :<h3>Cart is empty</h3>}

        <CheckoutButton cartContent={props.cartContent} />

        </div>

    </div>
    )
}

export default Cart;
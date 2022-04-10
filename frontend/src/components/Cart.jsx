import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import CheckoutButton from './CheckoutButton';
import DeleteFromCartButton from './DeleteFromCartButton';

function Cart(props) {
    let currentCartContent = props.cartContent;
    let setCartContent = props.setCartContent;

    const [currrentCartQuantity, setCurrrentCartQuantity] = useState(0);

    useEffect(() => {
        if(currentCartContent !== "Cart is empty") {
            setCurrrentCartQuantity(currentCartContent.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0));
        }
    }, [currentCartContent])
    

    return (
    <div className='container d-flex justify-content-center'>

        <div className='card col-1 text-center m-5 w-50 d-block'>

        <Link to='/' className='m-3 d-block'>back to home</Link>

        {currentCartContent !== 'Cart is empty'&&currrentCartQuantity>0?
        currentCartContent.map(i => 
            <div key={Math.random()}>
                {i.quantity>0&&
                <div className='bg-light m-2'>
                    <h3 className='d-inline align-middle'>{i.name} x {i.quantity}</h3>
                    <DeleteFromCartButton
                    prodName={i.name}
                    setCartContent={setCartContent} />
                </div>}
            </div>)
        :<h3>Cart is empty</h3>}

        {(currentCartContent !== 'Cart is empty'&&currrentCartQuantity>0)&&<CheckoutButton cartContent={props.cartContent} />}

        </div>

    </div>
    )
}

export default Cart;
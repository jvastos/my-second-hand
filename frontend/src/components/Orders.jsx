import React from 'react';
import { useState, useEffect } from 'react';
import OrderShippedButton from './OrderShippedButton';
import { Link } from 'react-router-dom';

function Orders() {
    const baseURLorders = 'http://localhost:8080/my-second-hand/orders';

    const [orders, setOrders] = useState("no orders");
    const [orderWasShipped, setOrderWasShipped ] = useState(false);
    

    useEffect(()=>{
        
        async function fetchOrders() {
            await fetch(baseURLorders)
            .then(response => response.json())
            .then(data => setOrders(data.map(i =>
                !i.isShipped&& 
                <div 
                key={Math.random()} 
                className="col-lg-4">
                    <div className="card text-center text-dark bg-light m-3">
                        <h4 className="card-title m-3">Order n. {i._id}</h4>
                        {i.productsList.map(x =>
                        <div key={Math.random()}>
                            <h6>{x.name} x {x.quantity}</h6>
                        </div>)}
                        <div className="row justify-content-around">
                            <OrderShippedButton
                            setOrderAsShipped={setOrderWasShipped} 
                            orderId={i._id}/>
                        </div>
                    </div>
                </div>
            )))
            .catch (error => {console.log("There was an error fecthing the orders", error)});
        }
        fetchOrders();
        setOrderWasShipped(false);
    }, [orderWasShipped]);

    return (
        <>
            <Link to='/' className='m-3'>go to shop</Link>
            <div className='container'>
                <div className='row'>
                    {orders}
                </div>
            </div>
        </>
    );
}

export default Orders;
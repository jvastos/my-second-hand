import React from "react";
import { API_BASE_URL } from "../config";

function OrderShippedButton (props) {

    const baseURLorders = `${API_BASE_URL}/orders`;
    const orderId = props.orderId;
    const setOrderAsShipped = props.setOrderAsShipped;

    async function markOrderAsShipped() {
        await fetch(baseURLorders + `/id/${orderId}`, {
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
          .catch (error => {console.log('There was an error marking the order as shipped', error)});
          console.log('order marked as shipped')
          alert('Nice! Order marked as shipped.')
          setOrderAsShipped(true);
    }

    return (<button 
            onClick={markOrderAsShipped}
            className='btn btn-primary col-4 m-3'>Mark as shipped</button>)
}

export default OrderShippedButton;
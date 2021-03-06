import React from 'react';
import { useState} from 'react';
import Products from './Products'
import CartPreview from './CartPreview';
import { Link } from 'react-router-dom';

function Home(props) {

  const [searchTerm, setSearchTerm] = useState('');

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <>
        <div className='d-flex justify-content-end'>
            <CartPreview 
            cartId={props.cartId}
            cartContent={props.cartContent} />
        </div>
        <div className='container'>
            <div className='row justify-content-around'>
                <div className='col-4 m-3'>
                    <input 
                    type='text' 
                    className='form-control text-center' 
                    placeholder='Search' 
                    aria-label='Search' 
                    aria-describedby='button-search' 
                    onChange={handleChange}/>
                </div>
            </div>
            <div className='row'>
            <Products
            setCartContent={props.setCartContent}
            cartContent={props.cartContent}
            termToBeSearched={searchTerm}/>
            </div>
            <div className='row justify-content-around text-center'>
                <Link to='/orders' className='m-3 col-4'>Orders admin</Link>
            </div>
            
        </div>
        
    </>
  );
}

export default Home ;
import React from 'react';
import { useState} from 'react';
import Products from './Products'
import CartPreview from './CartPreview';

function Home(props) {

const [searchTerm, setSearchTerm] = useState('');
const [termToBeSearched, setTermToBeSearched] = useState();


  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleClick() {
    const termToBeSearched = searchTerm;
    setTermToBeSearched(termToBeSearched);
  }

  return (
    <>
        <div className='d-flex justify-content-end'>
            <CartPreview 
            cartId={props.cartId}
            cartContent={props.cartContent} />
        </div>
        <div className='container'>
            <div className='input-group m-3'>
            <input 
            type='text' 
            className='form-control' 
            placeholder='Search for product names' 
            aria-label='Search' 
            aria-describedby='button-search' 
            onChange={handleChange}/>
            <button 
            className='btn btn-outline-secondary' 
            type='button' 
            id='button-search' 
            onClick={handleClick}>Search</button>
            </div>
            <div className='row'>
            <Products
            setCartContent={props.setCartContent}
            cartContent={props.cartContent}
            termToBeSearched={termToBeSearched}/>
            </div>
        </div>
    </>
  );
}

export default Home ;
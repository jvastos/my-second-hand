import React from "react";
import { useState, useEffect } from "react"
import AddToCartButton from "./AddToCartButton";
import { API_BASE_URL } from "../config";
    
function Products(props) {

    const baseURLproducts = `${API_BASE_URL}/products`
    const [products, setProducts] = useState("no products");

    useEffect(()=>{
        async function fetchProducts() {
            await fetch(!props.termToBeSearched ? `${API_BASE_URL}/products`:`${API_BASE_URL}/products/search?name=${props.termToBeSearched}`)
            .then(response => response.json())
            .then(data => setProducts(data.map(i => 
                <div 
                key={Math.random()} 
                className="col-lg-4">
                    <div className="card text-center text-dark bg-light m-3">
                        <h3 className="card-title m-3">{i.name}</h3>
                        <h3 className="card-subtitle">{i.price}$</h3>
                        <div className="row justify-content-around">
                            <AddToCartButton
                            setCartContent={props.setCartContent}
                            cartContent={props.cartContent} 
                            prodname={i.name}
                            prodprice={i.price}/>
                        </div>
                    </div>
                </div>
            )))
            .catch (error => {console.log("There was an error fecthing the products", error)});
        }
        fetchProducts();
    }, [props]);

    return products;
}

export default Products
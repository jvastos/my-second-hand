import React from "react";
import { useState, useEffect } from "react"
import AddToCartButton from "./AddToCartButton";
    
function Products(props) {

    const [products, setProducts] = useState("no products");

    useEffect(()=>{
        fetch(!props.termtobesearched ? "http://localhost:8080/my-second-hand/products":`http://localhost:8080/my-second-hand/products/search?name=${props.termtobesearched}`)
        .then(response => response.json())
        .then(data => setProducts(data.map(i => 
            <div 
            key={Math.random()} 
            className="col-lg-4">
                <div className="card text-center text-dark bg-light m-3">
                    <h3 className="card-title m-1">{i.name}</h3>
                    <h3 className="card-subtitle m-1">{i.price}$</h3>
                    <div className="row justify-content-around">
                        <AddToCartButton 
                        prodname={i.name}
                        prodprice={i.price}/>
                    </div>
                </div>
            </div>
        )))
        .catch (error => {console.log("There was an error", error)});
    }, [props]);

    return products;
}

export default Products
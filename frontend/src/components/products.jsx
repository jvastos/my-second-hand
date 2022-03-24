import React from "react";
import { useState, useEffect } from "react"
    
export default function Products(props) {

    const [products, setProducts] = useState("no products");

    useEffect(()=>{
        fetch(!props.termtobesearched ? "http://localhost:8080/my-second-hand/products":`http://localhost:8080/my-second-hand/products/search?name=${props.termtobesearched}`)
        .then(response => response.json())
        .then(data => setProducts(data.map(i => 
            <div key={Math.random()} className="col">
                <div className="card text-center text-dark bg-light m-3">
                    <h3 className="card-title m-1">{i.name}</h3>
                    <h3 className="card-subtitle m-1">{i.price}$</h3>
                </div>
            </div>
        )))
        .catch (error => {console.log("There was an error", error)});
    });

    return products;
}
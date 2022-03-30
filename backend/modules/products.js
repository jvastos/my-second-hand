import { Router } from "express";
import { Db } from "mongodb";

const getAllProduct = (db) => async (req, res) => {

    const products = await (db).collection("products").find().toArray();

    res.json(products);

}

const searchProducts = (db) => async (req, res) => {

    const query = req.query

    let filter = {};

    if(query.name) {
        filter.name = { $regex: new RegExp(query.name, "i")};
    }

    console.log(filter);

    const products = await (db).collection("products").find( filter ).toArray();

    res.json(products);
}

/**
 * Returns movie routes.
 * @param db {Db} A connected MongoDB instance.
 * @returns {Router}
 */
 export function productRoutes(db) {
    const router = new Router();
    
    router.get("/products", getAllProduct(db));
    router.get("/products/search", searchProducts(db));
    
    return router;
}
import { Router } from "express";
import { Db } from "mongodb";

/* app.post('/products', async (req, res)=> {

    const date = new Date();

    const todaysDate =`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;

    const randomNumber = Math.floor(Math.random() * 1000);

    const productId = `${todaysDate}${randomNumber}`;

    const product = { ...req.body, _id : productId };

    await collectionProducts.insertOne(product);

    res.status(200).end();
}) */

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

/* app.patch('/products/:productId', async (req, res) => {
    const theSelectedProducttId = req.params.cartId;
    const reqBody = req.body;
    await collectionProducts.updateOne({ _id: theSelectedProducttId }, {$set: reqBody});

    res.status(200).end();

}) */

/* app.delete('/products/:productId', async (req, res) => {
    const theSelectedProducttId = req.params.productId;

    await collectionProducts.deleteOne({ _id: theSelectedProducttId });

    res.status(200).end();
}) */

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
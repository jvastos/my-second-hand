import { Router } from "express";
import { Db } from "mongodb";

const createOrder = (db) => async (req, res)=> {

    await (db).collection("orders").insertOne(req.body);

    res.status(200).end();
}

/* app.get("/orders", async (req, res) => {
    const query = req.query;

    let filter = {};

    if(query.date) {
        filter.date = query.date;
    }
    if(query.isShipped) {
        filter.isShipped = query.isShipped === "true";
    }
    if(query.matchStock) {
        filter.matchStock = query.matchStock === "true";
    }

    console.log("filter", filter);

    const orders = await collectionOrders.find( filter ).toArray();

    res.json(orders);
})

app.patch('/orders/:orderId', async (req, res) => {
    const theSelectedOrderId = req.params.orderId;
    const reqBody = req.body;
    await collectionOrders.updateOne({ _id: theSelectedOrderId }, {$set: reqBody});

    res.status(200).end();
}) */

/**
 * Returns movie routes.
 * @param db {Db} A connected MongoDB instance.
 * @returns {Router}
 */
 export function orderRoutes(db) {
    
    const router = new Router();
  
    router.post("/orders", createOrder(db));
    /* router.get("/orders/id/:orderId", getCart(db));
    router.patch("/orders/id/:orderId", addProdToCart(db)); */
  
    return router;
}
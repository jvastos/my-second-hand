import { Router } from "express";
import { Db } from "mongodb";

const createOrder = (db) => async (req, res)=> {

    await (db).collection("orders").insertOne(req.body);

    res.status(200).end();
};

const getAllOrders = (db) => async (req, res)=> {

    const orders = await (db).collection("orders").find().toArray();

    res.json(orders);
};

const markOrderAsShipped = (db) => async (req, res) => {
    const theSelectedOrderId = req.params.orderId;
    await (db).collection("orders").updateOne({ _id: theSelectedOrderId }, {$set: {isShipped: true}});

    res.status(200).end();
};


/**
 * Returns movie routes.
 * @param db {Db} A connected MongoDB instance.
 * @returns {Router}
 */
 export function orderRoutes(db) {
    
    const router = new Router();
  
    router.post("/orders", createOrder(db));
    router.get("/orders", getAllOrders(db));
    router.patch("/orders/id/:orderId", markOrderAsShipped(db));
  
    return router;
}
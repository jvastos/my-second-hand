import { Router } from "express";
import { Db } from "mongodb";


const createCart = (db) => async (req, res) => {
    
    await (db).collection("carts").insertOne(req.body);

    res.status(200).end();
}

const getCart = (db) => async (req, res) => {

    const cartId = req.params.cartId;

    let filter = {};

    if(cartId) {
        filter._id = cartId;
    }

    console.log('filter', filter);

    const cart = await (db).collection("carts").find( filter ).toArray();

    res.json(cart);
}

const addProdToCart = (db) => async (req, res) => {

    const theSelectedCartId = req.params.cartId;
    const productName = req.query.name;

    let currentCart = await (db).collection("carts").findOne({_id: theSelectedCartId});

    console.log(currentCart);

    if(currentCart.productsList.find((prod) => prod.name == req.query.name)) {
        await db.collection("carts").updateOne(
            { "_id": theSelectedCartId, "productsList.name": productName},
            { $inc: { "productsList.$.quantity" : 1 } }
            );
    } else {
        await (db).collection("carts").updateOne(
            {_id: theSelectedCartId}, 
            {$push: 
                {productsList: 
                    {
                    name: productName, 
                    quantity: 1
                    }
                }
            }
        );
    }
    res.status(200).end();  
}

const deleteProdFromCart = (db) => async (req, res) => {

    const theSelectedCartId = req.params.cartId;
    const productName = req.params.prodName;

    let currentCart = await (db).collection("carts").findOne({_id: theSelectedCartId});

    console.log(currentCart);

    await db.collection("carts").updateOne(
        { "_id": theSelectedCartId, "productsList.name": productName},
        { $inc: { "productsList.$.quantity" : -1 } }
    );
    
    res.status(200).end();  
}


/**
 * Returns movie routes.
 * @param db {Db} A connected MongoDB instance.
 * @returns {Router}
 */
export function cartRoutes(db) {
    
    const router = new Router();
  
    router.post("/carts", createCart(db));
    router.get("/carts/id/:cartId", getCart(db));
    router.patch("/carts/id/:cartId", addProdToCart(db));
    router.patch("/carts/id/:cartId/deleteProd/:prodName", deleteProdFromCart(db));
  
    return router;
}
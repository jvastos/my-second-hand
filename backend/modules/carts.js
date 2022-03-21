import { Router } from "express";
import { Db } from "mongodb";


const createCart = (db) => async (req, res) => {

        const date = new Date();

        const todaysDate =`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;

        const randomNumber = Math.floor(Math.random() * 1000);

        const cartId = `${todaysDate}${randomNumber}`;

        const cart = { 
            _id : cartId,
            productsList: []
        };

        await (db).collection("carts").insertOne(cart);

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
        const productQuantity = req.query.quantity;

        await (db).collection("carts").updateOne(
            {_id: theSelectedCartId}, 
            {$push: 
                {productsList: 
                    {
                    name: productName, 
                    quantity: productQuantity
                    }
                }
            }
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
  
    return router;
}
import express from 'express';
import mongodb from "mongodb";
import cors from "cors";

const mongoClient = new mongodb.MongoClient("mongodb+srv://secondhanduser:050457@cluster0.hp5vo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

mongoClient.connect();

const db = mongoClient.db("my-second-hand");
const collectionCarts = db.collection("carts");

const app = express();

const PORT = 4649;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

const requestLogger = (req, res, nextCallback) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const sourceIp = req.connection.remoteAddress;;

    console.log(`${timestamp}`);
    console.log(`${method}`);
    console.log(`${url}`);
    console.log(`${sourceIp}`);
    nextCallback();
}

app.use(requestLogger);

app.post('/carts', async (req, res)=> {

    const date = new Date();

    const todaysDate =`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;

    const randomNumber = Math.floor(Math.random() * 1000);

    const cartId = `${todaysDate}${randomNumber}`;

    const cart = { ...req.body, _id : cartId };

    await collectionCarts.insertOne(cart);

    res.status(200).end();
})

app.get("/carts", async (req, res) => {
    const query = req.query;

    let filter = {};

    if(query.date) {
        filter.date = query.date;
    }
    if(query.matchStock) {
        filter.matchStock = query.matchStock === "true";
    }
    if(query.numberOfItems) {
        filter.numberOfItems = query.numberOfItems;
    }

    console.log("filter", filter);

    const carts = await collectionCarts.find( filter ).toArray();

    res.json(carts);
})

app.patch('/carts/:cartId', async (req, res) => {
    const theSelectedCartId = req.params.cartId;
    const reqBody = req.body;
    await collectionCarts.updateOne({ _id: new ObjectId(theSelectedCartId) }, {$set: reqBody});

    res.status(200).end();

    
})

app.delete('/carts/:cartId', async (req, res) => {
    const theSelectedCartId = req.params.cartId;

    await collectionCarts.deleteOne({ _id: new ObjectId(theSelectedCartId) });

    res.status(200).end();
})

app.listen(PORT, () => {
    console.log(`my-second-hand is up and running @ http://localhost:${PORT}`)
})
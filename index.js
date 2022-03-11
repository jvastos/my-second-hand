import express from 'express';
import mongodb from "mongodb";
import cors from "cors";

const mongoClient = new mongodb.MongoClient("mongodb://localhost:27017");

mongoClient.connect();

const db = mongoClient.db("my-second-hand");
const collection = db.collection("orders");

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

app.get("/orders", async (req, res) =>{
    const query = req.query;

    console.log(query);

    /*
    let filter = {};

     if(query.containsPuppy) {
        filter.containsPuppy = query.containsPuppy === "true";
    }
    if(query.breed) {
        //Case insensitive regex
        filter.breed = { $regex: new RegExp(query.breed, "i")};
    }
    if(query.title) {
        //Case insensitive regex
        filter.title = { $regex: new RegExp(query.breed, "i")};
    } 
    */

    const orders = await collection.find().toArray();

    res.json(orders);
})

app.get("/orders/", async (req, res) => {
    const query = req.query;
    const orders = await collection.find({ isShipped: false }).toArray();
})

app.post('/orders', async (req, res)=> {
    const order = req.body;

    await collection.insertOne(order);

    res.status(200).end();
})

app.delete('/orders/:orderId', async (req, res) => {
    const theSelectedOrderId = req.params.orderId;
    console.log(theSelectedOrderId);

    await collection.deleteOne({ _id: theSelectedOrderId });

    res.status(200).end();
})

app.patch('/orders/:orderId', async (req, res) => {
    const theSelectedOrderId = req.params.orderId;
    const reqBody = req.body;
    await collection.updateOne({ _id: theSelectedOrderId }, {$set: reqBody});

    res.status(200).end();
})


app.listen(PORT, () => {
    console.log(`my-second-hand is up and running @ http://localhost:${PORT}`)
})
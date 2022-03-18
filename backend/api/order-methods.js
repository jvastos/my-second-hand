import express from 'express';
import mongodb from "mongodb";
import cors from "cors";

const mongoClient = new mongodb.MongoClient("mongodb+srv://secondhanduser:050457@cluster0.hp5vo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

mongoClient.connect();

const db = mongoClient.db("my-second-hand");
const collectionOrders = db.collection("orders");

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

app.post('/orders', async (req, res)=> {

    const date = new Date();

    const todaysDate =`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;

    const randomNumber = Math.floor(Math.random() * 1000);

    const orderId = `${todaysDate}${randomNumber}`;

    const order = { ...req.body, _id : orderId };

    await collectionOrders.insertOne(order);

    res.status(200).end();
})

app.use(requestLogger);

app.get("/orders", async (req, res) => {
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
})

app.delete('/orders/:orderId', async (req, res) => {
    const theSelectedOrderId = req.params.orderId;
    console.log(theSelectedOrderId);

    await collectionOrders.deleteOne({ _id: theSelectedOrderId });

    res.status(200).end();
})


app.listen(PORT, () => {
    console.log(`my-second-hand is up and running @ http://localhost:${PORT}`)
})
import express from 'express';
import mongodb from "mongodb";
import cors from "cors";

const mongoClient = new mongodb.MongoClient("mongodb+srv://secondhanduser:050457@cluster0.hp5vo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

mongoClient.connect();

const db = mongoClient.db("my-second-hand");
const collectionProducts = db.collection("products");

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

app.post('/products', async (req, res)=> {

    const date = new Date();

    const todaysDate =`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;

    const randomNumber = Math.floor(Math.random() * 1000);

    const productId = `${todaysDate}${randomNumber}`;

    const product = { ...req.body, _id : productId };

    await collectionProducts.insertOne(product);

    res.status(200).end();
})

app.get("/products", async (req, res) => {
    const query = req.query;

    let filter = {};

    if(query.name) {
        filter.date = query.name;
    }
    if(query.stock) {
        filter.stock = query.stock;
    }
    if(query.price) {
        filter.price = query.price;
    }
    if(query.imageUrl) {
        filter.imageUrl = query.imageUrl;
    }

    console.log("filter", filter);

    const carts = await collectionProducts.find( filter ).toArray();

    res.json(carts);
})

app.patch('/products/:productId', async (req, res) => {
    const theSelectedProducttId = req.params.cartId;
    const reqBody = req.body;
    await collectionProducts.updateOne({ _id: theSelectedProducttId }, {$set: reqBody});

    res.status(200).end();

})

app.delete('/products/:productId', async (req, res) => {
    const theSelectedProducttId = req.params.productId;

    await collectionProducts.deleteOne({ _id: theSelectedProducttId });

    res.status(200).end();
})

app.listen(PORT, () => {
    console.log(`my-second-hand is up and running @ http://localhost:${PORT}`)
})
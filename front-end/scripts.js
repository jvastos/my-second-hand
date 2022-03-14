import express from 'express';
import mongodb from 'mongodb';
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
        origin: "http://localhost:5500",
    })
);

const rubberDuckImg = collectionProducts.name;

document.getElementById("duck-image").src = rubberDuckImg;
console.log('hey');

app.listen(PORT, () => {
    console.log(`my-second-hand is up and running @ http://localhost:${PORT}`)
})
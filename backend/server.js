import express from "express";
import { Db } from "mongodb";
import { cartRoutes } from "./modules/carts.js";
import { productRoutes } from "./modules/products.js";
import { orderRoutes } from "./modules/orders.js";
import cors from "cors";

/**
 * Returns a bootstrapped Express server
 * @param db {Db} A connected MongoDB instance
 * @returns {Express}
 */
export function createServer(db) {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

  // A middleware which makes sure that the body of requests of
  // `application/json` content type are parsed as JSON automatically.
  app.use(express.json());

  app.use("/my-second-hand", cartRoutes(db));
  app.use("/my-second-hand", productRoutes(db));
  app.use("/my-second-hand", orderRoutes(db));

  return app;
}
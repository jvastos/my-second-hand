import express from 'express';
import CartsApi from './carts-api.js';

const router = express.Router();

router.route("/carts").post(CartsApi.apiPostCart)
router.route("/carts/id/:cartId").get(CartsApi.apiGetCart)
router.route("/carts/id/:cartId").patch(CartsApi.apiUpdateCart)

    export default router
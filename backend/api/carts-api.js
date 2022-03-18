let carts;

export default class CartsApi {

    static async injectDB(conn) {
        if(carts) {
            return
        }
        try {
            carts = await conn.db(process.env.MYSECONDHAND_NS).collection("carts");
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in CartsApi: ${e}`,
            )
        }
    }

    static async apiPostCart(req, res) {

        const date = new Date();

        const todaysDate =`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;

        const randomNumber = Math.floor(Math.random() * 1000);

        const cartId = `${todaysDate}${randomNumber}`;

        const cart = { 
            _id : cartId,
            productsList: []
        };

        await carts.insertOne(cart);

        res.status(200).end();
    }

    static async apiGetCart (req, res) {
        const cartId = req.params.cartId;

        let filter = {};

        if(cartId) {
            filter._id = cartId;
        }

        console.log('filter', filter);

        const cart = await carts.find( filter ).toArray();

        res.json(cart);
    }

    static async apiUpdateCart (req, res) {
        const theSelectedCartId = req.params.cartId;
        const productName = req.query.name;
        const productQuantity = req.query.quantity;
        await carts.updateOne(
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
}
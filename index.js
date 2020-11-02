const express = require('express')
const port = process.env.PORT || 3000
const cors = require("cors");
const stripe = require('stripe')('sk_test_51H9V3DJYTWFMSQx4AxAyc898r8FDYu46Z74O2hwLuMhNYCKoFHcD8DSSNsaad4S5XrzuZIo2quzqPgVrq7Z3eWJa008wxwy9w0')

const app = express()

//Middleware
app.use(cors({ origin: true }))
app.use(express.json())

//APi- routes
app.get('/', (request, response) => response.status(200).send('Hello world'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('Payment Request Recieved! Amount', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
require('dotenv').config()
const express = require('express')
const app = express()
const stripe = require('stripe')(process.env.API_KEY);
const cors = require('cors')
const methodOverride = require('method-override')
//Frontend URL for Stripe redirects
const YOUR_DOMAIN = 'http://localhost:3000'

app.use(methodOverride('_method'))
app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.get('/api', (req, res) => {
    res.send('test!')
})

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { amount } = req.body
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd"
    })

    res.status(200).send(paymentIntent.client_secret)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
    }
})

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [
    //     {
    //       // TODO: replace this with the `price` of the product you want to sell
    //       price: '{{PRICE_ID}}',
    //       quantity: 1,
    //     },
    //   ],
    //   mode: 'payment',
    //   success_url: `${YOUR_DOMAIN}/success.html`,
    //   cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    // });
    // res.redirect(303, session.url)

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
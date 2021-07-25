require('dotenv').config()
const express = require('express')
const app = express()
const stripe = require('stripe')(process.env.API_KEY);
//Frontend URL for Stripe redirects
const YOUR_DOMAIN = 'http://localhost:3000'
app.use(express.json())

app.get('/', (req, res) => {
    res.send('test!')
})

app.post('/api/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // TODO: replace this with the `price` of the product you want to sell
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });
    res.redirect(303, session.url)
});

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})
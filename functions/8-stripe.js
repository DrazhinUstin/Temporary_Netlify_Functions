require('dotenv').config();
// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
    switch (event.httpMethod) {
        case 'POST':
            const { purchase, shipping_fee } = JSON.parse(event.body);
            const calculateOrderAmount = (items) => {
                // Replace this constant with a calculation of the order's amount
                // Calculate the order total on the server to prevent
                // people from directly manipulating the amount on the client
                return items.reduce((total, { price, amount }) => {
                    total += price * amount;
                    return total;
                }, 0);
            };
            try {
                // Create a PaymentIntent with the order amount and currency
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: calculateOrderAmount(purchase) + shipping_fee,
                    currency: 'usd',
                });
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        clientSecret: paymentIntent.client_secret,
                    }),
                };
            } catch (error) {
                return {
                    statusCode: 500,
                    body: JSON.stringify(error),
                };
            }
        default:
            return {
                statusCode: 405,
                body: 'Only POST request allowed',
            };
    }
};

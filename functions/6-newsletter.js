require('dotenv').config();
const axios = require('axios');
const apiURL = 'https://api.buttondown.email/v1/subscribers';

exports.handler = async function (event, context) {
    switch (event.httpMethod) {
        case 'POST':
            const { email } = JSON.parse(event.body);
            if (!email) {
                return {
                    statusCode: 400,
                    body: 'Please provide an email!',
                };
            }
            try {
                const { data } = await axios.post(
                    apiURL,
                    { email },
                    {
                        headers: {
                            Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
                        },
                    }
                );
                return {
                    statusCode: 201,
                    body: JSON.stringify(data),
                };
            } catch (error) {
                console.log(error);
                return {
                    statusCode: 400,
                    body: JSON.stringify(error.response.data),
                };
            }
        default:
            return {
                statusCode: 405,
                body: 'Only POST request allowed!',
            };
    }
};

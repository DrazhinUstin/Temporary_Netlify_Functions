require('dotenv').config();
const axios = require('axios');
const apiURL = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric&q=`;

exports.handler = async function (event, context) {
    switch (event.httpMethod) {
        case 'POST':
            const { city } = JSON.parse(event.body);
            if (!city) {
                return {
                    statusCode: 400,
                    body: 'Please provide valid city name',
                };
            }
            try {
                const { data } = await axios.get(`${apiURL}${city}`);
                return {
                    statusCode: 200,
                    body: JSON.stringify(data),
                };
            } catch (error) {
                return {
                    statusCode: 404,
                    body: JSON.stringify(error.response.data),
                };
            }
        default:
            return {
                statusCode: 405,
                body: 'Only PUT request is available',
            };
    }
};

require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
    .base('appdlD0hGjVjJHn2F')
    .table('Survey');

exports.handler = async function (event, context) {
    switch (event.httpMethod) {
        case 'GET':
            try {
                const { records } = await airtable.list();
                return {
                    statusCode: 200,
                    body: JSON.stringify(records),
                };
            } catch (error) {
                console.log(error);
                return {
                    statusCode: 500,
                    body: 'Server error',
                };
            }
        case 'PUT':
            const { id, votes } = JSON.parse(event.body);
            if (!id || !votes) {
                return {
                    statusCode: 400,
                    body: 'Please, provide id and current votes to update!',
                };
            }
            try {
                const fields = {
                    votes: +votes + 1,
                };
                const response = await airtable.update(id, { fields });
                if (response.error) {
                    return {
                        statusCode: 404,
                        body: JSON.stringify(response),
                    };
                }
                return {
                    statusCode: 200,
                    body: JSON.stringify(response),
                };
            } catch (error) {
                console.log(error);
                return {
                    statusCode: 500,
                    body: 'Server error',
                };
            }
        default:
            return {
                statusCode: 405,
                body: 'Only GET and PUT requests are available',
            };
    }
};

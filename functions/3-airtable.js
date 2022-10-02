require('dotenv').config();
const contentful = require('contentful');

const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: process.env.CONTENTFUL_SPACE_ID,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

exports.handler = async function (event, context) {
    const id = event.queryStringParameters.id;
    if (id) {
        try {
            const entry = await client.getEntry(id);
            return {
                statusCode: 200,
                body: JSON.stringify(entry),
            };
        } catch (error) {
            console.log(error);
            return {
                statusCode: 404,
                body: 'Not found',
            };
        }
    }
    try {
        const { items } = await client.getEntries({
            content_type: 'eCommerceReact',
        });
        return {
            statusCode: 200,
            body: JSON.stringify(items),
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: 'Server error',
        };
    }
};

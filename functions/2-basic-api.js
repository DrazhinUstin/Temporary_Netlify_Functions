const data = require('../assets/data');

exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};

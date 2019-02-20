'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context, callback) => {
    try {
        // Lambda Code Here
        context.succeed(event);
    }
    catch(err) {
        context.fail(err);
    }
};
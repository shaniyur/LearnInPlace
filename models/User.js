const AWS = require("aws-sdk");
const fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var dynamo = new AWS.DynamoDB();

var docClient = new AWS.DynamoDB.DocumentClient();


const AWS = require("aws-sdk");
require("dotenv").config(); // Load environment variables from .env file

// Configure AWS with environment variables
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const S3_BUCKET = process.env.S3_BUCKET;

module.exports = { s3, S3_BUCKET };
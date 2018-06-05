import aws = require('aws-sdk');
import {ConfigurationOptions} from 'aws-sdk/lib/config';
const awsConfig: ConfigurationOptions = {
  region: 'us-east-2',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

aws.config.update(awsConfig);

const dynamodb = new aws.DynamoDB();
const docClient = new aws.DynamoDB.DocumentClient();

export function getUserData(username: string): Promise<any> {
    return docClient.query( {
        TableName: 'user',
        KeyConditionExpression: 'username = :username',
        ExpressionAttributeValues: { // for aliasing actual values
            ':username': username
        },
    }).promise();
}

export function getAllUserData(params) {
    return docClient.scan(params).promise();
}
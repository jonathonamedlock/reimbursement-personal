import * as aws from 'aws-sdk';
import {ConfigurationOptions} from 'aws-sdk/lib/config';
import * as STATUS from './reimbursement-status';
const awsConfig: ConfigurationOptions = {
  region: 'us-east-2',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

aws.config.update(awsConfig);

const docClient = new aws.DynamoDB.DocumentClient();

export function getAllReimbursementRequestsForUser(username: string): Promise<any> {
    return docClient.query( {
        TableName: 'reimbursement',
        KeyConditionExpression: 'username = :username',
        ExpressionAttributeValues: { // for aliasing actual values
            ':username': username
        },
    }).promise();
}

export function addReimbursement(reimbursement:any): Promise<any> {
    return docClient.put({
        TableName: 'reimbursement',
        Item: reimbursement
    }).promise();
}

export function getAllReimbursements(): Promise<any> {
    return docClient.scan( {
        TableName: 'reimbursement',
    }).promise();
}

export function getAllPendingReimbursements(): Promise<any> {
    return docClient.query( {
        TableName: 'reimbursement',
        IndexName: 'reimbursementStatus-index',
        KeyConditionExpression: 'reimbursementStatus = :status',
        ExpressionAttributeValues: { // for aliasing actual values
            ':status': STATUS.PENDING
        },
    }).promise();
}

export function getPendingReimbursementsForUser(username: string): Promise<any> {
    return docClient.query( {
        TableName: 'reimbursement',
        IndexName: 'reimbursementStatus-index',
        KeyConditionExpression: 'reimbursementStatus = :status',
        FilterExpression: 'username = :username',
        ExpressionAttributeValues: { // for aliasing actual values
            ':status': STATUS.PENDING,
            ':username': username
        },
    }).promise();
}

export function updateReimbursementStatusFinance(username: string, timeCreated: number, newStatus: string, approver: string): Promise<any> {
    return docClient.update({
        TableName: 'reimbursement',
        Key: {
            "username": username,
            "timeSubmitted": timeCreated
        },
        UpdateExpression: "set reimbursementStatus=:newStatus, approver=:approver",
        ExpressionAttributeValues: {
            ":newStatus": newStatus,
            ":approver": approver
        }
    }).promise();
}

export function updateReimbursementStatus(username: string, timeCreated: number, newStatus: string): Promise<any> {
    return docClient.update({
        TableName: 'reimbursement',
        Key: {
            "username": username,
            "timeSubmitted": timeCreated
        },
        UpdateExpression: "set reimbursementStatus=:newStatus",
        ExpressionAttributeValues: {
            ":newStatus": newStatus
        }
    }).promise();
}

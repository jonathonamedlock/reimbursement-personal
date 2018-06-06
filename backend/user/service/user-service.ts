import * as Access from '../access/user-access'

export function getUser(user: string) {
    return Access.getUserData(user);
}



export function getUsernames() {
    return Access.getAllUserData({
        TableName: 'user',
        ProjectionExpression: 'username'
    });
}
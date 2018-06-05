import * as Access from '../access/reimbursement-access'

export function getAllReimbursements() {
    return Access.getAllReimbursements();
}

export function getAllPending() {
    return Access.getAllPendingReimbursements();
}

export function getAllFor(user: string) {
    return Access.getAllReimbursementRequestsForUser(user);
}

export function getPendingFor(user: string) {
    return Access.getPendingReimbursementsForUser(user);
}

export function updateReimbursement(item, newStatus: string) {
    return Access.updateReimbursementStatus(item.username, item.timeSubmitted, newStatus);
}

export function addReimbursement(item) {
    return Access.addReimbursement(item);
}

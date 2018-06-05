import express = require('express');
import { Request, Response, NextFunction } from 'express';
import * as reimbursementService from '../reimbursement/service/reimbursement-service';
import * as userService from '../user/service/user-service'
import { authMiddleware } from '../security/auth-middleware';

export const viewRouter = express.Router();

viewRouter.get('', [authMiddleware('financial'), (req, resp, next) => {
    reimbursementService.getAllReimbursements()
        .then((data) => {
            let allReimbursements = new Array();
            data.Items.forEach((value) => {
                allReimbursements.push(value);
            });
            resp.json(allReimbursements);
        }).catch((err)=> {
            resp.json({
                status: 'failed',
                info: err
            });
        });
}]);

viewRouter.get('/users', [authMiddleware('financial'), (req, resp, next) => { 
    
    userService.getUsernames()
        .then((data) => {
            let response = new Array();
            data.Items.forEach((data) => {
                if (response.indexOf(data) === -1) {
                    response.push(data);
                }
            });
            resp.json(response);
        }).catch((err) => {
            resp.json({
                status: 'failed',
                info: err
            });                
        });
}]);

viewRouter.get('/users/:username', [authMiddleware('financial'), (req, resp, next) => {
    
    reimbursementService.getAllFor(req.params.username)
        .then((data) => {
            resp.json(data.Items);
        }).catch((err) => {
            resp.json({
                status: 'failed',
                info: err
            }); 
        });
}]);

viewRouter.get('/pending', [authMiddleware('financial'), (req, resp, next) => {
    
    reimbursementService.getAllPending()
    .then((data) => {
        resp.json(data.Items);
    }).catch((err) => {
        resp.json({
            status: 'failed',
            info: err
        }); 
    });
}]);

viewRouter.get('/users/:username/pending', [authMiddleware('financial'), (req, resp, next) => {
    reimbursementService.getPendingFor(req.params.username)
    .then((data) => {
        resp.json(data.Items);
    }).catch((err) => {
        resp.json({
            status: 'failed',
            info: err
        }); 
    });
}]);

viewRouter.post('/reimbursement', [authMiddleware('financial'), (req, resp, next) => {
    
    const reimb = req.body;

    reimbursementService.updateReimbursement(reimb, reimb.reimbursementStatus)
        .then((data) => {
            resp.json({
                status: 'success'
            });
        }).catch((err) => {
            resp.json({
                status: 'failed',
                info: err
            });
        });
}]);

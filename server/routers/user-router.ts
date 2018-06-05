import express = require('express');
import {Response, Request, NextFunction} from 'express';
import * as userService from '../user/service/user-service';
import * as reimbursementService from '../reimbursement/service/reimbursement-service';
import * as Status from '../reimbursement/access/reimbursement-status'
import { authMiddleware, authUsername } from '../security/auth-middleware';

export const userRouter = express.Router();

userRouter.get('/:username', (req, resp, next) => {
    if (!authUsername(req.params.username, req.session.username)) {
        resp.status(403);
        next();
    } else {
        console.log(`Retrieving ${req.params.username}`);
        userService.getUser(req.params.username)
            .then((data) => {
                console.log(data);
                resp.json(data.Items[0]);
            }).catch((err) => {

            });
    }
});

userRouter.get('/:username/reimbursements', (req, resp, next) => {
    // TODO add authorization middleware
    console.log(req.params.username + ' ' + req.session.username);
    
    if (!authUsername(req.params.username, req.session.username)) {
        resp.status(403);
        next();
    } else {
        console.log(`Retrieving ${req.params.username}/reimbursements`);
        reimbursementService.getAllFor(req.params.username)
            .then((data) => {
                let allReimbursements = new Array();
                data.Items.forEach((value) => {
                    allReimbursements.push(value);
                });
                resp.json(allReimbursements);
            }).catch((err) => {

            });
    }
});

userRouter.post('/login', (req, resp, next) => {
    const user = req.body && req.body;

    userService.getUser(user.username)
        .then((data) => {
            console.log(data.Items);
            console.log(user);
            
            if (user.username === data.Items[0].username && user.password === data.Items[0].password) {
                req.session.role = data.Items[0].role;
                req.session.username = data.Items[0].username;
                if (data.Items[0].role === 'financial') {
                    resp.json({
                        username: user.username,
                        role: 'financial'
                    });
                } else {
                    resp.json({
                        username: user.username,
                        role: 'user'
                    });
                }
            } else {
                resp.sendStatus(401);
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

userRouter.post('/:username/request', (req, resp, next) => {
    if (!authUsername(req.params.username, req.session.username)) {
        resp.status(403);
        next();
    } else {
        const reimburse = req.body;

        reimbursementService.addReimbursement(reimburse)
            .then((data) => {
                resp.json({
                    status: 'success'
                });
            }).catch ((err) => {
                resp.json({
                    status: 'failed'
                });
            });
    }
});

userRouter.post('/:username/cancel', (req, resp, next) => {
    if (!authUsername(req.params.username, req.session.username)) {
        resp.status(403);
        next();
    } else {
        const reimb = req.body;

        reimbursementService.updateReimbursement(reimb, Status.CANCELLED)
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
    }
});

userRouter.delete('/logout', (req, resp, next) => {
    req.session.regenerate(err => {
        if (err) {
            resp.sendStatus(500);
        } else {
            resp.end();
        }
    });
});
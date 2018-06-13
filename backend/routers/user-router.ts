import * as express from 'express';
import {Response, Request, NextFunction} from 'express';
import * as userService from '../user/service/user-service';
import * as reimbursementService from '../reimbursement/service/reimbursement-service';
import * as Status from '../reimbursement/access/reimbursement-status'
import { authMiddleware, authUsername } from '../security/auth-middleware';

export const userRouter = express.Router();

userRouter.get('/profile', (req:Request, resp:Response, next:NextFunction) => {
    if (req.session.username) {
        console.log(`Retrieving ${req.session.username}`);
        userService.getUser(req.session.username)
            .then((data) => {
                resp.json(data.Items[0]);
            }).catch((err) => {

            });
    } else {
        resp.sendStatus(401);
    }
    //}
});

userRouter.get('/reimbursements', (req:Request, resp:Response, next:NextFunction) => {
    if (req.session.username) {
        console.log(`Retrieving ${req.session.username}/reimbursements`);
        reimbursementService.getAllFor(req.session.username)
            .then((data) => {
                let allReimbursements = new Array();
                data.Items.forEach((value:any) => {
                    allReimbursements.push(value);
                });
                resp.json(allReimbursements);
            }).catch((err) => {

            });
    } else {
        resp.sendStatus(401);
    }
});

userRouter.post('/login', (req:Request, resp:Response, next:NextFunction) => {
    const user = req.body && req.body;

    if (!user.username) {
        resp.sendStatus(401);
    }
    userService.getUser(user.username)
        .then((data) => {
            
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

userRouter.post('/request', (req:Request, resp:Response, next:NextFunction) => {
    console.log('requesting');
    
    if (req.session.username) {
        const reimburse = req.body;
        reimburse.username = req.session.username;
        reimburse.reimbursementStatus = Status.PENDING,
        reimburse.timeSubmitted = new Date().toJSON();
        console.log(reimburse);

        reimbursementService.addReimbursement(reimburse)
            .then((data) => {
                
                resp.json({
                    status: 'success'
                });
            }).catch ((err) => {
                console.log(err);
                resp.json({
                    status: 'failed'
                });
            });
    } else {
        resp.sendStatus(401);
    }
});

userRouter.post('/cancel', (req:Request, resp:Response, next:NextFunction) => {
    if (req.session.username) {
        const reimb = req.body;
        reimb.username = req.session.username;
        
        reimbursementService.updateReimbursementSelf(reimb, Status.CANCELLED)
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
    } else {
        resp.sendStatus(401);
    }
});

userRouter.delete('/logout', (req:Request, resp:Response, next:NextFunction) => {
    req.session.regenerate(err => {
        if (err) {
            resp.sendStatus(500);
        } else {
            resp.end();
        }
    });
});
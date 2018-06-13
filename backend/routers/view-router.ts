import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as reimbursementService from '../reimbursement/service/reimbursement-service';
import * as userService from '../user/service/user-service'
import { authMiddleware } from '../security/auth-middleware';

export const viewRouter = express.Router();

viewRouter.get('', [authMiddleware('financial'), (req:Request, resp:Response, next:NextFunction) => {
    reimbursementService.getAllReimbursements()
        .then((data) => {
            let allReimbursements = new Array();
            data.Items.forEach((value:any) => {
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

viewRouter.get('/users', [authMiddleware('financial'), (req:Request, resp:Response, next:NextFunction) => { 
    
    userService.getUsernames()
        .then((data:any) => {
            let response = new Array();
            data.Items.forEach((data:any) => {
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

viewRouter.get('/users/:username', [authMiddleware('financial'), (req:Request, resp:Response, next:NextFunction) => {
    console.log("Getting all for " + req.params.username);
    
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

viewRouter.get('/pending', [authMiddleware('financial'), (req:Request, resp:Response, next:NextFunction) => {
    
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

viewRouter.get('/users/:username/pending', [authMiddleware('financial'), (req:Request, resp:Response, next:NextFunction) => {
    console.log("Getting pending for " + req.params.username);
    

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

viewRouter.post('/update', [authMiddleware('financial'), (req:Request, resp:Response, next:NextFunction) => {
    
    const reimb = req.body;

    reimbursementService.updateReimbursement(reimb, reimb.reimbursementStatus, req.session.username)
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

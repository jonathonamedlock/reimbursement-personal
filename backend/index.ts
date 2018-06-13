//import express = require('express');
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cookie from 'cookie';
import * as session from 'express-session';
import * as path from 'path';
import { userRouter } from './routers/user-router';
import { viewRouter } from './routers/view-router';


const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);


const sess = {
  permission: 'permission',
  secret: 'keyboard cat',
  cookie: { secure: false },
  resave: false,
  saveUninitialized: true,
  username: '',
  role: ''
};

// set up express to attach sessions
app.use(session(sess));

app.use(cookieParser('keyboard cat'));

// allow static content to be served, navigating to url with nothing after / will serve index.html from public
app.use(
  express.static(path.join(__dirname, 'static'))
);

// log the request being made
app.use((req, res, next) => {
  console.log(`request made with path: ${req.path} \nand type: ${req.method}`);
  next();
});

// use the body parser to convert request json
app.use(bodyParser.json());

app.use((req, resp, next) => {
  (process.env.REIMBURSEMENT_STAGE === 'prod')
    ? resp.header('Access-Control-Allow-Origin', process.env.REIMBURSEMENT_APP_URL)
    : resp.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  resp.header('Access-Control-Allow-Credentials', 'true');
  resp.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
// allow cross origins
/*app.use((req, resp, next) => {
  resp.header("Access-Control-Allow-Origin", "http://localhost:3001");
  resp.header("Access-Control-Allow-Credentials", "true");
  resp.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/


/*******************************************************************************
 * ROUTERS
 *******************************************************************************/
app.use('/user', userRouter);
app.use('/view', viewRouter);



// start up the app
app.listen(port, () => {
  console.log(`App is running at http://localhost:${app.get('port')}`);
});

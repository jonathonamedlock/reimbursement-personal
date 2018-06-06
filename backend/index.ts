//import express = require('express');
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as path from 'path';
import { userRouter } from './routers/user-router';
import { viewRouter } from './routers/view-router';


const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);


const sess = {
  secret: 'keyboard cat',
  cookie: { secure: false },
  resave: false,
  saveUninitialized: false
};

// set up express to attach sessions
app.use(session(sess));

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

// allow cross origins
app.use((req, resp, next) => {
  resp.header("Access-Control-Allow-Origin", "*");
  resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

/*******************************************************************************
 * ROUTERS
 *******************************************************************************/
app.use('/user', userRouter);
app.use('/view', viewRouter);



// start up the app
app.listen(port, () => {
  console.log(`App is running at http://localhost:${app.get('port')}`);
});
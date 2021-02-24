import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import minimist from 'minimist';
import connection from './config/mongoConnection';
import fs from 'fs';
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();
let argv = minimist(process.argv.slice(2))
let app = express();



app.use(bodyParser.json({
  limit: '20mb',
  extended: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

var enableCORS = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, token, authorization, Content-Length, X-Requested-With, *');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};
app.use(enableCORS);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
//
app.use(routes);

let port = process.env.APP_PORT || 3000;
let server = app.listen(port, () => {
  console.log("server listening on port " + `${port}`)
})

import mongoose from 'mongoose';
import config from './index';
import dotenv from 'dotenv';
dotenv.config();

// let url = config.db.url;
let url='mongodb://'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME;

mongoose.connect(url, { useNewUrlParser: true }, (err, succ) => {
    // console.log(url)
    if (err) {
        // console.log(err)
        exports.isDbConnected = false;
        console.log("sorry, can not connect with MongoDB..")
    } else {
        exports.isDbConnected = true;
        exports.isDbResponse = succ.db;
        console.log("MongoDB Connected !")
    }
});
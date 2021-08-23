// all of the general dependencies and requirements to set up the project
const express = require('express');
const application = express();
const controller = require('./controller/controller');
require('dotenv').config();
const db = process.env.DATABASE;
const mongoose = require('mongoose');
application.use(express.json());
application.use(express.urlencoded({ extended: true }));

// connect to database
const connect = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(error) {
        console.log(error);
        console.log('Logging error');
    }
}
connect();
const database = mongoose.connection;
exports.database = database;

// list of the routes
application.use('/', controller.getHome);
application.use('/register', controller.getRegister);
application.use('/login', controller.getLogin);
application.use('/welcome', controller.getWelcome);
application.use('/register', controller.postRegister);
application.use('/failed', controller.getFailed);

// let the localhost listen
application.listen(3000, () => {
    console.log('Application running');
});

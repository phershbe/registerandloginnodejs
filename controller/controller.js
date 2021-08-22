const express = require('express');
const router = express.Router();
const path = require('path');
const server = require('../server.js');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

exports.getHome = router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../view/index.html'));
});

exports.getRegister = router.get('/register', (request, response) => {
    response.sendFile(path.join(__dirname, '../view/register.html'));
});

exports.getLogin = router.get('/login', (request, response) => {
    response.sendFile(path.join(__dirname, '../view/login.html'));
});

exports.getWelcome = router.get('/welcome', (request, response) => {
    response.sendFile(path.join(__dirname, '../view/welcome.html'));
});

exports.getFailed = router.get('/failed', (request, response) => {
    response.sendFile(path.join(__dirname, '../view/failed.html'));
});

exports.postRegister = router.post('/register', (request, response) => {
    const object = {
        username: request.body.username,
        password: request.body.password,
    };
    server.database.collection('data').insertOne(object);
    response.redirect('/login');
});

exports.postLogin = router.post('/login', (request, response) => {
    const object = {
        username: request.body.username,
        password: request.body.password,
    };
    const match = async () => {
        const matches = await server.database.collection('data').findOne(object);
        console.log(matches);
        if (matches != null) {
            response.redirect('/welcome');
        } else {
            response.redirect('/failed');
        }
    }
    match();
});

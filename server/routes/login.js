const express = require('express');
const loginCtrl = require('../controllers/login');

const app = express();

app.post('/login', loginCtrl.postLogin);


module.exports = app;
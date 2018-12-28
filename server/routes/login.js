const express = require('express');
const loginCtrl = require('../controllers/login');



const app = express();

app.post('/login', loginCtrl.postLogin);
app.post('/google', loginCtrl.google);


module.exports = app;
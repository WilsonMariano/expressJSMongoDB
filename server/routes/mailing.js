const express = require('express');
const mailingCtrl = require('../controllers/mailing');



const app = express();

app.post('/mailing/send', mailingCtrl.send);


module.exports = app;
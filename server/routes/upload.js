const express = require('express')
const fileUpload = require('express-fileupload');
const uploadCtrl = require('../controllers/upload');
const { verificaToken } = require('../middlewares/autenticacion');

const app = express();
app.use(fileUpload());

app.put('/upload/:tipo/:id', uploadCtrl.upload);

module.exports = app;

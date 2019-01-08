
const express = require('express')
const app = express();
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const categoriaCtrl = require('../controllers/categoria');

app.get('/categoria', verificaToken, categoriaCtrl.traerTodos);
app.get('/categoria/:id', verificaToken, categoriaCtrl.traerUno);
app.post('/categoria', verificaToken, categoriaCtrl.insertarCategoria);
app.put('/categoria/:id', verificaToken, categoriaCtrl.editarCategoria);
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], categoriaCtrl.eliminar);


module.exports = app;
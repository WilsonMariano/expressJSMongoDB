const express = require('express')
const productoCtrl = require('../controllers/producto');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

const app = express();


app.get('/producto', verificaToken, productoCtrl.traerTodos);
app.get('/producto/:id', verificaToken, productoCtrl.traerUno);
app.get('/buscar/:termino', verificaToken, productoCtrl.buscar);
app.post('/producto', verificaToken, productoCtrl.insertar);
app.put('/producto/:id', verificaToken, productoCtrl.actualizar);
app.delete('/producto/:id', [verificaToken, verificaAdminRole], productoCtrl.cambiarEstado);

module.exports = app;
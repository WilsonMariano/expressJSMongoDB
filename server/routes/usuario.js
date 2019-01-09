const express = require('express')
const app = express();
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const usuarioCtrl = require('../controllers/usuario');


app.get('/usuario', verificaToken, usuarioCtrl.getUsuarios);
app.post('/usuario', [verificaToken, verificaAdminRole], usuarioCtrl.postUsuario);
// app.post('/usuario', usuarioCtrl.postUsuario);
app.put('/usuario/:id', [verificaToken, verificaAdminRole], usuarioCtrl.putUsuario);
app.put('/usuario/cambiarEstado/:id', [verificaToken, verificaAdminRole], usuarioCtrl.cambiarEstado);
app.delete('/usuario/:id', [verificaToken, verificaAdminRole], usuarioCtrl.deleteUsuario);

module.exports = app;
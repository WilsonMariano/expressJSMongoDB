const express = require('express')
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const app = express();


app.get('/usuario', function (req, res) {
    res.json('get World')
})

app.post('/usuario', function (req, res) {

    let body = req.body;
    let usuario = new Usuario({
        nombre : body.nombre,
        email : body.email,
        password :  bcrypt.hashSync(body.password, 10),
        img : body.img,
        role : body.role
    });

    usuario.save((err, usuarioDB) => {
        handleError(err);

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });

})

app.put('/usuario/:id', function (req, res) {

    let id = req.params.id;
    let body = req.body;
 
    Usuario.findByIdAndUpdate(id, body, (err, usuarioDB) => {
        handleError(err);

        res.json({
            ok: true,
            usuario: usuarioDB 
        });
    });
});

app.delete('/usuario', function (req, res) {
    res.json('delete World')
})

let handleError = function(err){
    if (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }
}
module.exports = app;
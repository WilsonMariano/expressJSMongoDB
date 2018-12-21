const express = require('express')
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const app = express();


app.get('/usuario', function (req, res) {

    let desde = Number(req.query.desde) || 0;
    let hasta = Number(req.query.hasta) || 999;
    let condicion = {
        estado: true
    }

    Usuario.find(condicion, 'nombre email role estado google img')
        .skip(desde)
        .limit(hasta)
        .exec((err, usuarios)=>{
            handleError(err);

            Usuario.count(condicion, (err, cantidad)=>{
                handleError(err);

                res.json({
                    ok: true,
                    usuarios,
                    cantidad
                });
            });
        });
});

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
 
    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {
        handleError(err);

        res.json({
            ok: true,
            usuario: usuarioDB 
        });
    });
});

app.put('/usuario/cambiarEstado/:id', function (req, res) {

    let id = req.params.id;
    let nuevoEstado = {
        estado: false
    }
 
    Usuario.findByIdAndUpdate(id, nuevoEstado, {new: true}, (err, usuarioDB) => {
        handleError(err);

        if(!usuarioDB){
            res.json({
                ok: false,
                err: "Usuario no encontrado"
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB 
        });
    });
});

app.delete('/usuario/:id', function (req, res) {
    
    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        handleError(err);

        if(!usuarioBorrado){
            res.json({
                ok: false,
                err: "Usuario no encontrado"
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});


let handleError = function(err){
    if (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }
}
module.exports = app;
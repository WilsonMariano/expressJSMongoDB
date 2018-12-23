const express = require('express')
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const app = express();


app.get('/usuario', function(req, res) {

    let desde = Number(req.query.desde) || 0;
    let hasta = Number(req.query.hasta) || 999;
    let condicion = {
        estado: true
    }

    Usuario.find(condicion, 'nombre email role estado google img')
        .skip(desde)
        .limit(hasta)
        .exec((err, usuarios) => {

            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count(condicion, (err, cantidad) => {

                if (err) {
                    res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    usuarios,
                    cantidad
                });
            });
        });
});

app.post('/usuario', function(req, res) {

    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        // password :  bcrypt.hashSync(body.password, 10),
        password: body.password,
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });

})

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = req.body;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/cambiarEstado/:id', function(req, res) {

    let id = req.params.id;
    let nuevoEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, nuevoEstado, { new: true }, (err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
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

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
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

module.exports = app;
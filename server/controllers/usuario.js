const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

const getUsuarios = (req, res) => {

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
}

const postUsuario = (req, res) => {

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
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
}

const putUsuario = (req, res) => {

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
}

const cambiarEstado = (req, res) => {

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
}

const deleteUsuario = (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.json({
                ok: false,
                err: "Usuario no encontrado"
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
}

module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    cambiarEstado,
    deleteUsuario
};
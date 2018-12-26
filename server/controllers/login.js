const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const postLogin = (req, res) => {

    Usuario.findOne({ "email": req.body.email }, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                err: {
                    msg: '(Usuario) o contraseña incorrectos'
                }
            });
        }

        if (req.body.password != usuario.password) {

            return res.status(400).json({
                ok: false,
                err: {
                    msg: 'Usuario o (contraseña) incorrectos'
                }
            });

        }

        let token = jwt.sign({
            usuario,
        }, process.env.SEED_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN })

        res.json({
            ok: true,
            usuario,
            token
        })
    })
}

module.exports = { postLogin }
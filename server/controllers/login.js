const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const Usuario = require('../models/usuario');

const client = new OAuth2Client(process.env.CLIENT_ID);

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
        });
    });
}

const google = async (req, res) => {

    let token = req.body.idtoken;

    let googleUser = await verify(token)
        .catch(err => {

            return res.status(403).json({
                ok: false,
                err: 'Token inválido'
            });
        });
    
    return res.json({
        ok: true,
        data: googleUser
    });
}

async function verify( token ) {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  
    });
    const payload = ticket.getPayload();
   
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

module.exports = { 
    postLogin,
    google }
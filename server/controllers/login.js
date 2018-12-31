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

        Usuario.findOne({email: googleUser.email}, (err, usuarioDB) => {

            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            //Si el usuario ya cuenta con cuenta de correo y contraseña
            if(usuarioDB){
                if(!usuarioDB.google){

                    return res.status(400).json({
                        ok: false,
                        err: {
                            msg: "Debe usar su autenticacion normal"
                        }
                    });
                } else {
                    let token = jwt.sign({
                        usuario: usuarioDB,
                    }, process.env.SEED_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN });

                    return res.json({
                        ok: true,
                        usuario: usuarioDB,
                        token
                    });
                }
            } else {
                //Si el usuario no existe en la BD se guarda
                let usuario = new Usuario();
                usuario.nombre = googleUser.nombre;
                usuario.email = googleUser.email;
                usuario.img = googleUser.img;
                usuario.google = true;
                usuario.password = ':)';

                usuario.save((err, usuarioDB) => {
                    if(err){
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    }

                    let token = jwt.sign({
                        usuario: usuarioDB,
                    }, process.env.SEED_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN });

                    return res.json({
                        ok: true,
                        usuario: usuarioDB,
                        token
                    });
                })
            }
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
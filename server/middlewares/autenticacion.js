const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {

    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    msg: "Token inválido"
                }
            });
        }

        req.usuario = decoded.usuario;
        req.email = req.usuario.email;
        next();

    });
};

let verificaAdminRole = (req, res, next) => {

    if (req.usuario.role != "ADMIN_ROLE") {

        return res.status(401).json({
            ok: false,
            err: {
                msg: "No está autorizado"
            }
        });
    }
    next();
};

module.exports = { verificaToken, verificaAdminRole };
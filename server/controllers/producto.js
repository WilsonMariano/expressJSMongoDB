const Producto = require('../models/Producto');

const insertar = (req, res) => {

    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, data) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            data
        });
    })
}

const traerTodos = (req, res) => {

    Producto.find({})
        //Señalo el campo que se va a vincular con otro arreglo / campos que quiero devolver
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .sort('nombre')
        .exec((err, data) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                data
            })
        })
}

const traerUno = (req, res) => {

    let id = req.params.id;

    Producto.findById(id, {})
        .populate('categoria')
        .populate('usuario')
        .exec((err, data) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!data) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        msj: 'No existe el ID'
                    }
                });
            }
            res.json({
                ok: true,
                data
            })
        })
}

const actualizar = (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let productoNew = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion
    };

    Producto.findByIdAndUpdate(id, productoNew, { new: true, runValidators: true }, (err, data) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!data) {
            return res.status(400).json({
                ok: false,
                err: {
                    msj: 'No existe el ID'
                }
            });
        }

        res.json({
            ok: true,
            data
        });
    })
}

const cambiarEstado = (req, res) => {

    let id = req.params.id;


    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true }, (err, data) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!data) {
            return res.status(400).json({
                ok: false,
                err: {
                    msj: 'No existe el ID'
                }
            });
        }

        res.json({
            ok: true,
            data
        });
    })
}

const buscar = (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, data) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                data
            });
        });
}

module.exports = {
    insertar,
    traerTodos,
    traerUno,
    actualizar,
    cambiarEstado,
    buscar

}
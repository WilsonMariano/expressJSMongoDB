const Categoria = require('../models/categoria');

const insertarCategoria = (req, res) => {

    let categoria = new Categoria({
        descripcion: req.body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, data) => {

        if(err){
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

const editarCategoria = (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let categoriaNew = {
        categoria: body.categoria
    };

    Categoria.findByIdAndUpdate(id, categoriaNew, { new: true, runValidators: true }, (err, data) => {

        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!data){
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

const traerTodos = (req, res) => {

    Categoria.find({})
        //Señalo el campo que se va a vincular con otro arreglo / campos que quiero devolver
        .populate('usuario', '_id nombre email')
        .sort('descripcion')
        .exec((err, data) => {
            if(err){
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

    Categoria.findById(id, {})
        .exec((err, data) => {
            if(err){
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

const eliminar = (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndDelete(id, (err, data)  => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!data){
            return res.status(400).json({
                ok: false,
                err: {
                    msg: 'Id no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            data
        })
        
    });
}

module.exports = {
    insertarCategoria,
    traerTodos,
    traerUno,
    editarCategoria,
    eliminar
}
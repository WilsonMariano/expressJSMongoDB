const mongoose = require('mongoose');
const Usuario = require('./usuario');

const categoriaSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La categoria es necesaria']
    },
    usuario: {
        //Vinculo arreglos
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);
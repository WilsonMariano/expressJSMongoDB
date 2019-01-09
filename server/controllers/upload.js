const fs = require('fs');
const path = require('path');
const Usuario = require('../models/usuario');
const Producto = require('../models/Producto');

const upload = (req, res) => {

    let tipo = req.params.tipo;
    let id = req.params.id;
    
    if(!req.files){
        return res.status(400)
            .json({
                   ok: false,
                   err: {
                       msg: 'No se ha seleccionado ningùn archivo'
                   }
        });
    }

    //Valido tipos permitidos
    let arrTiposValidos = ['productos', 'usuarios'];

    if(arrTiposValidos.indexOf(tipo) < 0){
        return res.status(400)
        .json({
            ok: false,
            err: {
                msg: 'Los tipos válidos son: ' + arrTiposValidos.join(', ')
            }
        });
    }




    let archivo = req.files.archivo;
    let arrNombreArchivo = archivo.name.split('.');
    let extArchivo = arrNombreArchivo[arrNombreArchivo.length -1 ];

    //Valido extensiones permitidas
    let arrExtensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if(arrExtensionesValidas.indexOf(extArchivo) < 0){
        return res.status(400)
        .json({
            ok: false,
            err: {
                msg: 'Las extensiones váliads son: ' + arrExtensionesValidas.join(', ')
            }
        })
    }

    //Cambio nombre al archivo
    let nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extArchivo }`

    archivo.mv(`./uploads/${ tipo }/${ nombreArchivo }`, (err) => {
        if (err){
            return res.status(500).json({
                    ok: false,
                    err
                  });
        }

        if(tipo === 'usuarios'){
            imagenUsuario(id, res, nombreArchivo);
        }else{
            imagenProducto(id, res, nombreArchivo);
        }
    });
}

const imagenUsuario = (id, res, nombreArchivo) => {

    Usuario.findById(id, (err, usuarioDB) => {

        if(err){

            borrarArchivo(nombreArchivo, 'usuarios');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!usuarioDB){

            borrarArchivo(nombreArchivo, 'usuarios');

            return res.status(400).json({
                ok: false,
                err: {
                    msg: "Usuario inexistente"
                }
            });
        }   

        

        //Si existe un archivo anterior lo borro
        borrarArchivo(usuarioDB.img, 'usuarios');

        usuarioDB.img = nombreArchivo;

        usuarioDB.save((err, data) => {
            
            if(err){

                borrarArchivo(nombreArchivo, 'usuarios');

                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                data
            })
        });
    });
}


const imagenProducto = (id, res, nombreArchivo) => {

    Producto.findById(id, (err, productoDB) => {

        if(err){

            borrarArchivo(nombreArchivo, 'productos');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!productoDB){

            borrarArchivo(nombreArchivo, 'productos');

            return res.status(400).json({
                ok: false,
                err: {
                    msg: "Producto inexistente"
                }
            });
        }   

        

        //Si existe un archivo anterior lo borro
        borrarArchivo(productoDB.img, 'productos');

        productoDB.img = nombreArchivo;

        productoDB.save((err, data) => {
            
            if(err){

                borrarArchivo(nombreArchivo, 'productos');

                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                data
            })
        });
    });
}



const borrarArchivo = (nombreImagen, tipo) => {

    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ nombreImagen }`);
        
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
}

module.exports = {
    upload
}
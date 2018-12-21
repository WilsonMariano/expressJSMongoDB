require('./config/config');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/usuario'));

mongoose.connect('mongodb://cafe:espora953@ds141704.mlab.com:41704/cafe-udemy', {useNewUrlParser: true}, (err, res) =>{

    if(err) throw err;
    console.log("BBDD online");
});
 
app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en puerto ", process.env.PORT);
})
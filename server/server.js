require('./config/config');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/index'));
app.use(express.static(path.resolve(__dirname, '../public')));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {

    if (err) {
        console.log("BBDD offline");
        throw err;
    }
    console.log("BBDD online");
});

app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en puerto ", process.env.PORT);
})
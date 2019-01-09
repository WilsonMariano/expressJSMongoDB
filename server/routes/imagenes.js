const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/:tipo/:img', (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let noImgPath = path.resolve(__dirname, '../assets/no-image.png');
    let imgPath = path.resolve(__dirname, `../../uploads/${ tipo }/${ img }`);

    if(fs.existsSync(imgPath))
        res.sendFile(imgPath);
    else
        res.sendFile(noImgPath);
}); 

module.exports = app;
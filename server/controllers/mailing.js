var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const send = (req, res) => {

    var mailAccountUser = 'mgw009@gmail.com'
    var mailAccountPassword = 'xxxxxxxxxx'

    var fromEmailAddress = 'hola@prueba.com'
    var toEmailAddress = 'mgw009@gmail.com'

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    var transport = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: mailAccountUser,
            pass: mailAccountPassword
        }
    }))

    var mail = {
        from: fromEmailAddress,
        to: toEmailAddress,
        subject: "hello world!",
        text: "Hello!",
        html: '<img src="cid:imagen"/>',
        attachments: [{
            filename: 'image.png',
            path: './server/assets/no-image.png',
            cid: 'imagen'
        }]
    }

    transport.sendMail(mail, function(error, response) {
        if (error) {
            res.json({
                ok: false,
                err: error
            })
        } else {
            res.json({
                ok: true,
                msg: 'Mensaje enviado'
            })
        }

        transport.close();

    });
}

module.exports = {
    send
}
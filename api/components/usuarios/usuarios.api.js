'use strict';
const usuariosModel = require('./usuarios.model');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hotelratingservice123@gmail.com',
        pass: 'cenfotec01'
    }
});


let mailOptions = {
    from: 'hotelratingservice123@gmail.com',
    to: '',
    subject: 'Bienvenido a HotelStar',
    html: ''
};

module.exports.registrar_usuario = function (req, res) {

    let nuevoUsuario = new usuariosModel({
        foto_usuario: req.body.foto_usuario,
        nombre_usuario: req.body.nombre_usuario,
        segundo_nombre_usuario: req.body.segundo_nombre_usuario,
        primer_apellido_usuario: req.body.primer_apellido_usuario,
        segundo_apellido_usuario: req.body.segundo_apellido_usuario,
        correo_usuario: req.body.correo_usuario,
        cedula_usuario: req.body.cedula_usuario,
        fecha_usuario: req.body.fecha_usuario,
        sexo_usuario: req.body.sexo_usuario,
        contrasenna_usuario: req.body.contrasenna_usuario,
        estado_usuario: "Activo",
        rol_usuario: "Cliente",
    });

    nuevoUsuario.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar su usuario, ocurrio el siguiente error ' + error });
        } else {
            mailOptions.to = req.body.correo_usuario;
            mailOptions.html = `
                            <html>   
                            <head>
                                <style>
                                    h1{
                                        padding: 15px 0 15px 0;
                                        text-align: center;
                                    }
                                </style>
                                <style>
                                    html{
                                        background: rgba(77,84,170, 0.7);
                                        color : #ffffff;
                                        padding: 15px 0 15px 0;
                                    }
                                </style>
                            </head> 
                            <body>
                                <h1>Buen día ${req.body.nombre_usuario + '' + req.body.segundo_nombre_usuario + ' ' + req.body.primer_apellido_usuario + ' ' + req.body.segundo_apellido_usuario} </h1>
                                <p>Le contactamos para informarle que su registro ya fue aprobado por HotelStar, por lo que 
                                confirmamos su datos para su respectivo inicio de sesión.</p>
                                <p>Correo del usuario : ${ req.body.correo_usuario} .</p>
                                <p>Contraseña temporal : ${req.body.contrasenna_usuario} .</p>
        
                                <p>Por favor verifique que los datos sean correctos.</p>
                                <p>Muchas gracias.</p>
                            </body>
                            </html>  
                            `;
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.json({ success: true, msg: 'usted se ha registrado con exito' })
        }

    });
};

module.exports.listar = function (req, res) {
    usuariosModel.find().sort({ nombre_usuario: 'asc' }).then(
        function (usuarios) {
            res.send(usuarios);
        });
};

module.exports.buscar_usuario_por_id = function (req, res) {
    usuariosModel.findById({ _id: req.body._id }).then(
        function (usuario) {
            res.send(usuario);
        }
    );
};

module.exports.modificar_usuario = function (req, res) {
    usuariosModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'El usuario no se ha podido modificar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente. ' + res });
            }
        });
};

module.exports.eliminar_usuario = function (req, res) {
    usuariosModel.findByIdAndDelete(req.body._id,
        function (err, usuario) {
            if (err) {
                res.json({ success: false, msg: 'El usuario no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha eliminado correctamente. ' + res });
            }
        });
};
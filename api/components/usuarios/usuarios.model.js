'use strict';
let mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    foto_usuario: { type: String},
    nombre_usuario: { type: String, required: true },
    segundo_nombre_usuario: { type: String},
    primer_apellido_usuario: { type: String, required: true },
    segundo_apellido_usuario: { type: String},
    correo_usuario: { type: String, required: true },
    cedula_usuario: { type: Number, required: true, unique: true },
    fecha_usuario: { type: String, required: true },
    sexo_usuario: { type: String, required: true },
    contrasenna_usuario: { type: String},
    estado_usuario: { type: String, required: true },
    rol_usuario: { type: String},

});

module.exports = mongoose.model('Usuario', usuarioSchema)
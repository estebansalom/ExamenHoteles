'use strict';
let mongoose = require('mongoose');

let hotelSchema = new mongoose.Schema({
    nombre_hotel: { type: String, required: true, unique: true },
    telefono_hotel: { type: Number, required: true, unique: true },
    correo_hotel: { type: String, required: true, unique: true },
    latitud_hotel: { type: Number, required: true },
    longitud_hotel: { type: Number, required: true },
    direccion_hotel: { type: String, required: true, unique: true },
    provincia_hotel: { type: String, required: true },
    canton_hotel: { type: String, required: true },
    distrito_hotel: { type: String, required: true },
    estado_hotel: { type: String, required: true },
    contRatings_hotel: { type: Number, required: true },
    overallRating_hotel: { type: Number, required: true },
    ratingComida_hotel: { type: Number, required: true },
    ratingServicio_hotel: { type: Number, required: true },
    ratingHabitaciones: { type: Number, required: true },
    ratingInfraestructura_hotel: { type: Number, required: true },
    ratingLimpieza_hotel: { type: Number, required: true },

});

module.exports = mongoose.model('Hotel', hotelSchema)
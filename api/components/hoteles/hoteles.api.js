'use strict';

let hotelModel = require('./hoteles.model');

module.exports.registrar_hotel = function (req, res) {
    let nuevoHotel = new hotelModel({
        nombre_hotel: req.body.nombre_hotel,
        telefono_hotel: req.body.telefono_hotel,
        correo_hotel: req.body.correo_hotel,
        latitud_hotel: req.body.latitud_hotel,
        longitud_hotel: req.body.longitud_hotel,
        direccion_hotel: req.body.direccion_hotel,
        provincia_hotel: req.body.provincia_hotel,
        canton_hotel: req.body.canton_hotel,
        distrito_hotel: req.body.distrito_hotel,
        estado_hotel: 'Activo',
        contRatings_hotel: req.body.contRatings_hotel,
        overallRating_hotel: req.body.overallRating_hotel,
        ratingComida_hotel: req.body.ratingComida_hotel,
        ratingServicio_hotel: req.body.ratingServicio_hotel,
        ratingHabitaciones: req.body.ratingHabitaciones,
        ratingInfraestructura_hotel: req.body.ratingInfraestructura_hotel,
        ratingLimpieza_hotel: req.body.ratingLimpieza_hotel
    });

    nuevoHotel.save(function (error) {
        if (error) {
            res.json({
                succes: false,
                msj: 'El hotel no pudo ser registrado: ' + error
            });

        } else {
            res.json({
                succes: true,
                msjs: 'El hotel ha sido registrado con éxito'
            });
        }
    });
};

module.exports.listar = function (req, res) {
    hotelModel.find().sort({ nombre_hotel: 'asc' }).then(
        function (hoteles) {
            res.send(hoteles);
        });
};

module.exports.buscar_hotel_por_id = function (req, res) {
    hotelModel.findById({ _id: req.body._id }).then(
        function (hotel) {
            res.send(hotel);
        }
    );
};

module.exports.eliminar_hotel = function (req, res) {
    hotelModel.findByIdAndDelete(req.body._id,
        function (err, hotel) {
            if (err) {
                res.json({ success: false, msg: 'El hotel no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha eliminado correctamente. ' + res });
            }
        });
};
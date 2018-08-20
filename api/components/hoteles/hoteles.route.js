'use strict';
const express = require('express');
const router = express.Router();
const hotelesApi = require('./hoteles.api');

router.route('/registrar_hotel')
    .post(function (req, res) {
        hotelesApi.registrar_hotel(req, res)
    });

router.route('/listar_hoteles')
    .get(function (req, res) {
        hotelesApi.listar(req, res);
    });


router.route('/buscar_hotel_id')
    .post(function (req, res) {
        hotelesApi.buscar_hotel_por_id(req, res);
    });

router.route('/eliminar_hotel')
    .post(function (req, res) {
        hotelesApi.eliminar_hotel(req, res);
    });

module.exports = router;
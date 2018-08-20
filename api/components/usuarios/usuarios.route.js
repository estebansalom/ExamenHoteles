'use strict';
const express = require('express');
const router = express.Router();
const usuariosApi = require('./usuarios.api');

router.route('/registrar_usuario')
    .post(function (req, res) {
        usuariosApi.registrar_usuario(req, res)
    });

router.route('/listar_usuarios')
    .get(function (req, res) {
        usuariosApi.listar(req, res);
    });

router.route('/buscar_usuario_id')
    .post(function (req, res) {
        usuariosApi.buscar_usuario_por_id(req, res);
    });

    
router.route('/modificar_usuario')
.post(function (req, res) {
    usuariosApi.modificar_usuario(req, res);
});

router.route('/eliminar_usuario')
    .post(function (req, res) {
        usuariosApi.eliminar_usuario(req, res);
    });

module.exports = router;
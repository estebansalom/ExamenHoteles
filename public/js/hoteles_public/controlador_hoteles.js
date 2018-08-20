'use strict';

let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatos);

let inputNombre = document.querySelector('#txtNombre');
let inputTelefono = document.querySelector('#txtTelefono');
let inputCorreo = document.querySelector('#txtCorreo');
let inputLatitud = document.querySelector('#numLatitud');
let inputLongitud = document.querySelector('#numLongitud');
let inputDireccion = document.querySelector('#txtDireccion');
let inputProvincia = document.querySelector('#sltProvincia');
let inputCanton = document.querySelector('#sltCanton');
let inputDistrito = document.querySelector('#sltDistrito');

let regexSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
let regexNombre = /^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ.,&' ]+$/;
let regexDireccion = /^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ., ]+$/;
let regexSoloNumeros = /^[0-9]+$/;
let regexCoordenadas = /^[0-9.-]+$/;

let sNombre = '';
let sTelefono = '';
let sCorreo = '';
let nLatitud = 0;
let nLongitud = 0;
let sDireccion = '';
let sProvincia = '';
let sCanton = '';
let sDistrito = '';
let sEstado = 'Activo';
let contRatings = 0;
let overallRating = 0;
let ratingComida = 0;
let ratingServicio = 0;
let ratingHabitaciones = 0;
let ratingInfraestructura = 0;
let ratingLimpieza = 0;


function obtenerDatos() {
    let infoHotel = [];
    let bError = false;

    sNombre = inputNombre.value;
    sTelefono = inputTelefono.value;
    sCorreo = inputCorreo.value;
    nLatitud = inputLatitud.value;
    nLongitud = inputLongitud.value;
    sDireccion = inputDireccion.value;
    sProvincia = inputProvincia.value;
    sCanton = inputCanton.value;
    sDistrito = inputDistrito.value;

    bError = validarHotel();
    if (bError) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar el hotel, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'El hotel se registró correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        infoHotel.push(sNombre, sTelefono, sCorreo, nLatitud, nLongitud, sDireccion, sProvincia, sCanton, sDistrito, sEstado, contRatings, overallRating, ratingComida, ratingServicio, ratingHabitaciones, ratingInfraestructura, ratingLimpieza);
        registrarHotel(infoHotel);
    }

};

function validarHotel() {
    let bError = false;

    sNombre = inputNombre.value;
    sTelefono = inputTelefono.value;
    sCorreo = inputCorreo.value;
    nLatitud = inputLatitud.value;
    nLongitud = inputLongitud.value;
    sDireccion = inputDireccion.value;
    sProvincia = inputProvincia.value;
    sCanton = inputCanton.value;
    sDistrito = inputDistrito.value;

    // Validacion contra blancos
    let arregloInputs = document.querySelectorAll('#sct_registrar input:required');
    for (let i = 0; i < arregloInputs.length; i++) {
        if (arregloInputs[i].value == '') {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }

        // Validacion para el nombre
        if (regexNombre.test(sNombre) == false) {
            bError = true;
            inputNombre.classList.add('errorInput');
        } else {
            inputNombre.classList.remove('errorInput');
        };

        // Validacion para la direccion
        if (regexDireccion.test(sDireccion) == false) {
            bError = true;
            inputDireccion.classList.add('errorInput');
        } else {
            inputDireccion.classList.remove('errorInput');
        };

        // Validacion para el telefono
        if (regexSoloNumeros.test(sTelefono) == false) {
            bError = true;
            inputTelefono.classList.add('errorInput');
        } else {
            inputTelefono.classList.remove('errorInput');
        };

        // Validacion para la provincia
        if (inputProvincia.value == '') {
            inputProvincia.classList.add('errorInput');
            bError = true;
        } else {
            inputProvincia.classList.remove('errorInput');
        };

        // Validacion para el canton
        if (inputCanton.value == '') {
            inputCanton.classList.add('errorInput');
            bError = true;
        } else {
            inputCanton.classList.remove('errorInput');
        };

        // Validacion para el distrito
        if (inputDistrito.value == '') {
            inputDistrito.classList.add('errorInput');
            bError = true;
        } else {
            inputDistrito.classList.remove('errorInput');
        };

        // Validacion para la longitud
        if (regexCoordenadas.test(nLongitud) == false) {
            bError = true;
            inputLongitud.classList.add('errorInput');
        } else {
            inputLongitud.classList.remove('errorInput');
        }

        // Validacion para la latitud
        if (regexCoordenadas.test(nLatitud) == false) {
            bError = true;
            inputLatitud.classList.add('errorInput');
        } else {
            inputLatitud.classList.remove('errorInput');
        }
    }

    return bError

};
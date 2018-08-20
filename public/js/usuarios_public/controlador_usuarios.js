'use strict';

let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatos);

const elementoImagen = document.querySelector('#txtImagen');
let inputNombre = document.querySelector('#txtNombre');
let inputSegundoNombre = document.querySelector('#txtSegundoNombre');
let inputPrimerApellido = document.querySelector('#txtPrimerApellido');
let inputSegundoApellido = document.querySelector('#txtSegundoApellido');
let inputCorreo = document.querySelector('#txtCorreo');
let inputCedula = document.querySelector('#txtCedula');
let inputNacimiento = document.querySelector('#dateNacimiento');
let inputSexo = document.querySelector('#sltSexo');
let inputContrasenna = document.querySelector('#txtContrasenna');
let inputConfirmacion = document.querySelector('#txtConfirmacion');

let regexSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
let regexSoloNumeros = /^[0-9]+$/;
let regexCedula = /^[1-9]-?\d{4}-?\d{4}$/;


let dHoy = new Date();

let sNombre = '';
let sSegundoNombre = '';
let sPrimerApellido ='';
let sSegundoApellido = '';
let sCedula = '';
let sCorreo = '';
let dNacimiento = dHoy;
let sSexo = '';
let sContrasenna = '';
let sConfirmacion = '';
let sEstado = '';
let sRol = '';

function obtenerDatos(){
    let infoUsuario = [];

    sNombre = inputNombre.value;
    sSegundoNombre = inputSegundoNombre.value;
    sPrimerApellido = inputPrimerApellido.value;
    sSegundoApellido = inputSegundoApellido.value;
    sCedula = inputCedula.value;
    dNacimiento = inputNacimiento.value;
    sCorreo = inputCorreo.value;
    sSexo = inputSexo.value;
    sContrasenna = inputContrasenna.value;
    sConfirmacion = inputConfirmacion.value;

    

    let bError = false;
    bError = validarUsuario();
    if (bError) {
        swal({
            title: 'Registro incorrecto',
            text: 'No se pudo registrar su usuario, verifique que completó correctamente la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Registro correcto',
            text: 'el usuario se registró correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        infoUsuario.push(imagenUrl, sNombre, sSegundoNombre, sPrimerApellido, sSegundoApellido, sCorreo, sCedula, dNacimiento, sSexo, sContrasenna, sEstado, sRol);
        console.log(infoUsuario);
        registrarUsuario(infoUsuario);

    }
};

function validarUsuario() {
    let bError = false;
    sNombre = inputNombre.value;
    sSegundoNombre = inputSegundoNombre.value;
    sPrimerApellido = inputPrimerApellido.value;
    sSegundoApellido = inputSegundoApellido.value;
    sCorreo = inputCorreo.value;
    sCedula = inputCedula.value;
    dNacimiento = new Date(inputNacimiento.value);
    let dHoy = new Date();
    sSexo = inputSexo.value;
    sContrasenna = inputContrasenna.value;

    // Validacion contra blancos
    let arregloInputs = document.querySelectorAll('#sct_registrar input:required');
    for (let i = 0; i < arregloInputs.length; i++) {
        if (arregloInputs[i].value == '') {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }
    };

    // Validacion para el nombre
    if (regexSoloLetras.test(sNombre) == false) {
        bError = true;
        inputNombre.classList.add('errorInput');
    } else {
        inputNombre.classList.remove('errorInput');
    };

    // Validacion para el primer apellido
    if (regexSoloLetras.test(sPrimerApellido) == false) {
        bError = true;
        inputPrimerApellido.classList.add('errorInput');
    } else {
        inputPrimerApellido.classList.remove('errorInput');
    };

    // Validacion de la fecha
    if (dNacimiento > dHoy) {
        bError = true;
        inputNacimiento.classList.add('errorInput');
    } else {
        inputNacimiento.classList.remove('errorInput');
    };

    // Validacion para la cedula
    if (regexCedula.test(sCedula) == false) {
        bError = true;
        inputCedula.classList.add('errorInput');
    } else {
        inputCedula.classList.remove('errorInput');
    };

    if (regexSoloNumeros.test(sCedula) == false) {
        bError = true;
        inputCedula.classList.add('errorInput');
    } else {
        inputCedula.classList.remove('errorInput');
    };

    if (sContrasenna == sConfirmacion){
        inputContrasenna.classList.remove('errorInput');
        inputConfirmacion.classList.remove('errorInput');
        bError = false;
    };

    if (sContrasenna == "") {
        inputContrasenna.classList.add('errorInput');
    } else {
        inputContrasenna.classList.remove('errorInput');
    };

    if (sConfirmacion == "") {
        inputConfirmacion.classList.add('errorInput');
    } else {
        inputConfirmacion.classList.remove('errorInput');
    };

    return bError;
};
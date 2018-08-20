'use strict';

let windowLocation = window.location.href;
let listaUsuarios = obtenerListaUsuarios();

// Inicio iniciar sesion
let inputCorreoSesion = document.querySelector('#txtCorreoSesion');
let inputContrasennaSesion = document.querySelector('#txtContrasennaSesion');
let botonIngresar = document.querySelector('#btnIngresar');
botonIngresar.addEventListener('click', obtenerDatosInicio);

let sCorreoSesion = "";
let sContrasennaSesion = "";

function obtenerDatosInicio() {
    localStorage.clear();
    sCorreoSesion = inputCorreoSesion.value;
    sContrasennaSesion = inputContrasennaSesion.value;

    // validar pequenno
    if (sCorreoSesion == "") {
        inputCorreoSesion.classList.add('errorInput');
    } else {
        inputCorreoSesion.classList.remove('errorInput');
    }
    if (sContrasennaSesion == "") {
        inputContrasennaSesion.classList.add('errorInput');
    } else {
        inputContrasennaSesion.classList.remove('errorInput');
    }
    // validar pequenno

    let bError = false;
    bError = verificarCredenciales(sCorreoSesion, sContrasennaSesion);
    if (bError) {
        swal({
            title: 'No se pudo iniciar sesión',
            text: 'Verifique que el correo y la contraseña estén bien escritos',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        accionRol(localStorage.getItem('rolUsuario'));
    }
}
// ssotom@ucenfotec.ac.cr
// 121000
function verificarCredenciales(sCorreoSesion, sContrasennaSesion) {

    let bError = true;
    for (let i = 0; i < listaUsuarios.length; i++) {
        if (sCorreoSesion === listaUsuarios[i]['correo_usuario']) {
            if (sContrasennaSesion == listaUsuarios[i]['contrasenna_usuario']) {

                let nombreCompleto = listaUsuarios[i]['nombre_usuario']+' '+listaUsuarios[i]['primer_apellido_usuario']+' '+listaUsuarios[i]['segundo_apellido_usuario']
                localStorage.setItem('idUsuario', listaUsuarios[i]['_id']);
                localStorage.setItem('rolUsuario', listaUsuarios[i]['rol_usuario']);
                localStorage.setItem('nombreCompletoUsuario', nombreCompleto);
                localStorage.setItem('correo_usuario', listaUsuarios[i]['correo_usuario']);

                inputContrasennaSesion.classList.remove('errorInput');
                bError = false;
                break;
            }
        }
    }
    return bError;
}
function accionRol(psRol) {
    switch (psRol) {
        case 'Administrador':
            window.location.href = "../html/lista_usuarios.html";
            break;
        case 'Cliente':
            window.location.href = "../html/lista_hoteles.html";
            break;
        

    }
}

// Fin iniciar sesion

// Inicio formulario
let popup = document.querySelector('#sct_iniciar_sesion');
let botonIniciar = document.querySelector('#btnIniciar');
botonIniciar.addEventListener('click', function () {
    popup.style.display = "block";
});

// Esto es para que se salga del formulario si toca fuera del contenido
window.onclick = function (event) {
    if (event.target == popup) {
        popup.style.display = "none";
        inputContrasennaSesion.value = "";
        inputCorreoSesion.value = "";
        inputCorreoSesion.classList.remove('errorInput');
        inputContrasennas.classList.remove('errorInput');
    }
}
// Esto es para que despliegue el formulario
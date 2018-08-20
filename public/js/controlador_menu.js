'use strict';


let rolActual = localStorage.getItem('rolUsuario');
leerRolOpciones();
let inputContrasennaActual = document.querySelector('#txtNuevaContrasenna');
let inputConfirmacion = document.querySelector('#txtConfirmacion');
let inputIdContrasenna = document.querySelector('#txtIdContrasenna');
let botonObtenerContrasenna = document.querySelector('#btnContrasenna');

let sContrasenna = '';
let sConfirmacion = '';
let sId = '';


// Para menu Opciones
$('#btnOpciones').click(function () {
    if ($('#menuOpciones').css('display') === 'none') {
        $('#menuOpciones').slideDown('250');
    }
});
$('#menuOpciones, header nav>div').mouseleave(function () {
    $('#menuOpciones').slideUp('250');
});



// Para cerrar sesion
let botonCerrar = document.querySelector('#btnCerrarSesion');
botonCerrar.addEventListener('click', cerrarSesion);
function cerrarSesion() {
    swal({
        title: '¿Seguro que desea cerrar sesión?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.value) {
            window.localStorage.clear();
            window.location.href = "../html/landing_page.html";
        }
    })

}

// Desplegar el boton de opciones con las opciones que correopnden
function leerRolOpciones() {

    // En el primer espacio va el nombre de la opcion y en el segundo la ruta

    // Estas son las opciones comunes por rol
    let opcionHoteles = ['Ver hoteles', '../html/lista_hoteles.html'];
    let opcionUsuarios = ['Ver usuarios', '../html/lista_usuarios.html'];
    let opcionRHoteles = ['Registrar hoteles', '../html/registro_hoteles.html'];
    
    let opcionesAdministrador = [];
    opcionesAdministrador.push(opcionHoteles, opcionUsuarios, opcionRHoteles);

    let opcionesCliente = [];
    opcionesCliente.push(opcionHoteles);

    switch (rolActual) {
        case 'Administrador':
            imprimirOpciones(opcionesAdministrador);
            break;

        case 'Cliente':
            imprimirOpciones(opcionesCliente);
            break;

    }
}

function imprimirOpciones(paOpciones) {
    let menu = document.querySelector('#menuOpciones');
    for (let i = 0; i < paOpciones.length; i++) {
        let newLi = document.createElement('li');
        let newA = document.createElement('a');
        newA.href = paOpciones[i][1];
        newA.textContent = paOpciones[i][0];
        newLi.appendChild(newA);
        menu.appendChild(newLi);
    }
}


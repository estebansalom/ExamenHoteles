'use strict'
mostrarListaUsuarios();

let botonActualizar = document.querySelector('#btnActualizar');
botonActualizar.addEventListener('click', obtenerDatosActual);
let popup;

let inputIdUsuario = document.querySelector('#txtId');
const elementoImagenActual = document.querySelector('#txtImagenActual');
let inputNombre = document.querySelector('#txtNombre');
let inputSegundoNombre = document.querySelector('#txtSegundoNombre');
let inputPrimerApellido = document.querySelector('#txtPrimerApellido');
let inputSegundoApellido = document.querySelector('#txtSegundoApellido');
let inputCedula = document.querySelector('#txtCedula');
let inputFecha = document.querySelector('#dateNacimiento');
let inputCorreo = document.querySelector('#txtCorreo');
let inputSexo = document.querySelector('#sltSexo')
let inputRol = document.querySelector('#txtRol');
let inputEstado = document.querySelector('#txtEstado')

let regexSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
let regexSoloNumeros = /^[0-9]+$/;
let regexCedula = /^[1-9]-?\d{4}-?\d{4}$/;


let dHoy = new Date();

let id = '';
let sNombre = '';
let sSegundoNombre = '';
let sPrimerApellido ='';
let sSegundoApellido = '';
let sCedula = '';
let sCorreo = '';
let dNacimiento = dHoy;
let sSexo = '';
let sEstado = '';



let inputBuscar = document.querySelector('#txtBusqueda');

// Buscar
// Buscar
inputBuscar.addEventListener('keyup', function () {
    let busqueda = inputBuscar.value;
    mostrarListaUsuarios(busqueda);
});


// Listar
function mostrarListaUsuarios(paBuscar) {
    let listaUsuarios = obtenerListaUsuarios();
    let tbody = document.querySelector('#tblUsuarios tbody');

    if (!paBuscar) {
        paBuscar = '';
    }

    tbody.innerHTML = '';

    for (let i = 0; i < listaUsuarios.length; i++) {
        if ((listaUsuarios[i]['nombre_usuario'].toLowerCase().includes(paBuscar.toLowerCase()))) {
            let fila = tbody.insertRow();
            let celdaFoto = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let celdaCorreo = fila.insertCell();
            let celdaVerMas = fila.insertCell();
            let celdaOpciones = fila.insertCell();

            let imagen = document.createElement('img');
            imagen.src = listaUsuarios[i]['foto_usuario'];
            imagen.classList.add('imageSettings');
            celdaFoto.appendChild(imagen);

            //    Esto separa el nombre de los apellidos
            let sNombre = listaUsuarios[i]['nombre_usuario'];
            let sSegundoNombre = listaUsuarios[i]['segundo_nombre_usuario'];
            let sPrimerApellido = listaUsuarios[i]['primer_apellido_usuario'];
            let sSegundoApellido = listaUsuarios[i]['segundo_apellido_usuario'];

            let nombreSpan = crearSpan(sNombre + ' ' + sSegundoNombre+ ' ' + sPrimerApellido + ' ' + sSegundoApellido);
            let correoSpan = crearSpan(listaUsuarios[i]['correo_usuario']);

            celdaNombre.appendChild(nombreSpan);
            celdaCorreo.appendChild(correoSpan);

            //Este es el boton de ver mas info
            let botonVerMas = document.createElement('button');
            botonVerMas.name = "btnTabla";
            botonVerMas.innerHTML = "Ver más información";
            botonVerMas.dataset._id = listaUsuarios[i]['_id'];
            botonVerMas.addEventListener('click', verMas);
            botonVerMas.addEventListener('click', function () {
                let ppMasInfo = document.querySelector('#sct_verMas');
                ppMasInfo.style.display = "block";
                window.onclick = function (event) {
                    if (event.target == ppMasInfo) {
                        ppMasInfo.style.display = "none";
                    }
                }

            });
            celdaVerMas.appendChild(botonVerMas);


            // Este es el boton de editar
            let botonEditar = document.createElement('span');
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-cogs');
            botonEditar.dataset._id = listaUsuarios[i]['_id'];
            botonEditar.addEventListener('click', buscar_por_id);
            botonEditar.addEventListener('click', function () {
                let ppModificar = document.querySelector('#sct_registrar')
                ppModificar.style.display = "block";
                window.onclick = function (event) {
                    if (event.target == ppModificar) {
                        ppModificar.style.display = "none";
                    }
                }
            });



            celdaOpciones.appendChild(botonEditar);



            // Este es el boton de eliminar
            let botonEliminar = document.createElement('span');
            botonEliminar.classList.add('fas');
            botonEliminar.classList.add('fa-trash-alt');
            botonEliminar.dataset._id = listaUsuarios[i]['_id'];

            celdaOpciones.appendChild(botonEliminar);
            botonEliminar.addEventListener('click', remover_usuario);
            // Este es el boton de eliminar

        }
    };
};


// Funcion que recibe un parametro y crea un span con ese texto.
function crearSpan(pInfo) {
    let nuevoSpan = document.createElement('span');
    nuevoSpan.textContent = pInfo;
    return nuevoSpan;
}



function buscar_por_id() {
    //Binding
    let _id = this.dataset._id;
    let usuario = obtener_usuario_por_id(_id);

    console.log(usuario);

    inputIdUsuario.value = usuario['_id'];
    elementoImagenActual.src = usuario['foto_usuario'];
    inputNombre.value = usuario['nombre_usuario'];
    inputSegundoNombre.value = usuario['segundo_nombre_usuario'];
    inputPrimerApellido.value = usuario['primer_apellido_usuario'];
    inputSegundoApellido.value = usuario['segundo_apellido_usuario'];
    inputCedula.value = usuario['cedula_usuario'];
    inputFecha.value = usuario['fecha_usuario'];
    inputCorreo.value = usuario['correo_usuario'];
    inputSexo.value = usuario['sexo_usuario'];
    inputEstado.value = usuario['estado_usuario'];

};

function verMas() {
    let fotoPerfil = document.querySelector('#img');
    let nombrePerfil = document.querySelector('#nombrePerfil');
    let perfilInfo = document.querySelector('.perfil-info');
    let _id = this.dataset._id;
    let masInfo = obtener_usuario_por_id(_id);

    fotoPerfil.style.backgroundImage = "url('" + masInfo['foto_usuario'] + "')";

    nombrePerfil.innerHTML = '';
    let nombreCompleto = masInfo['nombre_usuario'] + " " + masInfo['segundo_nombre_usuario'] + " " + masInfo['primer_apellido_usuario'] + " " + masInfo['segundo_apellido_usuario'];
    nombrePerfil.innerHTML = nombreCompleto;

    perfilInfo.innerHTML = '';
    perfilInfo.appendChild(createTextElement('Correo:', 'h2'));
    perfilInfo.appendChild(createTextElement(masInfo['correo_usuario'], 'h3'));
    perfilInfo.appendChild(createTextElement('Cedula:', 'h2'));
    perfilInfo.appendChild(createTextElement(masInfo['cedula_usuario'], 'h3'));
    perfilInfo.appendChild(createTextElement('Sexo:', 'h2'));
    perfilInfo.appendChild(createTextElement(masInfo['sexo_usuario'], 'h3'));
    }
function createTextElement(text, element) {
    let newH2 = document.createElement(element);
    newH2.textContent = text;
    return newH2
};

function obtenerDatosActual(){
    let infoUsuario = [];

    id = inputIdUsuario.value;
    sNombre = inputNombre.value;
    sSegundoNombre = inputSegundoNombre.value;
    sPrimerApellido = inputPrimerApellido.value;
    sSegundoApellido = inputSegundoApellido.value;
    sCedula = inputCedula.value;
    dNacimiento = inputFecha.value;
    sCorreo = inputCorreo.value;
    sSexo = inputSexo.value;
    sEstado = inputEstado.value;

    

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
        infoUsuario.push(id, imagenUrlActual, sNombre, sSegundoNombre, sPrimerApellido, sSegundoApellido, sCorreo, sCedula, dNacimiento, sSexo, sEstado);
        console.log(infoUsuario);
        actualizarUsuario(infoUsuario);

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
    dNacimiento = new Date(inputFecha.value);
    let dHoy = new Date();
    sSexo = inputSexo.value;

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
        inputFecha.classList.add('errorInput');
    } else {
        inputFecha.classList.remove('errorInput');
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


    return bError;
};

function remover_usuario() {
    let _id = this.dataset._id;
    swal({
        title: 'Está seguro?',
        text: "El hotel se eliminará permanentemente",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar!'
    }).then((result) => {
        if (result.value) {
            eliminarUsuario(_id);
            obtenerListaUsuarios();
            mostrarListaUsuarios();
            swal(
                'Eliminado!',
                'El usuario ha sido eliminado con éxito',
                'success'
            )
        }
    });

};
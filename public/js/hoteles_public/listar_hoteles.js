'use strict';
let rolUsuarioActual = localStorage.getItem('rolUsuario');
mostrarListaHoteles();
let botonActualizar = document.querySelector('#btnActualizar');
botonActualizar.addEventListener('click', obtenerDatosActual);
document.querySelector('#sltProvincia').addEventListener('change', llenarCanton);
document.querySelector('#sltCanton').addEventListener('change', llenarDistrito);
let inputBuscar = document.querySelector('#txtBusqueda');
let inputIdHotel = document.querySelector('#txtId');
let botonNuevaCalificacion = document.querySelector('#btnCalificar');
botonNuevaCalificacion.addEventListener('click', calificarHotel)

let inputNombre = document.querySelector('#txtNombre');
let inputTelefono = document.querySelector('#txtTelefono');
let inputCorreo = document.querySelector('#txtCorreo');
let inputLatitud = document.querySelector('#numLatitud');
let inputLongitud = document.querySelector('#numLongitud');
let inputDireccion = document.querySelector('#txtDireccion');
let inputProvincia = document.querySelector('#sltProvincia');
let inputCanton = document.querySelector('#sltCanton');
let inputDistrito = document.querySelector('#sltDistrito');
let inputEstado = document.querySelector('#txtEstado');

let regexSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
let regexNombre = /^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ.,&' ]+$/;
let regexDireccion = /^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ., ]+$/;
let regexSoloNumeros = /^[0-9]+$/;
let regexCoordenadas = /^[0-9.-]+$/;

let id = '';
let sNombre = '';
let sTelefono = '';
let sCorreo = '';
let nLatitud = 0;
let nLongitud = 0;
let sDireccion = '';
let sProvincia = '';
let sCanton = '';
let sDistrito = '';
let sEstado = '';
let contRatings = 0;
let overallRating = 0;
let ratingComida = 0;
let ratingServicio = 0;
let ratingHabitaciones = 0;
let ratingInfraestructura = 0;
let ratingLimpieza = 0;

let popup;
// Buscar
// Buscar
inputBuscar.addEventListener('keyup', function () {
    let busqueda = inputBuscar.value;
    mostrarListaHoteles(busqueda);
});



// Listar
function mostrarListaHoteles(paBuscar) {
    let listaHoteles = obtenerListaHoteles();
    let tbody = document.querySelector('#tblHoteles tbody');

    if (!paBuscar) {
        paBuscar = '';
    }

    tbody.innerHTML = '';

    for (let i = 0; i < listaHoteles.length; i++) {
        if ((listaHoteles[i]['nombre_hotel'].toLowerCase().includes(paBuscar.toLowerCase()))) {
            let fila = tbody.insertRow();
            let celdaNombre = fila.insertCell();
            let celdaCalificacion = fila.insertCell();
            let celdaVerMas = fila.insertCell();
            let celdaOpciones = fila.insertCell();


            //    Esto separa el nombre de los apellidos
            celdaNombre.innerHTML = listaHoteles[i]['nombre_hotel'];

            let ratingHotel = listaHoteles[i]['overallRating_hotel'];

            let ratingHolder = document.createElement('p');
            ratingHolder.name = "rating";
            ratingHolder.classList.add('clasificacion');
            for (let i = 0; i < ratingHotel; i++) {
                let radio = document.createElement('input');
                radio.type = "radio";
                radio.classList.add('.inputEstrella');
                let radioLabel = document.createElement('label');
                radioLabel.classList.add('estrellaRating');
                radioLabel.setAttribute("for", radio);
                radioLabel.innerHTML = "★";
                ratingHolder.appendChild(radio);
                ratingHolder.appendChild(radioLabel);
            };
            celdaCalificacion.appendChild(ratingHolder);

            //Este es el boton de ver mas info
            let botonVerMas = document.createElement('button');
            botonVerMas.name = "btnTabla";
            botonVerMas.innerHTML = "Ver más información";
            botonVerMas.dataset._id = listaHoteles[i]['_id'];
            botonVerMas.addEventListener('click', verMas);
            botonVerMas.addEventListener('click', function () {
                popup = document.querySelector('#sct_verMas');
                popup.style.display = "block";
                window.onclick = function (event) {
                    if (event.target == popup) {
                        popup.style.display = "none";
                    }
                }

            });


            celdaVerMas.appendChild(botonVerMas);


            let botonCalificar = document.createElement('span');
            botonCalificar.classList.add('fas');
            botonCalificar.classList.add('fa-star');
            botonCalificar.dataset._id = listaHoteles[i]['_id'];
            botonCalificar.addEventListener('click', agregarCalificacion);
            botonCalificar.addEventListener('click', function () {
                popup = document.querySelector('#sct_rating');
                popup.style.display = "block";
                window.onclick = function (event) {
                    if (event.target == popup) {
                        popup.style.display = "none";
                    }
                }

            });
            celdaOpciones.appendChild(botonCalificar);

            if (rolUsuarioActual == 'Administrador'){
                // Este es el boton de editar
            let botonEditar = document.createElement('span');
            botonEditar.classList.add('fas');
            botonEditar.classList.add('fa-cogs');
            botonEditar.name = "botonModificar";
            botonEditar.dataset._id = listaHoteles[i]['_id'];
            botonEditar.addEventListener('click', buscar_por_id);
            botonEditar.addEventListener('click', function () {
                popup = document.querySelector('#sct_registrar')
                popup.style.display = "block";
            });
            // Agregar esto a los formularios que tengan mucho contenido (hace una animacion de scroll a la parte superior del formulario)
            $(".scroll").animate({ scrollTop: 0 }, "fast"); 


            celdaOpciones.appendChild(botonEditar);


            // Este es el boton de eliminar
            let botonEliminar = document.createElement('span');
            botonEliminar.classList.add('fas');
            botonEliminar.classList.add('fa-trash-alt');

            botonEliminar.dataset._id = listaHoteles[i]['_id'];
            botonEliminar.addEventListener('click', remover_hotel);

            celdaOpciones.appendChild(botonEliminar);

            };
            
        }
    };
};

function obtenerDatosActual() {
    let infoHotelActual = [];
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
    sEstado = inputEstado.value;

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
        infoHotelActual.push(id, sNombre, sTelefono, sCorreo, nLatitud, nLongitud, sDireccion, sProvincia, sCanton, sDistrito, sEstado);
        actualizarHotel(infoHotelActual);
    }

};

function validarHotel() {
    let bError = false;

    id = inputIdHotel.value;
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

function verMas() {
    let nombreHotel = document.querySelector('#nombreHotel');
    let perfilInfo = document.querySelector('.perfil-info');
    let _id = this.dataset._id;
    let masInfo = obtener_hotel_por_id(_id);

    nombreHotel.innerHTML = masInfo['nombre_hotel'];

    perfilInfo.innerHTML = '';
    perfilInfo.appendChild(createTextElement('Telefono:', 'h2'));
    perfilInfo.appendChild(createTextElement(masInfo['telefono_hotel'], 'h3'));
    perfilInfo.appendChild(createTextElement('Correo:', 'h2'));
    perfilInfo.appendChild(createTextElement(masInfo['correo_hotel'], 'h3'));
    perfilInfo.appendChild(createTextElement('Provincia:', 'h2'));
    perfilInfo.appendChild(createTextElement(masInfo['provincia_hotel'], 'h3'));
    perfilInfo.appendChild(createTextElement('Canton:', 'h2'));
    perfilInfo.appendChild(createTextElement(masInfo['canton_hotel'], 'h3'));
    perfilInfo.appendChild(createTextElement('Distrito:', 'h2'));
    perfilInfo.appendChild(createTextElement(masInfo['distrito_hotel'], 'h3'));
    perfilInfo.appendChild(createTextElement('Dirección exacta:', 'h2'));
    perfilInfo.appendChild(createTextElement(masInfo['direccion_hotel'], 'h3'));
}
function createTextElement(text, element) {
    let newH2 = document.createElement(element);
    newH2.textContent = text;
    return newH2
};


function calificarHotel() {

    let inputRatingComida = document.querySelector('#ratingComida input:checked');
    let inputRatingServicio = document.querySelector('#ratingServicio input:checked');
    let inputRatingHabitaciones = document.querySelector('#ratingHabitaciones input:checked');
    let inputRatingInfraestructura = document.querySelector('#ratingInfraestructura input:checked');
    let inputRatingLimpieza = document.querySelector('#ratingLimpieza input:checked');

    let nuevoRatingComida = 0;
    let nuevoRatingServicio = 0;
    let nuevoRatingHabitaciones = 0;
    let nuevoRatingInfraestructura = 0;
    let nuevoRatingLimpieza = 0;

    let nuevoRating = [];
    nuevoRatingComida = inputRatingComida.value;
    nuevoRatingServicio = inputRatingServicio.value;
    nuevoRatingHabitaciones = inputRatingHabitaciones.value;
    nuevoRatingInfraestructura = inputRatingInfraestructura.value;
    nuevoRatingLimpieza = inputRatingLimpieza.value;

    nuevoRating.push(nuevoRatingComida, nuevoRatingServicio, nuevoRatingHabitaciones, nuevoRatingInfraestructura, nuevoRatingLimpieza);
    console.log(nuevoRating);
    agregarCalificacion(nuevoRating);

}

function agregarCalificacion(paRating) {

    let _id = this.dataset._id;
    let ratings = obtener_hotel_por_id(_id);
    let ratingActualizado = [];
    console.log(ratings);

    let rComida = 0;
    let rServicio = 0;
    let rHabitaciones = 0;
    let rInfraestructura = 0;
    let rLimpieza = 0;

    let rContRatings = 0;
    let rComidaActual = 0;
    let rServicioActual = 0;
    let rHabitacionesActual = 0;
    let rInfraestructuraActual = 0;
    let rLimpiezaActual = 0;
    let overallRatingActual = 0;

    rComida = paRating[0];
    rServicio = paRating[1];
    rHabitaciones = paRating[2];
    rInfraestructura = paRating[3];
    rLimpieza = paRating[4];

    let contRatings = ratings['contRatings_hotel'];
    let ratingComida = ratings['ratingComida_hotel'];
    let ratingServicio = ratings['ratingServicio_hotel'];
    let ratingHabitaciones = ratings['ratingHabitaiones'];
    let ratingInfraestructura = ratings['ratingInfraestructura_hotel'];
    let ratingLimpieza = ratings['ratingLimpieza_hotel'];

    rContRatings = contRatings + 1;
    rComidaActual = rComida + ratingComida;
    rServicioActual = rServicio + ratingServicio;
    rHabitacionesActual = rHabitaciones + ratingHabitaciones;
    rInfraestructuraActual = rInfraestructura + ratingInfraestructura;
    rLimpiezaActual = rLimpieza + ratingLimpieza;
    overallRatingActual = ((rComidaActual + rServicioActual + rHabitacionesActual + rInfraestructuraActual + rLimpiezaActual) / contRatings) / 5;
    ratingActualizado.push(rContRatings, rComidaActual, rServicioActual, rHabitacionesActual, rInfraestructuraActual, rLimpiezaActual, overallRatingActual);
    console.log(ratingActualizado);


}

function buscar_por_id() {
    //Binding
    let _id = this.dataset._id;
    let hotel = obtener_hotel_por_id(_id);

    console.log(hotel);

    inputIdHotel.value = hotel['_id'];
    inputNombre.value = hotel['nombre_hotel'];
    inputTelefono.value = hotel['telefono_hotel'];
    inputCorreo.value = hotel['correo_hotel'];
    inputLatitud.value = hotel['latitud_hotel'];
    inputLongitud.value = hotel['longitud_hotel'];
    inputDireccion.value = hotel['direccion_hotel'];
    inputProvincia.value = hotel['provincia_hotel']
    inputCanton.value = hotel['canton_hotel'];
    inputDistrito = hotel['distrito_hotel'];
    inputEstado.value = hotel['estado_hotel'];


    let sProvincia = document.querySelector('#sltProvincia');
for (let i = 1; i < sProvincia.length; i++) {
    if (sProvincia.options[i].value == hotel['provincia_hotel']) {
        sProvincia.selectedIndex = i;
    }
}

llenarCanton();
let sCanton = document.querySelector('#sltCanton');
for (let i = 1; i < sCanton.length; i++) {
    if (sCanton.options[i].value == hotel['canton_hotel']) {
        sCanton.selectedIndex = i;
    }
}
llenarDistrito();
let sDistrito = document.querySelector('#sltDistrito');
for (let i = 1; i < sDistrito.length; i++) {
    if (sDistrito.options[i].value == hotel['distrito_hotel']) {
        sDistrito.selectedIndex = i;
    }
}
};

function remover_hotel() {
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
            eliminarHotel(_id);
            obtenerListaHoteles();
            mostrarListaHoteles();
            swal(
                'Eliminado!',
                'El hotel ha sido eliminado con éxito',
                'success'
            )
        }
    });

};
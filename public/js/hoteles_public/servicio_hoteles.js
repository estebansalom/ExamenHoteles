'use strict';

function registrarHotel(paInfoHotel) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_hotel',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre_hotel: paInfoHotel[0],
            telefono_hotel: paInfoHotel[1],
            correo_hotel: paInfoHotel[2],
            latitud_hotel: paInfoHotel[3],
            longitud_hotel: paInfoHotel[4],
            direccion_hotel: paInfoHotel[5],
            provincia_hotel: paInfoHotel[6],
            canton_hotel: paInfoHotel[7],
            distrito_hotel: paInfoHotel[8],
            estado_hotel: 'Activo',
            contRatings_hotel: paInfoHotel[10],
            overallRating_hotel: paInfoHotel[11],
            ratingComida_hotel: paInfoHotel[12],
            ratingServicio_hotel: paInfoHotel[13],
            ratingHabitaciones: paInfoHotel[14],
            ratingInfraestructura_hotel: paInfoHotel[15],
            ratingLimpieza_hotel: paInfoHotel[16]
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}

function obtenerListaHoteles(){
    let listaHoteles = [];
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listar_hoteles',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
       listaHoteles = response;
      });
    
      peticion.fail(function(response){
        return response;
      });
      return listaHoteles;
  
};

function obtener_hotel_por_id(pid){
    let hotel = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_hotel_id',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pid
        }
      });
    
      peticion.done(function(response){
        hotel = response;
      });
    
      peticion.fail(function(response){
       
      });

      return hotel;
};

function actualizarHotel(paInfoHotelActual) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/modificar_hotel',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: paInfoHotelActual[0],
            nombre_hotel: paInfoHotelActual[1],
            telefono_hotel: paInfoHotelActual[2],
            correo_hotel: paInfoHotelActual[3],
            latitud_hotel: paInfoHotelActual[4],
            longitud_hotel: paInfoHotelActual[5],
            direccion_hotel: paInfoHotelActual[6],
            provincia_hotel: paInfoHotelActual[7],
            canton_hotel: paInfoHotelActual[8],
            distrito_hotel: paInfoHotelActual[9],
            estado_hotel: paInfoHotelActual[10]
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
};

function eliminarHotel(_pid){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/eliminar_hotel',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: _pid,
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;

};
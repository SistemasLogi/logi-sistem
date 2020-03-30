/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $('#volver').click(function () {  //referimos el elemento ( clase o identificador de acción )
        $('html, body').animate({scrollTop: 0}, 'slow'); //seleccionamos etiquetas,clase o identificador destino, creamos animación hacia top de la página.
        return false;
    });

    $('#footvolver').click(function () {  //referimos el elemento ( clase o identificador de acción )
        $('html, body').animate({scrollTop: 0}, 'slow'); //seleccionamos etiquetas,clase o identificador destino, creamos animación hacia top de la página.
        return false;
    });

    //Creamos un evento click para el enlace
    $(".ancla").click(function (evento) {
        //Anulamos la funcionalidad por defecto del evento
        evento.preventDefault();
        //Creamos el string del enlace ancla
        var codigo = "#" + $(this).data("ancla");
        //Funcionalidad de scroll lento para el enlace ancla en 3 segundos
        $("html,body").animate({scrollTop: $(codigo).offset().top}, 1000);
    });
});

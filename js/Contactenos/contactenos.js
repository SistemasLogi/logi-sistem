/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Metodo de validacion de contactenos
 * @returns {undefined}
 */
function validarContactenos() {
    $("#formContactenos").validate({
        rules: {
            inputNombreCont: {
                required: true
            },
            inputCiudad: {
                required: true
            },
            inputTelefonoCont: {
                required: true,
                digits: true
            },
            inputAsunto: {
                required: true,
                maxlength: 25
            },
            inputCorreroCont: {
                required: true,
                email: true
            },
            txaMensaje: {
                required: true,
                rangelength: [15, 600]
            }
        },
        submitHandler: function (form) {
            enviarMail();
        }
    });
}

function enviarMail() {
    var enviando = '<div class="text-center"><img src="img/animaciones/Correo-1.gif" alt""/></div>';
    $("#mensajeContacto").html(enviando);
    request = "Controller/Correos/Contactenos_controller.php";
    cadena = $("#formContactenos").serialize();
    metodo = function (datos) {
        if (datos == 1) {
            $("#mensajeContacto").html("<div class='alert alert-dismissible alert-primary'>\n\
<button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Tu Mensaje fue enviado exitosamente, nos pondremos en contacto lo mas pronto posible.</div>");
            limpiarFormulario("#formContactenos");
//            alert("Mensaje Enviado");

        }

    };
    f_ajax(request, cadena, metodo);
}
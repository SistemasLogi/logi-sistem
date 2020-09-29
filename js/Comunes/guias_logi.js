/**
 * Metodo que permite validar campos en formulario Modal de envio asignado a mensajero
 * @returns {undefined}
 */
function validarEnvioAsignado() {
    $("#formModalEnvAsig").validate({
        rules: {
            inputNumEnvi: {
                required: true,
                number: true
            },
            inputEst_x_env: {
                required: true,
                number: true
            },
            inputFechaEstEnv: {
                required: true
            }
        },
        submitHandler: function (form) {
            imprime_guia_logi();
        }
    });
}
/**
 * Metodo que envia parametros de envio e imprime guia logi
 * @returns {undefined}
 */
function imprime_guia_logi() {
    request = "Controller/ClienteC/ruta_guia_pdf_param_controller.php";
    cadena = $("#formModalEnvAsig").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        $("#enlaceGuia").html(datos);
    };
    f_ajax(request, cadena, metodo);
}
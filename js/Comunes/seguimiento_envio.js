/**
 * Metodo que permite validar campo de busqueda de numero envio
 * @param {type} metodo
 * @returns {undefined}
 */
function validarBuscarNumEnvio(metodo) {
    $("#formBuscarEnvio").validate({
        rules: {
            inpBuscaNumEnv: {
                required: true
            }
        },
        submitHandler: function (form) {
            metodo();
        }
    });
}

/**
 * Metodo que realiza la busqueda del seguimiento de un envio
 * @returns {undefined}
 */
function datos_envio_seg() {
    request = "Controller/AdminC/AdministrarEnvios/cons_estado_x_env_segui_controller.php";
    cadena = $("#formBuscarEnvio").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arregloSegEnvio = $.parseJSON(datos);

        if (arregloSegEnvio !== 0) {

            cant_estados = arregloSegEnvio.length;//cantidad de registros que equivalen a los estados por los que pasa el envio

            temp_env = arregloSegEnvio[0];

            $("#nom_remite").html(temp_env.cli_nombre);
            $("#dir_remite").html(temp_env.os_direccion);
            $("#ciudad_remite").html(temp_env.ciu_nombre);
            $("#tel_remite").html(temp_env.os_tel_cont);

            $("#nom_destino").html(temp_env.en_nombre);
            $("#dir_destino").html(temp_env.en_direccion);
            $("#ciudad_destino").html(temp_env.en_ciudad);
            $("#tel_destino").html(temp_env.en_telefono);

            alert(cant_estados);

        } else {

        }



    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que permite validar campo de busqueda de numero OS
 * @param {type} metodo
 * @returns {undefined}
 */
function validarBuscarNumOS(metodo) {
    $("#formBuscarOS").validate({
        rules: {
            inpBuscaNumOS: {
                required: true
            }
        },
        submitHandler: function (form) {
            metodo();
        }
    });
}

var arregloSegOS;

/**
 * Metodo que realiza la busqueda del seguimiento de una orden de servicio
 * @returns {undefined}
 */
function datos_orden_serv_seg() {
    request = "Controller/AdminC/AdministrarOS/consulta_es_x_os_segui_controller.php";
    cadena = $("#formBuscarOS").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arregloSegOS = $.parseJSON(datos);
        est_uno = arregloSegOS[0];
        est_dos = arregloSegOS[1];
        est_tres = arregloSegOS[2];
        if (typeof est_uno === 'undefined') {
            limpiarFormulario("#formBuscarOS");
            alertify.alert('El numero ingresado no se encuentra registrado').setHeader('<em> Cuidado! </em> ');

            $("#os_num_prog").html("");
            $("#dir_prog").html("");
            $("#ciudad_prog").html("");
            $("#novedad_prog").html("");


            $("#progress_bar").css('width', '1%');
            $("#progress_bar").html('');

            $("#fec_asig").html("");
            $("#men_asig").html("");


            $("#os_num_fin").html("");
            $("#dir_fin").html("");
            $("#ciudad_fin").html("");
            $("#novedad_fin").html("");
            $("#fec_fin").html("");
            $("#men_fin").html("");

            $("#btnActuOS_prog").prop("disabled", true);
            $("#btnActuOS_asig").prop("disabled", true);
        } else {

            var fecha_hora_uno = new Date(est_uno.exs_fecha_hora);
            var options = {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            var timeString_uno = fecha_hora_uno.toLocaleString('en-US', options);
//            dia = est_uno.exs_fecha_hora.substr(8, 2);
            fu = new Date(est_uno.exs_fecha_hora.replace(/-/g, '\/'));
//            $("#lbTitleSection").html('Orden N° <samp>' + est_uno.os_id + '</samp> ' + est_uno.cli_nombre + '<br> Última modificación ' + diasSemana[fu.getDay()] + ", " + f.getDate() + " de " + meses[fu.getMonth()] + " de " + fu.getFullYear() + ' ' + timeString_uno + ' ' + est_uno.es_desc);
            $("#blqFinalizado").removeClass('alert-danger');
            $("#blqFinalizado").addClass('alert-success');
            $("#os_num_prog").html(est_uno.os_id);
            $("#dir_prog").html(est_uno.os_direccion);
            $("#ciudad_prog").html(est_uno.ciu_nombre);
            $("#novedad_prog").html(est_uno.exs_novedad);
            $("#nameCli").html(est_uno.cli_nombre);
            $("#fec_prog").html(fu.getDate() + " de " + meses[fu.getMonth()] + " de " + fu.getFullYear() + ' ' + timeString_uno);
            $("#progress_bar").css('width', '5%');
            $("#progress_bar").html('');

            $("#btnActuOS_prog").prop("disabled", false);
            $("#btnActuOS_asig").prop("disabled", true);

        }

        if (typeof est_dos === 'undefined') {
            $("#men_asig").html('Sin asignar');

            $("#fec_asig").html("");


            $("#os_num_fin").html("");
            $("#dir_fin").html("");
            $("#ciudad_fin").html("");
            $("#novedad_fin").html("");
            $("#fec_fin").html("");
            $("#men_fin").html('Sin asignar');
        } else {
            var fecha_hora_dos = new Date(est_dos.exs_fecha_hora);
            var options = {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            var timeString_dos = fecha_hora_dos.toLocaleString('en-US', options);
//            dia = est_uno.exs_fecha_hora.substr(8, 2);
            fd = new Date(est_dos.exs_fecha_hora.replace(/-/g, '\/'));
            $("#blqFinalizado").removeClass('alert-danger');
            $("#blqFinalizado").addClass('alert-success');
            $("#fec_asig").html(fd.getDate() + " de " + meses[fd.getMonth()] + " de " + fd.getFullYear() + ' ' + timeString_dos);
            $("#progress_bar").css('width', '53%');
            $("#progress_bar").html('Asignada  a vehículo');
            $("#men_asig").html(est_dos.emp_nombre);

            $("#btnActuOS_prog").prop("disabled", true);
            $("#btnActuOS_asig").prop("disabled", false);

        }

        if (typeof est_tres === 'undefined') {
            $("#men_fin").html('No finalizada');
            $("#os_num_fin").html("");
            $("#dir_fin").html("");
            $("#ciudad_fin").html("");
            $("#novedad_fin").html("");
            $("#fec_fin").html("");
        } else {

            $("#btnActuOS_prog").prop("disabled", true);
            $("#btnActuOS_asig").prop("disabled", true);


            if (est_tres.es_id == 3) {
                var fecha_hora_tres = new Date(est_tres.exs_fecha_hora);
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                };
                var timeString_tres = fecha_hora_tres.toLocaleString('en-US', options);
//            dia = est_uno.exs_fecha_hora.substr(8, 2);
                ft = new Date(est_tres.exs_fecha_hora.replace(/-/g, '\/'));
//            $("#lbTitleSection").html('Orden N° <samp>' + est_uno.os_id + '</samp> ' + est_uno.cli_nombre + '<br> Última modificación ' + diasSemana[fu.getDay()] + ", " + f.getDate() + " de " + meses[fu.getMonth()] + " de " + fu.getFullYear() + ' ' + timeString_uno + ' ' + est_uno.es_desc);
                $("#blqFinalizado").removeClass('alert-danger');
                $("#blqFinalizado").addClass('alert-success');
                $("#os_num_fin").html(est_tres.os_id);
                $("#dir_fin").html(est_tres.os_direccion);
                $("#ciudad_fin").html(est_tres.ciu_nombre);
                $("#novedad_fin").html(est_tres.exs_novedad);
                $("#fec_fin").html(ft.getDate() + " de " + meses[ft.getMonth()] + " de " + ft.getFullYear() + ' ' + timeString_tres);
                $("#progress_bar").css('width', '100%');
                $("#progress_bar").html('Realizada Exitosamente');
                $("#men_fin").html(est_tres.emp_nombre);

            } else if (est_tres.es_id == 4) {

                var fecha_hora_tres = new Date(est_tres.exs_fecha_hora);
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                };
                var timeString_tres = fecha_hora_tres.toLocaleString('en-US', options);
//            dia = est_uno.exs_fecha_hora.substr(8, 2);
                ft = new Date(est_tres.exs_fecha_hora.replace(/-/g, '\/'));
//            $("#lbTitleSection").html('Orden N° <samp>' + est_uno.os_id + '</samp> ' + est_uno.cli_nombre + '<br> Última modificación ' + diasSemana[fu.getDay()] + ", " + f.getDate() + " de " + meses[fu.getMonth()] + " de " + fu.getFullYear() + ' ' + timeString_uno + ' ' + est_uno.es_desc);

                $("#blqFinalizado").removeClass('alert-success');
                $("#blqFinalizado").addClass('alert-danger');
                $("#os_num_fin").html(est_tres.os_id);
                $("#dir_fin").html(est_tres.os_direccion);
                $("#ciudad_fin").html(est_tres.ciu_nombre);
                $("#novedad_fin").html(est_tres.exs_novedad);
                $("#fec_fin").html(ft.getDate() + " de " + meses[ft.getMonth()] + " de " + ft.getFullYear() + ' ' + timeString_tres);
                $("#progress_bar").css('width', '0%');
                $("#progress_bar").html('');
                $("#men_fin").html('CANCELADA');
            }

        }

    };
    f_ajax(request, cadena, metodo);
}
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
            $("#dat_men_asig").html("");


            $("#os_num_fin").html("");
            $("#dir_fin").html("");
            $("#ciudad_fin").html("");
            $("#novedad_fin").html("");
            $("#fec_fin").html("");
            $("#men_fin").html("");
            $("#dat_men_fin").html("");

            $("#btnActuOS_prog").prop("disabled", true);
            $("#btnActuOS_asig").prop("disabled", true);
        } else {

            if (est_uno.es_id == 1) {
                $("#icon_x_proceso").html("<td><span class='ion-android-home' style='font-size: xxx-large; color: #d68800;'></span></td>\n\
                        <td class='text-center'><span class='ion-android-car' style='font-size: xxx-large; color: #0062dc;'></span></td>\n\
                        <td><span class='ion-android-happy float-right' style='font-size: xxx-large; color: #007930;'></span></td>");
                $("#titleProcess").html("<th scope='col'>PROGRAMADA</th>\n\
                        <th class='text-center' scope='col'>ASIGNADA A VEHICULO</th>\n\
                        <th class='text-right' scope='col'>REALIZADA</th>");
            } else if (est_uno.es_id == 5) {
                $("#icon_x_proceso").html("<td><span class='ion-social-dropbox' style='font-size: xxx-large; color: #d68800;'></span></td>\n\
                        <td class='text-center'><span class='ion-cube' style='font-size: xxx-large; color: #0062dc;'></span></td>\n\
                        <td><span class='ion-android-car float-right' style='font-size: xxx-large; color: #007930;'></span></td>");
                $("#titleProcess").html("<th scope='col'>PICKING</th>\n\
                        <th class='text-center' scope='col'>PACKING</th>\n\
                        <th class='text-right' scope='col'>ENTREGADO OPERADOR</th>");
            }


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
            $("#fec_program").html(fu.getDate() + " de " + meses[fu.getMonth()] + " de " + fu.getFullYear() + ' ' + timeString_uno);
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
            $("#dat_men_asig").html('Vehiculo: ' + est_dos.emp_email);

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
                $("#fec_finaliza").html(ft.getDate() + " de " + meses[ft.getMonth()] + " de " + ft.getFullYear() + ' ' + timeString_tres);
                $("#progress_bar").css('width', '100%');
                $("#progress_bar").html('Realizada Exitosamente');
                $("#men_fin").html(est_tres.emp_nombre);
                $("#dat_men_fin").html('Vehiculo: ' + est_tres.emp_email);

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

/**
 * Metodo que carga la tabla historica de os por cliente
 * @param {type} value
 * @returns {undefined}
 */
function consulta_tabla_os_hist(value) {
    request = "Controller/AdminC/AdministrarOS/cons_os_est_x_cli_controller.php";
    cadena = "fil=" + value; //envio de parametros por POST
    metodo = function (datos) {
        arregloOS_cli = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloOS_cli !== 0) {
            datosOS_cli = "<div class='table-responsive text-nowrap' id='tablaEstadoOS'><table class='table table-striped table-sm table-bordered' id='tableEstOS'>\n\
                             <thead><tr style='background-color: #9bb5ff'>\n\
                             <th scope='col'></th>\n\
                             <th scope='col'>N° ORDEN</th>\n\
                             <th scope='col'>FECHA</th>\n\
                             <th scope='col'>ESTADO</th>\n\
                             <th scope='col'>DOC CLIENTE</th>\n\
                             <th scope='col'>NOM CLIENTE</th>\n\
                             <th scope='col'>DIRECCION</th>\n\
                             <th scope='col'>CIUDAD</th>\n\
                             <th scope='col'>TIPO SERV</th>\n\
                             <th scope='col'>TIPO ENV</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arregloOS_cli.length; i++) {
                tmp = arregloOS_cli[i];
                if (tmp.es_id == 1) {
                    datosOS_cli += '<tr class="table-sm id="fila' + i + '"><td class="enlace actuestos infoenvi" infenv="' + tmp.os_id + '" act="' + tmp.os_id + '"><span class="ion-android-contact" style="color: #fb972e;"></span></td>';
                } else if (tmp.es_id == 2) {
                    datosOS_cli += '<tr class="table-sm" id="fila' + i + '"><td class="enlace actuestos infoenvi" infenv="' + tmp.os_id + '" act="' + tmp.os_id + '"><span class="ion-android-car" style="color: #0d40ff;"></span></td>';
                } else if (tmp.es_id == 3) {
                    datosOS_cli += '<tr class="table-sm" id="fila' + i + '"><td class="enlace actuestos infoenvi" infenv="' + tmp.os_id + '" act="' + tmp.os_id + '"><span class="ion-checkmark-circled" style="color: #13b955;"></span></td>';
                } else if (tmp.es_id == 4) {
                    datosOS_cli += '<tr class="table-sm" id="fila' + i + '"><td class="enlace actuestos infoenvi" infenv="' + tmp.os_id + '" act="' + tmp.os_id + '"><span class="ion-close-circled" style="color: #ff5757;"></span></td>';
                } else if (tmp.es_id == 5) {
                    datosOS_cli += '<tr class="table-sm" id="fila' + i + '"><td class="enlace actuestos infoenvi" infenv="' + tmp.os_id + '" act="' + tmp.os_id + '"><span class="ion-social-dropbox" style="color: #fb972e;"></span></td>';
                } else if (tmp.es_id == 6) {
                    datosOS_cli += '<tr class="table-sm" id="fila' + i + '"><td class="enlace actuestos infoenvi" infenv="' + tmp.os_id + '" act="' + tmp.os_id + '"><span class="ion-cube" style="color: #0d40ff;"></span></td>';
                }
                datosOS_cli += '<td>' + tmp.os_id + "</td>";
                datosOS_cli += '<td>' + tmp.exs_fecha_hora + '</td>';
                if (tmp.es_id == 1) {
                    datosOS_cli += '<td style="background-color: #fea;">' + tmp.es_desc + '</td>';
//                    serv_program++;
                } else if (tmp.es_id == 2) {
                    datosOS_cli += '<td style="background-color: #82dcff;">' + tmp.es_desc + '</td>';
//                    serv_asignado++;
                } else if (tmp.es_id == 3) {
                    datosOS_cli += '<td style="background-color: #b0ffc5;">' + tmp.es_desc + '</td>';
//                    serv_exitoso++;
                } else if (tmp.es_id == 4) {
                    datosOS_cli += '<td style="background-color: #ffcfcf;">' + tmp.es_desc + '</td>';
//                    serv_novedad++;
                } else if (tmp.es_id == 5) {
                    datosOS_cli += '<td style="background-color: #fea;">' + tmp.es_desc + '</td>';
//                    serv_novedad++;
                } else if (tmp.es_id == 6) {
                    datosOS_cli += '<td style="background-color: #82dcff;">' + tmp.es_desc + '</td>';
//                    serv_novedad++;
                }
                datosOS_cli += '<td>' + tmp.cli_num_doc + '</td>';
                datosOS_cli += '<td>' + tmp.cli_nombre + '</td>';
                datosOS_cli += '<td>' + tmp.os_direccion + '</td>';
                datosOS_cli += '<td>' + tmp.ciu_nombre + '</td>';
                datosOS_cli += '<td>' + tmp.ts_desc + '</td>';
                datosOS_cli += '<td>' + tmp.te_desc + '</td></tr>';
            }
            datosOS_cli += '</tbody></table></div><div id="info_env_os"></div>';
            $("#tablaOS_cli").html(datosOS_cli);

            /**
             * Evento que pagina una tabla 
             */
            $('#tableEstOS').DataTable({
                'scrollX': true
            });
            clickInfoEnv_os();
        } else {
            $("#tableEstOS").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que devuelve el formulario para actualizar el estado
 * formulario ciudad
 * @returns {undefined}
 */
function clickInformacionOS() {
    $("#tableEstOS").on("click", ".actuestos", function () {
//    $(".actuestos").click(function () {
        actu_es_os = $(this).attr("act");
        $('#mod-dalog').removeClass('modal-lg');
        $('#ModalActuEstOS').modal('toggle');

        alert(actu_es_os);
    });
}
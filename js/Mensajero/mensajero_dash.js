/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    $("#enlEnvHoy").click(function () {
        $("#tabServDia").show();
        $("#tabServOkDia").show();
        consulta_envios_diarios();
        consulta_servicios_diarios();
    });
    $("#enlSelectEnv").click(function () {
        consulta_envios_x_fecha();
    });
    consulta_envios_diarios();
    consulta_servicios_diarios();
    consulta_monedero();
    setInterval(refrescar_sesion, 30000);
});

/**
 * Variable global de funcion AJAX
 * @type type
 */
var efe_aja;
/**
 * Metodo Global de funciones AJAX
 * @param {type} request
 * @param {type} cadena
 * @param {type} metodo
 * @returns {f_ajax}
 */
function f_ajax(request, cadena, metodo) {
    this.efe_aja = $.ajax({
        url: request,
        cache: false,
        beforeSend: function () { /*httpR es la variable global donde guardamos la conexion*/
            $(document).ajaxStop();
            $(document).ajaxStart();
        },
        type: "POST",
        dataType: "html",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8;',
        data: cadena,
        timeout: 15000,
        success: function (datos) {
            metodo(datos);
        },
        error: function () {
            alert("No hay conexión");
        }
    });
}
/**
 * Metodo Ajax para subida de ficheros
 * @param {type} request
 * @param {type} cadena
 * @param {type} metodo
 * @returns {f_ajax_files}
 */
function f_ajax_files(request, cadena, metodo) {
    this.efe_aja = $.ajax({
        url: request,
        cache: false,
        beforeSend: function () { /*httpR es la variable global donde guardamos la conexion*/
            $(document).ajaxStop();
            $(document).ajaxStart();
        },
        type: "POST",
        dataType: "html",
        processData: false,
        contentType: false,
        data: cadena,
        timeout: 20000,
        success: function (datos) {
            metodo(datos);
        },
        error: function () {
            alert("No hay conexión");
        }
    });
}
/**
 * Funcion que mantiene la sesion abierta
 * @returns {undefined}
 */
function refrescar_sesion() {
    request = "Controller/Login_General/refrescar_control.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {

    };
    f_ajax(request, cadena, metodo);
}
var arregloEnvDia;

/**
 * Metodo que retorna los envios cargados al dia para un mensajero
 * @returns {undefined}
 */
function consulta_envios_diarios() {
    request = "Controller/AdminC/AdministrarEnvios/cons_env_mens_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arregloEnvDia = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEnvDia !== 0) {
            datosEnvDia = "";
            for (i = 0; i < arregloEnvDia.length; i++) {
                tmp = arregloEnvDia[i];
                if (tmp.exe_ee_id == 5) {
                    temaColor = 'primary';
                } else if (tmp.exe_ee_id == 6) {
                    temaColor = 'success';
                } else if (tmp.exe_ee_id == 8) {
                    temaColor = 'warning';
                }

                datosEnvDia += '<div class="alert alert-dismissible alert-' + temaColor + '" style="border-radius: 0.5rem;">';
                datosEnvDia += '<div class="row">';
                datosEnvDia += '<div class="col-5">';
                datosEnvDia += '<h6 class="alert-heading text-nowrap">N° Envio: <b class="text-primary">' + tmp.exe_en_id + '</b></h6>';
                datosEnvDia += '</div>';
                if (tmp.exe_ee_id == 5) {
                    datosEnvDia += '<div class="col-6">';
                    datosEnvDia += '<button type="button" class="btn btn-primary btn-sm float-right actenv" env="' + i + '" id="' + tmp.exe_en_id + '">Gestión</button>';
                    datosEnvDia += '</div>';
                }
                datosEnvDia += '</div>';
                datosEnvDia += '<div class="table-responsive text-nowrap col-lg-12">';
                datosEnvDia += '<table class="table table-sm table table-hover">';
                datosEnvDia += '<thead>';
                datosEnvDia += '<tr class="table-' + temaColor + ' text-primary">';
                datosEnvDia += '<th scope="col">Guia OP</th>';
                datosEnvDia += '<th scope="col">Dirección</th>';
                datosEnvDia += '<th scope="col">Nombre</th>';
                datosEnvDia += '</tr>';
                datosEnvDia += '</thead>';
                datosEnvDia += '<tbody>';
                datosEnvDia += '<tr>';
                datosEnvDia += '<th>' + tmp.en_guia + '</th>';
                datosEnvDia += '<td>' + tmp.en_direccion + '</td>';
                datosEnvDia += '<td>' + tmp.en_nombre + '</td>';
                datosEnvDia += '</tr>';
                datosEnvDia += '</tbody>';
                datosEnvDia += '</table>';
                datosEnvDia += '</div>';
                datosEnvDia += '</div>';
            }
            $("#tabEnvDia").html(datosEnvDia);

            clickActuEstado_envio();
        } else {
            $("#tabEnvDia").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>Hoy no se han cargado envios ni servicios.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}
var arregloServDia;
/**
 * Metodo que retorna los servicios cargados al dia para un mensajero
 * @returns {undefined}
 */
function consulta_servicios_diarios() {
    request = "Controller/AdminC/AdministrarOS/cons_serv_mens_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arregloServDia = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloServDia !== 0) {
            datosServDia = "";
            datosServOkDia = "";
            var estado_serv;
            for (i = 0; i < arregloServDia.length; i++) {

                tmp = arregloServDia[i];
                if (tmp.es_id == 2) {
                    temaColor = 'info';
                    datosServDia += '<div class="alert alert-dismissible alert-' + temaColor + '" style="border-radius: 0.5rem;">';
                    datosServDia += '<div class="row">';
                    datosServDia += '<div class="col-5">';
                    datosServDia += '<h6 class="alert-heading text-nowrap">N° Servicio: <b class="text-primary">' + tmp.os_id + '</b></h6>';
                    datosServDia += '</div>';
                    datosServDia += '<div class="col-6">';
                    datosServDia += '<button type="button" class="btn btn-primary btn-sm float-right actserv" serv="' + i + '" id="' + tmp.os_id + '">Gestión</button>';
                    datosServDia += '</div>';
                    datosServDia += '</div>';
                    datosServDia += '<div class="table-responsive text-nowrap col-lg-12">';
                    datosServDia += '<table class="table table-sm table table-hover">';
                    datosServDia += '<thead>';
                    datosServDia += '<tr class="table-' + temaColor + ' text-primary">';
                    datosServDia += '<tr class="table-info text-primary">';
                    datosServDia += '<th scope="col">Servicio Nº</th>';
                    datosServDia += '<th scope="col">Dirección</th>';
                    datosServDia += '<th scope="col">Telefono</th>';
                    datosServDia += '<th scope="col">Observaciones</th>';
                    datosServDia += '</tr>';
                    datosServDia += '</thead>';
                    datosServDia += '<tbody>';
                    datosServDia += '<tr>';
                    datosServDia += '<th>' + tmp.os_id + '</th>';
                    datosServDia += '<td>' + tmp.os_direccion + '</td>';
                    datosServDia += '<td>' + tmp.os_tel_cont + '</td>';
                    datosServDia += '<td>' + tmp.os_observacion + '</td>';
                    datosServDia += '</tr>';
                    datosServDia += '</tbody>';
                    datosServDia += '</table>';
                    datosServDia += '</div>';
                    datosServDia += '</div>';
                } else if (tmp.es_id == 3) {
                    temaColor = 'success';

                    datosServOkDia += '<div class="alert alert-dismissible alert-' + temaColor + '" style="border-radius: 0.5rem;">';
                    datosServOkDia += '<div class="row">';
                    datosServOkDia += '<div class="col-5">';
                    datosServOkDia += '<h6 class="alert-heading text-nowrap">N° Servicio: <b class="text-primary">' + tmp.os_id + '</b></h6>';
                    datosServOkDia += '</div>';
                    datosServOkDia += '</div>';
                    datosServOkDia += '<div class="table-responsive text-nowrap col-lg-12">';
                    datosServOkDia += '<table class="table table-sm table table-hover">';
                    datosServOkDia += '<thead>';
                    datosServOkDia += '<tr class="table-' + temaColor + ' text-primary">';
                    datosServOkDia += '<tr class="table-info text-primary">';
                    datosServOkDia += '<th scope="col">Servicio Nº</th>';
                    datosServOkDia += '<th scope="col">Dirección</th>';
                    datosServOkDia += '<th scope="col">Telefono</th>';
                    datosServOkDia += '<th scope="col">Observaciones</th>';
                    datosServOkDia += '</tr>';
                    datosServOkDia += '</thead>';
                    datosServOkDia += '<tbody>';
                    datosServOkDia += '<tr>';
                    datosServOkDia += '<th>' + tmp.os_id + '</th>';
                    datosServOkDia += '<td>' + tmp.os_direccion + '</td>';
                    datosServOkDia += '<td>' + tmp.os_tel_cont + '</td>';
                    datosServOkDia += '<td>' + tmp.os_observacion + '</td>';
                    datosServOkDia += '</tr>';
                    datosServOkDia += '</tbody>';
                    datosServOkDia += '</table>';
                    datosServOkDia += '</div>';
                    datosServOkDia += '</div>';
                } else if (tmp.es_id == 4) {
                    temaColor = 'warning';

                    datosServOkDia += '<div class="alert alert-dismissible alert-' + temaColor + '" style="border-radius: 0.5rem;">';
                    datosServOkDia += '<div class="row">';
                    datosServOkDia += '<div class="col-5">';
                    datosServOkDia += '<h6 class="alert-heading text-nowrap">N° Servicio: <b class="text-primary">' + tmp.os_id + '</b></h6>';
                    datosServOkDia += '</div>';
                    datosServOkDia += '</div>';
                    datosServOkDia += '<div class="table-responsive text-nowrap col-lg-12">';
                    datosServOkDia += '<table class="table table-sm table table-hover">';
                    datosServOkDia += '<thead>';
                    datosServOkDia += '<tr class="table-' + temaColor + ' text-primary">';
                    datosServOkDia += '<tr class="table-info text-primary">';
                    datosServOkDia += '<th scope="col">Servicio Nº</th>';
                    datosServOkDia += '<th scope="col">Dirección</th>';
                    datosServOkDia += '<th scope="col">Telefono</th>';
                    datosServOkDia += '<th scope="col">Observaciones</th>';
                    datosServOkDia += '</tr>';
                    datosServOkDia += '</thead>';
                    datosServOkDia += '<tbody>';
                    datosServOkDia += '<tr>';
                    datosServOkDia += '<th>' + tmp.os_id + '</th>';
                    datosServOkDia += '<td>' + tmp.os_direccion + '</td>';
                    datosServOkDia += '<td>' + tmp.os_tel_cont + '</td>';
                    datosServOkDia += '<td>' + tmp.os_observacion + '</td>';
                    datosServOkDia += '</tr>';
                    datosServOkDia += '</tbody>';
                    datosServOkDia += '</table>';
                    datosServOkDia += '</div>';
                    datosServOkDia += '</div>';
                }

            }
            $("#tabServDia").html(datosServDia);
            $("#tabServOkDia").html(datosServOkDia);

            clickGestServicio();
        } else {
            $("#tabServDia").html("");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que carga tabla de envios asignados a recoleccion por os
 * @param {type} value
 * @returns {undefined}
 */
function consulta_tabla_env_mens_os_recolec(value) {
    request = "Controller/AdminC/AdministrarEnvios/cons_env_x_os_recoleccion_controller.php";
    cadena = {"num_os": value}; //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        arreglo_env_est = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_env_est !== 0) {
            datos_env_est = '<div class="table-responsive text-nowrap" id="tablaEstadoEnv"><table class="table table-striped table-sm table-bordered" id="tableEstEnvio">\n\
                             <thead><tr class="">\n\
                             <th scope="col">CHECK</th>\n\
                             <th scope="col">GUIA LOGI</th>\n\
                             <th scope="col">GUIA OP</th>\n\
                             <th scope="col">CANTIDAD</th>\n\
                             <th scope="col">PESO Kg</th>\n\
                             <th scope="col">DIR. DESTINO</th>\n\
                             <th scope="col">CIUDAD</th>\n\
                             <th scope="col">OS</th>\n\
                             </tr></thead><tbody>';
            for (i = 0; i < arreglo_env_est.length; i++) {
                tmp = arreglo_env_est[i];

                datos_env_est += '<tr class="table-sm" id="fila' + i + '">';
                datos_env_est += '<td id="' + i + '"><input type="checkbox" class="cheitem" colecta="' + tmp.en_id + '" id="Check' + tmp.en_id + '"></td>';
                datos_env_est += '<td>' + tmp.en_id + '</td>';
                datos_env_est += '<td>' + tmp.en_guia + '</td>';
                datos_env_est += '<td>' + tmp.en_cantidad + '</td>';
                datos_env_est += '<td>' + tmp.en_peso + '</td>';
                datos_env_est += '<td>' + tmp.en_direccion + '</td>';
                datos_env_est += '<td>' + tmp.en_ciudad + '</td>';
                datos_env_est += '<td>' + tmp.os_id + '</td></tr>';
            }
            datos_env_est += "</tbody></table></div>";

            $("#tabEnvRecolectDia").html(datos_env_est);

        } else {
            $("#tabEnvRecolectDia").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
        $(".cheitem").click(function () {
            $("#btnColecta").show();
        });
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que carga el modal con formulario para seleccion de producto en alistamiento 
 * @returns {undefined}
 */
function clickGestServicio() {
    $(".actserv").click(function () {
        actu_es_serv = $(this).attr("serv");

        tmp = arregloServDia[actu_es_serv];

        $('#mod-dalog').removeClass('modal-lg');
        $('#ModalActuEstEnv').modal('toggle');
        $('#ModalEstEnvTitle').html('GESTION SERVICIO');
        $('#body_mod_os').html('<div class="alert alert-dismissible alert-info" id="alert-color">\n\
            <form id="formEstOS">\n\
                <fieldset>\n\
                <input type="text" class="form-control" id="inpEstOrdServ" style="display: none;" name="inpEstOrdServ" placeholder="Cod." readonly>\n\
                 <input type="text" class="form-control" style="display: none;" id="inpNumEnv" name="inpNumEnv" placeholder="N° Envio." readonly>\n\
                <p><b>Servicio N° ' + tmp.os_id + '</b><br>\n\
                <b>Dirección: ' + tmp.os_direccion + '</b><br>\n\
                <b>Nombre Cliente: ' + tmp.cli_nombre + '</b><br>\n\
                <b>Observaciones: ' + tmp.os_observacion + '</b><br>\n\
                    <div id="tabEnvRecolectDia"></div>\n\
                    <div id="divRadios">\n\
                    <div class="custom-control custom-radio">\n\
                      <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" value="1" checked="">\n\
                      <label class="custom-control-label" for="customRadio1">Realizada con Exito</label>\n\
                    </div>\n\
                    <div class="custom-control custom-radio">\n\
                      <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" value="2">\n\
                      <label class="custom-control-label" for="customRadio2">No se pudo Realizar</label>\n\
                    </div>\n\
                    </div>\n\
                    <div class="form-group">\n\
                        <label for="txaNovedad">Novedad</label>\n\
                        <textarea class="form-control" id="txaNovedad" name="txaNovedad" rows="2"></textarea>\n\
                    </div>\n\
                    <div class="form-group" id="btnColecta" style="display: none;">\n\
                        <button type="submit" class="btn btn-success" id="btnGuardaEstOS" name="btnGuardaEstOS">Finalizar Recolección <span class="ion-checkmark-circled" style="font-size: x-large;"></span></button>\n\
                    </div>\n\
                    <input type="text" class="form-control" id="inpEstado" name="inpEstado" value="3" style="display: none;" readonly>\n\
                    </fieldset>\n\
            </form></div>');
        $("#divRadios input[name='customRadio']").click(function () {
            est = $("input:radio[name=customRadio]:checked").val();
            if (est === "1") {
                $("#inpEstado").val("3");
                $("#btnGuardaEstOS").removeClass("btn-danger");
                $("#btnGuardaEstOS").addClass("btn-success");
                $("#alert-color").removeClass("alert-danger");
                $("#alert-color").addClass("alert-info");
                $("#btnColecta").hide();
                $(".cheitem").prop("disabled", false);
            } else if (est === "2") {
                $("#inpEstado").val("4");
                $("#btnGuardaEstOS").removeClass("btn-success");
                $("#btnGuardaEstOS").addClass("btn-danger");
                $("#alert-color").removeClass("alert-info");
                $("#alert-color").addClass("alert-danger");
                $("#btnColecta").show();
                $(".cheitem").removeAttr("checked");
                $(".cheitem").prop("disabled", true);
            }
        });
        $("#inpEstOrdServ").val(tmp.os_id);
        consulta_tabla_env_mens_os_recolec(tmp.os_id);
        $("#btnGuardaEstOS").click(function () {
            enviosSelectedRecoleccion();
            validarInsert_est_x_os();
        });
    });

}

/**
 * Funcion de validacion para envio de est_x_os
 * @returns {undefined}
 */
function validarInsert_est_x_os() {
    $("#formEstOS").validate({
        rules: {
            inpEstOrdServ: {
                required: true
            }
        },
        submitHandler: function (form) {

            inserta_est_x_ordServ();
        }
    });
}
/**
 * Funcion que inserta un registro en tabla est_x_os
 * @returns {undefined}
 */
function inserta_est_x_ordServ() {
    request = "Controller/AdminC/AdministrarOS/insertar_es_x_os_mens_controller.php";
    cadena = $("#formEstOS").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            alertify.success('Registro actualizado!');
            consulta_servicios_diarios();
            $("#btnCloseModal").trigger("click");
        } else {
//            alert(datos);
            alertify.error('No actualizado!');
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que determina los check seleccionados para actualizacion de recoleccion
 * @returns {undefined}
 */
function enviosSelectedRecoleccion() {
    json_act_est = '[';

    $("input:checkbox:checked").each(function () {

        checket_envio = $(this).attr('colecta');//numeo de fila posicion en el arreglo
//
        if (typeof (checket_envio) === 'undefined') {

        } else {

            guiaLogi = checket_envio;
            estadoID = 13;//estado colectado
            mens_logi = '1|9874123652';
            novedadValor = "";
//            insert_estado_envio_asig_men(mensajero, guiaLogi, estadoID, novedadValor);

            json_act_est += '{"mens":"' + mens_logi + '","id_env":"' + guiaLogi + '","id_est":"' + estadoID + '","nov":"' + novedadValor + '"},';
        }

    });
    $("input:checkbox:not(:checked)").each(function () {
        checket_envio = $(this).attr('colecta');//numeo de fila posicion en el arreglo
//
        if (typeof (checket_envio) === 'undefined') {

        } else {

            guiaLogi = checket_envio;
            estadoID = 12;//estado colectado
            mens_logi = '1|9874123652';
            novedadValor = "CANCELADO";
//            insert_estado_envio_asig_men(mensajero, guiaLogi, estadoID, novedadValor);

            json_act_est += '{"mens":"' + mens_logi + '","id_env":"' + guiaLogi + '","id_est":"' + estadoID + '","nov":"' + novedadValor + '"},';
        }

    });
    json_act_valor_new = json_act_est.substr(0, json_act_est.length - 1);
    json_act_valor_new += ']';
    insert_estado_envio_recolect_json(json_act_valor_new);
}
/**
 * Metodo que envia datos a php para insertar estados de envio
 * @param {type} datos_act_est
 * @returns {insert_estado_envio_asig_men_json}
 */
function insert_estado_envio_recolect_json(datos_act_est) {
    request = "Controller/AdminC/AdministrarEnvios/insertar_estado_envio_json_controller.php";
    cadena = {"datos_est": datos_act_est}; //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            alertify.success('Envios actualizados');
        } else {
            alertify.error('Error al actualizar envio');
        }

    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que retorna los datos de pago a mensajero
 * @returns {undefined}
 */
function consulta_monedero() {
    request = "Controller/AdminC/AdministrarEnvios/cons_monedero_mens_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {

        datosMonedero = datos;

        $("#monedero").html(datosMonedero);

    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que devuelve el formulario para actualizar el estado de un envio
 * @returns {undefined}
 */
function clickActuEstado_envio() {
//    $("#tableEstOS").on("click", ".actuestos", function () {
    $(".actenv").click(function () {
        actu_es_env = $(this).attr("env");

        tmp = arregloEnvDia[actu_es_env];

        $('#mod-dalog').removeClass('modal-lg');
        $('#ModalActuEstEnv').modal('toggle');
        $('#ModalEstEnvTitle').html('GESTION ENVIO');
        $('#body_mod_os').html('<div class="alert alert-dismissible alert-primary" id="alert-color">\n\
            <form method="post" enctype="multipart/form-data" id="formEstEnvio">\n\
                <fieldset>\n\
                  <input type="text" class="form-control" style="display: none;" id="inpNumEnv" name="inpNumEnv" placeholder="N° Envio." readonly>\n\
                <p><b>Envio N° ' + tmp.exe_en_id + '</b><br>\n\
                <b>Guia OP <em style="color: #0a8802;">' + tmp.en_guia + '</em></b><br>\n\
                <b>Dirección: ' + tmp.en_direccion + '</b><br>\n\
                <b>Nombre: ' + tmp.en_nombre + '</b><br>\n\
                <b>Telefono: ' + tmp.en_telefono + '</b><br>\n\
                    <div id="divRadios">\n\
                    <div class="custom-control custom-radio">\n\
                      <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" value="1" checked="">\n\
                      <label class="custom-control-label" for="customRadio1"><b style="color: #0a8802;">Entregado</b></label>\n\
                    </div>\n\
                    <div class="custom-control custom-radio">\n\
                      <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" value="2">\n\
                      <label class="custom-control-label" for="customRadio2"><b>No pude Entregar</b></label>\n\
                    </div>\n\
                    </div>\n\
                    <div class="form-group mt-3">\n\
                        <label for="txaNovedad"><b id="labeltext">Recibió</b></label>\n\
                        <textarea class="form-control" id="txaNovedad" name="txaNovedad" rows="2"></textarea>\n\
                    </div>\n\
                    <div class="form-group">\n\
                    <div class="input-group mb-3">\n\
                    <div class="custom-file">\n\
                        <input type="file" accept="image/*" capture="camera" id="inpFileFoto" name="inpFileFoto">\n\
                        <label class="custom-file-label" for="inpFileFoto" id="textFileFoto">FOTO</label>\n\
                    </div>\n\
                      <div class="input-group-append">\n\
                        <span class="input-group-text ion-android-camera"></span>\n\
                      </div>\n\
                    </div>\n\
                    </div>\n\
                    <div class="form-group" id="sectionBtn">\n\
                        <button type="submit" class="btn btn-success" id="btnGuardaEstEnv" name="btnGuardaEstEnv">Finalizar <span class="ion-checkmark-circled" id="iconbtn" style="font-size: x-large;"></span></button>\n\
                    </div>\n\
                    <input type="text" class="form-control" style="display: none;" id="inpEstado" name="inpEstado" value="6" readonly>\n\
                    </fieldset>\n\
            </form></div>');
        $("#divRadios input[name='customRadio']").click(function () {
            est = $("input:radio[name=customRadio]:checked").val();
            if (est === "1") {
                $("#alert-color").removeClass("alert-warning");
                $("#alert-color").addClass("alert-primary");
                $("#iconbtn").removeClass("ion-alert-circled");
                $("#iconbtn").addClass("ion-checkmark-circled");
                $("#labeltext").html("Recibió");
                $("#inpEstado").val("6");
                $("#btnGuardaEstEnv").removeClass("btn-warning");
                $("#btnGuardaEstEnv").addClass("btn-success");
            } else if (est === "2") {
                $("#alert-color").removeClass("alert-primary");
                $("#alert-color").addClass("alert-warning");
                $("#iconbtn").removeClass("ion-checkmark-circled");
                $("#iconbtn").addClass("ion-alert-circled");
                $("#labeltext").html("Novedad");
                $("#inpEstado").val("8");
                $("#btnGuardaEstEnv").removeClass("btn-success");
                $("#btnGuardaEstEnv").addClass("btn-warning");
            }
        });
        $("#inpNumEnv").val(tmp.exe_en_id);
        $("#btnGuardaEstEnv").click(function () {
            validarInsert_est_x_env();
        });
        nameFileFotoEntrega();
    });
}
/**
 * Metodo que plasma nombre archivo en carga masiva envios alistamiento
 * @returns {undefined}
 */
function nameFileFotoEntrega() {
    $("#inpFileFoto").change(function () {
        nombre = $("#inpFileFoto").val();
        //        if (nombre.substring(3,11) == 'fakepath') {
        //            nombre = nombre.substring(12);
        //        }
        $("#textFileFoto").text(nombre);
    });
}
/**
 * Funcion de validacion de campos en form formEstEnvio
 * @returns {undefined}
 */
function validarInsert_est_x_env() {
    $("#formEstEnvio").validate({
        rules: {
            inpEstado: {
                required: true
            }
        },
        submitHandler: function (form) {

            inserta_est_x_envio();
        }
    });
}

/**
 * Funcion que inserta un registro en tabla est_x_envio
 * @returns {undefined}
 */
function inserta_est_x_envio() {
    $('#sectionBtn').html("<img class='img-fluid' src='img/animaciones/loader.gif' alt=''/>");
    request = "Controller/AdminC/AdministrarEnvios/insertar_est_env_men_controller.php";
    cadena = new FormData($("#formEstEnvio")[0]); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            alertify.success('Envio Finalizado!');

            consulta_envios_diarios();

            $("#btnCloseModal").trigger("click");
        } else {
//            alert(datos);
            alertify.error('Error al Finalizar!');
        }
    };
    f_ajax_files(request, cadena, metodo);
}
/**
 * Metodo que retorna los datos de envios y monedero segun un rango de fechas
 * @returns {undefined}
 */
function consulta_envios_x_fecha() {
    request = "View/AdministradorV/AdEmpleados/form_select_date.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {

        $("#tabEnvDia").html(datos);
        $("#tabServDia").hide();
        $("#tabServOkDia").hide();

        $("#btnBusEnvFec").click(function () {
            validarFechaManifiesto();
        });

    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que permite validar campos de formulario seleccion de fechas
 * @returns {undefined}
 */
function validarFechaManifiesto() {
    $("#formFechManif").validate({
        rules: {
            InputFecIni: {
                required: true,
                date: true
            },
            InputFecFin: {
                required: true,
                date: true
            }
        },
        submitHandler: function (form) {
            compararFechas();
        }
    });
}

/**
 * Metodo que permite controlar que la fecha inicial sea menor a la final
 * @returns {undefined}
 */
function compararFechas() {
    var fInicial = $("#InputFecIni").val();
    var fFinal = $("#InputFecFin").val();
    if (fInicial > fFinal) {
        alertify.alert("La fecha de inicio no debe ser mayor que la fecha final").setHeader('<em> Cuidado! </em> ');
    } else {
        consulta_envios_historico();
    }
}

var tot;
/**
 * Metodo que retorna los envios cargados historicos para un mensajero
 * @returns {undefined}
 */
function consulta_envios_historico() {
    request = "Controller/AdminC/AdministrarEnvios/cons_historico_env_mens_controller.php";
    cadena = $("#formFechManif").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arregloEnvHist = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEnvHist !== 0) {
            datosEnvHist = '<h4>TOTAL CONSULTA $<b class="text-primary" id="total_cons"></b></h4><div class="table-responsive text-nowrap col-lg-12">';
            datosEnvHist += '<table class="table table-sm table-bordered table table-hover">';
            datosEnvHist += '<thead>';
            datosEnvHist += '<tr class="table-primary text-primary">';
            datosEnvHist += '<th scope="col">N° Envio</th>';
            datosEnvHist += '<th scope="col">Guia OP</th>';
            datosEnvHist += '<th scope="col">Costo</th>';
            datosEnvHist += '<th scope="col">Destino</th>';
            datosEnvHist += '<th scope="col">Recaudo</th>';
            datosEnvHist += '</tr>';
            datosEnvHist += '</thead>';
            datosEnvHist += '<tbody>';

            dia_ant = "";
            a = 0;
            b = 0;
            c = 0;
            tot = 0;
            for (i = 0; i < arregloEnvHist.length; i++) {
                tmp = arregloEnvHist[i];
                dia = tmp.exe_fec_hora.substr(8, 2);
                f = new Date(tmp.exe_fec_hora.replace(/-/g, '\/'));

                if (i == 0) {
                    datosEnvHist += '<tr><th class="table-warning" colspan="5">' + diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear() + '</th></tr>';
                    datosEnvHist += '<tr>';
                    datosEnvHist += '<td>' + tmp.exe_en_id + '</td>';
                    datosEnvHist += '<td>' + tmp.en_guia + '</td>';
                    datosEnvHist += '<td>' + tmp.exe_novedad + '</td>';
                    datosEnvHist += '<td>' + tmp.en_direccion + '</td>';
                    datosEnvHist += '<td>' + tmp.en_novedad + '</td>';
                    datosEnvHist += '</tr>';
                    a = parseInt(tmp.exe_novedad);
                    c = (a + b);
                    b = c;
                } else {
                    if (dia == dia_ant) {
                        datosEnvHist += '<tr>';
                        datosEnvHist += '<td>' + tmp.exe_en_id + '</td>';
                        datosEnvHist += '<td>' + tmp.en_guia + '</td>';
                        datosEnvHist += '<td>' + tmp.exe_novedad + '</td>';
                        datosEnvHist += '<td>' + tmp.en_direccion + '</td>';
                        datosEnvHist += '<td>' + tmp.en_novedad + '</td>';
                        datosEnvHist += '</tr>';
                        a = parseInt(tmp.exe_novedad);
                        c = (a + b);
                        b = c;
                    } else {
                        datosEnvHist += '<tr>';
                        datosEnvHist += '<th colspan="2">SubTotal</th>';

                        tot = tot + b;
                        datosEnvHist += '<th colspan="3">' + b + '</th>';
                        datosEnvHist += '</tr>';

                        a = 0;
                        c = 0;
                        b = 0;

                        datosEnvHist += '<tr><th class="table-warning" colspan="5">' + diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear() + '</th></tr>';
                        datosEnvHist += '<tr>';
                        datosEnvHist += '<td>' + tmp.exe_en_id + '</td>';
                        datosEnvHist += '<td>' + tmp.en_guia + '</td>';
                        datosEnvHist += '<td>' + tmp.exe_novedad + '</td>';
                        datosEnvHist += '<td>' + tmp.en_direccion + '</td>';
                        datosEnvHist += '<td>' + tmp.en_novedad + '</td>';
                        datosEnvHist += '</tr>';
                        a = parseInt(tmp.exe_novedad);
                        c = (a + b);
                        b = c;
                    }
                }
                dia_ant = tmp.exe_fec_hora.substr(8, 2);

            }
            datosEnvHist += '<tr>';
            datosEnvHist += '<th colspan="2">SubTotal</th>';

            tot = tot + b;
            datosEnvHist += '<th colspan="3">' + b + '</th>';
            datosEnvHist += '</tr>';
            datosEnvHist += "</tbody></table></div>";
            $("#datosMenif").html(datosEnvHist);

//            clickActuEstado_OS();
        } else {
            $("#datosMenif").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No se encontraron datos.</strong></div>");
        }
        $("#total_cons").html(tot);
    };
    f_ajax(request, cadena, metodo);
}
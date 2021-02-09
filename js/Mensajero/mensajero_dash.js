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
        consulta_envios_diarios();
    });
    $("#enlSelectEnv").click(function () {
        consulta_envios_x_fecha();
    });
    consulta_envios_diarios();
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
            <form id="formEstEnvio">\n\
                <fieldset>\n\
                  <input type="text" class="form-control" style="display: none;" id="inpNumEnv" name="inpNumEnv" placeholder="N° Envio." readonly>\n\
                <p><b>Envio N° ' + tmp.exe_en_id + '</b><br>\n\
                <b>Guia OP <em style="color: #0a8802;">' + tmp.en_guia + '</em></b><br>\n\
                <b>Dirección: ' + tmp.en_direccion + '</b><br>\n\
                <b>Nombre: ' + tmp.en_nombre + '</b><br>\n\
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
                        <button type="submit" class="btn btn-success" id="btnGuardaEstEnv" name="btnGuardaEstEnv">Finalizar <span class="ion-checkmark-circled" id="iconbtn" style="font-size: x-large;"></span></button>\n\
                    </div>\n\
                    <input type="text" class="form-control" style="display: none;" id="inpEstado" name="inpEstado" value="6" readonly>\n\
                    </fieldset>\n\
            </form>');
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
    request = "Controller/AdminC/AdministrarEnvios/insertar_est_env_men_controller.php";
    cadena = $("#formEstEnvio").serialize(); //envio de parametros por POST
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
    f_ajax(request, cadena, metodo);
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
            datosEnvHist = '<div class="table-responsive text-nowrap col-lg-12">';
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
    };
    f_ajax(request, cadena, metodo);
}
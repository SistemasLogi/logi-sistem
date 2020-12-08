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
    consulta_envios_diarios();
    consulta_monedero();
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
                    datosEnvDia += '<div class="col-5">';
                    datosEnvDia += '<button type="button" class="btn btn-primary btn-sm float-right" id="' + tmp.exe_en_id + '">Gestión</button>';
                    datosEnvDia += '</div>';
                }
                datosEnvDia += '</div>';
                datosEnvDia += '<table class="table table-hover table-sm table-responsive text-nowrap">';
                datosEnvDia += '<thead>';
                datosEnvDia += '<tr>';
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
            }
            $("#tabEnvDia").html(datosEnvDia);

//            clickActuEstado_OS();
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

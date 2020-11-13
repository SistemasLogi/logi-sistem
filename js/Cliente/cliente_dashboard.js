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
    $("#enlFormRecoleccion").click(function () {
        resetFormOrdServ();
        formulario_recolec();
    });
    $("#enlSeguimientoOS").click(function () {
        seguimiento_os();
    });
    $("#enlHistorialOS").click(function () {
        vista_historial_os_cli();
    });

    $("#enlSeguimientoEnv").click(function () {
        seguimiento_estado_env();
    });

    $("#link_vista_dashboard_envios").click(function () {
        vista_dashboard_envios_cl();
    });
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
 * Metodo general que limpia campos de un formulario
 * @param {type: form} formulario
 * @returns {undefined}
 */
function limpiarFormulario(formulario) {
    /* Se encarga de leer todas las etiquetas input del formulario*/
    $(formulario).find('input').each(function () {
        switch (this.type) {
            case 'password':
            case 'text':
            case 'hidden':
            case 'date':
            case 'file':
            case 'time':
                $(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
    /* Se encarga de leer todas las etiquetas select del formulario */
    $(formulario).find('select').each(function () {
        $("#" + this.id + " option[value=0]").attr("selected", true);
    });
    /* Se encarga de leer todas las etiquetas textarea del formulario */
    $(formulario).find('textarea').each(function () {
        $(this).val('');
    });
}

/**
 * Metodo que carga la vista de seguimiento de ordenes de servicio
 * @returns {undefined}
 */
function seguimiento_os() {
    request = "View/AdministradorV/OrdenesServicio/seguimiento_estados.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#sectionConten").html(datos);
        $("#btnBuscaOS").click(function () {
            validarBuscarNumOS(datos_orden_serv_seg);
        });
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que carga la vista de busqueda historica de os por cliente
 * @returns {undefined}
 */
function vista_historial_os_cli() {
    request = "View/AdministradorV/OrdenesServicio/tipo_busq_historial_os.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#sectionConten").html(datos);
        consulta_tabla_os_hist(1);
    };
    f_ajax(request, cadena, metodo);
}

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
 * Metodo que retorna la vista de seguimiento de envios
 * @returns {undefined}
 */
function seguimiento_estado_env() {
    request = "View/AdministradorV/AdEnvios/seguimiento_estados_env.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#sectionConten").html(datos);
        $("#btnBuscaEnv").click(function () {
            validarBuscarNumEnvio(datos_envio_seg);
        });
        $("#btnBuscaEnvGuiaOp").click(function () {
            validarBuscarNumEnvioOp(datos_envio_seg_op);
        });
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que carga el dashboard principal de envios
 * @returns {undefined}
 */
function vista_dashboard_envios_cl() {
    request = "View/ClienteV/FormulariosEnvios/dashboard_cl_envios.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
//        exist = false;
        $("#sectionConten").html(datos);
//        $("#btnBuscaEnvFech").click(function () {
//            validarFechEnvEst();
//        });
        consulta_dashboard_envios_card_cl();

    };
    f_ajax(request, cadena, metodo);
}


/**
 * Metodo que permite validar campos de fecha en dashboard envios cliente
 * @returns {undefined}
 */
function validarFechEnvEst() {
    $("#formBuscarEnvFech").validate({
        rules: {
            inputFechIni: {
                required: true
            },
            inputFechFin: {
                required: true
            }
        },
        submitHandler: function (form) {
            consulta_tabla_env_x_est_fech_cl(fech_ini, fech_fin, estado_id);
            $('#ModalActuEstOS').modal('hide');
            //En esta linea me redirije al formulario con una velocodad establecida
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#tbInfoEstEnv").offset().top
            }, 300);
        }
    });
}

var env_program;
var env_bodega_or;
var env_reparto;
var env_novedad;
var env_gest_fin;
var env_solucion;
var env_viajando_dest;
var env_bodega_dest;
/**
 * Metodo que retorna la cantidad de envios segun su estado a la vista de los paneles
 * @returns {undefined}
 */
function control_dash_envios() {
    $("#cantEnvProgram").html(env_program);
    $("#cantEnvGestFin").html(env_gest_fin);
    $("#cantEnvBodegaOr").html(env_bodega_or);
    $("#cantEnvSolucion").html(env_solucion);
    $("#cantEnvReparto").html(env_reparto);
    $("#cantEnvViajDest").html(env_viajando_dest);
    $("#cantEnvNovedades").html(env_novedad);
    $("#cantEnvBodegaDest").html(env_bodega_dest);
}
var fech_ini;
var fech_fin;
/**
 * Funcion que carga las acciones en los card
 * @returns {undefined}
 */
function consulta_dashboard_envios_card_cl() {
//    fech_ini = $("#inputFechIni").val();
//    fech_fin = $("#inputFechFin").val();
    request = "Controller/AdminC/AdministrarEnvios/consulta_ult_est_envio_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        env_program = 0;
        env_bodega_or = 0;
        env_reparto = 0;
        env_novedad = 0;
        env_gest_fin = 0;
        env_solucion = 0;
        env_viajando_dest = 0;
        env_bodega_dest = 0;
        arregloEstEnvCard = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEstEnvCard !== 0) {

            for (i = 0; i < arregloEstEnvCard.length; i++) {
                tmp = arregloEstEnvCard[i];
                if (tmp.exe_ee_id == 1) {
                    env_program++;
                } else if (tmp.exe_ee_id == 2) {
                    env_bodega_or++;
                } else if (tmp.exe_ee_id == 3) {
                    env_viajando_dest++;
                } else if (tmp.exe_ee_id == 4) {
                    env_bodega_dest++;
                } else if (tmp.exe_ee_id == 5) {
                    env_reparto++;
                } else if (tmp.exe_ee_id == 8) {
                    env_novedad++;
                } else if (tmp.exe_ee_id == 9) {
                    env_gest_fin++;
                } else if (tmp.exe_ee_id == 10) {
                    env_solucion++;
                }
            }

            control_dash_envios();
            clickPanelDashCl();
        } else {
            $("#tableEstOS").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

var estado_id;
/**
 * Metodo que plasma los datos del elemento seleccionado en los campos de texto
 * formulario ciudad
 * @returns {undefined}
 */
function clickPanelDashCl() {
//    $("#tableCiudad").on("click", ".actualiza", function () {
    $(".est_envio").click(function () {
        estado_id = $(this).attr("elem");

        if (estado_id == 6 || estado_id == 7 || estado_id == 11) {
            click_modal_fech();
        } else {
            consulta_tabla_env_x_est_cl(estado_id);
        }

        //En esta linea me redirije al formulario con una velocodad establecida
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#tbInfoEstEnv").offset().top
        }, 300);
    });
}

/**
 * Metodo que carga el modal con formulario para seleccion de rango fechas
 * @returns {undefined}
 */
function click_modal_fech() {

//        alert(ges_envio);

    $('#mod-dalog').removeClass('modal-lg');
    $('#ModalActuEstOS').modal('toggle');
    $('#ModalEstOSTitle').html('RANGO FECHAS');
    $('#body_mod_os').html('<b>Seleccione un rango de fechas para generar la tabla</b>\n\
            <div class="alert alert-dismissible alert-primary">\n\
            <form id="formBuscarEnvFech" name="formBuscarEnvFech">\n\
              <div class="form-row">\n\
                <div class="form-group col-md-6">\n\
                  <label class="col-form-label" for="inputFechIni"><b>Fecha Inicial :</b></label>\n\
                  <input class="form-control form-control-sm" type="date" id="inputFechIni" name="inputFechIni">\n\
                </div>\n\
                <div class="form-group col-md-6">\n\
                  <label class="col-form-label" for="inputFechFin"><b>Fecha Final :</b></label>\n\
                  <input class="form-control form-control-sm" type="date" id="inputFechFin" name="inputFechFin">\n\
                </div>\n\
              </div>\n\
              <button type="submit" class="btn btn-outline-primary btn-sm" id="btnBuscaEnvFech" name="btnBuscaEnvFech">BUSCAR</button>\n\
            </form></div>');
    $("#btnBuscaEnvFech").click(function () {
        fech_ini = $("#inputFechIni").val();
        fech_fin = $("#inputFechFin").val();
        validarFechEnvEst();
    });

}


/**
 * Metodo que carga la tabla de envios segun el estado y un rango de fechas en dashboard cliente
 * @param {type} fech_ini
 * @param {type} fech_fin
 * @param {type} est_env
 * @returns {consulta_tabla_env_x_est_fech_cl}
 */
function consulta_tabla_env_x_est_fech_cl(fech_ini, fech_fin, est_env) {
    request = "Controller/ClienteC/cons_ult_est_id_env_cl_controller.php";
    cadena = {"fech_ini": fech_ini, "fech_fin": fech_fin, "est_env": est_env}; //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arreglo_env = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_env !== 0) {
            temp_es = arreglo_env[0];
            var colorTab;
            var colorText;
            var colorAl;
            if (est_env == 6) {
                colorTab = 'class="table-success"';
                colorText = 'text-success';
                colorAl = 'success';
            } else if (est_env == 7) {
                colorTab = 'class="table-danger"';
                colorText = 'text-danger';
                colorAl = 'danger';
            } else if (est_env == 11) {
                colorTab = 'class="table-info"';
                colorText = 'text-info';
                colorAl = 'info';
            }
            datos_env = '<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">\n\
                            <div class="toast-header">\n\
                            <strong class="mr-auto" id="title_env_est">ENVIOS ' + temp_es.ee_desc + '</strong>\n\
                            </div>\n\
                            <div class="toast-body">\n\
                            <div class="table-responsive text-nowrap col-lg-12" id="tbInfoEstEnv">\n\
                            <table class="table table-striped table-sm table-bordered" id="tableEstadoEnv">\n\
                            <thead><tr ' + colorTab + '>\n\
                                <th scope="col">GUIA LOGI</th>\n\
                                <th scope="col">GUIA OP</th>\n\
                                <th scope="col">FECHA</th>\n\
                                <th scope="col">HORA</th>\n\
                                <th scope="col">ESTADO</th>\n\
                                <th scope="col">CLIENTE</th>\n\
                                <th scope="col">SUCURSAL</th>\n\
                                <th scope="col">SERVICIO</th>\n\
                                <th scope="col">T. ENVIO</th>\n\
                                <th scope="col">DIRECCION</th>\n\
                                <th scope="col">OBSERVACIONES</th>\n\
                                </tr></thead><tbody>';

            for (i = 0; i < arreglo_env.length; i++) {
                temp = arreglo_env[i];

                var fecha_hora = new Date(temp.exe_fec_hora);
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                };
                var timeString = fecha_hora.toLocaleString('en-US', options);
                fe = new Date(temp.exe_fec_hora.replace(/-/g, '\/'));

                datos_env += '<tr class="table-sm EnvFil" id="fila_env' + temp.exe_en_id + '" fila="' + temp.exe_en_id + '">';
                datos_env += '<td>' + temp.exe_en_id + '</td>';
                datos_env += '<td>' + temp.en_guia + '</td>';
                datos_env += '<td>' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                datos_env += '<td>' + timeString + '</td>';
                datos_env += '<td>' + temp.ee_desc + '</td>';
                datos_env += '<td>' + temp.cli_nombre + '</td>';
                if (temp.suc_nombre == null) {
                    datos_env += '<td></td>';
                } else {
                    datos_env += '<td>' + temp.suc_nombre + '</td>';
                }
                if (temp.ts_id == 1) {
                    datos_env += '<td class="table-primary">' + temp.ts_desc + '</td>';
                } else {
                    datos_env += '<td>' + temp.ts_desc + '</td>';
                }
                datos_env += '<td>' + temp.te_desc + '</td>';
                datos_env += '<td>' + temp.en_direccion + '</td>';
                if (temp.exe_ee_id == 5) {
                    datos_env += '<td>En Reparto</td></tr>';
                } else {
                    datos_env += '<td>' + temp.exe_novedad + '</td></tr>';
                }
            }
            datos_env += "</tbody></table></div></div></div>";


            $("#tab_est_env").html(datos_env);
            /**
             * Evento que pagina una tabla 
             */
            var table = $('#tableEstadoEnv').DataTable({
                'scrollX': true
            });

        } else {
            $("#tab_est_env").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga la tabla de envios segun el estado en dashboard cliente
 * @param {type} est_env
 * @returns {consulta_tabla_env_x_est_cl}
 */
function consulta_tabla_env_x_est_cl(est_env) {
    request = "Controller/AdminC/AdministrarEnvios/consulta_ult_est_id_est_controller.php";
    cadena = "id_est_env=" + est_env; //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arreglo_env = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_env !== 0) {
            temp_es = arreglo_env[0];
            var colorTab;
            var colorText;
            var colorAl;
            if (est_env == 1) {
                colorTab = 'style="background-color: #fbd797; color: #7c550f;"';
                colorText = 'text-warning';
                colorAl = 'warning';
            } else if (est_env == 2) {
                colorTab = 'class="table-warning"';
                colorText = 'text-warning';
                colorAl = 'warning';
            } else if (est_env == 3) {
                colorTab = 'class="table-info"';
                colorText = 'text-info';
                colorAl = 'info';
            } else if (est_env == 4) {
                colorTab = 'class="table-warning"';
                colorText = 'text-warning';
                colorAl = 'warning';
            } else if (est_env == 5) {
                colorTab = 'class="table-success"';
                colorText = 'text-success';
                colorAl = 'success';
            } else if (est_env == 8) {
                colorTab = 'class="bg-warning"';
                colorText = 'text-warning';
                colorAl = 'warning';
            } else if (est_env == 9) {
                colorTab = 'class="table-danger"';
                colorText = 'text-danger';
                colorAl = 'danger';
            } else if (est_env == 10) {
                colorTab = 'class="bg-info"';
                colorText = 'text-info';
                colorAl = 'info';
            }
            datos_env = '<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">\n\
                            <div class="toast-header">\n\
                            <strong class="mr-auto" id="title_env_est">ENVIOS ' + temp_es.ee_desc + '</strong>\n\
                            </div>\n\
                            <div class="toast-body">\n\
                            <div class="table-responsive text-nowrap col-lg-12" id="tbInfoEstEnv">\n\
                            <table class="table table-striped table-sm table-bordered" id="tableEstadoEnv">\n\
                            <thead><tr ' + colorTab + '>\n\
                                <th scope="col">GUIA LOGI</th>\n\
                                <th scope="col">GUIA OP</th>\n\
                                <th scope="col">FECHA</th>\n\
                                <th scope="col">HORA</th>\n\
                                <th scope="col">ESTADO</th>\n\
                                <th scope="col">CLIENTE</th>\n\
                                <th scope="col">SUCURSAL</th>\n\
                                <th scope="col">SERVICIO</th>\n\
                                <th scope="col">T. ENVIO</th>\n\
                                <th scope="col">DIRECCION</th>\n\
                                <th scope="col">OBSERVACIONES</th>\n\
                                </tr></thead><tbody>';

            for (i = 0; i < arreglo_env.length; i++) {
                temp = arreglo_env[i];

                var fecha_hora = new Date(temp.exe_fec_hora);
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                };
                var timeString = fecha_hora.toLocaleString('en-US', options);
                fe = new Date(temp.exe_fec_hora.replace(/-/g, '\/'));

                datos_env += '<tr class="table-sm EnvFil" id="fila_env' + temp.exe_en_id + '" fila="' + temp.exe_en_id + '">';
                datos_env += '<td>' + temp.exe_en_id + '</td>';
                datos_env += '<td>' + temp.en_guia + '</td>';
                datos_env += '<td>' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                datos_env += '<td>' + timeString + '</td>';
                datos_env += '<td>' + temp.ee_desc + '</td>';
                datos_env += '<td>' + temp.cli_nombre + '</td>';
                if (temp.suc_nombre == null) {
                    datos_env += '<td></td>';
                } else {
                    datos_env += '<td>' + temp.suc_nombre + '</td>';
                }
                if (temp.ts_id == 1) {
                    datos_env += '<td class="table-primary">' + temp.ts_desc + '</td>';
                } else {
                    datos_env += '<td>' + temp.ts_desc + '</td>';
                }
                datos_env += '<td>' + temp.te_desc + '</td>';
                datos_env += '<td>' + temp.en_direccion + '</td>';
                if (temp.exe_ee_id == 5) {
                    datos_env += '<td>En Reparto</td></tr>';
                } else {
                    datos_env += '<td>' + temp.exe_novedad + '</td></tr>';
                }
            }
            datos_env += "</tbody></table></div></div></div>";


            $("#tab_est_env").html(datos_env);
            /**
             * Evento que pagina una tabla 
             */
            var table = $('#tableEstadoEnv').DataTable({
                'scrollX': true
            });

        } else {
            $("#tab_est_env").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}
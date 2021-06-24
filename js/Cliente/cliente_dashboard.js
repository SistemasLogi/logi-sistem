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

    $("#link_vista_dashboard_envios_suc").click(function () {
        vista_dashboard_envios_suc();
    });

    $("#link_vista_tabla_imp_guias").click(function () {
        tabla_imp_guias_suc();
    });

    $("#link_stock_cl").click(function () {
        vista_stock_cl();
    });
    $("#link_vista_dash_alist_cl").click(function () {
        vista_dashboard_alist_cl();
    });
    $("#link_vista_dash_alist_suc").click(function () {
        vista_dashboard_alist_suc();
    });

    $("#link_stock_suc").click(function () {
        vista_stock_suc();
    });

    $("#link_ent_suc").click(function () {
        vista_busca_entrada();
    });

    $("#link_rot_inv").click(function () {
        vista_rep_rot_inv();
    });

    $("#link_seg_aenv_cl").click(function () {
        segui_estado_alist_env_cl();
    });

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
 * Metodo que retorna la vista de seguimiento de envios en alistamiento
 * @returns {undefined}
 */
function segui_estado_alist_env_cl() {
    request = "View/AdministradorV/AdEnvios/seguimiento_est_alist_env.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#sectionConten").html(datos);
        $("#btnBuscaEnvAlst").click(function () {
            validarBuscarNumVenta(datos_seg_alist);
        });
        $("#btnBuscaEnvAlstGuiaOp").click(function () {
            validarBuscarNumGuiaOp(datos_seg_alist_op);
        });
//        botones_seg_os();
    };
    f_ajax(request, cadena, metodo);
}
var id_sucursal_sel = "0";
var fech_valida = false;
var ini_fecha = '';
var fin_fecha = '';
/**
 * Metodo que carga el dashboard principal de envios
 * @returns {undefined}
 */
function vista_dashboard_envios_cl() {
    request = "View/ClienteV/FormulariosEnvios/dashboard_cl_envios.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        fech_valida = false;
        $("#sectionConten").html(datos);

        combo_sucursal_x_dos();

        $("#selectSuc_Cli").change(function () {
            id_sucursal_sel = $("#selectSuc_Cli").val();
        });

        $("#btnVer").click(function () {

            ini_fecha = $("#selectFech_ini").val();
            fin_fecha = $("#selectFech_fin").val();

            if (ini_fecha !== "" && fin_fecha !== "") {
                if (ini_fecha > fin_fecha) {
                    alertify.alert("La fecha de inicio no debe ser mayor que la fecha final, la  consulta generada no es acorde a el tiempo.").setHeader('<em> Cuidado! </em> ');
                    consulta_dashboard_envios_card_cli(id_sucursal_sel, ini_fecha, fin_fecha);
                    fech_valida = false;
                    $("#btnReportXlsx").attr("disabled");
                    $("#lupaEntregados").show();
                    $("#cantEnvEntregados").hide();
                } else {
                    consulta_dashboard_envios_card_cli(id_sucursal_sel, ini_fecha, fin_fecha);
                    fech_valida = true;
                    $("#btnReportXlsx").removeAttr("disabled");
                    $("#lupaEntregados").hide();
                    $("#cantEnvEntregados").show();
                    $("#btnReportXlsx").click(function () {
                        reporte_envios_Xlsx(id_sucursal_sel, ini_fecha, fin_fecha);
                    });
                }
            }

            consulta_dashboard_envios_card_cli(id_sucursal_sel, ini_fecha, fin_fecha);

            if ($('#selectSuc_Cli option:selected').val() == '0') {
                $("#lbSuc").html("");
            } else {
                $("#lbSuc").html(' ' + $('#selectSuc_Cli option:selected').text());
            }
        });

        consulta_dashboard_envios_card_cl();

    };
    f_ajax(request, cadena, metodo);
}
/** 
 * Metodo que genera un reporte en excel .xlsx de envios ingresados 
 * segun un rango de fechas
 * @param {type} sucursal_id
 * @param {type} ini_fecha
 * @param {type} fin_fecha
 * @returns {undefined}
 */
function reporte_envios_Xlsx(sucursal_id, ini_fecha, fin_fecha) {
    $("#blqBtnXlsx").html('<img class="img-fluid" src="img/animaciones/cargando4.gif" alt=""/>');
    request = "Controller/AdminC/AdministrarEnvios/reporte_envios_cl_controller.php";
    cadena = {"sucursal_id": sucursal_id, "ini_fecha": ini_fecha, "fin_fecha": fin_fecha}; //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);       
        rutaXLS_envios_guardado(datos);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que proporciona la ruta y el nombre del archivo xls para descargar
 * basicamente se hace como medio de control en tiempo de ejecucion
 * previene que se ejecute una descarga antes de crear el archivo xlsx
 * @param {type} clienteRuta
 * @returns {undefined}
 */
function rutaXLS_envios_guardado(clienteRuta) {
    if (clienteRuta == 1) {
        alertify.alert('Reporte no generado, error al generar el reporte').setHeader('<em> Cuidado! </em> ');
    } else {
        $(location).attr('href', 'Files/' + $.trim(clienteRuta) + '.xlsx');

        alertify.warning('Reporte Generado!!!');
    }
    $("#blqBtnXlsx").html('<button type="button" class="btn btn-success" id="btnReportXlsx" disabled>informe xlsx</button>');
}
/**
 * Metodo que carga el dashboard principal de envios
 * @returns {undefined}
 */
function vista_dashboard_alist_cl() {
    request = "View/ClienteV/FormulariosEnvios/dashboard_cl_alist.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
//        exist = false;
        $("#sectionConten").html(datos);

        combo_sucursal_x_dos();

        $("#selectSuc_Cli").change(function () {
            id_sucursal_sel = $("#selectSuc_Cli").val();
        });

        $("#btnVer").click(function () {
            consulta_dashboard_alist_card_cli(id_sucursal_sel);

            if ($('#selectSuc_Cli option:selected').val() == '0') {
                $("#lbSuc").html("");
            } else {
                $("#lbSuc").html(' ' + $('#selectSuc_Cli option:selected').text());
            }


        });

        consulta_dashboard_alist_card_cl();

    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga el dashboard principal de envios
 * @returns {undefined}
 */
function vista_dashboard_envios_suc() {
    request = "View/SucursalV/dashboard_suc_envios.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
//        exist = false;
        $("#sectionConten").html(datos);

        consulta_dashboard_envios_card_cl();

    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga el dashboard principal de envios
 * @returns {undefined}
 */
function vista_dashboard_alist_suc() {
    request = "View/SucursalV/dashboard_suc_alist.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
//        exist = false;
        $("#sectionConten").html(datos);

        consulta_dashboard_alist_card_cl();

    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga el dashboard principal de envios
 * @returns {undefined}
 */
function vista_stock_cl() {
    request = "View/ClienteV/FormulariosEnvios/stock_cli.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
//        exist = false;
        $("#sectionConten").html(datos);
        combo_sucursal_x();

        $("#selectSucursal").change(function () {
            sucursal = $("#selectSucursal").val();
            tabla_stock_suc_cli(sucursal);
            $("#imgSucLogo").html('<img src="img/sucursales/' + sucursal + '.png" alt=""/>');
        });

        $("#btnSelectSuc").click(function () {
            sucursal = $("#selectSucursal").val();
            tabla_stock_suc_cli(sucursal);
            $("#imgSucLogo").html('<img src="img/sucursales/' + sucursal + '.png" alt=""/>');
        });
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga el dashboard principal de envios para una sucursal
 * @returns {undefined}
 */
function vista_stock_suc() {
    request = "View/SucursalV/stock_suc.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
//        exist = false;
        $("#sectionConten").html(datos);
        $("#contenidoInvent").html("<div class='col-lg-12'><img class='img-fluid' src='img/animaciones/loading.gif' alt=''/></div>");
        tabla_stock_sucursal();
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga el dashboard principal de envios para una sucursal
 * @returns {undefined}
 */
function vista_busca_entrada() {
    request = "View/SucursalV/form_busq_entradas.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
//        exist = false;
        $("#sectionConten").html(datos);

        $("#btnBuscaDet").click(function () {
            validar_detalle_entrada();
        });
        $("#btnBuscaFechEnt").click(function () {
            validar_fechas_entrada();
        });
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga el dashboard principal de envios para una sucursal
 * @returns {undefined}
 */
function vista_rep_rot_inv() {
    request = "View/SucursalV/form_rotacion_inv.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
//        exist = false;
        $("#sectionConten").html(datos);

        $("#btnRangoFechas").click(function () {
            validar_fechas_rot_inv();
        });
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que retorna los datos a combo sucursales por cliente seleccionado
 * @returns {undefined}
 */
function combo_sucursal_x() {
    request = "Controller/ClienteC/consulta_suc_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_suc_cli = $.parseJSON(datos);
        datouscombo = "";
        if (arreglo_suc_cli == "") {
            datouscombo += '<option value="0"></option>';
        } else {
            datouscombo += '<option value="0">Seleccione</option>';
            for (i = 0; i < arreglo_suc_cli.length; i++) {
                temp = arreglo_suc_cli[i];
                datouscombo += '<option value="' + temp.suc_num_id + '">' + temp.suc_nombre + "</option>";
            }
        }

        $("#selectSucursal").html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que retorna los datos a combo sucursales por cliente seleccionado
 * @returns {undefined}
 */
function combo_sucursal_x_dos() {
    request = "Controller/ClienteC/consulta_suc_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_suc_cli = $.parseJSON(datos);
        datouscombo = "";
        if (arreglo_suc_cli == "") {
            datouscombo += '<option value="0"></option>';
        } else {
            datouscombo += '<option value="0">Todos</option>';
            for (i = 0; i < arreglo_suc_cli.length; i++) {
                temp = arreglo_suc_cli[i];
                datouscombo += '<option value="' + temp.suc_num_id + '">' + temp.suc_nombre + "</option>";
            }
        }
        $("#selectSuc_Cli").html(datouscombo);
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
/**
 * Metodo que permite validar campos de fecha en dashboard envios cliente
 * @returns {undefined}
 */
function validar_detalle_entrada() {
    $("#formBuscarDetalle").validate({
        rules: {
            inpBuscaDet: {
                required: true,
                minlength: 5
            }
        },
        submitHandler: function (form) {
            tabla_detalle_entrada();
        }
    });
}
/**
 * Metodo que valida datos del formulario para generar reporte por fechas entrada
 * @returns {undefined}
 */
function validar_fechas_entrada() {
    $("#formBuscarFechaEnt").validate({
        rules: {
            inpFechaInicio: {
                required: true,
                date: true
            },
            inpFechaFin: {
                required: true,
                date: true
            }
        },
        submitHandler: function (form) {
            verificaFechasEnt();
        }
    });
}

/**
 * Metodo que permite controlar que la fecha inicial sea menor a la final para reporte entradas
 * @returns {undefined}
 */
function verificaFechasEnt() {
    var fInicial = $("#inpFechaInicio").val();
    var fFinal = $("#inpFechaFin").val();
    if (fInicial > fFinal) {
        $("#mensaje").html("La fecha inicial no puede ser mayor que la final");
    } else {
        tabla_fechas_entrada();
    }
}
/**
 * Metodo que valida datos del formulario para generar reporte por fechas entrada
 * @returns {undefined}
 */
function validar_fechas_rot_inv() {
    $("#formRotacionInv").validate({
        rules: {
            inpFechaIni: {
                required: true,
                date: true
            },
            inpFechaFin: {
                required: true,
                date: true
            }
        },
        submitHandler: function (form) {
            verificaFechasRotacion();
        }
    });
}

/**
 * Metodo que permite controlar que la fecha inicial sea menor a la final para reporte entradas
 * @returns {undefined}
 */
function verificaFechasRotacion() {
    var fInicial = $("#inpFechaIni").val();
    var fFinal = $("#inpFechaFin").val();
    if (fInicial > fFinal) {
        $("#mensaje").html("La fecha inicial no puede ser mayor que la final");
    } else {
        tabla_fechas_rot_inv();
    }
}
var env_program;
var env_bodega_or;
var env_reparto;
var env_novedad;
var env_gest_fin;
var env_solucion;
var env_viajando_dest;
var env_bodega_dest;
var env_entregado;
var env_colectados;
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
    $("#cantEnvEntregados").html(env_entregado);
    $("#cantEnvColectados").html(env_colectados);
}

/**
 * Metodo que resetea los paneles
 * @returns {undefined}
 */
function control_dash_envios_reset() {
    $("#cantEnvProgram").html("");
    $("#cantEnvGestFin").html("");
    $("#cantEnvBodegaOr").html("");
    $("#cantEnvSolucion").html("");
    $("#cantEnvReparto").html("");
    $("#cantEnvViajDest").html("");
    $("#cantEnvNovedades").html("");
    $("#cantEnvBodegaDest").html("");
    $("#cantEnvEntregados").html("");
    $("#cantEnvColectados").html("");
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
        env_colectados = 0;
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
                } else if (tmp.exe_ee_id == 13) {
                    env_colectados++;
                }
            }

            control_dash_envios();
        } else {
            $("#tableEstOS").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
        clickPanelDashCl();
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Funcion que carga las acciones en los card segun cliente
 * @param {type} sucursal_id
 * @param {type} ini_fecha
 * @param {type} fin_fecha
 * @returns {undefined}
 */
function consulta_dashboard_envios_card_cli(sucursal_id, ini_fecha, fin_fecha) {
    request = "Controller/AdminC/AdministrarEnvios/consulta_ult_est_env_cli_controller.php";
    cadena = {"sucursal_id": sucursal_id, "ini_fecha": ini_fecha, "fin_fecha": fin_fecha}; //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        control_dash_envios_reset();
        env_program = 0;
        env_bodega_or = 0;
        env_reparto = 0;
        env_novedad = 0;
        env_gest_fin = 0;
        env_solucion = 0;
        env_viajando_dest = 0;
        env_bodega_dest = 0;
        env_entregado = 0;
        env_colectados = 0;
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
                } else if (tmp.exe_ee_id == 6) {
                    env_entregado++;
                } else if (tmp.exe_ee_id == 8) {
                    env_novedad++;
                } else if (tmp.exe_ee_id == 9) {
                    env_gest_fin++;
                } else if (tmp.exe_ee_id == 10) {
                    env_solucion++;
                } else if (tmp.exe_ee_id == 13) {
                    env_colectados++;
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
/**
 * Funcion que carga las acciones en los card segun cliente
 * @param {type} sucursal_id
 * @returns {consulta_dashboard_envios_card_cli}
 */
function consulta_dashboard_alist_card_cli(sucursal_id) {
    request = "Controller/AdminC/AdministrarEnvios/consulta_ult_est_aenv_cli_controller.php";
    cadena = {"sucursal_id": sucursal_id}; //envio de parametros por POST
    metodo = function (datos) {

        control_dash_alist_reset();
        alst_picking = 0;
        alst_packing = 0;
        arregloEstAlsCard = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEstAlsCard !== 0) {

            for (i = 0; i < arregloEstAlsCard.length; i++) {
                tmp = arregloEstAlsCard[i];
                if (tmp.esae_id == 1) {
                    alst_picking++;
                } else if (tmp.esae_id == 2) {
                    alst_packing++;
                }
            }

            control_dash_alist();
            clickPanelDashAlist();
        } else {
            $("#tableEstOS").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}


var alst_picking;
var alst_paking;
/**
 * Metodo que retorna la cantidad de envios segun su estado a la vista de los paneles
 * alistamiento
 * @returns {undefined}
 */
function control_dash_alist() {
    $("#cantEnvPicking").html(alst_picking);
    $("#cantEnvPacking").html(alst_packing);
}
/**
 * Metodo que resetea los paneles alistamiento
 * @returns {undefined}
 */
function control_dash_alist_reset() {
    $("#cantEnvPicking").html("");
    $("#cantEnvPacking").html("");
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
            if (fech_valida == true) {
                consulta_tabla_env_x_est_cl(estado_id, id_sucursal_sel, ini_fecha, fin_fecha);
            } else {
                click_modal_fech();
            }
        } else {
            consulta_tabla_env_x_est_cl(estado_id, id_sucursal_sel, ini_fecha, fin_fecha);
        }

        //En esta linea me redirije al formulario con una velocodad establecida
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#tbInfoEstEnv").offset().top
        }, 300);
    });
}

var estado_id_alist;
/**
 * Metodo de ejecucion click en paneles dashboard alistamiento
 * @returns {undefined}
 */
function clickPanelDashAlist() {
//    $("#tableCiudad").on("click", ".actualiza", function () {
    $(".est_env_als").click(function () {
        estado_id_alist = $(this).attr("estals");

        if (estado_id_alist == 3 || estado_id_alist == 4) {
            click_modal_fech_alis();
        } else {
            consulta_tabla_alist_x_est_cl(id_sucursal_sel, estado_id_alist);
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
 * Metodo que carga el modal con formulario para seleccion de rango fechas
 * @returns {undefined}
 */
function click_modal_fech_alis() {

//        alert(ges_envio);

    $('#mod-dalog').removeClass('modal-lg');
    $('#ModalActuEstOS').modal('toggle');
    $('#ModalEstOSTitle').html('RANGO FECHAS');
    $('#body_mod_os').html('<b>Seleccione un rango de fechas para generar la tabla</b>\n\
            <div class="alert alert-dismissible alert-info">\n\
            <form id="formBuscarAlstFech" name="formBuscarAlstFech">\n\
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
              <button type="submit" class="btn btn-outline-primary btn-sm" id="btnBuscaAEnvFech" name="btnBuscaAEnvFech">BUSCAR</button>\n\
            </form></div>');
    $("#btnBuscaAEnvFech").click(function () {
        fech_ini = $("#inputFechIni").val();
        fech_fin = $("#inputFechFin").val();
        validarFechAlstEst();
    });
}
/**
 * Metodo que permite validar campos de fecha en dashboard envios cliente
 * @returns {undefined}
 */
function validarFechAlstEst() {
    $("#formBuscarAlstFech").validate({
        rules: {
            inputFechIni: {
                required: true
            },
            inputFechFin: {
                required: true
            }
        },
        submitHandler: function (form) {
            consulta_tabla_aenv_x_est_fech_cl(fech_ini, fech_fin, estado_id_alist);
            $('#ModalActuEstOS').modal('hide');
            //En esta linea me redirije al formulario con una velocodad establecida
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#tbInfoEstEnv").offset().top
            }, 300);
        }
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
                                <th scope="col">DESTINATARIO</th>\n\
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
                datos_env += '<td>' + temp.en_nombre + '</td>';
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
 * Metodo que carga la tabla de envios segun detalle de entrada
 * @returns {tabla_detalle_entrada}
 */
function tabla_detalle_entrada() {
    request = "Controller/AdminC/AdministrarProd/consulta_entradas_detalle_controller.php";
    cadena = $("#formBuscarDetalle").serialize(); //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arreglo_entr = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_entr !== 0) {
            datos_entr = '<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">\n\
                            <div class="toast-header">\n\
                            <strong class="mr-auto" id="title_env_est">TABLA GENERAL DE ENTRADAS</strong>\n\
                            </div>\n\
                            <div class="toast-body">\n\
                            <div class="table-responsive text-nowrap col-lg-12" id="tbInfoEstEnv">\n\
                            <table class="table table-striped table-sm table-bordered" id="tableEntSucDet">\n\
                            <thead><tr class="table-primary">\n\
                                <th scope="col">FECHA</th>\n\
                                <th scope="col">HORA</th>\n\
                                <th scope="col">CODIGO</th>\n\
                                <th scope="col">SKU</th>\n\
                                <th scope="col">DESCRIPCION</th>\n\
                                <th scope="col">CANTIDAD</th>\n\
                                <th scope="col">DETALLE</th>\n\
                                </tr></thead><tbody>';

            for (i = 0; i < arreglo_entr.length; i++) {
                temp = arreglo_entr[i];

                var fecha_hora = new Date(temp.ent_fecha);
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                };
                var timeString = fecha_hora.toLocaleString('en-US', options);
                fe = new Date(temp.ent_fecha.replace(/-/g, '\/'));

                datos_entr += '<tr class="table-sm fila="' + i + '">';
                datos_entr += '<td>' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                datos_entr += '<td>' + timeString + '</td>';
                datos_entr += '<td>' + temp.pro_cod + '</td>';
                datos_entr += '<td>' + temp.pro_sku + '</td>';
                datos_entr += '<td>' + temp.pro_desc + '</td>';
                datos_entr += '<td>' + temp.ent_cantidad + '</td>';
                datos_entr += '<td>' + temp.ent_detalle + '</td>';
            }
            datos_entr += "</tbody></table></div></div></div>";


            $("#tabla_Ent_Suc").html(datos_entr);
            /**
             * Evento que pagina una tabla 
             */
            var table = $('#tableEntSucDet').DataTable({
                'scrollX': true
            });

        } else {
            $("#tabla_Ent_Suc").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga la tabla de envios segun rango fechas de entrada
 * @returns {tabla_detalle_entrada}
 */
function tabla_fechas_entrada() {
    request = "Controller/AdminC/AdministrarProd/consulta_entradas_fecha_controller.php";
    cadena = $("#formBuscarFechaEnt").serialize(); //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arreglo_entr = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_entr !== 0) {
            datos_entr = '<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">\n\
                            <div class="toast-header">\n\
                            <strong class="mr-auto" id="title_env_est">TABLA GENERAL DE ENTRADAS</strong>\n\
                            </div>\n\
                            <div class="toast-body">\n\
                            <div class="table-responsive text-nowrap col-lg-12" id="tbInfoEstEnv">\n\
                            <table class="table table-striped table-sm table-bordered" id="tableEntSucDet">\n\
                            <thead><tr class="table-secondary">\n\
                                <th scope="col">FECHA</th>\n\
                                <th scope="col">HORA</th>\n\
                                <th scope="col">CODIGO</th>\n\
                                <th scope="col">SKU</th>\n\
                                <th scope="col">DESCRIPCION</th>\n\
                                <th scope="col">CANTIDAD</th>\n\
                                <th scope="col">DETALLE</th>\n\
                                </tr></thead><tbody>';

            for (i = 0; i < arreglo_entr.length; i++) {
                temp = arreglo_entr[i];

                var fecha_hora = new Date(temp.ent_fecha);
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                };
                var timeString = fecha_hora.toLocaleString('en-US', options);
                fe = new Date(temp.ent_fecha.replace(/-/g, '\/'));

                datos_entr += '<tr class="table-sm fila="' + i + '">';
                datos_entr += '<td>' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                datos_entr += '<td>' + timeString + '</td>';
                datos_entr += '<td>' + temp.pro_cod + '</td>';
                datos_entr += '<td>' + temp.pro_sku + '</td>';
                datos_entr += '<td>' + temp.pro_desc + '</td>';
                datos_entr += '<td>' + temp.ent_cantidad + '</td>';
                datos_entr += '<td>' + temp.ent_detalle + '</td>';
            }
            datos_entr += "</tbody></table></div></div></div>";


            $("#tabla_Ent_Suc").html(datos_entr);
            /**
             * Evento que pagina una tabla 
             */
            var table = $('#tableEntSucDet').DataTable({
                'scrollX': true
            });

        } else {
            $("#tabla_Ent_Suc").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga la tabla de envios segun rango fechas de entrada
 * @returns {tabla_detalle_entrada}
 */
function tabla_fechas_rot_inv() {
    request = "Controller/AdminC/AdministrarProd/consulta_rotacion_inv_controller.php";
    cadena = $("#formRotacionInv").serialize(); //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        arreglo_entr = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_entr !== 0) {
            datos_entr = '<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">\n\
                            <div class="toast-header">\n\
                            <strong class="mr-auto" id="title_env_est">TABLA GENERAL DE ENTRADAS</strong>\n\
                            </div>\n\
                            <div class="toast-body">\n\
                            <div class="table-responsive text-nowrap col-lg-12" id="tbRotInvent">\n\
                            <table class="table table-striped table-sm table-bordered" id="tableRotInv">\n\
                            <thead><tr class="table-secondary">\n\
                                <th scope="col">CODIGO</th>\n\
                                <th scope="col">SKU</th>\n\
                                <th scope="col">DESCRIPCION</th>\n\
                                <th scope="col">SALIDAS</th>\n\
                                <th scope="col">SUC CLIENTE</th>\n\
                                </tr></thead><tbody>';

            for (i = 0; i < arreglo_entr.length; i++) {
                temp = arreglo_entr[i];

                datos_entr += '<tr class="table-sm fila="' + i + '">';
                datos_entr += '<td>' + temp.pro_cod + '</td>';
                datos_entr += '<td>' + temp.pro_sku + '</td>';
                datos_entr += '<td>' + temp.pro_desc + '</td>';
                datos_entr += '<td>' + temp.t_salidas + '</td>';
                datos_entr += '<td>' + temp.suc_nombre + '</td>';
            }
            datos_entr += "</tbody></table></div></div></div>";


            $("#tabla_rot_inv_suc").html(datos_entr);
            /**
             * Evento que pagina una tabla 
             */
            var table = $('#tableRotInv').DataTable({
                'order': [[3, 'desc']],
                'scrollX': true
            });

        } else {
            $("#tabla_Ent_Suc").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga la tabla de envios segun el estado en dashboard cliente
 * @param {type} est_env
 * @param {type} sucursal_id
 * @param {type} ini_fecha
 * @param {type} fin_fecha
 * @returns {undefined}
 */
function consulta_tabla_env_x_est_cl(est_env, sucursal_id, ini_fecha, fin_fecha) {
    request = "Controller/AdminC/AdministrarEnvios/consulta_ult_est_id_est_controller.php";
    cadena = {"id_est_env": est_env, "sucursal_id": sucursal_id, "ini_fecha": ini_fecha, "fin_fecha": fin_fecha}; //envio de parametros por POST
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
            } else if (est_env == 6) {
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
            } else if (est_env == 13) {
                colorTab = 'style="background-color: #e7e0f3; color: #584b6e;"';
                colorText = 'text-primary';
                colorAl = 'primary';
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
                                <th scope="col">DESTINATARIO</th>\n\
                                <th scope="col">DIRECCION</th>\n\
                                <th scope="col">CIUDAD DEST</th>\n\
                                <th scope="col">DPTO</th>\n\
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
                datos_env += '<td>' + temp.en_nombre + '</td>';
                datos_env += '<td>' + temp.en_direccion + '</td>';
                datos_env += '<td>' + temp.en_ciudad + '</td>';
                datos_env += '<td>' + temp.en_departamento + '</td>';
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
var arreglo_alist;
/**
 * Metodo que carga la tabla de alistamiento segun el estado
 * @param {type} sucursal_id
 * @param {type} id_est
 * @returns {consulta_tabla_alist_x_est_cl}
 */
function consulta_tabla_alist_x_est_cl(sucursal_id, id_est) {
    request = "Controller/AdminC/AdministrarEnvios/consulta_ult_est_aen_id_est_controller.php";
    cadena = {"sucursal_id": sucursal_id, "id_est_env": id_est}; //envio de parametros por POST
    metodo = function (datos) {
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arreglo_alist = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_alist !== 0) {
            temp_es_als = arreglo_alist[0];
            var colorTab;
            var colorText;
            if (id_est == 1) {
                colorTab = 'style="background-color: #fbd797; color: #7c550f;"';
                colorText = 'text-warning';
            } else if (id_est == 2) {
                colorTab = 'class="bg-info"';
                colorText = 'text-info';
            }
            datos_alist = '<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">\n\
                            <div class="toast-header">\n\
                            <strong class="mr-auto" id="title_env_est">ENVIOS ' + temp_es_als.esae_desc + '</strong>\n\
                            </div>\n\
                            <div class="toast-body">\n\
                            <div class="table-responsive text-nowrap col-lg-12" id="tbInfoEstEnv">\n\
                            <table class="table table-striped table-sm table-bordered" id="tableEstadoAlist">\n\
                            <thead><tr ' + colorTab + '>\n\
                                <th scope="col">N°</th>\n\
                                <th scope="col">VENTA</th>\n\
                                <th scope="col">GUIA OP</th>\n\
                                <th scope="col">FECHA</th>\n\
                                <th scope="col">HORA</th>\n\
                                <th scope="col">ESTADO</th>\n\
                                <th scope="col">OPERADOR</th>\n\
                                <th scope="col">CLIENTE</th>\n\
                                <th scope="col">SUCURSAL</th>\n\
                                <th scope="col">T. ENVIO</th>\n\
                                <th scope="col">OBSERVACIONES</th>\n\
                                </tr></thead><tbody>';

            for (i = 0; i < arreglo_alist.length; i++) {
                temp_es_als = arreglo_alist[i];

                var fecha_hora = new Date(temp_es_als.exae_fecha_hora);
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                };
                var timeString = fecha_hora.toLocaleString('en-US', options);
                fe = new Date(temp_es_als.exae_fecha_hora.replace(/-/g, '\/'));

                datos_alist += '<tr class="table-sm EnvFil" id="fila_env' + temp_es_als.aen_id + '" fila="' + temp_es_als.aen_id + '">';
                datos_alist += '<td>' + temp_es_als.aen_id + '</td>';
                datos_alist += '<td>' + temp_es_als.aen_venta + '</td>';
                datos_alist += '<td>' + temp_es_als.aen_guia_op + '</td>';
                datos_alist += '<td>' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                datos_alist += '<td>' + timeString + '</td>';
                datos_alist += '<td>' + temp_es_als.esae_desc + '</td>';
                datos_alist += '<td>' + temp_es_als.ope_nombre + '</td>';
                datos_alist += '<td>' + temp_es_als.cli_nombre + '</td>';
                if (temp_es_als.suc_nombre == null) {
                    datos_alist += '<td></td>';
                } else {
                    datos_alist += '<td>' + temp_es_als.suc_nombre + '</td>';
                }
                datos_alist += '<td>' + temp_es_als.te_desc + '</td>';
                datos_alist += '<td>' + temp_es_als.exae_novedad + '</td></tr>';
            }
            datos_alist += "</tbody></table></div></div></div>";


            $("#tab_est_alist").html(datos_alist);
            /**
             * Evento que pagina una tabla 
             */
            var table = $('#tableEstadoAlist').DataTable({
                'order': [[1, 'asc']],
                'scrollX': true
            });

        } else {
            $("#tab_est_alist").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga la tabla de envios segun el estado y un rango de fechas 
 * dashboard cliente alistamiento
 * @param {type} fech_ini
 * @param {type} fech_fin
 * @param {type} est_env
 * @returns {consulta_tabla_env_x_est_fech_cl}
 */
function consulta_tabla_aenv_x_est_fech_cl(fech_ini, fech_fin, est_env) {
    request = "Controller/ClienteC/cons_ult_est_id_aenv_cl_controller.php";
    cadena = {"fech_ini": fech_ini, "fech_fin": fech_fin, "est_env": est_env}; //envio de parametros por POST
    metodo = function (datos) {
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arreglo_alist = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_alist !== 0) {
            temp_es_als = arreglo_alist[0];
            var colorTab;
            var colorText;
            var colorAl;
            if (est_env == 3) {
                colorTab = 'class="table-success"';
                colorText = 'text-success';
                colorAl = 'success';
            } else if (est_env == 4) {
                colorTab = 'class="table-danger"';
                colorText = 'text-danger';
                colorAl = 'danger';
            }
            datos_alist = '<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">\n\
                            <div class="toast-header">\n\
                            <strong class="mr-auto" id="title_env_est">ENVIOS ' + temp_es_als.esae_desc + '</strong>\n\
                            </div>\n\
                            <div class="toast-body">\n\
                            <div class="table-responsive text-nowrap col-lg-12" id="tbInfoEstEnv">\n\
                            <table class="table table-striped table-sm table-bordered" id="tableEstadoAlist">\n\
                            <thead><tr ' + colorTab + '>\n\
                                <th scope="col">N°</th>\n\
                                <th scope="col">VENTA</th>\n\
                                <th scope="col">GUIA OP</th>\n\
                                <th scope="col">FECHA</th>\n\
                                <th scope="col">HORA</th>\n\
                                <th scope="col">ESTADO</th>\n\
                                <th scope="col">OPERADOR</th>\n\
                                <th scope="col">CLIENTE</th>\n\
                                <th scope="col">SUCURSAL</th>\n\
                                <th scope="col">T. ENVIO</th>\n\
                                <th scope="col">OBSERVACIONES</th>\n\
                                </tr></thead><tbody>';

            for (i = 0; i < arreglo_alist.length; i++) {
                temp_es_als = arreglo_alist[i];

                var fecha_hora = new Date(temp_es_als.exae_fecha_hora);
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                };
                var timeString = fecha_hora.toLocaleString('en-US', options);
                fe = new Date(temp_es_als.exae_fecha_hora.replace(/-/g, '\/'));

                datos_alist += '<tr class="table-sm EnvFil" id="fila_env' + temp_es_als.aen_id + '" fila="' + temp_es_als.aen_id + '">';
                datos_alist += '<td>' + temp_es_als.aen_id + '</td>';
                datos_alist += '<td>' + temp_es_als.aen_venta + '</td>';
                datos_alist += '<td>' + temp_es_als.aen_guia_op + '</td>';
                datos_alist += '<td>' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                datos_alist += '<td>' + timeString + '</td>';
                datos_alist += '<td>' + temp_es_als.esae_desc + '</td>';
                datos_alist += '<td>' + temp_es_als.ope_nombre + '</td>';
                datos_alist += '<td>' + temp_es_als.cli_nombre + '</td>';
                if (temp_es_als.suc_nombre == null) {
                    datos_alist += '<td></td>';
                } else {
                    datos_alist += '<td>' + temp_es_als.suc_nombre + '</td>';
                }
                datos_alist += '<td>' + temp_es_als.te_desc + '</td>';
                datos_alist += '<td>' + temp_es_als.exae_novedad + '</td></tr>';
            }
            datos_alist += "</tbody></table></div></div></div>";


            $("#tab_est_alist").html(datos_alist);
            /**
             * Evento que pagina una tabla 
             */
            var table = $('#tableEstadoAlist').DataTable({
                'order': [[1, 'asc']],
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
 * Funcion que carga las acciones en los card alistamiento
 * @returns {undefined}
 */
function consulta_dashboard_alist_card_cl() {
    request = "Controller/AdminC/AdministrarEnvios/consulta_ult_est_aenvio_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        alst_picking = 0;
        alst_packing = 0;
        arregloEstAlsCard = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEstAlsCard !== 0) {

            for (i = 0; i < arregloEstAlsCard.length; i++) {
                tmp = arregloEstAlsCard[i];
                if (tmp.esae_id == 1) {
                    alst_picking++;
                } else if (tmp.esae_id == 2) {
                    alst_packing++;
                }
            }
            control_dash_alist();
        } else {
            $("#tableEstOS").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
        clickPanelDashAlist();
    };
    f_ajax(request, cadena, metodo);
}
var id_cliente_sel = "0|0";
var id_sucursal_sel = "0";
/**
 * Metodo que retorna los datos a combo sucursales por cliente seleccionado
 * @returns {undefined}
 */
function combo_sucursal_x_cli_dos() {
    request = "Controller/AdminC/AdministrarSucursal/consulta_suc_x_cli_controller.php";
    cadena = "selectCliente=" + id_cliente_sel; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_suc_cli = $.parseJSON(datos);
        datouscombo = "";
        if (arreglo_suc_cli == "") {
            datouscombo += '<option value="0"></option>';
        } else {
            datouscombo += '<option value="0">Seleccione..</option>';
            for (i = 0; i < arreglo_suc_cli.length; i++) {
                temp = arreglo_suc_cli[i];
                datouscombo += '<option value="' + temp.suc_num_id + '">' + temp.suc_nombre + "</option>";
            }
        }

        $("#selectSuc_x_Cli").html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga el dashboard principal de envios
 * @returns {undefined}
 */
function vista_dashboard_envios() {
    request = "View/AdministradorV/Dashboard/dashboardEnvios.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
//        exist = false;
        $("#list-formCliente").html("");
        $("#list-formCliente").html(datos);
        consulta_dashboard_envios_card();
        combo_clientes();


        $("#selectCliente").change(function () {
            id_sucursal_sel = "0";
            id_cliente_sel = $("#selectCliente").val();
            combo_sucursal_x_cli_dos();
        });

        $("#selectSuc_x_Cli").change(function () {
            id_sucursal_sel = $("#selectSuc_x_Cli").val();
        });

        $("#btnVer").click(function () {
            consulta_dashboard_envios_card_cli(id_cliente_sel, id_sucursal_sel);
            if ($('#selectCliente option:selected').val() == '0|0') {
                $("#lbCli").html("");
            } else {
                $("#lbCli").html($('#selectCliente option:selected').text());
                if($('#selectSuc_x_Cli option:selected').val() == '0'){
                    $("#lbSuc").html("");
                }else{
                    $("#lbSuc").html(' /SUC: '+$('#selectSuc_x_Cli option:selected').text());
                }
            }

        });
//        consulta_dashboard_serv();
//        setInterval(consulta_os_program, 20000);
    };
    f_ajax(request, cadena, metodo);
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
}

/**
 * Funcion que carga las acciones en los card
 * @returns {undefined}
 */
function consulta_dashboard_envios_card() {
    request = "Controller/AdminC/AdministrarEnvios/consulta_ult_est_envio_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
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
            clickPanelDash();
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
function clickPanelDash() {
//    $("#tableCiudad").on("click", ".actualiza", function () {
    $(".est_envio").click(function () {
        estado_id = $(this).attr("elem");
//        alert(estado_id);
        consulta_tabla_env_x_est(id_cliente_sel, id_sucursal_sel, estado_id);
//        $("#btnGuardaCiu").removeClass("btn-primary");
//        $("#btnGuardaCiu").addClass("btn-warning");
//        $("#btnGuardaCiu").html("Actualizar");
//        tm = arregloCiudad[actualizar];
//        $("#inpCodCiudad").val(tm.ciu_id);
//        $("#inpNomCiudad").val(tm.ciu_nombre);
//        $('#selectDepto option[value="' + tm.dep_id + '"]').attr('selected', true);
//
        //En esta linea me redirije al formulario con una velocodad establecida
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#tbInfoEstEnv").offset().top
        }, 300);
    });
}
var arreglo_env;
/**
 * Metodo que carga la tabla de envios segun el estado
 * @param {type} cliente_id
 * @param {type} sucursal_id
 * @param {type} id_est
 * @returns {consulta_tabla_env_x_est}
 */
function consulta_tabla_env_x_est(cliente_id, sucursal_id, id_est) {
    request = "Controller/AdminC/AdministrarEnvios/consulta_ult_est_id_est_controller.php";
    cadena = {"cliente_id": cliente_id, "sucursal_id": sucursal_id, "id_est_env": id_est}; //envio de parametros por POST
    metodo = function (datos) {
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arreglo_env = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_env !== 0) {
            temp_es = arreglo_env[0];
            var colorTab;
            var colorText;
            var colorAl;
            if (id_est == 1) {
                colorTab = 'style="background-color: #fbd797; color: #7c550f;"';
                colorText = 'text-warning';
                colorAl = 'warning';
            } else if (id_est == 2) {
                colorTab = 'class="table-warning"';
                colorText = 'text-warning';
                colorAl = 'warning';
            } else if (id_est == 3) {
                colorTab = 'class="table-info"';
                colorText = 'text-info';
                colorAl = 'info';
            } else if (id_est == 4) {
                colorTab = 'class="table-warning"';
                colorText = 'text-warning';
                colorAl = 'warning';
            } else if (id_est == 5) {
                colorTab = 'class="table-success"';
                colorText = 'text-success';
                colorAl = 'success';
            } else if (id_est == 8) {
                colorTab = 'class="bg-warning"';
                colorText = 'text-warning';
                colorAl = 'warning';
            } else if (id_est == 9) {
                colorTab = 'class="table-danger"';
                colorText = 'text-danger';
                colorAl = 'danger';
            } else if (id_est == 10) {
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
                                <th scope="col"></th>\n\
                                <th scope="col"></th>\n\
                                <th scope="col">GUIA LOGI</th>\n\
                                <th scope="col">GUIA OP</th>\n\
                                <th scope="col">FECHA</th>\n\
                                <th scope="col">HORA</th>\n\
                                <th scope="col">ESTADO</th>\n\
                                <th scope="col">CLIENTE</th>\n\
                                <th scope="col">SUCURSAL</th>\n\
                                <th scope="col">MENSAJERO</th>\n\
                                <th scope="col">SERVICIO</th>\n\
                                <th scope="col">T. ENVIO</th>\n\
                                <th scope="col">NOMBRE</th>\n\
                                <th scope="col">DIRECCION</th>\n\
                                <th scope="col">TELEFONO</th>\n\
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
                datos_env += '<td id="' + i + '"></td>';
                datos_env += '<td class="enlace editEnvio" editEstEnv="' + temp.exe_en_id + '"><span class="ion-android-attach ' + colorText + '"></span></td>';
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
                datos_env += '<td>' + temp.emp_nombre + '</td>';
                if (temp.ts_id == 1) {
                    datos_env += '<td class="table-primary">' + temp.ts_desc + '</td>';
                } else {
                    datos_env += '<td>' + temp.ts_desc + '</td>';
                }
                datos_env += '<td>' + temp.te_desc + '</td>';
                datos_env += '<td>' + temp.en_nombre + '</td>';
                datos_env += '<td>' + temp.en_direccion + '</td>';
                datos_env += '<td>' + temp.en_telefono + '</td>';
                datos_env += '<td>' + temp.exe_novedad + '</td></tr>';
            }
            datos_env += "</tbody></table></div></div></div>";
            datos_env += '<div class="toast show border-warning col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">\n\
                              <div class="toast-header"><strong class="mr-auto">Asignación de Estados</strong></div>\n\
                                <form class="form-inline" id="formAsigEstEnvDash" name="formAsigEstEnvDash">\n\
                                      <div class="form-group mb-2">\n\
                                        <label class="col-form-label" for="selectEstadEnvio"><b>Estado</b></label>\n\
                                        <select class="form-control form-control-sm" id="selectEstadEnvio" name="selectEstadEnvio">\n\
                                        </select>\n\
                                      </div>\n\
                                      <div class="form-group mx-sm-3 mb-6">\n\
                                        <label class="col-form-label" for="selectMensajero"><b>Mensajero</b></label>\n\
                                        <select class="form-control form-control-sm" id="selectMensajero" name="selectMensajero">\n\
                                        </select>\n\
                                      </div>\n\
                                      <div class="form-group mx-sm-3 mb-6">\n\
                                        <label for="areaNovedad" class="col-form-label"><b>Novedad</b></label>\n\
                                        <textarea class="form-control form-control-sm" id="areaNovedad" name="areaNovedad" rows="1"></textarea>\n\
                                      </div>\n\
                                      <button type="button" class="btn btn-outline-warning btn-sm" id="btnGuardaEstSelected" name="btnGuardaEstSelected">GUARDAR EST</button>\n\
                                </form></div>';

            $("#tab_est_env").html(datos_env);
            /**
             * Evento que pagina una tabla 
             */
            var table = $('#tableEstadoEnv').DataTable({
                orderCellsTop: true,
                fixedHeader: true,
                'columnDefs': [
                    {
                        'targets': 0,
                        'checkboxes': {
                            'selectRow': true
                        }
                    }
                ],
                'select': {
                    'style': 'multi'
                },
                'order': [[1, 'asc']],
                'scrollX': true
            });
//            clickAdd_env_mensajero();
//            clickElim_fila();
            clickEdit_est_Env(colorAl);
            combo_estado_envio("#selectEstadEnvio");
            combo_empleados("#selectMensajero");

            $("#btnGuardaEstSelected").click(function () {

//                alert($("#selectEstadEnvio").val());
                if ($("#selectEstadEnvio").val() == "0" || $("#selectMensajero").val() == "0|0") {
                    alertify.alert('Debe seleccionar un estado y un Mensajero').setHeader('<em> Cuidado! </em> ');
                } else {
                    envios_Selected_Est_dash();
                    limpiarFormulario("#formAsigEstEnvDash");
                }
                consulta_dashboard_envios_card();
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
 * Metodo que determina los check seleccionados para asignacion de estados 
 * @returns {undefined}
 */
function envios_Selected_Est_dash() {
    $("input:checkbox:checked").each(function () {

        checket_envio = $(this).parent().attr('id');//numeo de venta
//
        if (typeof (checket_envio) === 'undefined') {

        } else {
//            comprobar_os_creada(checket_venta);
//            alert(checket_envio);
            temp_env = arreglo_env[checket_envio];

            guiaLogi = temp_env.exe_en_id;
            estadoID = $("#selectEstadEnvio").val();
            mensajero = $("#selectMensajero").val();
            novedadValor = $("#areaNovedad").val();
            insert_estado_envio_dash(mensajero, guiaLogi, estadoID, novedadValor);
        }

    });
}

/**
 * Metodo que inserta un estado en tabla estados x envio
 * desde la vista dashboard
 * @param {type} selectMensajero
 * @param {type} inputNumEnvi
 * @param {type} selectEstado
 * @param {type} txaNovedadEstado
 * @returns {undefined}
 */
function insert_estado_envio_dash(selectMensajero, inputNumEnvi, selectEstado, txaNovedadEstado) {
    request = "Controller/AdminC/AdministrarEnvios/insertar_estado_envio_controller.php";
    cadena = {"selectMensajero": selectMensajero, "inputNumEnvi": inputNumEnvi, "selectEstado": selectEstado, "txaNovedadEstado": txaNovedadEstado}; //envio de parametros por POST
    metodo = function (datos) {

        if (datos == 1) {
            consulta_tabla_env_x_est(id_cliente_sel, id_sucursal_sel, estado_id);
            consulta_dashboard_envios_card();
        } else {
            alert(datos);
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga el modal con formulario para seleccion de producto en alistamiento 
 * @param {type} color
 * @returns {undefined}
 */
function clickEdit_est_Env(color) {
    $("#tableEstadoEnv").on("click", ".editEnvio", function () {
//    $(".gesEnvio").click(function () {
        edit_est_envio = $(this).attr("editEstEnv");

        viasta_envio_modal_dash(edit_est_envio);
//        alert(ges_envio);

        $('#mod-dalog').removeClass('modal-lg');
        $('#ModalActuEstOS').modal('toggle');
        $('#ModalEstOSTitle').html('ENVIO');
        $('#body_mod_os').html('<div class="alert alert-dismissible alert-' + color + '">\n\
                    <div class="row">\n\
                        <div class="col-6"><strong>N° ENVIO: <b class="text-primary" id="numEnvio"></b></strong></div>\n\
                        <div class="col-6"><strong>N° GUIA OP: <b class="text-success" id="numGuiaOP"></b></strong></div>\n\
                        <div class="col-6"><strong>ESTADO: <b id="estEnvio"></b></strong></div>\n\
                        <div class="col-6"><strong>MENSAJERO: <b id="nomMensajero"></b></strong></div>\n\
                        <div class="col-12"><strong>OBSERVACIÓN: <b class="text-dark" id="observ"></b></strong></div>\n\
                    </div>\n\
            <form class="mt-3" id="formModalEnvEst" name="formModalEnvEst">\n\
              <div class="form-row">\n\
                <div class="form-group input-group col-md-12">\n\
                  <div class="input-group">\n\
                  <input type="text" class="form-control" id="inputNumEnvi" name="inputNumEnvi" style="display: none;">\n\
                  <input type="text" class="form-control" id="inputEst_x_env" name="inputEst_x_env" style="display: none;">\n\
                  <input type="datetime" class="form-control" id="inputFechaEstEnv" name="inputFechaEstEnv" style="display: none;">\n\
                </div>\n\
                </div>\n\
              </div>\n\
              <div class="form-row">\n\
                <div class="form-group input-group col-md-7">\n\
                  <label for="inputDirecDestin">Mensajero</label>\n\
                  <div class="input-group">\n\
                    <select class="form-control form-control-sm" id="selectMens" name="selectMens"></select>\n\
                </div>\n\
                </div>\n\
                <div class="form-group col-md-5">\n\
                  <label for="inputTelDestin">Estado</label>\n\
                  <select class="form-control form-control-sm" id="selectEst" name="selectEst"></select>\n\
                </div>\n\
              </div>\n\
              <div class="form-row">\n\
                <div class="form-group col-md-12">\n\
                  <label for="inputPesoEnv">Observación</label>\n\
                  <textarea class="form-control form-control-sm" id="txaNovedadEst" name="txaNovedadEst" rows="2"></textarea>\n\
                </div>\n\
              </div>\n\
              <button type="submit" class="btn btn-success" id="btnGuarNuevEst" name="btnGuarNuevEst">Guardar</button>\n\
              <button type="button" class="btn btn-dark float-right" id="btnCancelEst" name="btnCancelEst">Cancelar</button>\n\
            </form>\n\
            <div id="enlaceGuia"></div>');

        combo_empleados("#selectMens");
        combo_estado_envio("#selectEst");

        var mensajero_select;

        $("#selectMens").change(function () {
            mensajero_select = $("#selectMens").val();
//            alert(mensajero_select);
        });

        $("#btnGuarNuevEst").click(function () {
            validarEstEnvio_dash();

        });
//        $("#btnQuitarAsig").click(function () {
//            eliminar_env_asignado(id_est_asig, num_env_asig, fech_env_asig);
//        });
    });
}

/**
 * Metodo que retorna a la vista los datos de un envio especifico
 * @param {type} envio_id
 * @returns {undefined}
 */
function viasta_envio_modal_dash(envio_id) {
    request = "Controller/AdminC/AdministrarEnvios/consulta_estado_envio_controller.php";
    cadena = "id_env=" + envio_id; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        temp_env = arreglo[0];

//        alert(datos);

        $("#numEnvio").html(temp_env.exe_en_id);
        $("#numGuiaOP").html(temp_env.en_guia);
        $("#estEnvio").html(temp_env.ee_desc);
        $("#nomMensajero").html(temp_env.emp_nombre);
        $("#observ").html(temp_env.exe_novedad);
        $("#inputNumEnvi").val(temp_env.exe_en_id);
        $("#inputEst_x_env").val(temp_env.exe_ee_id);
        $("#inputFechaEstEnv").val(temp_env.exe_fec_hora);


    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que permite validar campos en formulario al actualizar estado de envios
 * @returns {undefined}
 */
function validarEstEnvio_dash() {
    $("#formModalEnvEst").validate({
        rules: {
            inputNumEnvi: {
                required: true
            },
            selectMensajero: {
                valueNotEquals: "0|0"
            },
            selectEstado: {
                valueNotEquals: "0"
            }
        },
        messages: {
            selectMensajero: {
                valueNotEquals: "Seleccione Mensajero!"
            },
            selectEstado: {
                valueNotEquals: "Seleccione Estado!"
            }
        },
        submitHandler: function (form) {
            insert_estado_envio();
        }
    });
}
/**
 * Metodo que inserta un estado en tabla estados x envio
 * @returns {undefined}
 */
function insert_estado_envio() {
    request = "Controller/AdminC/AdministrarEnvios/insertar_est_envio_modal_controller.php";
    cadena = $("#formModalEnvEst").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            limpiarFormulario("#formModalEnvEst");
            $('#ModalActuEstOS').modal('hide');
            consulta_dashboard_envios_card();
            $("#tab_est_env").html("");
            alertify.success('Estado actualizado!');
        } else {
            alert("Error al actualizar estado, por favor vuelva a dar click en el envio");
            limpiarFormulario("#formModalEnvEst");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Funcion que carga las acciones en los card segun cliente
 * @param {type} cliente_id
 * @param {type} sucursal_id
 * @returns {consulta_dashboard_envios_card_cli}
 */
function consulta_dashboard_envios_card_cli(cliente_id, sucursal_id) {
    request = "Controller/AdminC/AdministrarEnvios/consulta_ult_est_env_cli_controller.php";
    cadena = {"cliente_id": cliente_id, "sucursal_id": sucursal_id}; //envio de parametros por POST
    metodo = function (datos) {
        control_dash_envios_reset();
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
            clickPanelDash();
        } else {
            $("#tableEstOS").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

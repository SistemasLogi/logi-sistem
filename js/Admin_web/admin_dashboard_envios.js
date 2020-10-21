/**
 * Metodo que carga el dashboard principal de envios
 * @returns {undefined}
 */
function vista_dashboard_envios() {
    request = "View/AdministradorV/Dashboard/dashboardEnvios.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
//        exist = false;
        $("#list-formCliente").html(datos);
        consulta_dashboard_envios_card();
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
        consulta_tabla_env_x_est(estado_id);
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

/**
 * Metodo que carga la tabla de envios segun el estado
 * @param {type} id_est
 * @returns {consulta_tabla_env_x_est}
 */
function consulta_tabla_env_x_est(id_est) {
    request = "Controller/AdminC/AdministrarEnvios/consulta_ult_est_id_est_controller.php";
    cadena = "id_est_env=" + id_est; //envio de parametros por POST
    metodo = function (datos) {
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
                                <th scope="col">GUIA LOGI</th>\n\
                                <th scope="col">GUIA OP</th>\n\
                                <th scope="col">ESTADO</th>\n\
                                <th scope="col">MENSAJERO</th>\n\
                                <th scope="col">SERVICIO</th>\n\
                                <th scope="col">T. ENVIO</th>\n\
                                <th scope="col">DIRECCION</th>\n\
                                <th scope="col">OBSERVACIONES</th>\n\
                                </tr></thead><tbody>';

            for (i = 0; i < arreglo_env.length; i++) {
                temp = arreglo_env[i];

                datos_env += '<tr class="table-sm EnvFil" id="fila_env' + temp.exe_en_id + '" fila="' + temp.exe_en_id + '">';
                datos_env += '<td class="enlace editEnvio" editEstEnv="' + temp.exe_en_id + '"><span class="ion-android-attach ' + colorText + '"></span></td>';
                datos_env += '<td>' + temp.exe_en_id + '</td>';
                datos_env += '<td>' + temp.en_guia + '</td>';
                datos_env += '<td>' + temp.ee_desc + '</td>';
                datos_env += '<td>' + temp.emp_nombre + '</td>';
                datos_env += '<td>' + temp.ts_desc + '</td>';
                datos_env += '<td>' + temp.te_desc + '</td>';
                datos_env += '<td>' + temp.en_direccion + '</td>';
                datos_env += '<td>' + temp.exe_novedad + '</td></tr>';
            }
            datos_env += "</tbody></table></div></div></div>";
            $("#tab_est_env").html(datos_env);
            /**
             * Evento que pagina una tabla 
             */
            $('#tableEstadoEnv').DataTable({
                'scrollX': true
            });
//            clickAdd_env_mensajero();
//            clickElim_fila();
            clickEdit_est_Env(colorAl);
        } else {
            $("#tab_est_env").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga el modal con formulario para seleccion de producto en alistamiento 
 * @returns {undefined}
 */
function clickEdit_est_Env(color) {
    $("#tableEstadoEnv").on("click", ".editEnvio", function () {
//    $(".gesEnvio").click(function () {
        edit_est_envio = $(this).attr("editEstEnv");

        viasta_envio_modal_dash(edit_est_envio);
//        alert(ges_envio);
        combo_empleados("#selectMensajero");
        combo_estado_envio("#selectEstado");

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
                    <select class="form-control form-control-sm" id="selectMensajero" name="selectMensajero"></select>\n\
                </div>\n\
                </div>\n\
                <div class="form-group col-md-5">\n\
                  <label for="inputTelDestin">Estado</label>\n\
                  <select class="form-control form-control-sm" id="selectEstado" name="selectEstado"></select>\n\
                </div>\n\
              </div>\n\
              <div class="form-row">\n\
                <div class="form-group col-md-12">\n\
                  <label for="inputPesoEnv">Observación</label>\n\
                  <textarea class="form-control form-control-sm" id="txaNovedadEstado" name="txaNovedadEstado" rows="2"></textarea>\n\
                </div>\n\
              </div>\n\
              <button type="submit" class="btn btn-success" id="btnGuarNuevEst" name="btnGuarNuevEst">Guardar</button>\n\
              <button type="button" class="btn btn-dark float-right" id="btnCancelEst" name="btnCancelEst">Cancelar</button>\n\
            </form>\n\
            <div id="enlaceGuia"></div>');

        var mensajero_select;

        $("#selectMensajero").change(function () {
            mensajero_select = $("#selectMensajero").val();
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
 * Metodo que carga envio a mensajero
 * @returns {undefined}
 */
function clickAdd_env_mensajero() {
    $("#tableEnvProgram").on("click", ".addEnvio", function () {
//    $(".actuestos").click(function () {
        add_envio = $(this).attr("addEnv");

        if (mensajero === undefined || mensajero === '0|0') {
            alertify.alert('Debe seleccionar un mensajero').setHeader('<em> Cuidado! </em> ');
        } else {
            insertar_env_prog(add_envio, mensajero);
//        $('#ModalActuEstOS').modal('toggle');
            alertify.success('Envio Guia Logi N° ' + add_envio + ' cargado');
            //reset del campo de busqueda y despliegue de tabla
//            table_env_prog.search("").draw();
            consulta_tabla_env_programados();
            $("div#tableEnvProgram_filter input").val("");
        }
//        form_act_est_os(arreglo_env_prog, add_envio);
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
    request = "Controller/AdminC/AdministrarEnvios/insertar_estado_envio_controller.php";
    cadena = $("#formModalEnvEst").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            limpiarFormulario("#formModalEnvEst");
            $('#ModalActuEstOS').modal('hide');
        } else {
            alert("Error al actualizar estado, por favor vuelva a dar click en el envio");
            limpiarFormulario("#formModalEnvEst");
        }
    };
    f_ajax(request, cadena, metodo);
}

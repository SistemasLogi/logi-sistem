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
            if (id_est == 1) {
                colorTab = 'style="background-color: #fbd797; color: #7c550f;"';
                colorText = 'text-warning';
            } else if (id_est == 2) {
                colorTab = 'class="table-warning"';
                colorText = 'text-warning';
            } else if (id_est == 3) {
                colorTab = 'class="table-info"';
                colorText = 'text-info';
            } else if (id_est == 4) {
                colorTab = 'class="table-warning"';
                colorText = 'text-warning';
            } else if (id_est == 5) {
                colorTab = 'class="table-success"';
                colorText = 'text-success';
            } else if (id_est == 8) {
                colorTab = 'class="bg-warning"';
                colorText = 'text-warning';
            } else if (id_est == 9) {
                colorTab = 'class="table-danger"';
                colorText = 'text-danger';
            } else if (id_est == 10) {
                colorTab = 'class="bg-info"';
                colorText = 'text-info';
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
                datos_env += '<td>' + temp.en_direccion + '</td></tr>';
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
        } else {
            $("#tab_est_env").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

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
        consulta_dashboard_serv_card();
        consulta_dashboard_serv();
        setInterval(consulta_os_program, 20000);
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Funcion que carga las acciones en los card
 * @returns {undefined}
 */
function consulta_dashboard_serv_card() {
    request = "Controller/AdminC/AdministrarOS/consulta_ult_est_os_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        serv_program = 0;
        serv_asignado = 0;
        serv_exitoso = 0;
        serv_novedad = 0;
        serv_piking = 0;
        serv_paking = 0;
        arregloEstOScard = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEstOScard !== 0) {

            for (i = 0; i < arregloEstOScard.length; i++) {
                tmp = arregloEstOScard[i];

                if (tmp.es_id == 1) {
                    serv_program++;
                } else if (tmp.es_id == 2) {
                    serv_asignado++;
                } else if (tmp.es_id == 3) {
                    serv_exitoso++;
                } else if (tmp.es_id == 4) {
                    serv_novedad++;
                } else if (tmp.es_id == 5) {
                    serv_piking++;
                } else if (tmp.es_id == 6) {
                    serv_paking++;
                }
            }

            control_dash_serv();
            $("#cardRealizadas").click(function () {
                if (exist == true) {
                    consulta_dashb_serv_fil(3);
//                    exist = false;
                }
                tablaEst_x_OS
                        .column(3)
                        .search('')
                        .search('REALIZADA')
                        .draw();
                //En esta linea me redirije al formulario con una velocodad establecida
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#tablaEstadoOS").offset().top
                }, 900);
            });
            $("#cardAsignadas").click(function () {
                if (exist == true) {
                    consulta_dashb_serv_fil(2);
//                    exist = false;
                } else {
                    tablaEst_x_OS
                            .column(3)
                            .search('')
                            .search('ASIGNADA')
                            .draw();
                }

                //En esta linea me redirije al formulario con una velocodad establecida
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#tablaEstadoOS").offset().top
                }, 900);
            });
            $("#cardNovedad").click(function () {
                if (exist == true) {
                    consulta_dashb_serv_fil(4);
//                    exist = false;
                } else {
                    tablaEst_x_OS
                            .column(3)
                            .search('')
                            .search('CANCELADA')
                            .draw();
                }

                //En esta linea me redirije al formulario con una velocodad establecida
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#tablaEstadoOS").offset().top
                }, 900);
            });
            $("#cardProgramadas").click(function () {
                if (exist == true) {
                    consulta_dashb_serv_fil(1);
//                    exist = false;
                } else {
                    tablaEst_x_OS
                            .column(3)
                            .search('')
                            .search('PROGRAMADA')
                            .draw();
                }

                //En esta linea me redirije al formulario con una velocodad establecida
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#tablaEstadoOS").offset().top
                }, 900);
            });
//            $("#cardProgramadas").click(function () {
//                $('#MyModalCenter').modal('toggle');
//            });

        } else {
            $("#tableEstOS").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}
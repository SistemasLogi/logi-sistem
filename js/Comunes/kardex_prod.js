var kdx_pro;
/**
 * Metodo que carga a la vista la tabla con el stock actualizado de los productos de una sucursal
 * @returns {undefined}
 */
function tabla_stock_suc() {
    sucursal_id = $("#inputSucId").val();
    request = "Controller/AdminC/AdministrarProd/consulta_stock_inv_suc_controller.php";
    cadena = "suc=" + sucursal_id; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_stock_suc = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_stock_suc !== 0) {
            datos_stock_suc = '<div class="toast-header"><strong class="mr-auto">STOCK</strong><div id="btn_gif"><button type="button" class="btn btn-primary float-right btn-sm" id="btnReportStockXlsx" name="btnReportStockXlsx">Descargar Informe</button></div></div>\n\
                             <div class="toast-body row"><div class="alert alert-dismissible alert-light col-lg-12" style="border-radius: 0.5rem;">\n\
                             <h4>Tabla General de Stock</h4>\n\
                             <div class="col-lg-12 table-responsive" id="tabStockSuc">\n\
                             <table class="table table-striped table-sm table-bordered table-hover col-lg-12" id="tableStockSucursal">\n\
                             <thead><tr class="table-sm table-primary">\n\
                                 <th scope="col"></th>\n\
                                 <th scope="col">CODIGO</th>\n\
                                 <th scope="col">SKU</th>\n\
                                 <th scope="col">DESCRIPCIÓN</th>\n\
                                 <th scope="col">UB.</th>\n\
                                 <th scope="col">TOTAL</th>\n\
                             </tr></thead><tbody>';
            for (i = 0; i < arreglo_stock_suc.length; i++) {
                tmp = arreglo_stock_suc[i];

//                if (tmp.ts_id == 1) {
//                    color_serv = ' #593196;';
//                } else if (tmp.ts_id == 2) {
//                    color_serv = ' #18d26e;';
//                }
                if (tmp.total < 3) {
                    datos_stock_suc += '<tr class="table-sm" id="fila' + i + '" style="background-color: #ffcece;">';
                } else {
                    datos_stock_suc += '<tr class="table-sm" id="fila' + i + '">';
                }
                datos_stock_suc += '<td class="enlace"><span class="ion-clipboard geskardex" kardexPro="' + tmp.pro_cod + '" style="color: #702894; font-size: large;"></span></td>';
                datos_stock_suc += '<td>' + tmp.pro_cod + '</td>';
                datos_stock_suc += '<td>' + tmp.pro_sku + '</td>';
                datos_stock_suc += '<td>' + tmp.pro_desc + '</td>';
                datos_stock_suc += '<td id="ub' + tmp.pro_cod + '">' + tmp.pro_ubicacion + '</td>';
                if (tmp.total < 3) {
                    datos_stock_suc += '<td><b style="color: #e40a0a;" id="el' + tmp.pro_cod + '">' + tmp.total + '</b></td></tr>';
                } else {
                    datos_stock_suc += '<td id="el' + tmp.pro_cod + '">' + tmp.total + '</td></tr>';
                }
            }
            datos_stock_suc += "</tbody></table></div></div></div>";
            $("#contenidoInvent").html(datos_stock_suc);

//            /**
//             * Evento que pagina una tabla 
//             */
            $('#tableStockSucursal').DataTable();
            /**
             * evento de click para llamada de kardex
             */
            $("#tableStockSucursal").on("click", ".geskardex", function () {

                kdx_pro = $(this).attr("kardexPro");

                $('#ModalActuEstOS').modal('toggle');
                $('#mod-dalog').addClass('modal-lg');
                $('#ModalEstOSTitle').html('Kardex');
                total_stk = $("#el" + kdx_pro).html();
                ub_prod = $("#ub" + kdx_pro).html();

                tabla_kardex_prod(kdx_pro);
            });

            $("#btnReportStockXlsx").click(function () {
                reporte_sock_Xls(sucursal_id);
            });

        } else {
            $("#contenidoInvent").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }

    };
    f_ajax(request, cadena, metodo);
}
var total_stk;
var ub_prod;

/**
 * Metodo que carga a la vista la tabla de la tarjeta kardex para el producto seleccionado
 * @param {type} cod_prod
 * @returns {undefined}
 */
function tabla_kardex_prod(cod_prod) {
    request = "Controller/AdminC/AdministrarProd/consulta_kardex_prod_controller.php";
    cadena = "procod=" + cod_prod; //envio de parametros por POST
    metodo = function (datos) {
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arreglo_kdx_pro = $.parseJSON(datos);
        tmp_inf = arreglo_kdx_pro[0];

        datos_kdx = '<div class="toast-body row"><div class="alert alert-dismissible alert-light col-lg-12 border-primary" style="border-radius: 0.5rem;">\n\
                             <div class="table-responsive text-nowrap col-lg-12">\n\
                             <table class="table table-striped table-sm table-bordered text-center col-lg-12" id="tableKardex">\n\
                             <thead><tr class="table-primary">\n\
                                 <th scope="col" colspan="5"><h5>' + tmp_inf.pro_desc + '</h5></th>\n\
                                 </tr>\n\
                            <tr>\n\
                                <th scope="col" colspan="2" class="table-primary">Codigo</th>\n\
                                <th scope="col" class="table-secondary">' + tmp_inf.pro_cod + '</th>\n\
                                <th scope="col" class="table-primary">Ubicación</th>\n\
                                <th scope="col" class="table-secondary">' + ub_prod + '</th>\n\
                            </tr>\n\
                            <tr>\n\
                                <th scope="col" colspan="2" class="table-primary">SKU</th>\n\
                                <th scope="col" class="table-secondary">' + tmp_inf.pro_sku + '</th>\n\
                                <th scope="col" class="table-primary">Existencia</th>\n\
                                <th scope="col" class="table-secondary">' + total_stk + '</th>\n\
                            </tr>\n\
                            <tr class="table-primary">\n\
                                <th scope="col">Fecha</th>\n\
                                <th scope="col">Hora</th>\n\
                                <th scope="col">Detalle/N° Venta</th>\n\
                                <th scope="col">Entradas</th>\n\
                                <th scope="col">Salidas</th>\n\
                            </tr>\n\
                            </thead><tbody>';
        for (i = 0; i < arreglo_kdx_pro.length; i++) {
            tmp = arreglo_kdx_pro[i];

            var fecha_hora = new Date(tmp.ent_fecha);
            var options = {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            var timeString = fecha_hora.toLocaleString('en-US', options);
            fe = new Date(tmp.ent_fecha.replace(/-/g, '\/'));

            datos_kdx += '<tr id="fila' + i + '">';
            datos_kdx += '<th scope="row" class="table-secondary">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</th>';
            datos_kdx += '<th scope="row" class="table-secondary">' + timeString + '</th>';
            datos_kdx += '<td>' + tmp.venta + '</td>';

            if (tmp.movimiento == 1) {
                datos_kdx += '<td class="table-success">' + tmp.ent_cantidad + '</td>';
                datos_kdx += '<td class="table-danger"></td></tr>';
            } else if (tmp.movimiento == 2) {
                datos_kdx += '<td class="table-success"></td>';
                datos_kdx += '<td class="table-danger">' + tmp.ent_cantidad + '</td></tr>';
            }
        }
        datos_kdx += '</tbody></table></div></div></div>\n\
                        <form class="form-inline" id="formFechSelected" name="formFechSelected">\n\
                            <input type="text" class="form-control" id="inputCodProd" name="inputCodProd" style="display: none;">\n\
                            <input type="text" class="form-control" id="inputExistencia" name="inputExistencia" style="display: none;">\n\
                            <input type="text" class="form-control" id="inputUbicacion" name="inputUbicacion" style="display: none;">\n\
                          <div class="input-group mb-2 mr-sm-2">\n\
                            <div class="input-group-prepend">\n\
                              <div class="input-group-text">Inicial</div>\n\
                            </div>\n\
                            <input type="date" class="form-control" id="inputFechInicial" name="inputFechInicial">\n\
                          </div>\n\
                          <div class="input-group mb-2 mr-sm-2">\n\
                            <div class="input-group-prepend">\n\
                              <div class="input-group-text">Final</div>\n\
                            </div>\n\
                            <input type="date" class="form-control" id="inputFechFinal" name="inputFechFinal">\n\
                          </div>\n\
                        <button type="submit" class="btn btn-primary float-right btn-sm" id="btnReportKardexXlsx" name="btnReportKardexXlsx">Descargar Tarjeta Kardex <span class="ion-document-text"></span></button>\n\
                    </form><div id="mensaje"></div>';
        $('#body_mod_os').html(datos_kdx);

        $("#inputCodProd").val(tmp_inf.pro_cod);
        $("#inputExistencia").val(total_stk);
        $("#inputUbicacion").val(ub_prod);

//            /**
//             * Evento que pagina una tabla 
//             */
        $('#tableKardex').DataTable({
//            "order": [[0, 'desc'], [1, 'desc']]
            "order": []
        });


        $("#btnReportKardexXlsx").click(function () {
            validarGeneracionReporte();
        });

    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que carga a la vista la tabla con el stock actualizado de los productos de una sucursal
 * en la vista cliente
 * @param {type} sucursal_id
 * @returns {tabla_stock_suc_cli}
 */
function tabla_stock_suc_cli(sucursal_id) {
    request = "Controller/AdminC/AdministrarProd/consulta_stock_inv_suc_controller.php";
    cadena = "suc=" + sucursal_id; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_stock_suc = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_stock_suc !== 0) {
            datos_stock_suc = '<div class="toast-header"><strong class="mr-auto">STOCK</strong><div id="btn_gif"><button type="button" class="btn btn-primary float-right btn-sm" id="btnReportStockXlsx" name="btnReportStockXlsx">Descargar Informe</button></div></div>\n\
                             <div class="toast-body row"><div class="alert alert-dismissible alert-light col-lg-12" style="border-radius: 0.5rem;">\n\
                             <h4>Tabla General de Stock</h4>\n\
                             <div class="col-lg-12 table-responsive" id="tabStockSuc">\n\
                             <table class="table table-striped table-sm table-bordered table-hover col-lg-12" id="tableStockSucursal">\n\
                             <thead><tr class="table-sm table-primary">\n\
                                 <th scope="col"></th>\n\
                                 <th scope="col">CODIGO</th>\n\
                                 <th scope="col">SKU</th>\n\
                                 <th scope="col">DESCRIPCIÓN</th>\n\
                                 <th scope="col">UB.</th>\n\
                                 <th scope="col">TOTAL</th>\n\
                             </tr></thead><tbody>';
            for (i = 0; i < arreglo_stock_suc.length; i++) {
                tmp = arreglo_stock_suc[i];

//                if (tmp.ts_id == 1) {
//                    color_serv = ' #593196;';
//                } else if (tmp.ts_id == 2) {
//                    color_serv = ' #18d26e;';
//                }
                if (tmp.total < 3) {
                    datos_stock_suc += '<tr class="table-sm" id="fila' + i + '" style="background-color: #ffcece;">';
                } else {
                    datos_stock_suc += '<tr class="table-sm" id="fila' + i + '">';
                }
                datos_stock_suc += '<td class="enlace"><span class="ion-clipboard geskardex" kardexPro="' + tmp.pro_cod + '" style="color: #702894; font-size: large;"></span></td>';
                datos_stock_suc += '<td>' + tmp.pro_cod + '</td>';
                datos_stock_suc += '<td>' + tmp.pro_sku + '</td>';
                datos_stock_suc += '<td>' + tmp.pro_desc + '</td>';
                datos_stock_suc += '<td id="ub' + tmp.pro_cod + '">' + tmp.pro_ubicacion + '</td>';
                if (tmp.total < 3) {
                    datos_stock_suc += '<td><b style="color: #e40a0a;" id="el' + tmp.pro_cod + '">' + tmp.total + '</b></td></tr>';
                } else {
                    datos_stock_suc += '<td id="el' + tmp.pro_cod + '">' + tmp.total + '</td></tr>';
                }
            }
            datos_stock_suc += "</tbody></table></div></div></div>";
            $("#contenidoInvent").html(datos_stock_suc);

//            /**
//             * Evento que pagina una tabla 
//             */
            $('#tableStockSucursal').DataTable();
            /**
             * evento de click para llamada de kardex
             */
            $("#tableStockSucursal").on("click", ".geskardex", function () {

                kdx_pro = $(this).attr("kardexPro");

                $('#ModalActuEstOS').modal('toggle');
                $('#mod-dalog').addClass('modal-lg');
                $('#ModalEstOSTitle').html('Kardex');
                total_stk = $("#el" + kdx_pro).html();
                ub_prod = $("#ub" + kdx_pro).html();

                tabla_kardex_prod(kdx_pro);
            });

            $("#btnReportStockXlsx").click(function () {
                reporte_sock_Xls(sucursal_id);
            });

        } else {
            $("#contenidoInvent").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }

    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que carga a la vista la tabla con el stock actualizado de los productos de una sucursal
 * en la vista sucursal
 * @returns {tabla_stock_sucursal}
 */
function tabla_stock_sucursal() {
    request = "Controller/AdminC/AdministrarProd/consulta_stock_inv_suc_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_stock_suc = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_stock_suc !== 0) {
            datos_stock_suc = '<div class="toast-header"><strong class="mr-auto">STOCK</strong><div id="btn_gif"><button type="button" class="btn btn-primary float-right btn-sm" id="btnReportStockXlsx" name="btnReportStockXlsx">Descargar Informe</button></div></div>\n\
                             <div class="toast-body row"><div class="alert alert-dismissible alert-light col-lg-12" style="border-radius: 0.5rem;">\n\
                             <h4>Tabla General de Stock</h4>\n\
                             <div class="col-lg-12 table-responsive" id="tabStockSuc">\n\
                             <table class="table table-striped table-sm table-bordered table-hover col-lg-12" id="tableStockSucursal">\n\
                             <thead><tr class="table-sm table-primary">\n\
                                 <th scope="col"></th>\n\
                                 <th scope="col">CODIGO</th>\n\
                                 <th scope="col">SKU</th>\n\
                                 <th scope="col">DESCRIPCIÓN</th>\n\
                                 <th scope="col">UB.</th>\n\
                                 <th scope="col">TOTAL</th>\n\
                             </tr></thead><tbody>';
            for (i = 0; i < arreglo_stock_suc.length; i++) {
                tmp = arreglo_stock_suc[i];

//                if (tmp.ts_id == 1) {
//                    color_serv = ' #593196;';
//                } else if (tmp.ts_id == 2) {
//                    color_serv = ' #18d26e;';
//                }
                if (tmp.total < 3) {
                    datos_stock_suc += '<tr class="table-sm" id="fila' + i + '" style="background-color: #ffcece;">';
                } else {
                    datos_stock_suc += '<tr class="table-sm" id="fila' + i + '">';
                }
                datos_stock_suc += '<td class="enlace"><span class="ion-clipboard geskardex" kardexPro="' + tmp.pro_cod + '" style="color: #702894; font-size: large;"></span></td>';
                datos_stock_suc += '<td>' + tmp.pro_cod + '</td>';
                datos_stock_suc += '<td>' + tmp.pro_sku + '</td>';
                datos_stock_suc += '<td>' + tmp.pro_desc + '</td>';
                datos_stock_suc += '<td id="ub' + tmp.pro_cod + '">' + tmp.pro_ubicacion + '</td>';
                if (tmp.total < 3) {
                    datos_stock_suc += '<td><b style="color: #e40a0a;" id="el' + tmp.pro_cod + '">' + tmp.total + '</b></td></tr>';
                } else {
                    datos_stock_suc += '<td id="el' + tmp.pro_cod + '">' + tmp.total + '</td></tr>';
                }
            }
            datos_stock_suc += "</tbody></table></div></div></div>";
            $("#contenidoInvent").html(datos_stock_suc);

//            /**
//             * Evento que pagina una tabla 
//             */
            $('#tableStockSucursal').DataTable();
            /**
             * evento de click para llamada de kardex
             */
            $("#tableStockSucursal").on("click", ".geskardex", function () {

                kdx_pro = $(this).attr("kardexPro");

                $('#ModalActuEstOS').modal('toggle');
                $('#mod-dalog').addClass('modal-lg');
                $('#ModalEstOSTitle').html('Kardex');
                total_stk = $("#el" + kdx_pro).html();
                ub_prod = $("#ub" + kdx_pro).html();

                tabla_kardex_prod(kdx_pro);
            });

            $("#btnReportStockXlsx").click(function () {
                reporte_sock_Xls("");
            });

        } else {
            $("#contenidoInvent").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }

    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que genera un reporte en excel .xlsx
 * segun cliente y sucursal seleccionados
 * @param {type} num_suc
 * @returns {reporte_sock_Xls}
 */
function reporte_sock_Xls(num_suc) {
//    alert(num_suc);
    request = "Controller/AdminC/AdministrarProd/reporte_stock_inv_suc_controller.php";
    cadena = "suc=" + num_suc; //envio de parametros por POST
    metodo = function (datos) {
        rutaXLS_guardado(datos);
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
function rutaXLS_guardado(clienteRuta) {
    if (clienteRuta == 1) {
        alertify.alert('Reporte no generado, error al generar el reporte').setHeader('<em> Cuidado! </em> ');
    } else {
        $(location).attr('href', 'Files/' + $.trim(clienteRuta) + '.xlsx');

        alertify.warning('Reporte Generado!!!');
    }

}
/**
 * Metodo que valida datos del formulario para generar tarjeta kardex
 * @returns {undefined}
 */
function validarGeneracionReporte() {
    $("#formFechSelected").validate({
        rules: {
            inputFechInicial: {
                required: true,
                date: true
            },
            inputFechFinal: {
                required: true,
                date: true
            }
        },
        submitHandler: function (form) {
            verificaFechas();
        }
    });
}
/**
 * Metodo que permite controlar que la fecha inicial sea menor a la final
 * @returns {undefined}
 */
function verificaFechas() {
    var fInicial = $("#inputFechInicial").val();
    var fFinal = $("#inputFechFinal").val();
    if (fInicial > fFinal) {
        $("#mensaje").html("La fecha inicial no puede ser mayor que la final");
    } else {
        reporte_kardex_Xlsx();
    }
}

/**
 * Metodo que genera un reporte en excel .xlsx
 * de tarjeta cardex de producto
 * @returns {reporte_sock_Xls}
 */
function reporte_kardex_Xlsx() {
//    alert(num_suc);
    request = "Controller/AdminC/AdministrarProd/reporte_kardex_prod_controller.php";
    cadena = $("#formFechSelected").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        rutaXLS_stock_guardado(datos);
        $('#ModalActuEstOS').modal('hide');
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
function rutaXLS_stock_guardado(clienteRuta) {
    if (clienteRuta == 1) {
        alertify.alert('Reporte no generado, error al generar el reporte').setHeader('<em> Cuidado! </em> ');
    } else {
        $(location).attr('href', 'Files/' + $.trim(clienteRuta) + '.xlsx');

        alertify.warning('Reporte Generado!!!');
    }

}
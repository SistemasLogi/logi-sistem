
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
            datos_stock_suc = '<div class="toast-header"><strong class="mr-auto">STOCK</strong></div>\n\
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
 * Metodo que carga a la vista la tabla la tarjeta kardex para el producto seleccionado
 * @param {type} cod_prod
 * @returns {undefined}
 */
function tabla_kardex_prod(cod_prod) {
    request = "Controller/AdminC/AdministrarProd/consulta_kardex_prod_controller.php";
    cadena = "procod=" + cod_prod; //envio de parametros por POST
    metodo = function (datos) {

        arreglo_kdx_pro = $.parseJSON(datos);
        tmp_inf = arreglo_kdx_pro[0];

        datos_kdx = '<div class="toast-header"><strong class="mr-auto">KARDEX</strong></div>\n\
                             <div class="toast-body row"><div class="alert alert-dismissible alert-light col-lg-12 border-primary" style="border-radius: 0.5rem;">\n\
                             <div class="col-lg-12 table-responsive">\n\
                             <table class="table table-bordered table-hover text-center col-lg-12" id="tableKardex">\n\
                             <thead><tr class="table-sm table-primary">\n\
                                 <th scope="col" colspan="5"><h5>' + tmp_inf.pro_desc + '</h5></th>\n\
                                 </tr>\n\
                            <tr class="table-sm">\n\
                                <th scope="col" class="table-primary">Codigo</th>\n\
                                <th scope="col" class="table-secondary">' + tmp_inf.pro_cod + '</th>\n\
                                <th scope="col" class="table-primary">Ubicación</th>\n\
                                <th scope="col" class="table-secondary">' + ub_prod + '</th>\n\
                            </tr>\n\
                            <tr class="table-sm">\n\
                                <th scope="col" class="table-primary">SKU</th>\n\
                                <th scope="col" class="table-secondary">' + tmp_inf.pro_sku + '</th>\n\
                                <th scope="col" class="table-primary">Existencia</th>\n\
                                <th scope="col" class="table-secondary">' + total_stk + '</th>\n\
                            </tr>\n\
                            <tr class="table-sm table-primary">\n\
                                <th scope="col">Fecha</th>\n\
                                <th scope="col">Detalle</th>\n\
                                <th scope="col">Entradas</th>\n\
                                <th scope="col">Salidas</th>\n\
                            </tr>\n\
                            </thead><tbody>';
        for (i = 0; i < arreglo_kdx_pro.length; i++) {
            tmp = arreglo_kdx_pro[i];

//                if (tmp.ts_id == 1) {
//                    color_serv = ' #593196;';
//                } else if (tmp.ts_id == 2) {
//                    color_serv = ' #18d26e;';
//                }
            datos_kdx += '<tr class="table-sm" id="fila' + i + '">';
            datos_kdx += '<th scope="row" class="table-secondary">' + tmp.ent_fecha + '</th>';
            datos_kdx += '<td>' + tmp.venta + '</td>';

            if (tmp.movimiento == 1) {
                datos_kdx += '<td class="table-success">' + tmp.ent_cantidad + '</td>';
                datos_kdx += '<td class="table-danger"></td></tr>';
            } else if (tmp.movimiento == 2) {
                datos_kdx += '<td class="table-success"></td>';
                datos_kdx += '<td class="table-danger">' + tmp.ent_cantidad + '</td></tr>';
            }
        }
        datos_kdx += "</tbody></table></div></div></div>";
        $('#body_mod_os').html(datos_kdx);

//            /**
//             * Evento que pagina una tabla 
//             */
        $('#tableStockSucursal').DataTable();

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
            datos_stock_suc = '<div class="toast-header"><strong class="mr-auto">STOCK</strong></div>\n\
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

        } else {
            $("#contenidoInvent").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }

    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que permite validar campo de busqueda de numero venta en alistamiento
 * @param {type} metodo
 * @returns {undefined}
 */
function validarBuscarNumVenta(metodo) {
    $("#formBuscarEnvioAlist").validate({
        rules: {
            inpBuscaNumVenta: {
                required: true
            }
        },
        submitHandler: function (form) {
            metodo();
        }
    });
}
/**
 * Metodo que permite validar campo de busqueda de numero guia operador en alistamiento
 * @param {type} metodo
 * @returns {undefined}
 */
function validarBuscarNumGuiaOp(metodo) {
    $("#formBuscarEnvioAlistGuiaOp").validate({
        rules: {
            inpBuscaAlistGuiaOp: {
                required: true
            }
        },
        submitHandler: function (form) {
            metodo();
        }
    });
}
var numVentAlist;
/**
 * Metodo que realiza la busqueda del seguimiento de un envio en alistamiento por num venta
 * @returns {undefined}
 */
function datos_seg_alist() {
    request = "Controller/AdminC/AdministrarEnvios/cons_est_x_alis_env_controller.php";
    cadena = $("#formBuscarEnvioAlist").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arregloSegAlist = $.parseJSON(datos);

        if (arregloSegAlist !== 0) {

            cant_estados = arregloSegAlist.length;//cantidad de registros que equivalen a los estados por los que pasa el envio
            cant_teorico = cant_estados;
            tmp_ult_est = arregloSegAlist[(parseInt(cant_estados) - parseInt(1))];
            if (tmp_ult_est.esae_id == 3) {

            } else {
                cant_teorico = (parseInt(cant_estados) + parseInt(1));//cantidad teorica para visualizacion
            }


            temp_alis = arregloSegAlist[0];

            $("#nom_oper").html(temp_alis.ope_nombre);
            $("#guia_op").html(temp_alis.aen_guia_op);
            $("#etqNumVentAlist").html(temp_alis.aen_venta);
            numVentAlist = temp_alis.aen_venta;

            encabezado = "";
            iconos = "";
            fecha_est = "";
            hora_est = "";
            desc_est = "";

            if (cant_teorico < 3) {
                cant_teorico++;
            }

            porcentaje = (100 / (cant_teorico) * cant_estados);

            for (i = 0; i < cant_teorico; i++) {
                encabezado += '<th scope="col"><span class="ion-android-arrow-dropright" style="font-size: large;"></span></th>';
            }
            $("#titleEncaTab").html(encabezado);
            $("#fila_bar").attr("colspan", "" + cant_teorico + "");

            for (i = 0; i < cant_estados; i++) {
                tmp_est = arregloSegAlist[i];
//                alert(tmp_est.ee_id);
                var fecha_hora = new Date(tmp_est.exae_fecha_hora);
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                };
                var timeString = fecha_hora.toLocaleString('en-US', options);
                fe = new Date(tmp_est.exae_fecha_hora.replace(/-/g, '\/'));

                if (tmp_est.esae_id == 1) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.esae_desc + '" data-content="' + tmp_est.exae_novedad + '"><span class="ion-social-dropbox" style="font-size: xx-large; color: #d68800;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="fec_asig">' + timeString + '</td>';
                    desc_est += '<td id="fec_asig">' + tmp_est.esae_desc + '</td>';
                } else if (tmp_est.esae_id == 2) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.esae_desc + '" data-content="' + tmp_est.exae_novedad + '"><span class="ion-cube" style="font-size: xx-large; color: #093dd0;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="fec_asig">' + timeString + '</td>';
                    desc_est += '<td id="fec_asig">' + tmp_est.esae_desc + '</td>';
                } else if (tmp_est.esae_id == 3) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.esae_desc + '" data-content="' + tmp_est.exae_novedad + '"><span class="ion-android-checkbox" style="font-size: xx-large; color: #00ab54;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="fec_asig">' + timeString + '</td>';
                    desc_est += '<td id="fec_asig">' + tmp_est.esae_desc + '</td>';
                } else if (tmp_est.esae_id == 4) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.esae_desc + '" data-content="' + tmp_est.exae_novedad + '"><span class="ion-android-cancel" style="font-size: xx-large; color: #ca0101;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="fec_asig">' + timeString + '</td>';
                    desc_est += '<td id="fec_asig">' + tmp_est.esae_desc + '</td>';
                }
            }

            if (cant_estados == 1) {

                $("#progress_bar").css("width", "" + porcentaje + "%");

                iconos += '<td><span class="ion-cube" style="font-size: xx-large; color: #77248c;"></span></td>';
                iconos += '<td><span class="ion-android-checkbox" style="font-size: xx-large; color: #77248c;"></span></td>';
                fecha_est += '<td id="fec_asig"></td>';
                fecha_est += '<td id="fec_asig"></td>';
                hora_est += '<td id="fec_asig"></td>';
                hora_est += '<td id="fec_asig"></td>';
                desc_est += '<td id="fec_asig">PENDIENTE</td>';
                desc_est += '<td id="fec_asig">PENDIENTE</td>';
                $("#icon_x_est_env").html(iconos);
                $("#fechEst").html(fecha_est);
                $("#horaEst").html(hora_est);
                $("#descEst").html(desc_est);
            } else {
                tmp_ult_est = arregloSegAlist[(parseInt(cant_estados) - parseInt(1))];
                if (tmp_ult_est.esae_id == 3) {
                    $("#icon_x_est_env").html(iconos);
                    $("#fechEst").html(fecha_est);
                    $("#horaEst").html(hora_est);
                    $("#descEst").html(desc_est);
                    $("#progress_bar").css("width", "100%");
                } else {
                    iconos += '<td><span class="ion-android-checkbox" style="font-size: xx-large; color: #77248c;"></span></td>';
                    fecha_est += '<td id="fec_asig"></td>';
                    hora_est += '<td id="fec_asig"></td>';
                    desc_est += '<td id="fec_asig">PENDIENTE</td>';
                    $("#icon_x_est_env").html(iconos);
                    $("#fechEst").html(fecha_est);
                    $("#horaEst").html(hora_est);
                    $("#descEst").html(desc_est);
                    $("#progress_bar").css("width", "" + porcentaje + "%");
                }
            }
            $('[data-toggle="popover"]').popover({
                trigger: 'focus'
            });
            consulta_tabla_items_alis_salidas(numVentAlist);
//            alert(cant_teorico);
//            alert(cant_estados);

        } else {
            alertify.alert('Numero de envio no encontrado, favor verifique e intente nuevamente').setHeader('<em> Cuidado! </em> ');
        }

    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que realiza la busqueda del seguimiento de un envio en alistamiento por num venta
 * @returns {undefined}
 */
function datos_seg_alist_op() {
    request = "Controller/AdminC/AdministrarEnvios/cons_est_x_alis_guia_op_controller.php";
    cadena = $("#formBuscarEnvioAlistGuiaOp").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arregloSegAlist = $.parseJSON(datos);

        if (arregloSegAlist !== 0) {

            cant_estados = arregloSegAlist.length;//cantidad de registros que equivalen a los estados por los que pasa el envio
            cant_teorico = cant_estados;
            tmp_ult_est = arregloSegAlist[(parseInt(cant_estados) - parseInt(1))];
            if (tmp_ult_est.esae_id == 3) {

            } else {
                cant_teorico = (parseInt(cant_estados) + parseInt(1));//cantidad teorica para visualizacion
            }


            temp_alis = arregloSegAlist[0];

            $("#nom_oper").html(temp_alis.ope_nombre);
            $("#guia_op").html(temp_alis.aen_guia_op);
            $("#etqNumVentAlist").html(temp_alis.aen_venta);
            numVentAlist = temp_alis.aen_venta;

            encabezado = "";
            iconos = "";
            fecha_est = "";
            hora_est = "";
            desc_est = "";

            if (cant_teorico < 3) {
                cant_teorico++;
            }

            porcentaje = (100 / (cant_teorico) * cant_estados);

            for (i = 0; i < cant_teorico; i++) {
                encabezado += '<th scope="col"><span class="ion-android-arrow-dropright" style="font-size: large;"></span></th>';
            }
            $("#titleEncaTab").html(encabezado);
            $("#fila_bar").attr("colspan", "" + cant_teorico + "");

            for (i = 0; i < cant_estados; i++) {
                tmp_est = arregloSegAlist[i];
//                alert(tmp_est.ee_id);
                var fecha_hora = new Date(tmp_est.exae_fecha_hora);
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                };
                var timeString = fecha_hora.toLocaleString('en-US', options);
                fe = new Date(tmp_est.exae_fecha_hora.replace(/-/g, '\/'));

                if (tmp_est.esae_id == 1) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.esae_desc + '" data-content="' + tmp_est.exae_novedad + '"><span class="ion-social-dropbox" style="font-size: xx-large; color: #d68800;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="fec_asig">' + timeString + '</td>';
                    desc_est += '<td id="fec_asig">' + tmp_est.esae_desc + '</td>';
                } else if (tmp_est.esae_id == 2) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.esae_desc + '" data-content="' + tmp_est.exae_novedad + '"><span class="ion-cube" style="font-size: xx-large; color: #093dd0;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="fec_asig">' + timeString + '</td>';
                    desc_est += '<td id="fec_asig">' + tmp_est.esae_desc + '</td>';
                } else if (tmp_est.esae_id == 3) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.esae_desc + '" data-content="' + tmp_est.exae_novedad + '"><span class="ion-android-checkbox" style="font-size: xx-large; color: #00ab54;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="fec_asig">' + timeString + '</td>';
                    desc_est += '<td id="fec_asig">' + tmp_est.esae_desc + '</td>';
                } else if (tmp_est.esae_id == 4) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.esae_desc + '" data-content="' + tmp_est.exae_novedad + '"><span class="ion-android-cancel" style="font-size: xx-large; color: #ca0101;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="fec_asig">' + timeString + '</td>';
                    desc_est += '<td id="fec_asig">' + tmp_est.esae_desc + '</td>';
                }
            }

            if (cant_estados == 1) {

                $("#progress_bar").css("width", "" + porcentaje + "%");

                iconos += '<td><span class="ion-cube" style="font-size: xx-large; color: #77248c;"></span></td>';
                iconos += '<td><span class="ion-android-checkbox" style="font-size: xx-large; color: #77248c;"></span></td>';
                fecha_est += '<td id="fec_asig"></td>';
                fecha_est += '<td id="fec_asig"></td>';
                hora_est += '<td id="fec_asig"></td>';
                hora_est += '<td id="fec_asig"></td>';
                desc_est += '<td id="fec_asig">PENDIENTE</td>';
                desc_est += '<td id="fec_asig">PENDIENTE</td>';
                $("#icon_x_est_env").html(iconos);
                $("#fechEst").html(fecha_est);
                $("#horaEst").html(hora_est);
                $("#descEst").html(desc_est);
            } else {
                tmp_ult_est = arregloSegAlist[(parseInt(cant_estados) - parseInt(1))];
                if (tmp_ult_est.esae_id == 3) {
                    $("#icon_x_est_env").html(iconos);
                    $("#fechEst").html(fecha_est);
                    $("#horaEst").html(hora_est);
                    $("#descEst").html(desc_est);
                    $("#progress_bar").css("width", "100%");
                } else {
                    iconos += '<td><span class="ion-android-checkbox" style="font-size: xx-large; color: #77248c;"></span></td>';
                    fecha_est += '<td id="fec_asig"></td>';
                    hora_est += '<td id="fec_asig"></td>';
                    desc_est += '<td id="fec_asig">PENDIENTE</td>';
                    $("#icon_x_est_env").html(iconos);
                    $("#fechEst").html(fecha_est);
                    $("#horaEst").html(hora_est);
                    $("#descEst").html(desc_est);
                    $("#progress_bar").css("width", "" + porcentaje + "%");
                }
            }
            $('[data-toggle="popover"]').popover({
                trigger: 'focus'
            });
            consulta_tabla_items_alis_salidas(numVentAlist);
//            alert(cant_teorico);
//            alert(cant_estados);

        } else {
            alertify.alert('Numero de envio no encontrado, favor verifique e intente nuevamente').setHeader('<em> Cuidado! </em> ');
        }

    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que carga la tabla de items en seguimiento de ventas por alistamiento
 * en tablas de salidas y salidas temp
 * @param {type} venta
 * @returns {consulta_tabla_items_alis_salidas}
 */
function consulta_tabla_items_alis_salidas(venta) {
    request = "Controller/AdminC/AdministrarProd/consulta_items_alist_venta_controller.php";
    cadena = "numVentAlist=" + venta; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_venta_items = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_venta_items !== 0) {

            datos_items_venta = "<div class='table-responsive text-nowrap'><table class='table table-striped table-sm table-bordered' id='tableEnvProgram'>\n\
                             <thead><tr>\n\
                             <th scope='col'>FECHA</th>\n\
                             <th scope='col'>GUIA OP</th>\n\
                             <th scope='col'>SKU</th>\n\
                             <th scope='col'>CODIGO</th>\n\
                             <th scope='col'>DESCRIPCIÓN</th>\n\
                             <th scope='col'>UN</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arreglo_venta_items.length; i++) {
                temp = arreglo_venta_items[i];
                var splitDate = temp.fecha.split(" ");

                datos_items_venta += '<tr class="table-sm table-warning">';
                datos_items_venta += '<td>' + splitDate[0] + '</td>';
                datos_items_venta += '<td>' + temp.guia + '</td>';
                datos_items_venta += '<td>' + temp.sku + '</td>';
                datos_items_venta += '<td>' + temp.codigo + '</td>';
                datos_items_venta += '<td>' + temp.descripcion + '</td>';
                datos_items_venta += '<td>' + temp.unidades + '</td></tr>';
            }
            datos_items_venta += "</tbody></table></div>";
            $("#tablItemsAlist").html(datos_items_venta);
            $("#imgSucLogo").html('<img src="img/sucursales/' + temp.sucursal + '.png" alt=""/>');

        } else {
            $("#tablItemsAlist").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

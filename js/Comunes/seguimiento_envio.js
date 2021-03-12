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
 * Metodo que permite validar campo de busqueda de numero guia operador
 * @param {type} metodo
 * @returns {undefined}
 */
function validarBuscarNumEnvioOp(metodo) {
    $("#formBuscarEnvioGuiaOP").validate({
        rules: {
            inpBuscaEnvGuiaOp: {
                required: true
            }
        },
        submitHandler: function (form) {
            metodo();
        }
    });
}

/**
 * Metodo que realiza la busqueda del seguimiento de un envio
 * @returns {undefined}
 */
function datos_envio_seg() {
    request = "Controller/AdminC/AdministrarEnvios/cons_estado_x_env_segui_controller.php";
    cadena = $("#formBuscarEnvio").serialize(); //envio de parametros por POST    
    metodo = function (datos) {
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arregloSegEnvio = $.parseJSON(datos);

        if (arregloSegEnvio !== 0) {

            cant_estados = arregloSegEnvio.length;//cantidad de registros que equivalen a los estados por los que pasa el envio
            cant_teorico = cant_estados;
            tmp_ult_est = arregloSegEnvio[(parseInt(cant_estados) - parseInt(1))];
            if (tmp_ult_est.ee_id == 6 || tmp_ult_est.ee_id == 7 || tmp_ult_est.ee_id == 11 || tmp_ult_est.ee_id == 12) {

            } else {
                cant_teorico = (parseInt(cant_estados) + parseInt(1));//cantidad teorica para visualizacion
            }

            temp_env = arregloSegEnvio[0];

            $("#nom_remite").html(temp_env.cli_nombre);
            $("#dir_remite").html(temp_env.os_direccion);
            $("#ciudad_remite").html(temp_env.ciu_nombre);
            $("#tel_remite").html(temp_env.os_tel_cont);

            $("#nom_destino").html(temp_env.en_nombre);
            $("#dir_destino").html(temp_env.en_direccion);
            $("#ciudad_destino").html(temp_env.en_ciudad);
            $("#tel_destino").html(temp_env.en_telefono);

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
                encabezado += '<th scope="col"><span class="ion-android-arrow-dropright" style="font-size: xx-large;"></span></th>';
            }
            $("#titleEncaTab").html(encabezado);
            $("#fila_bar").attr("colspan", "" + cant_teorico + "");

            for (i = 0; i < cant_estados; i++) {
                tmp_est = arregloSegEnvio[i];
//                alert(tmp_est.ee_id);
                var fecha_hora = new Date(tmp_est.exe_fec_hora);
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                };
                var timeString = fecha_hora.toLocaleString('en-US', options);
                fe = new Date(tmp_est.exe_fec_hora.replace(/-/g, '\/'));

                if (tmp_est.ee_id == 1) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-android-alarm-clock" style="font-size: xx-large; color: #d68800;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 2) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-ios-home" style="font-size: xx-large; color: #d68800;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 3) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-jet" style="font-size: xx-large; color: #d68800;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 4) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-ios-home-outline" style="font-size: xx-large; color: #d68800;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 5) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="En Reparto"><span class="ion-android-bicycle" style="font-size: xx-large; color: #d68800;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 6) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="Entrega OK"><span class="ion-checkmark-circled" style="font-size: xx-large; color: #009645;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 7) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-arrow-left-a" style="font-size: xx-large; color: #b90808;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 8) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-android-warning" style="font-size: xx-large; color: #d68800;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 9) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-android-warning" style="font-size: xx-large; color: #b90808;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 10) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-android-warning" style="font-size: xx-large; color: #1ea7f7;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 11) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-loop" style="font-size: xx-large; color: #1ea7f7;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 12) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-android-cancel" style="font-size: xx-large; color: #b90808;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                }
            }

            if (cant_estados == 1) {

                $("#progress_bar").css("width", "" + porcentaje + "%");

                iconos += '<td><span class="ion-android-bicycle" style="font-size: xx-large; color: #77248c;"></span></td>';
                iconos += '<td><span class="ion-checkmark-circled" style="font-size: xx-large; color: #77248c;"></span></td>';
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
                tmp_ult_est = arregloSegEnvio[(parseInt(cant_estados) - parseInt(1))];
                if (tmp_ult_est.ee_id == 6 || tmp_ult_est.ee_id == 7 || tmp_ult_est.ee_id == 11 || tmp_ult_est.ee_id == 12) {
                    $("#icon_x_est_env").html(iconos);
                    $("#fechEst").html(fecha_est);
                    $("#horaEst").html(hora_est);
                    $("#descEst").html(desc_est);
                    $("#progress_bar").css("width", "100%");
                } else {
                    iconos += '<td><span class="ion-checkmark-circled" style="font-size: xx-large; color: #77248c;"></span></td>';
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

//            alert(cant_teorico);
//            alert(cant_estados);
            /**
             * tabla envio rastreado
             */
            datos_env = '<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">\n\
                            <div class="toast-header">\n\
                            <strong class="mr-auto" id="title_env_est">ENVIO N°' + tmp_est.en_id + ' GUIA OP N° ' + tmp_est.en_guia + '</strong>\n\
                            </div>\n\
                            <div class="toast-body">\n\
                            <div class="table-responsive text-nowrap col-lg-12" id="tbInfoEstEnv">\n\
                            <table class="table table-striped table-sm table-bordered" id="tableEstEnvRastreo">\n\
                            <thead><tr class="table-primary">\n\
                                <th scope="col">SEC</th>\n\
                                <th scope="col">GUIA LOGI</th>\n\
                                <th scope="col">GUIA OP</th>\n\
                                <th scope="col">FECHA</th>\n\
                                <th scope="col">HORA</th>\n\
                                <th scope="col">ESTADO</th>\n\
                                <th scope="col">SERVICIO</th>\n\
                                <th scope="col">T. ENVIO</th>\n\
                                <th scope="col">OBSERVACIONES</th>\n\
                                </tr></thead><tbody>';

            for (i = 0; i < arregloSegEnvio.length; i++) {
                temp = arregloSegEnvio[i];

                var fecha_hora = new Date(temp.exe_fec_hora);
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                };
                var timeString = fecha_hora.toLocaleString('en-US', options);
                fe = new Date(temp.exe_fec_hora.replace(/-/g, '\/'));

                datos_env += '<tr class="table-sm EnvFil">';
                datos_env += '<td>' + i + '</td>';
                datos_env += '<td>' + temp.en_id + '</td>';
                datos_env += '<td>' + temp.en_guia + '</td>';
                datos_env += '<td>' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                datos_env += '<td>' + timeString + '</td>';
                datos_env += '<td>' + temp.ee_desc + '</td>';
                if (temp.ts_id == 1) {
                    datos_env += '<td class="table-primary">' + temp.ts_desc + '</td>';
                } else {
                    datos_env += '<td>' + temp.ts_desc + '</td>';
                }
                datos_env += '<td>' + temp.te_desc + '</td>';
                if (temp.ee_id == 5) {
                    datos_env += '<td></td></tr>';
                } else {
                    datos_env += '<td>' + temp.exe_novedad + '</td></tr>';
                }
            }
            datos_env += "</tbody></table></div></div></div>";
            $("#tabEnvioRastreo").html(datos_env);

            $('#tableEstEnvRastreo').DataTable({
                'order': [[0, 'desc']],
                'scrollX': true
            });
            tmp_envio = arregloSegEnvio[arregloSegEnvio.length - 1];

            $("#btnPruebaEntr").click(function () {
                clickPruebaEnt(tmp_envio.en_id);
            });

        } else {
            alertify.alert('Numero de envio no encontrado, favor verifique e intente nuevamente').setHeader('<em> Cuidado! </em> ');
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que realiza la busqueda del seguimiento de un envio por numero de guia operador
 * @returns {undefined}
 */
function datos_envio_seg_op() {
    request = "Controller/AdminC/AdministrarEnvios/cons_est_x_env_segui_guia_op_controller.php";
    cadena = $("#formBuscarEnvioGuiaOP").serialize(); //envio de parametros por POST    
    metodo = function (datos) {
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arregloSegEnvio = $.parseJSON(datos);

        if (arregloSegEnvio !== 0) {

            cant_estados = arregloSegEnvio.length;//cantidad de registros que equivalen a los estados por los que pasa el envio
            cant_teorico = cant_estados;
            tmp_ult_est = arregloSegEnvio[(parseInt(cant_estados) - parseInt(1))];
            if (tmp_ult_est.ee_id == 6 || tmp_ult_est.ee_id == 7 || tmp_ult_est.ee_id == 11 || tmp_ult_est.ee_id == 12) {

            } else {
                cant_teorico = (parseInt(cant_estados) + parseInt(1));//cantidad teorica para visualizacion
            }

            temp_env = arregloSegEnvio[0];

            $("#nom_remite").html(temp_env.cli_nombre);
            $("#dir_remite").html(temp_env.os_direccion);
            $("#ciudad_remite").html(temp_env.ciu_nombre);
            $("#tel_remite").html(temp_env.os_tel_cont);

            $("#nom_destino").html(temp_env.en_nombre);
            $("#dir_destino").html(temp_env.en_direccion);
            $("#ciudad_destino").html(temp_env.en_ciudad);
            $("#tel_destino").html(temp_env.en_telefono);

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
                encabezado += '<th scope="col"><span class="ion-android-arrow-dropright" style="font-size: xx-large;"></span></th>';
            }
            $("#titleEncaTab").html(encabezado);
            $("#fila_bar").attr("colspan", "" + cant_teorico + "");

            for (i = 0; i < cant_estados; i++) {
                tmp_est = arregloSegEnvio[i];
//                alert(tmp_est.ee_id);
                var fecha_hora = new Date(tmp_est.exe_fec_hora);
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                };
                var timeString = fecha_hora.toLocaleString('en-US', options);
                fe = new Date(tmp_est.exe_fec_hora.replace(/-/g, '\/'));

                if (tmp_est.ee_id == 1) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-android-alarm-clock" style="font-size: xx-large; color: #d68800;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 2) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-ios-home" style="font-size: xx-large; color: #d68800;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 3) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-jet" style="font-size: xx-large; color: #d68800;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 4) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-ios-home-outline" style="font-size: xx-large; color: #d68800;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 5) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="En Reparto"><span class="ion-android-bicycle" style="font-size: xx-large; color: #d68800;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 6) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="Entrega OK"><span class="ion-checkmark-circled" style="font-size: xx-large; color: #009645;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 7) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-arrow-left-a" style="font-size: xx-large; color: #b90808;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 8) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-android-warning" style="font-size: xx-large; color: #d68800;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 9) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-android-warning" style="font-size: xx-large; color: #b90808;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 10) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-android-warning" style="font-size: xx-large; color: #1ea7f7;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 11) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-loop" style="font-size: xx-large; color: #1ea7f7;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                } else if (tmp_est.ee_id == 12) {
                    iconos += '<td><a tabindex="0" class="enlace" role="button" data-toggle="popover" data-placement="top" data-trigger="focus" title="' + tmp_est.ee_desc + '" data-content="' + tmp_est.exe_novedad + '"><span class="ion-android-cancel" style="font-size: xx-large; color: #b90808;"></span></a></td>';
                    fecha_est += '<td id="fec_asig">' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                    hora_est += '<td id="hor_asig">' + timeString + '</td>';
                    desc_est += '<td id="nov_env">' + tmp_est.ee_desc + '</td>';
                }
            }

            if (cant_estados == 1) {

                $("#progress_bar").css("width", "" + porcentaje + "%");

                iconos += '<td><span class="ion-android-bicycle" style="font-size: xx-large; color: #77248c;"></span></td>';
                iconos += '<td><span class="ion-checkmark-circled" style="font-size: xx-large; color: #77248c;"></span></td>';
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
                tmp_ult_est = arregloSegEnvio[(parseInt(cant_estados) - parseInt(1))];
                if (tmp_ult_est.ee_id == 6 || tmp_ult_est.ee_id == 7 || tmp_ult_est.ee_id == 11 || tmp_ult_est.ee_id == 12) {
                    $("#icon_x_est_env").html(iconos);
                    $("#fechEst").html(fecha_est);
                    $("#horaEst").html(hora_est);
                    $("#descEst").html(desc_est);
                    $("#progress_bar").css("width", "100%");
                } else {
                    iconos += '<td><span class="ion-checkmark-circled" style="font-size: xx-large; color: #77248c;"></span></td>';
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

//            alert(cant_teorico);
//            alert(cant_estados);
            /**
             * tabla envio rastreado
             */
            datos_env = '<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">\n\
                            <div class="toast-header">\n\
                            <strong class="mr-auto" id="title_env_est">ENVIO N°' + tmp_est.en_id + ' GUIA OP N° ' + tmp_est.en_guia + '</strong>\n\
                            </div>\n\
                            <div class="toast-body">\n\
                            <div class="table-responsive text-nowrap col-lg-12" id="tbInfoEstEnv">\n\
                            <table class="table table-striped table-sm table-bordered" id="tableEstEnvRastreo">\n\
                            <thead><tr class="table-primary">\n\
                                <th scope="col">SEC</th>\n\
                                <th scope="col">GUIA LOGI</th>\n\
                                <th scope="col">GUIA OP</th>\n\
                                <th scope="col">FECHA</th>\n\
                                <th scope="col">HORA</th>\n\
                                <th scope="col">ESTADO</th>\n\
                                <th scope="col">SERVICIO</th>\n\
                                <th scope="col">T. ENVIO</th>\n\
                                <th scope="col">OBSERVACIONES</th>\n\
                                </tr></thead><tbody>';

            for (i = 0; i < arregloSegEnvio.length; i++) {
                temp = arregloSegEnvio[i];

                var fecha_hora = new Date(temp.exe_fec_hora);
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                };
                var timeString = fecha_hora.toLocaleString('en-US', options);
                fe = new Date(temp.exe_fec_hora.replace(/-/g, '\/'));

                datos_env += '<tr class="table-sm EnvFil">';
                datos_env += '<td>' + i + '</td>';
                datos_env += '<td>' + temp.en_id + '</td>';
                datos_env += '<td>' + temp.en_guia + '</td>';
                datos_env += '<td>' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                datos_env += '<td>' + timeString + '</td>';
                datos_env += '<td>' + temp.ee_desc + '</td>';
                if (temp.ts_id == 1) {
                    datos_env += '<td class="table-primary">' + temp.ts_desc + '</td>';
                } else {
                    datos_env += '<td>' + temp.ts_desc + '</td>';
                }
                datos_env += '<td>' + temp.te_desc + '</td>';
                if (temp.ee_id == 5) {
                    datos_env += '<td></td></tr>';
                } else {
                    datos_env += '<td>' + temp.exe_novedad + '</td></tr>';
                }
            }
            datos_env += "</tbody></table></div></div></div>";
            $("#tabEnvioRastreo").html(datos_env);

            $('#tableEstEnvRastreo').DataTable({
                'order': [[0, 'desc']],
                'scrollX': true
            });

            tmp_envio = arregloSegEnvio[arregloSegEnvio.length - 1];

            $("#btnPruebaEntr").click(function () {
                clickPruebaEnt(tmp_envio.en_id);
            });
        } else {
            alertify.alert('Numero de envio no encontrado, favor verifique e intente nuevamente').setHeader('<em> Cuidado! </em> ');
        }
    };
    f_ajax(request, cadena, metodo);
}

function clickPruebaEnt(num_envio) {
    request = "Controller/AdminC/AdministrarEnvios/prueba_entr_controller.php";
    cadena = "envio=" + num_envio; //envio de parametros por POST
    metodo = function (datos) {
        if (datos != "") {
//            $(open).attr('href', 'img/pruebas_entrega/' + datos);
            window.open('img/pruebas_entrega/' + datos, "_blank");
        } else {
            alertify.alert('Prueba de entrega no encontrada').setHeader('<em> Cuidado! </em> ');
        }
    };
    f_ajax(request, cadena, metodo);
}
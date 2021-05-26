/**
 * Metodo que trae a la vista el formulario de recoleccion cliente y sucursal
 * @returns {undefined}
 */
function formulario_recolec() {
    request = "View/ClienteV/form_solic_recoleccion.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#sec1").html("");
        contador_cl_suc = 0;
        $("#sectionConten").html(datos);
        combo_ciudad("#selCiudad");
        combo_tipo_envio_cl("#selEnvio");
        combo_tipo_serv("#selServi");

        $("#btnGuardaOS").click(function () {
            validarOrdServ();
        });


//        $("#btnCancelarOrd").click(function () {
//            resetFormOrdServ();
//            formulario_recolec();
//        });
//        $("#btnAgreEnv").click(function () {
//            formularioEnvios();
//        });
//        $("#btnMas").click(function () {
//            formularios_envio();
//        });
//        $("#btnGuardarFin").click(function () {
//            validarFormEnvios();
//        });
//        $("#btnMenos").click(function () {
//            elimina_formularios_envio();
//        });
//        seleccionCargaEnvios();
//
//        $("#btnGMasEnvDoc").click(function () {
//            validarMasivoEnvios();
//        });
//        nameFileCargaMasEnvDoc();
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que llena el combo de seleccion tipo ciudad
 * @param {type} select
 * @returns {undefined}
 */
function combo_ciudad(select) {
    request = "Controller/ClienteC/consulta_ciudades_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        datouscombo = "";
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            datouscombo += '<option value="' + temp.ciu_id + '">' + temp.ciu_nombre + "</option>";
        }
        $(select).html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que llena el combo de seleccion tipo pago
 * @param {type} select
 * @returns {undefined}
 */
function combo_tipo_pago(select) {
    request = "Controller/AdminC/AdministrarBD/consulta_tipo_pago_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        datouscombo = "";
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            datouscombo += '<option value="' + temp.tpa_id + '">' + temp.tpa_tipo + "</option>";
        }
        $(select).html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que llena el combo de seleccion tipo envio
 * @param {type} select
 * @returns {undefined}
 */
function combo_tipo_envio(select) {
    request = "Controller/AdminC/AdministrarBD/consulta_tipo_env_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        datouscombo = "";
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            datouscombo += '<option value="' + temp.te_id + '">' + temp.te_desc + "</option>";
        }
        $(select).html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que llena el combo de seleccion tipo envio
 * @param {type} select
 * @returns {undefined}
 */
function combo_tipo_envio_cl(select) {
    request = "Controller/ClienteC/con_tipo_env_cl_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        datouscombo = "";
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            datouscombo += '<option value="' + temp.te_id + '">' + temp.te_desc + "</option>";
        }
        $(select).html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que llena el combo de seleccion tipo servicio
 * @param {type} select
 * @returns {undefined}
 */
function combo_tipo_serv(select) {
    request = "Controller/ClienteC/con_tipo_serv_cl_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        datouscombo = "";
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            datouscombo += '<option value="' + temp.ts_id + '">' + temp.ts_desc + "</option>";
        }
        $(select).html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que permite validar campos en formulario orden servicio
 * @returns {undefined}
 */
function validarOrdServ() {
    $("#formOrdenServ").validate({
        rules: {
            inpDirec: {
                required: true
            },
            inpTel: {
                digits: true
            }
        },
        submitHandler: function (form) {
            insertar_orden_serv();
        }
    });
}
function validarFormEnvios() {

//    campo = "inputDirDestino1: {required: true}";

    $("#formEnvios").validate({
        submitHandler: function (form) {
//            alert("Enviados");
            insertarEnvios_v2();
        }
    });
}
function validarFormEnvios_cl_suc() {

//    campo = "inputDirDestino1: {required: true}";

    $("#formEnvios").validate({
        submitHandler: function (form) {
//            alert("Enviados");
            insertarEnvios_v2_cl();
        }
    });
}

/**
 * Metodo de validacion Carga masiva de envios documentos xlsx
 * @returns {undefined}
 */
function validarMasivoEnvios() {
    $("#formMasEnvDoc").validate({
        errorLabelContainer: '#errorTxt',
        rules: {
            inpFileMasEnvDoc: {
                required: true,
                extension: "xlsx"
            }
        },
        messages: {
            inpFileMasEnvDoc: {
                extension: "Extensión no valida, debe ser xlsx o xls"
            }
        },
        submitHandler: function (form) {
            cargaArchivoEnvDocum();
        }
    });
}

/**
 * Metodo que plasma nombre archivo en carga masiva envios documentos
 * @returns {undefined}
 */
function nameFileCargaMasEnvDoc() {
    $("#inpFileMasEnvDoc").change(function () {
        nombre = $("#inpFileMasEnvDoc").val();
//        if (nombre.substring(3,11) == 'fakepath') {
//            nombre = nombre.substring(12);
//        }
        $("#textMasEnvDoc").text(nombre);
    });
}

var tipo_envio;
var id_tipo_envio;

/**
 * Metodo que guarda registro en tabla orden_serv
 * metodo desactualizado
 * @returns {undefined}
 */
function insertar_orden_serv() {
    request = "Controller/ClienteC/insertar_ord_serv_controller.php";
    cadena = $("#formOrdenServ").serialize(); //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        if (datos == 1) {
            limpiarFormulario("#formOrdenServ");
            formulario_carga_envios_cl_suc();
            alertify.success('Orden Creada!');
        } else if (datos == 2) {
//            alert(datos);
            $("#divMensaje").html("<div class='alert alert-dismissible alert-warning col-lg-12'><strong>error al guardar estado de orden de servicio, </strong>la orden fue creada</div> ");
        } else if (datos == 3) {
//            alert(datos);
            $("#divMensaje").html("<div class='alert alert-dismissible alert-danger col-lg-12'><strong>error al guardar orden de servicio</strong></div> ");
        } else {
            alert(datos);
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que guarda registro en tabla orden_serv
 * desde form form_guarda_os
 * @returns {undefined}
 */
function insertar_orden_serv_v2() {
    request = "Controller/AdminC/AdministrarOS/insertar_os_adm_controller.php";
    cadena = $("#form_guarda_os").serialize(); //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        if (datos == 1) {
            ultima_orden_serv();

            limpiarFormulario("#form_guarda_os");
            alertify.success('Orden Creada!');
        } else if (datos == 2) {
//            alert(datos);
            $("#divMensaje").html("<div class='alert alert-dismissible alert-warning col-lg-12'><strong>error al guardar estado de orden de servicio, </strong>la orden fue creada</div> ");
        } else if (datos == 3) {
//            alert(datos);
            $("#divMensaje").html("<div class='alert alert-dismissible alert-danger col-lg-12'><strong>error al guardar orden de servicio</strong></div> ");
        } else {
            alert(datos);
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que trae a la vista el formulario de carga de envios
 * @returns {undefined}
 */
function formulario_carga_envios() {
    request = "View/AdministradorV/OrdenesServicio/form_guarda_envios.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#sectionDatOS").html(datos);

        temp = arreglo_dat_os[0];
        ciudad = temp.ciu_nombre;
        direccion = temp.os_direccion;
        tipo_envio = temp.te_desc;
        id_tipo_envio = temp.te_id;
        tipo_servi = temp.ts_desc;

        $("#inputNumOrdServ").val(num_os);
        $("#inputContador").val(parseInt(contador));

        $("#divMensaje").html("<legend id='legTitulo'>Orden N° " + num_os + "</legend>\n\
                  <strong>Lugar de Recolección: </strong>" + direccion + " " + ciudad + "<br>\n\
                  <strong>Tipo de Envio: </strong>" + tipo_envio + "<br>\n\
                  <strong>Tipo Servicio: </strong>" + tipo_servi + "\n\
                  <div class='alert alert-dismissible alert-warning border-warning' id='mensajeCompletar' style='border-radius: 0.5rem;'><strong>Orden de Recolección creada,</strong> por favor diligencie los datos de envio.</div>");
        $("#formDescEnvios").show();
        bloquearCampoNumEnvios(id_tipo_envio, "#inputCantidadEnv");
        $("#blqCargaExcel").hide();
//        $("#blqSelectModoCarga").show();
        $("#sectionConten").hide();

        $("#btnAgreEnv").click(function () {
            formularioEnvios();
        });
        $("#btnMas").click(function () {
            formularios_envio();
        });
        $("#btnGuardarFin").click(function () {
            validarFormEnvios();
        });
        $("#btnMenos").click(function () {
            elimina_formularios_envio();
        });
        combo_ciudad("#selectCiudDestino");
        combo_tipo_pago("#selectTipoPago");
        seleccionCargaEnvios();

        $("#btnGMasEnvDoc").click(function () {
            validarMasivoEnvios();
        });
        nameFileCargaMasEnvDoc();
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que trae a la vista el formulario de carga de envios vista cliente y sucursal
 * @returns {undefined}
 */
function formulario_carga_envios_cl_suc() {
    request = "View/AdministradorV/OrdenesServicio/form_guarda_env_cli_suc.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#divMensaje").html(datos);
        $("#sectionContenClSuc").hide();
        $("#inputContador").val(parseInt(contador_cl_suc));

        $("#btnMas").click(function () {
            formularios_envio_cl();
        });
        $("#btnMenos").click(function () {
            elimina_formularios_envio_cl();
        });

        $("#btnGuardarFin").click(function () {
            validarFormEnvios_cl_suc();
        });

        combo_ciudad("#selectCiudDestino");
        combo_tipo_pago("#selectTipoPago");
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que permite resetear el formulario solicitar orden de servicio
 * @returns {undefined}
 */
function resetFormOrdServ() {
    limpiarFormulario("#formOrdenServ");
    $("#btnCancelarOrd").removeClass("btn-secondary");
    $("#btnCancelarOrd").addClass("btn-dark");
    $("#btnCancelarOrd").html("Cancelar");
    contador = 0;
}

/**
 * Metodo que muestra los campos ocultos en form Envio
 * @param {type} tipo_envio
 * @param {type} bloque1
 * @param {type} bloque2
 * @param {type} bloque3
 * @param {type} bloque4
 * @param {type} bloque5
 * @param {type} bloque6
 * @param {type} bloque7
 * @param {type} campoNum
 * @returns {undefined}
 */
function resetMostrarCampos(tipo_envio, bloque1, bloque2, bloque3, bloque4, bloque5, bloque6, bloque7, campoNum) {
    if (tipo_envio !== "MENSAJERIA" && tipo_envio !== "RADICACIÓN DOCUMENTOS") {
        $(bloque1).show();
        $(bloque2).show();
        $(bloque3).show();
        $(bloque4).show();
        $(bloque5).removeClass("col-lg-6");
        $(bloque5).addClass("col-lg-4");
        $(bloque6).show();
        $(bloque7).removeClass("col-lg-6");
        $(bloque7).addClass("col-lg-5");
        $("#enlPlantilla").attr("href", "Files/Plantillas/Plantilla_Mercancia.xlsx");
    } else {
        $(campoNum).val("1");
        $(campoNum).attr('readonly', true);
        $("#enlPlantilla").attr("href", "Files/Plantillas/Plantilla_Envios_2021.xlsx");
    }
}
/**
 * Metodo que bloquea o desbloquea campo numero de envios
 * @param {type} tipo_envio
 * @param {type} campoNum
 * @returns {undefined}
 */
function bloquearCampoNumEnvios(tipo_envio, campoNum) {
    if (tipo_envio == 1 || tipo_envio == 3) {
        $(campoNum).val("1");
        $(campoNum).attr('readonly', true);
    }
    $("#enlPlantilla").attr("href", "Files/Plantillas/Plantilla_Envios_2021.xlsx");
}

var num_os;
/**
 * Metodo que calcula el numero de la siguiente orden de servicio
 * @returns {Number|num_os}
 */
function numero_orden_serv() {
    request = "Controller/ClienteC/consulta_ultima_os_controller.php";
    cadena = "a=1";
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        numero = arreglo[0];
        if (typeof numero === 'undefined') {
            num_os = 1;
        } else if (numero.num === null) {
            num_os = 1;
        } else {
            num_os = numero.num;
        }
        $("#legTitulo").html("Orden N° " + num_os);
        $("#inputNumOrdServ").val(num_os);
        $("#inputContador").val(parseInt(contador));
    };
    f_ajax(request, cadena, metodo);
}
var arreglo_dat_os;
/**
 * Metodo que calcula el numero de la ultima orden de servicio creada
 * @returns {Number|num_os}
 */
function ultima_orden_serv() {
    request = "Controller/AdminC/AdministrarOS/consulta_ultima_os_creada_controller.php";
    cadena = "a=1";
    metodo = function (datos) {

        arreglo_dat_os = $.parseJSON(datos);
        datos_os = arreglo_dat_os[0];
        if (typeof datos_os === 'undefined') {
            alert("Error al encontrar OS");
        } else if (datos_os.os_id === null) {
            alert("Error al encontrar OS");
        } else {
            num_os = datos_os.os_id;
        }

        if (datos_os.ts_id == 4 || datos_os.ts_id == 5) {
            formulario_alistamiento_xlsx();
        } else {
            formulario_carga_envios();
        }
    };
    f_ajax(request, cadena, metodo);
}
var arreglo_tot_env;
/**
 * Metodo que consulta el total de envios para una os
 * @param {type} os_id
 * @returns {consulta_total_envios}
 */
function consulta_total_envios(os_id) {
    request = "Controller/AdminC/AdministrarOS/cons_total_env_x_os_controller.php";
    cadena = {"os_id": os_id}; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_tot_env = $.parseJSON(datos);
    };
    f_ajax(request, cadena, metodo);
}

var arreglo_tot_aenv;
/**
 * Metodo que consulta el total de envios para una os
 * @param {type} os_id
 * @returns {consulta_total_envios}
 */
function consulta_total_aenvios(os_id) {
    request = "Controller/AdminC/AdministrarOS/cons_total_aenv_x_os_controller.php";
    cadena = {"os_id": os_id}; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_dat_os = "";
        arreglo_dat_os = $.parseJSON(datos);
        temp_total = arreglo_dat_os[0];
//        $("#inf_tot_aenv").html(temp_total.total);

        num_os = temp_total.os_id;

        $("#btnCloseModal").trigger("click");

        if (temp_total.ts_id == 4 || temp_total.ts_id == 5) {
            formulario_alistamiento_xlsx_dash();
        } else {
            formulario_carga_envios();
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Variable global que almacena la cantidad de formularios generados 
 * @type Number
 */
var contador = 0;
/**
 * Metodo que agrega un formulario de envio en la vista
 * @returns {undefined}
 */
function formularios_envio() {
    if (contador <= 8) {
        contador += 1;
        $('#f' + contador + '').html('<strong class="mr-auto">Sección ' + parseInt(contador + 1) + '</strong><div class="toast show border-primary" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">\n\
                            <div class="toast-body row">\n\
                            <div class="form-group form-group-sm col-lg-4">\n\
                                <label for="inputNombreDestino' + contador + '">Nombre destinatario</label>\n\
                                <input type="text" class="form-control form-control-sm" id="inputNombreDestino' + contador + '" name="inputNombreDestino' + contador + '" placeholder="Nombre Destinatario" required>\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-4">\n\
                                <label for="inputDirDestino' + contador + '">Dirección destino</label>\n\
                                <input type="text" class="form-control form-control-sm" id="inputDirDestino' + contador + '" name="inputDirDestino' + contador + '" placeholder="Dirección Destinatario" required>\n\
                            </div>\n\                             <div class="form-group form-group-sm col-lg-2">\n\
                                <label for="inputTeleDestino' + contador + '">Teléfono Destino</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputTeleDestino' + contador + '" name="inputTeleDestino' + contador + '" placeholder="Telefono Destinatario">\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-2">\n\
                                <label for="selectCiudDestino' + contador + '">Ciudad Destino</label>\n\
                                <select class="form-control form-control-sm" id="selectCiudDestino' + contador + '" name="selectCiudDestino' + contador + '">\n\
                                </select>\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-2">\n\
                                <label for="inputCantidadEnv' + contador + '">Cantidad</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputCantidadEnv' + contador + '" name="inputCantidadEnv' + contador + '" placeholder="N° Envios" required>\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-2">\n\
                                <label for="inputRefGuia' + contador + '">Referencia</label>\n\
                                <input type="text" class="form-control form-control-sm" id="inputRefGuia' + contador + '" name="inputRefGuia' + contador + '" placeholder="Referencia">\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-2" id="blqPeso' + contador + '">\n\
                                <label for="inputPeso' + contador + '">Peso Kg</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputPeso' + contador + '" name="inputPeso' + contador + '" placeholder="Peso Kg">\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-2" id="blqAlto' + contador + '">\n\
                                <label for="inputAlto' + contador + '">Alto cm</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputAlto' + contador + '" name="inputAlto' + contador + '" placeholder="Alto cm">\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-2" id="blqAncho' + contador + '">\n\
                                <label for="inputAncho' + contador + '">Ancho cm</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputAncho' + contador + '" name="inputAncho' + contador + '" placeholder="Ancho cm">\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-2" id="blqLargo' + contador + '">\n\
                                <label for="inputLargo' + contador + '">Largo cm</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputLargo' + contador + '" name="inputLargo' + contador + '" placeholder="Largo cm">\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-6" id="blqContenido' + contador + '">\n\
                                <label for="inputContenido' + contador + '">Dice Contener</label>\n\
                                <textarea class="form-control form-control-sm" id="inputContenido' + contador + '" name="inputContenido' + contador + '" rows="1"></textarea>\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-6" id="blqObserv' + contador + '">\n\
                                <label for="inputObserv' + contador + '">Observaciones/Complemento</label>\n\
                                <textarea class="form-control form-control-sm" id="inputObserv' + contador + '" name="inputObserv' + contador + '" rows="1"></textarea>\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-3" id="blqRecaudo' + contador + '">\n\
                                <label class="control-label" for="inputRecaudo' + contador + '">Recaudo</label>\n\
                                <div class="form-group">\n\
                                    <div class="input-group mb-3 input-group-sm">\n\
                                        <div class="input-group-prepend">\n\
                                            <span class="input-group-text">$</span>\n\
                                        </div>\n\
                                        <input type="number" class="form-control form-control-sm" id="inputRecaudo' + contador + '" name="inputRecaudo' + contador + '" aria-label="Amount (to the nearest dollar)">\n\
                                        <div class="input-group-append">\n\
                                            <span class="input-group-text">m/c</span>\n\
                                        </div>\n\
                                    </div>\n\
                                </div>\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-3">\n\
                                <label for="selectTipoPago' + contador + '">Tipo Pago</label>\n\
                                <select class="form-control form-control-sm" id="selectTipoPago' + contador + '" name="selectTipoPago' + contador + '">\n\
                                </select>\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-3" id="blqValorTipoPago' + contador + '">\n\
                                <label class="control-label" for="inputValorTipoPago' + contador + '">Valor Pago</label>\n\
                                <div class="form-group">\n\
                                    <div class="input-group mb-3 input-group-sm">\n\
                                        <div class="input-group-prepend">\n\
                                            <span class="input-group-text">$</span>\n\
                                        </div>\n\
                                        <input type="number" class="form-control form-control-sm" id="inputValorTipoPago' + contador + '" name="inputValorTipoPago' + contador + '" aria-label="Amount (to the nearest dollar)">\n\
                                        <div class="input-group-append">\n\
                                            <span class="input-group-text">m/c</span>\n\
                                        </div>\n\
                                    </div>\n\
                                </div>\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-3" id="blqValorDecl' + contador + '">\n\
                                <label class="control-label" for="inputValorDecl' + contador + '">Valor Declarado</label>\n\
                                <div class="form-group">\n\
                                    <div class="input-group mb-3 input-group-sm">\n\
                                        <div class="input-group-prepend">\n\
                                            <span class="input-group-text">$</span>\n\
                                        </div>\n\
                                        <input type="number" class="form-control form-control-sm" id="inputValorDecl' + contador + '" name="inputValorDecl' + contador + '" aria-label="Amount (to the nearest dollar)">\n\
                                        <div class="input-group-append">\n\
                                            <span class="input-group-text">m/c</span>\n\
                                        </div>\n\
                                    </div>\n\
                                </div>\n\
                            </div></div></div>');
        //en esta parte se agrega el elemento div contenedor para otro formulario
        $("#parentControl").append('<div id="f' + parseInt(contador + 1) + '" class="alert alert-dismissible alert-primary col-lg-12 border-light" style="border-radius: 0.5rem;"></div>');
        combo_tipo_envio('#selectTipEnvio' + contador + '');
        combo_ciudad('#selectCiudDestino' + contador + '');
        combo_tipo_pago('#selectTipoPago' + contador + '');
        $("#inputContador").val(parseInt(contador));
        bloquearCampoNumEnvios(id_tipo_envio, '#inputCantidadEnv' + contador + '');
    } else {
        alertify.alert("MAXIMO EXCEDIDO", "Maximo 10 Formularios, para mas envios diligencie la plantilla de excel.");
    }

}
/**
 * Variable global que almacena la cantidad de campos agregados al formulario
 * @type Number
 */
var contador_cl_suc = 0;
/**
 * Metodo que agrega seccion de campos en formulario en la vista cliente y sucursal
 * @returns {undefined}
 */
function formularios_envio_cl() {
    if (contador_cl_suc <= 8) {
        contador_cl_suc += 1;
        $('#sec' + contador_cl_suc + '').html('<div class="form-group form-group-sm col-lg-2">\n\
                                <label for="inputCantidadEnv' + contador_cl_suc + '">Cantidad</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputCantidadEnv' + contador_cl_suc + '" name="inputCantidadEnv' + contador_cl_suc + '" placeholder="N° Envios" required>\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-2">\n\
                                <label for="inputRefGuia' + contador_cl_suc + '">Referencia</label>\n\
                                <input type="text" class="form-control form-control-sm" id="inputRefGuia' + contador_cl_suc + '" name="inputRefGuia' + contador_cl_suc + '" placeholder="Referencia">\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-2" id="blqPeso' + contador_cl_suc + '">\n\
                                <label for="inputPeso' + contador_cl_suc + '">Peso Kg  /x und</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputPeso' + contador_cl_suc + '" name="inputPeso' + contador_cl_suc + '" placeholder="Peso Kg">\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-2" id="blqAlto' + contador_cl_suc + '">\n\
                                <label for="inputAlto' + contador_cl_suc + '">Alto cm  /x und</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputAlto' + contador_cl_suc + '" name="inputAlto' + contador_cl_suc + '" placeholder="Alto cm">\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-2" id="blqAncho' + contador_cl_suc + '">\n\
                                <label for="inputAncho' + contador_cl_suc + '">Ancho cm  /x und</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputAncho' + contador_cl_suc + '" name="inputAncho' + contador_cl_suc + '" placeholder="Ancho cm">\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-2" id="blqLargo' + contador_cl_suc + '">\n\
                                <label for="inputLargo' + contador_cl_suc + '">Largo cm  /x und</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputLargo' + contador_cl_suc + '" name="inputLargo' + contador_cl_suc + '" placeholder="Largo cm">\n\
                            </div>');
        //en esta parte se agrega el elemento div contenedor para otro formulario
        $("#parentSec").append('<div id="sec' + parseInt(contador_cl_suc + 1) + '" class="row px-3"></div>');

        $("#inputContador").val(parseInt(contador_cl_suc));
    } else {
        alertify.alert("MAXIMO EXCEDIDO", "Maximo 10 Formularios, para mas envios diligencie la plantilla de excel.");
    }

}
/**
 * Metodo que elimina un formulario en la vista
 * @returns {undefined}
 */
function elimina_formularios_envio() {
    if (contador >= 1) {
        $('#f' + contador + '').remove();
        $('#f' + parseInt(contador + 1) + '').remove();
        contador -= 1;
        $("#parentControl").append('<div id="f' + parseInt(contador + 1) + '" class="alert alert-dismissible alert-primary col-lg-12 border-light" style="border-radius: 0.5rem;"></div>');
        $("#inputContador").val(parseInt(contador));
    } else {
        alert("No existe elemento para eliminar");
    }
}
/**
 * Metodo que elimina una seccion de campos en el formulario en vista cliente y sucursal
 * @returns {undefined}
 */
function elimina_formularios_envio_cl() {
    if (contador_cl_suc >= 1) {
        $('#sec' + contador_cl_suc + '').remove();
        $('#sec' + parseInt(contador_cl_suc + 1) + '').remove();
        contador_cl_suc -= 1;
        $("#parentSec").append('<div id="sec' + parseInt(contador_cl_suc + 1) + '" class="row px-3"></div>');
        $("#inputContador").val(parseInt(contador_cl_suc));
    } else {
        alert("No existe elemento para eliminar");
    }
}
/**
 * Metodo que permite seleccionar la forma de carga de envios
 * @returns {undefined}
 */
function seleccionCargaEnvios() {
    $(".op").click(function () {
        if ($(this).val() == 'formulario') {
            $("#blqCargaExcel").hide();
            $("#formEnvios").show();
        } else if ($(this).val() == 'excel') {
            $("#blqCargaExcel").show();
            $("#formEnvios").hide();
        }

    });
}

/*******************************************************************************
 /*************Metodos de carga masiva por archivo xlsx**************************
 /*******************************************************************************
 /**
 * Metodo que se encarga de guardar un fichero en la carpeta raiz del servidor
 * @returns {undefined}
 */
function cargaArchivoEnvDocum() {
    var creando = "<div class='col-lg-3'><span>Loading...</span></div>\n\
             <div class='col-lg-4'><img class='img-fluid' src='img/animaciones/masivo_mensajeria3.gif' alt=''/></div>\n\
            <div class='col-lg-5'><span>Epere un momento por favor</span></div>";
    $("#changeEnvios").html(creando);
    request = "Controller/ClienteC/carga_masiva_env_doc_controller.php";
    cadena = new FormData($("#formMasEnvDoc")[0]);
    metodo = function (datos) {
        $("#textMasEnvDoc").html("");
        limpiarFormulario("#formMasEnvDoc");
        if (datos == 2) {
            lectura_xlsx();
        } else if (datos == 1) {
            lectura_csv();
        } else {
            $("#tabEnviosDocum").html(datos);
        }
    };
    f_ajax_files(request, cadena, metodo);
}
/**
 * Metodo que lee los datos del archivo excel subido por el usuario
 * @returns {undefined}
 */
function lectura_xlsx() {
    request = "Controller/ClienteC/leer_xlsx_controller.php";
    cadena = "a=1";
    metodo = function (datos) {
        $("#changeEnvios").html(datos);
        if ($("#tableEnvios").length > 0) {
            /**
             * Evento que pagina una tabla 
             */  $('#tableEnvios').DataTable({
                'scrollX': true
            });

            $("#formMasEnvDoc").hide();
            $("#blqSelectModoCarga").hide();
            $("#mensajeCompletar").hide();
            $("#blqCargaExcel").removeClass("alert-primary");
            $("#blqCargaExcel").addClass("alert-light");
            pagInicio = $("#inputHojaDesde").val();
            pagFin = $("#inputHojaHasta").val();
            cargaRango();
            $("#btnGenImp").click(function () {
                validarImprimirRem();
            });
            $("#inputNumOS").val(num_os);
        }

    };
    f_ajax(request, cadena, metodo);
}
/*******************************************************************************
 /********************Metodos de impresion de Guias******************************
 /*******************************************************************************
 /*
 * Variables globales de numero de pagina inicial y final para impresion de guias en pdf
 */
var pagInicio = $("#inputHojaDesde").val();

var pagFin = $("#inputHojaHasta").val();
/**
 * Metodo que captura en la carga el valor del dato ingresado en el formulario
 * @returns {undefined}
 */
function cargaRango() {
    $("#inputHojaDesde").change(function () {
        pagInicio = $("#inputHojaDesde").val();
    });
    $("#inputHojaHasta").change(function () {
        pagFin = $("#inputHojaHasta").val();
    });
}
/**
 * Metodo que valida reglas de ingreso de datos de paginas para impresion
 * @returns {undefined}
 */
function validaRango() {
    if (parseInt(pagInicio) > parseInt(pagFin)) {
        alert("La página inicial no puede ser menor que la página final");
        $("#menErrorImprimir").html("<div class='alert alert-dismissible alert-danger'><strong>Cuidado!</strong> La página inicial no puede ser menor que la página final.</div>");
    } else {
        if (parseInt(pagFin) > (parseInt(pagInicio) + 299)) {
            alert("El rango de impresion no debe superar las 300 páginas");
            $("#menErrorImprimir").html("<div class='alert alert-dismissible alert-warning'><strong>Cuidado!</strong> El rango de impresion no debe superar las 300 páginas.</div>");
        } else {
            enviarImpresion();
        }
    }
}
/**
 * Metodo que envia los datos del formulario de impresion para procesarlos
 * @returns {undefined}
 */
function enviarImpresion() {
    $("#menErrorImprimir").html("<img class='img-fluid' src='img/animaciones/loading.gif' alt=''/>");
    request = "Controller/ClienteC/consultar_pag_impresion_controller.php";
    cadena = $("#formImprimirRem").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        $("#menErrorImprimir").html(datos);
        //        $(location).attr('href', 'Files/GuiasPDF_temp/' + num_doc + '_' + td_doc + '/' + num_doc + '.pdf');
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo de validacion de campos en formulario de impresion
 * @returns {undefined}
 */
function validarImprimirRem() {

    $("#formImprimirRem").validate({
        rules: {
            inputHojaDesde: {
                required: true,
                min: 1
            },
            inputHojaHasta: {
                required: true,
                min: 1
            }
        },
        submitHandler: function (form) {
            validaRango();
        }
    });
}
/**
 * Metodo que inserta envios o mercancia en las tablas correspondientes
 * las funciones de php requieren en algunos casos de la sesión activa
 * metodo obsoleto
 * @returns {undefined}
 */
function insertarEnvios() {
    if (tipo_envio !== "MENSAJERIA" && tipo_envio !== "RADICACIÓN DOCUMENTOS") {
        request = "Controller/ClienteC/insertar_mercancia_controller.php";
    } else {
        request = "Controller/ClienteC/insertar_envio_controller.php";
    }
    cadena = $("#formEnvios").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        $("#changeEnviosMens").html(datos);

        if ($("#tableEnvios").length > 0) {
            /**
             * Evento que pagina una tabla 
             */
            $('#tableEnvios').DataTable({
                'scrollX': true
            });

            limpiarFormulario("#formEnvios");
            $("#formEnvios").hide();
            $("#blqSelectModoCarga").hide();
            $("#mensajeCompletar").hide();
            //            $("#blqCargaExcel").removeClass("alert-primary");
            //            $("#blqCargaExcel").addClass("alert-light");


            pagInicio = $("#inputHojaDesde").val();
            pagFin = $("#inputHojaHasta").val();
            cargaRango();
            $("#btnGenImp").click(function () {
                validarImprimirRem();
            });
            $("#inputNumOS").val(num_os);

        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que inserta envios o mercancia en las tablas correspondientes
 * las funciones de php requieren en algunos casos de la sesión activa
 * @returns {undefined}
 */
function insertarEnvios_v2() {
    request = "Controller/AdminC/AdministrarEnvios/insertar_envios_adm_controller.php";
    cadena = $("#formEnvios").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        $("#changeEnviosMens").html(datos);

        if ($("#tableEnvios").length > 0) {
            /**
             * Evento que pagina una tabla 
             */
            $('#tableEnvios').DataTable({
                'scrollX': true
            });

            limpiarFormulario("#formEnvios");
            $("#formEnvios").hide();
            $("#blqSelectModoCarga").hide();
            $("#mensajeCompletar").hide();

            pagInicio = $("#inputHojaDesde").val();
            pagFin = $("#inputHojaHasta").val();
            cargaRango();
            $("#btnGenImp").click(function () {
                validarImprimirRem();
            });
            $("#inputNumOS").val(num_os);

        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que inserta envios o mercancia en las tablas correspondientes
 * las funciones de php requieren en algunos casos de la sesión activa
 * @returns {undefined}
 */
function insertarEnvios_v2_cl() {
    request = "Controller/ClienteC/insertar_envios_cl_suc_controller.php";
    cadena = $("#formEnvios").serialize(); //envio de parametros por POST
    metodo = function (datos) {

        if (datos == 2) {
            alert("error al insertar estado envio");
        } else if (datos == 3) {
            alert("error al insertar envio");
        } else {
            $("#changeEnviosMens").html(datos);
            $("#btnNuevoServ").prop('disabled', false);
            $("#btnNuevoServ").click(function () {
                resetFormOrdServ();
                formulario_recolec();
            });
            $(".form-control").prop("readonly", true);

            $("#btnGuardarFin").click(false);
            $("#btnGuardarFin").prop('disabled', true);

            $("#btnMas").click(false);
            $("#btnMas").prop('disabled', true);

            $("#btnMenos").click(false);
            $("#btnMenos").prop('disabled', true);
        }
    };
    f_ajax(request, cadena, metodo);
}
/*******************************************************************************
 /*************Metodos de carga masiva por archivo xlsx para alistamiento********
 /*******************************************************************************
 /**
 * Metodo que trae a la vista el formulario de alistamiento xlsx
 * @returns {undefined}
 */
function formulario_alistamiento_xlsx() {
    request = "View/AdministradorV/OrdenesServicio/form_xlsx_alista.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#sectionDatOS").html(datos);

        temp = arreglo_dat_os[0];
        ciudad = temp.ciu_nombre;
        direccion = temp.os_direccion;
        tipo_envio = temp.te_desc;
        tipo_servi = temp.ts_desc;

        $("#inputNumOrdServ").val(num_os);
        $("#inputContador").val(parseInt(contador));

        $("#divMensaje").html("<legend id='legTitulo'>Orden N° " + num_os + "</legend>\n\
            <strong>Lugar de Recolección: </strong>" + direccion + " " + ciudad + "<br>\n\
                <strong>Tipo de Envio: </strong>" + tipo_envio + "<br>\n\
        <strong>Tipo Servicio: </strong>" + tipo_servi);
        $("#btnGMasAlist").click(function () {
            validarMasivoEnviosAlist();
        });
        $("#sectionConten").hide();
        nameFileCargaMasEnvAlist();
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que trae a la vista el formulario de alistamiento xlsx para orden desde dashboard
 * @returns {undefined}
 */
function formulario_alistamiento_xlsx_dash() {
    request = "View/AdministradorV/OrdenesServicio/form_xlsx_alist_dash.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#sectionDatOS").html(datos);

        temp = arreglo_dat_os[0];
        ciudad = temp.ciu_nombre;
        direccion = temp.os_direccion;
        tipo_envio = temp.te_desc;
        tipo_servi = temp.ts_desc;
        td_cli = temp.cli_td_id;
        num_doc_cli = temp.cli_num_doc;
        ciu_id = temp.ciu_id;
        id_serv = temp.ts_id;
        id_env = temp.te_id;
        id_suc = temp.suc_num_id;

        $("#inputNumOrd").val(num_os);
        $("#inputTdCli").val(td_cli);
        $("#inputNumDocCli").val(num_doc_cli);
        $("#inputCiuId").val(ciu_id);
        $("#inputTipoServ").val(id_serv);
        $("#inputTipoEnv").val(id_env);
        $("#inputNumSuc").val(id_suc);
        $("#inputContador").val(parseInt(contador));

        $("#divMensaje").html("<legend id='legTitulo'>Orden N° " + num_os + "</legend>\n\
            <strong>Lugar de Recolección: </strong>" + direccion + " " + ciudad + "<br>\n\
                <strong>Tipo de Envio: </strong>" + tipo_envio + "<br>\n\
        <strong>Tipo Servicio: </strong>" + tipo_servi);
        $("#btnGMasAlist").click(function () {
            validarMasivoEnviosAlistDash();
        });
        $("#sectionConten").hide();
        nameFileCargaMasEnvAlist();
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo de validacion Carga masiva de envios documentos xlsx
 * @returns {undefined}
 */
function validarMasivoEnviosAlist() {
    $("#formMasAlistamiento").validate({
        errorLabelContainer: '#errorTxt',
        rules: {
            inpFileMasAlist: {
                required: true,
                extension: "xlsx"
            },
            inputDateAlist: {
                required: true,
                date: true
            }
        },
        messages: {
            inpFileMasAlist: {
                extension: "Extensión no valida, debe ser xlsx",
                required: "El campo Excel es obligatorio"
            },
            inputDateAlist: {
                required: "El campo Fecha es Requerido.. "
            }
        }, submitHandler: function (form) {
            cargaArchivo_xlsx_alist();
        }
    });
}
/**
 * Metodo de validacion Carga masiva de envios documentos xlsx
 * @returns {undefined}
 */
function validarMasivoEnviosAlistDash() {
    $("#formMasAlistamiento").validate({
        errorLabelContainer: '#errorTxt',
        rules: {
            inpFileMasAlist: {
                required: true,
                extension: "xlsx"
            },
            inputDateAlist: {
                required: true,
                date: true
            }
        },
        messages: {
            inpFileMasAlist: {
                extension: "Extensión no valida, debe ser xlsx",
                required: "El campo Excel es obligatorio"
            },
            inputDateAlist: {
                required: "El campo Fecha es Requerido.. "
            }
        }, submitHandler: function (form) {
            cargaArchivo_xlsx_alist_dash();
        }
    });
}
/**
 * Metodo que plasma nombre archivo en carga masiva envios alistamiento
 * @returns {undefined}
 */
function nameFileCargaMasEnvAlist() {
    $("#inpFileMasAlist").change(function () {
        nombre = $("#inpFileMasAlist").val();
        //        if (nombre.substring(3,11) == 'fakepath') {
        //            nombre = nombre.substring(12);
        //        }
        $("#textMasAlist").text(nombre);
    });
}

/**
 * Metodo que se encarga de guardar un fichero en la carpeta temporal de alistamiento
 * @returns {undefined}
 */
function cargaArchivo_xlsx_alist() {
    var creando = "<div class='col-lg-3'><span>Loading...</span></div>\n\
        <div class='col-lg-4'><img class='img-fluid' src='img/animaciones/masivo_mensajeria3.gif' alt=''/></div>\n\
<div class='col-lg-5'><span>Epere un momento por favor</span></div>";
    $("#changeAlistEnvios").html(creando);
    request = "Controller/AdminC/AdministrarOS/cargar_xlsx_alist_v2_controller.php";
    cadena = new FormData($("#formMasAlistamiento")[0]);
    metodo = function (datos) {
        $("#textMasAlist").html("");
        limpiarFormulario("#formMasAlistamiento");

        $("#changeAlistEnvios").html(datos);
        $("#formMasAlistamiento").hide();
        cargaProdAlistamiento(id_suc_sel);

//        if (datos == 1) {
//            lectura_xlsx_alist();
//        } else {
//            $("#changeAlistEnvios").html(datos);
//        }
    };
    f_ajax_files(request, cadena, metodo);
}
/**
 * Metodo que se encarga de guardar un fichero en la carpeta temporal de alistamiento
 * @returns {undefined}
 */
function cargaArchivo_xlsx_alist_dash() {
    var creando = "<div class='col-lg-3'><span>Loading...</span></div>\n\
        <div class='col-lg-4'><img class='img-fluid' src='img/animaciones/masivo_mensajeria3.gif' alt=''/></div>\n\
<div class='col-lg-5'><span>Epere un momento por favor</span></div>";
    $("#changeAlistEnvios").html(creando);
    request = "Controller/AdminC/AdministrarOS/cargar_xlsx_alist_v3_controller.php";
    cadena = new FormData($("#formMasAlistamiento")[0]);
    metodo = function (datos) {
        $("#textMasAlist").html("");
        limpiarFormulario("#formMasAlistamiento");


        $("#changeAlistEnvios").html(datos);
        $("#formMasAlistamiento").hide();
        temp = arreglo_dat_os[0];
        cargaProdAlistamiento(temp.suc_num_id);


//        if (datos == 1) {
//            lectura_xlsx_alist_dash();
//        } else {
//            $("#changeAlistEnvios").html(datos);
//        }
    };
    f_ajax_files(request, cadena, metodo);
}
/**
 * Metodo que lee los datos del archivo excel subido para alistamiento
 * @returns {undefined}
 */ function lectura_xlsx_alist() {
    request = "Controller/AdminC/AdministrarOS/leer_xlsx_alist_v2_controller.php";
    cadena = "a=1";
    metodo = function (datos) {
        $("#changeAlistEnvios").html(datos);
        $("#formMasAlistamiento").hide();
        cargaProdAlistamiento(id_suc_sel);
        //        datos_os_picking_en_proceso();
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que lee los datos del archivo excel subido para alistamiento
 * @returns {undefined}
 */ function lectura_xlsx_alist_dash() {
    request = "Controller/AdminC/AdministrarOS/leer_xlsx_alist_v3_controller.php";
    cadena = "a=1";
    metodo = function (datos) {
        $("#changeAlistEnvios").html(datos);
        $("#formMasAlistamiento").hide();
        temp = arreglo_dat_os[0];
        cargaProdAlistamiento(temp.suc_num_id);
        //        datos_os_picking_en_proceso();
    };
    f_ajax(request, cadena, metodo);
}
var pag;
var can_vent_als;
var arregloAlista;
var item_act = false;
/*
 * Metodo que carga la vista de las ventas en proceso de alistamiento segun una sucursal
 * @param {type} id_suc
 * @returns {cargaProdAlistamiento}
 */
function cargaProdAlistamiento(id_suc) {
//    if (alst_guia == true) {
//        if (filtro_guia.substr(0, 1) == "{") {
//            dato = $.parseJSON(filtro_guia);
//            filtro_guia = dato.id;
//        }
//        request = "Controller/AdminC/AdministrarOS/consulta_alist_prod_st_guia_controller.php";
//        cadena = {"inp_id_sucursal": id_suc, "inp_num_guia": filtro_guia};
//        alst_guia = false;
//        filtro_guia = "";
//    } else {
    $("#bloques").html('<img src="img/animaciones/loader.gif" alt=""/>');
    request = "Controller/AdminC/AdministrarOS/consulta_alist_prod_stock_controller.php";
    cadena = {"inp_id_sucursal": id_suc};
//    }

    metodo = function (datos) {
        //        $("#blqPagina1").html(datos);
//        alert(datos);
        arregloAlista = $.parseJSON(datos);

        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloAlista !== 0) {

            venta = 0;
            blq = 0;
            pag = 1;
//            icon = "";
            datosAlist = '<div class="form-group row" id="formBuscaGuiaOp">\n\
                    <label for="inputGuiaNum" class="col-sm-1 col-form-label">Buscar</label>\n\
                    <div class="col-sm-3">\n\
                    <input type="text" class="form-control form-control-sm" id="inputGuiaNum" name="inputGuiaNum" placeholder="N° Guia">\n\
                            </div>\n\
                        </div>';
            //            datosAlist += '<div><button type="button" class="btn btn-success float-right" id="btnSaveAllVentas" name="btnSaveAllVentas">Guaradar Todo</button></div>';

            for (i = 0; i < arregloAlista.length; i++) {
                tmp = arregloAlista[i];



                if (tmp.total <= 0 || tmp.estimado < 0) {
                    tema = 'danger';
                    icon = '<span class="ion-android-settings text-danger"></span>';
                    checked = '';
                } else if (tmp.t_sal_cantidad >= 2) {
                    tema = 'info';
                    icon = '<span class="ion-android-cloud-done text-success"></span>';
                    checked = 'checked = ""';
                } else {
                    tema = 'warning';
                    icon = '<span class="ion-android-cloud-done text-success"></span>';
                    checked = 'checked = ""';
                }

                if (i === 0) {
                    //******primera fila****//
                    datosAlist += '<div class="bloque" id="blqPagina' + pag + '"><h4>HOJA ' + pag + '</h4>';
                    datosAlist += '<div id="sec' + tmp.t_sal_guia_num + '" secguia="' + tmp.t_sal_guia_num + '" class="est_section"><div class="alert alert-dismissible alert-' + tema + ' col-lg-12 border-warning estblq" id="blqAlist' + blq + '" style="border-radius: 0.5rem;">\n\
                    <div class="row">\n\
                        <div class="col-4"><strong>N° VENTA: <b class="text-primary">' + tmp.t_sal_num_venta + ' </b></strong></div>\n\
                        <div class="col-4"><strong>N° GUIA: <b class="text-success">' + tmp.t_sal_guia_num + ' </b></strong></div>\n\
                        <div class="form-group col-2">\n\
                          <input type="text" class="form-control form-control-sm inpBlq" blinp="' + blq + '" id="inpCodProd' + blq + '" nameinp="' + tmp.t_sal_guia_num + '" placeholder="Cod. Produto">\n\
                        </div>\n\
                        <div class="form-group col-2">\n\
                          <div class="custom-control custom-switch">\n\
                          <input type="checkbox" class="custom-control-input cheBlq" vent="' + tmp.t_sal_num_venta + '" che="' + i + '" id="' + blq + '" ' + checked + '>\n\
                    <label class="custom-control-label" for="' + blq + '">OK</label>\n\
                        </div></div></div>';
                    datosAlist += '<div class="dropdown-divider"></div>\n\
                        <div class="table-responsive text-nowrap">\n\
                    <table class="table table-hover table-sm table-fixed" id="tab' + tmp.t_sal_num_venta + '">\n\
                    <thead><tr class="table-primary">\n\
                        <th scope="col">VER</th>\n\
                        <th scope="col">SKU</th>\n\
                        <th scope="col">UB</th>\n\
                        <th scope="col">UNS</th>\n\
                        <th scope="col">PRODUCTO</th>\n\
                        <th scope="col">COD</th>\n\
                        <th scope="col">STOCK</th>\n\
                        <th scope="col">TEÓRICO</th>\n\
                        <th scope="col"><span class="ion-android-clipboard"></span></th>\n\
                        </tr></thead><tbody>';
                    if (tema == 'danger') {
                        displ_no_proces = 'block';
                        displ_proces = 'none';
                    } else {
                        displ_no_proces = 'none';
                        displ_proces = 'block';
                    }

                    blq++;
                    datosAlist += '<tr class="table-' + tema + ' estfila" id="fila' + tmp.t_csc + '">';
                    datosAlist += '<td id="tdcheck' + tmp.t_csc + '" elch="' + (parseInt(blq) - 1) + '"><input type="checkbox" class="cheitem" id="Check' + (parseInt(blq) - 1) + tmp.pro_cod + '" required></td>';
                    datosAlist += '<td id="td1' + tmp.t_csc + '">' + tmp.pro_sku + '</td>';
                    datosAlist += '<td id="td3' + tmp.t_csc + '" style="background-color: #ddb6f7"><b>' + tmp.pro_ubicacion + '</b></td>';
                    if (tmp.t_sal_cantidad >= 2) {
                        datosAlist += '<td id="td5' + tmp.t_csc + '"><h4><b>' + tmp.t_sal_cantidad + '</b></h4></td>';
                    } else {
                        datosAlist += '<td id="td5' + tmp.t_csc + '">' + tmp.t_sal_cantidad + '</td>';
                    }
                    datosAlist += '<td id="td7' + tmp.t_csc + '">' + tmp.pro_desc + '</td>';
                    datosAlist += '<td id="td2' + tmp.t_csc + '">' + tmp.pro_cod + '</td>';
                    datosAlist += '<td id="td4' + tmp.t_csc + '">' + tmp.total + '</td>';
                    datosAlist += '<td id="td6' + tmp.t_csc + '">' + tmp.estimado + '</td>';
                    datosAlist += '<td class="enlace editProduc" id="producto' + i + '" edPro="' + tmp.t_csc + '">' + icon + '</td></tr>';

                    if (i === arregloAlista[arregloAlista.length - 1]) {

                        datosAlist += '</tbody></table></div>\n\
                          <div class="row justify-content-end">\n\
                          <div class="col-7">\n\
                        <input class="form-control form-control-sm" type="text" id="inputNovedad' + venta + ';" name="inputNovedad' + venta + '" placeholder="Novedad">\n\
                    </div>\n\
                    <div class="col-3" id="divBtn' + (parseInt(blq) - 1) + '" style="display: ' + displ_proces + '">\n\
                        <button class="btn btn-success ventguardar" type="button" btAddVe="' + venta + '" id="btnGuardVent' + venta + '" name="btnGuardVent' + venta + '">Go!</button>\n\
                            </div>\n\
                            <div class="col-3" id="divBtnCan' + (parseInt(blq) - 1) + '" style="display: ' + displ_no_proces + ';">\n\
                            <button class="btn btn-danger ventcancel" type="button" btCanVe="' + venta + '" id="btnCancelVent' + venta + '" name="btnCancelVent' + venta + '">Stop!</button>\n\
                          </div>\n\
                            <div class="col-2" id="inpGif' + venta + '">\n\
                          </div>\n\
                            </div>\n\
                          </div></div>';//fin de la tabla
                        datosAlist += '</div>';//fin de la pag

                    } else {
                        venta = tmp.t_sal_num_venta;
                    }
                } else {
                    //***suiguientes filas del arreglo**//

                    if (i === arregloAlista[arregloAlista.length - 1]) {
                        //***si es la ultima fila del arreglo**//
                        if (tmp.t_sal_num_venta == venta) {
                            //***si es la misma venta de la fila anterior**//
                            datosAlist += '<tr class="table-' + tema + ' estfila" id="fila' + tmp.t_csc + '">';
                            datosAlist += '<td id="tdcheck' + tmp.t_csc + '" elch="' + (parseInt(blq) - 1) + '"><input type="checkbox" class="cheitem" id="Check' + (parseInt(blq) - 1) + tmp.pro_cod + '" required></td>';
                            datosAlist += '<td id="td1' + tmp.t_csc + '">' + tmp.pro_sku + '</td>';
                            datosAlist += '<td id="td3' + tmp.t_csc + '" style="background-color: #ddb6f7"><b>' + tmp.pro_ubicacion + '</b></td>';
                            if (tmp.t_sal_cantidad >= 2) {
                                datosAlist += '<td id="td5' + tmp.t_csc + '"><h4><b>' + tmp.t_sal_cantidad + '</b></h4></td>';
                            } else {
                                datosAlist += '<td id="td5' + tmp.t_csc + '">' + tmp.t_sal_cantidad + '</td>';
                            }
                            datosAlist += '<td id="td7' + tmp.t_csc + '">' + tmp.pro_desc + '</td>';
                            datosAlist += '<td id="td2' + tmp.t_csc + '">' + tmp.pro_cod + '</td>';
                            datosAlist += '<td id="td4' + tmp.t_csc + '">' + tmp.total + '</td>';
                            datosAlist += '<td id="td6' + tmp.t_csc + '">' + tmp.estimado + '</td>';
                            datosAlist += '<td class="enlace editProduc" id="producto' + i + '" edPro="' + tmp.t_csc + '">' + icon + '</td></tr>';

                            datosAlist += '</tbody></table></div>\n\
                              <div class="row justify-content-end">\n\
                              <div class="col-7">\n\
                        <input class="form-control form-control-sm" type="text" id="inputNovedad' + venta + '" name="inputNovedad' + venta + '" placeholder="Novedad">\n\
                            </div>\n\
                            <div class="col-3" id="divBtn' + (parseInt(blq) - 1) + '" style="display: ' + displ_proces + ';">\n\
                                <button class="btn btn-success ventguardar" type="button" btAddVe="' + venta + '" id="btnGuardVent' + venta + '" name="btnGuardVent' + venta + '">Go!</button>\n\
                              </div>\n\
                              <div class="col-3" id="divBtnCan' + (parseInt(blq) - 1) + '" style="display: ' + displ_no_proces + ';">\n\
                                <button class="btn btn-danger ventcancel" type="button" btCanVe="' + venta + '" id="btnCancelVent' + venta + '" name="btnCancelVent' + venta + '">Stop!</button>\n\
                              </div>\n\
                              <div class="col-2" id="inpGif' + venta + '">\n\
                              </div>\n\
                              </div>\n\
                            </div></div>';//fin de la tabla
                            datosAlist += '</div>';//fin de la pag
                        } else {
                            //***NO es la misma venta de la fila anterior**//

                            datosAlist += '</tbody></table></div>\n\
                              <div class="row justify-content-end">\n\
                              <div class="col-7">\n\
                                <input class="form-control form-control-sm" type="text" id="inputNovedad' + venta + '" name="inputNovedad' + venta + '" placeholder="Novedad">\n\
                              </div>\n\
                                <div class="col-3" id="divBtn' + (parseInt(blq) - 1) + '" style="display: ' + displ_proces + ';">\n\
                            <button class="btn btn-success ventguardar" type="button" btAddVe="' + venta + '" id="btnGuardVent' + venta + '" name="btnGuardVent' + venta + '">Go!</button>\n\                               </div>\n\
                              <div class="col-3" id="divBtnCan' + (parseInt(blq) - 1) + '" style="display: ' + displ_no_proces + ';">\n\
                                <button class="btn btn-danger ventcancel" type="button" btCanVe="' + venta + '" id="btnCancelVent' + venta + '" name="btnCancelVent' + venta + '">Stop!</button>\n\
                              </div>\n\
                              <div class="col-2" id="inpGif' + venta + '">\n\
                              </div>\n\
                              </div>\n\
                            </div></div>';//fin de la tabla

                            if (blq % 20 == 0) {
                                datosAlist += '</div>';//fin de la pag
                                pag++;
                                datosAlist += '<div class="bloque" id="blqPagina' + pag + '" style="display: none;"><h4>HOJA ' + pag + '</h4>';
                            }

                            datosAlist += '<div id="sec' + tmp.t_sal_guia_num + '" secguia="' + tmp.t_sal_guia_num + '" class="est_section"><div class="alert alert-dismissible alert-' + tema + ' col-lg-12 border-warning estblq" id="blqAlist' + blq + '" style="border-radius: 0.5rem;">\n\
                                <div class="row">\n\
                            <div class="col-4"><strong>N° VENTA: <b class="text-primary">' + tmp.t_sal_num_venta + ' </b></strong></div>\n\
                                <div class="col-4"><strong>N° GUIA: <b class="text-success">' + tmp.t_sal_guia_num + ' </b></strong></div>\n\
                                <div class="form-group col-2">\n\
                                  <input type="text" class="form-control form-control-sm inpBlq" blinp="' + blq + '" id="inpCodProd' + blq + '" nameinp="' + tmp.t_sal_guia_num + '" placeholder="Cod. Produto">\n\
                                </div>\n\
                                <div class="form-group col-2">\n\
                                  <div class="custom-control custom-switch">\n\
                                  <input type="checkbox" class="custom-control-input cheBlq" vent="' + tmp.t_sal_num_venta + '" che="' + i + '" id="' + blq + '" ' + checked + '>\n\
                                  <label class="custom-control-label" for="' + blq + '">OK</label>\n\
                                </div></div></div>';
                            datosAlist += '<div class="dropdown-divider"></div>\n\
                                <div class="table-responsive text-nowrap">\n\
                            <table class="table table-hover table-sm table-fixed" id="tab' + tmp.t_sal_num_venta + '">\n\
                            <thead><tr class="table-primary">\n\
                                <th scope="col">VER</th>\n\
                                <th scope="col">SKU</th>\n\
                                <th scope="col">UB</th>\n\
                                <th scope="col">UNS</th>\n\
                                <th scope="col">PRODUCTO</th>\n\
                                <th scope="col">COD</th>\n\
                                <th scope="col">STOCK</th>\n\
                                <th scope="col">TEÓRICO</th>\n\
                                <th scope="col"><span class="ion-android-clipboard"></span></th>\n\
                                </tr></thead><tbody>';
                            if (tema == 'danger') {
                                displ_no_proces = 'block';
                                displ_proces = 'none';
                            } else {
                                displ_no_proces = 'none';
                                displ_proces = 'block';
                            }
                            blq++;

                            datosAlist += '<tr class="table-' + tema + ' estfila" id="fila' + tmp.t_csc + '">';
                            datosAlist += '<td id="tdcheck' + tmp.t_csc + '" elch="' + (parseInt(blq) - 1) + '"><input type="checkbox" class="cheitem" id="Check' + (parseInt(blq) - 1) + tmp.pro_cod + '" required></td>';
                            datosAlist += '<td id="td1' + tmp.t_csc + '">' + tmp.pro_sku + '</td>';
                            datosAlist += '<td id="td3' + tmp.t_csc + '" style="background-color: #ddb6f7"><b>' + tmp.pro_ubicacion + '</b></td>';
                            if (tmp.t_sal_cantidad >= 2) {
                                datosAlist += '<td id="td5' + tmp.t_csc + '"><h4><b>' + tmp.t_sal_cantidad + '</b></h4></td>';
                            } else {
                                datosAlist += '<td id="td5' + tmp.t_csc + '">' + tmp.t_sal_cantidad + '</td>';
                            }
                            datosAlist += '<td id="td7' + tmp.t_csc + '">' + tmp.pro_desc + '</td>';
                            datosAlist += '<td id="td2' + tmp.t_csc + '">' + tmp.pro_cod + '</td>';
                            datosAlist += '<td id="td4' + tmp.t_csc + '">' + tmp.total + '</td>';
                            datosAlist += '<td id="td6' + tmp.t_csc + '">' + tmp.estimado + '</td>';
                            datosAlist += '<td class="enlace editProduc" id="producto' + i + '" edPro="' + tmp.t_csc + '">' + icon + '</td></tr>';

                            datosAlist += '</tbody></table></div>\n\
                              <div class="row justify-content-end">\n\
                              <div class="col-7">\n\
                            <input class="form-control form-control-sm" type="text" id="inputNovedad' + venta + '" name="inputNovedad' + venta + '" placeholder="Novedad">\n\
                        </div>\n\
                        <div class="col-3" id="divBtn' + (parseInt(blq) - 1) + '" style="display: ' + displ_proces + ';">\n\
                            <button class="btn btn-success ventguardar" type="button" btAddVe="' + venta + '" id="btnGuardVent' + venta + '" name="btnGuardVent' + venta + '">Go!</button>\n\
                            </div>\n\
                              <div class="col-3" id="divBtnCan' + (parseInt(blq) - 1) + '" style="display: ' + displ_no_proces + ';">\n\
                            <button class="btn btn-danger ventcancel" type="button" btCanVe="' + venta + '" id="btnCancelVent' + venta + '" name="btnCancelVent' + venta + '">Stop!</button>\n\
                            </div>\n\
                              <div class="col-2" id="inpGif' + venta + '">\n\
                            </div>\n\
                              </div>\n\
                            </div></div>';//fin de la tabla
                            datosAlist += '</div>';//fin de la pag
                        }
                    } else {
                        //***NO es la ultima fila del arreglo**//

                        if (tmp.t_sal_num_venta == venta) {
                            //***si es la misma venta de la fila anterior**//
                            datosAlist += '<tr class="table-' + tema + ' estfila" id="fila' + tmp.t_csc + '">';
                            datosAlist += '<td id="tdcheck' + tmp.t_csc + '" elch="' + (parseInt(blq) - 1) + '"><input type="checkbox" class="cheitem" id="Check' + (parseInt(blq) - 1) + tmp.pro_cod + '" required></td>';
                            datosAlist += '<td id="td1' + tmp.t_csc + '">' + tmp.pro_sku + '</td>';
                            datosAlist += '<td id="td3' + tmp.t_csc + '" style="background-color: #ddb6f7"><b>' + tmp.pro_ubicacion + '</b></td>';
                            if (tmp.t_sal_cantidad >= 2) {
                                datosAlist += '<td id="td5' + tmp.t_csc + '"><h4><b>' + tmp.t_sal_cantidad + '</b></h4></td>';
                            } else {
                                datosAlist += '<td id="td5' + tmp.t_csc + '">' + tmp.t_sal_cantidad + '</td>';
                            }
                            datosAlist += '<td id="td7' + tmp.t_csc + '">' + tmp.pro_desc + '</td>';
                            datosAlist += '<td id="td2' + tmp.t_csc + '">' + tmp.pro_cod + '</td>';
                            datosAlist += '<td id="td4' + tmp.t_csc + '">' + tmp.total + '</td>';
                            datosAlist += '<td id="td6' + tmp.t_csc + '">' + tmp.estimado + '</td>';
                            datosAlist += '<td class="enlace editProduc" id="producto' + i + '" edPro="' + tmp.t_csc + '">' + icon + '</td></tr>';

                        } else {
                            //***NO es la misma venta de la fila anterior**//

                            datosAlist += '</tbody></table></div>\n\
                              <div class="row justify-content-end">\n\
                              <div class="col-7">\n\
                                <input class="form-control form-control-sm" type="text" id="inputNovedad' + venta + '" name="inputNovedad' + venta + '" placeholder="Novedad">\n\
                              </div>\n\
                                <div class="col-3" id="divBtn' + (parseInt(blq) - 1) + '" style="display: ' + displ_proces + ';">\n\
                            <button class="btn btn-success ventguardar" type="button" btAddVe="' + venta + '" id="btnGuardVent' + venta + '" name="btnGuardVent' + venta + '">Go!</button>\n\                               </div>\n\
                              <div class="col-3" id="divBtnCan' + (parseInt(blq) - 1) + '" style="display: ' + displ_no_proces + ';">\n\
                                <button class="btn btn-danger ventcancel" type="button" btCanVe="' + venta + '" id="btnCancelVent' + venta + '" name="btnCancelVent' + venta + '">Stop!</button>\n\
                              </div>\n\
                              <div class="col-2" id="inpGif' + venta + '">\n\
                              </div>\n\
                              </div>\n\
                            </div></div>';//fin de la tabla

                            if (blq % 20 == 0) {
                                datosAlist += '</div>';//fin de la pag
                                pag++;
                                datosAlist += '<div class="bloque" id="blqPagina' + pag + '" style="display: none;"><h4>HOJA ' + pag + '</h4>';
                            }

                            datosAlist += '<div id="sec' + tmp.t_sal_guia_num + '" secguia="' + tmp.t_sal_guia_num + '" class="est_section"><div class="alert alert-dismissible alert-' + tema + ' col-lg-12 border-warning estblq" id="blqAlist' + blq + '" style="border-radius: 0.5rem;">\n\
                                <div class="row">\n\
                            <div class="col-4"><strong>N° VENTA: <b class="text-primary">' + tmp.t_sal_num_venta + ' </b></strong></div>\n\
                                <div class="col-4"><strong>N° GUIA: <b class="text-success">' + tmp.t_sal_guia_num + ' </b></strong></div>\n\
                                <div class="form-group col-2">\n\
                                   <input type="text" class="form-control form-control-sm inpBlq" blinp="' + blq + '" id="inpCodProd' + blq + '" nameinp="' + tmp.t_sal_guia_num + '" placeholder="Cod. Produto">\n\
                                </div>\n\
                                <div class="form-group col-2">\n\
                                  <div class="custom-control custom-switch">\n\
                                  <input type="checkbox" class="custom-control-input cheBlq" vent="' + tmp.t_sal_num_venta + '" che="' + i + '" id="' + blq + '" ' + checked + '>\n\
                                  <label class="custom-control-label" for="' + blq + '">OK</label>\n\
                                </div></div></div>';
                            datosAlist += '<div class="dropdown-divider"></div>\n\
                                <div class="table-responsive text-nowrap">\n\
                            <table class="table table-hover table-sm table-fixed" id="tab' + tmp.t_sal_num_venta + '">\n\
                            <thead><tr class="table-primary">\n\
                                <th scope="col">VER</th>\n\
                                <th scope="col">SKU</th>\n\
                                <th scope="col">UB</th>\n\
                                <th scope="col">UNS</th>\n\
                                <th scope="col">PRODUCTO</th>\n\
                                <th scope="col">COD</th>\n\
                                <th scope="col">STOCK</th>\n\
                                <th scope="col">TEÓRICO</th>\n\
                                <th scope="col"><span class="ion-android-clipboard"></span></th>\n\
                                </tr></thead><tbody>';
                            if (tema == 'danger') {
                                displ_no_proces = 'block';
                                displ_proces = 'none';
                            } else {
                                displ_no_proces = 'none';
                                displ_proces = 'block';
                            }
                            blq++;

                            datosAlist += '<tr class="table-' + tema + ' estfila" id="fila' + tmp.t_csc + '">';
                            datosAlist += '<td id="tdcheck' + tmp.t_csc + '" elch="' + (parseInt(blq) - 1) + '"><input type="checkbox" class="cheitem" id="Check' + (parseInt(blq) - 1) + tmp.pro_cod + '" required></td>';
                            datosAlist += '<td id="td1' + tmp.t_csc + '">' + tmp.pro_sku + '</td>';
                            datosAlist += '<td id="td3' + tmp.t_csc + '" style="background-color: #ddb6f7"><b>' + tmp.pro_ubicacion + '</b></td>';
                            if (tmp.t_sal_cantidad >= 2) {
                                datosAlist += '<td id="td5' + tmp.t_csc + '"><h4><b>' + tmp.t_sal_cantidad + '</b></h4></td>';
                            } else {
                                datosAlist += '<td id="td5' + tmp.t_csc + '">' + tmp.t_sal_cantidad + '</td>';
                            }
                            datosAlist += '<td id="td7' + tmp.t_csc + '">' + tmp.pro_desc + '</td>';
                            datosAlist += '<td id="td2' + tmp.t_csc + '">' + tmp.pro_cod + '</td>';
                            datosAlist += '<td id="td4' + tmp.t_csc + '">' + tmp.total + '</td>';
                            datosAlist += '<td id="td6' + tmp.t_csc + '">' + tmp.estimado + '</td>';
                            datosAlist += '<td class="enlace editProduc" id="producto' + i + '" edPro="' + tmp.t_csc + '">' + icon + '</td></tr>';

                            venta = tmp.t_sal_num_venta;
                        }
                    }
                }
            }
            datosAlist += '</tbody></table></div>\n\
            <div class="row justify-content-end">\n\
                <div class="col-7">\n\
                <input class="form-control form-control-sm" type="text" id="inputNovedad' + venta + '" name="inputNovedad' + venta + '" placeholder="Novedad">\n\
              </div>\n\
              <div class="col-3" id="divBtn' + (parseInt(blq) - 1) + '" style="display: ' + displ_proces + ';">\n\
                        <button class="btn btn-success ventguardar" type="button" btAddVe="' + venta + '" id="btnGuardVent' + venta + '" name="btnGuardVent' + venta + '">Go!</button>\n\               </div>\n\
              <div class="col-3" id="divBtnCan' + (parseInt(blq) - 1) + '"  style="display: ' + displ_no_proces + ';">\n\
                        <button class="btn btn-danger ventcancel" type="button" btCanVe="' + venta + '" id="btnCancelVent' + venta + '" name="btnCancelVent' + venta + '">Stop!</button>\n\
              </div>\n\
              <div class="col-2" id="inpGif' + venta + '">\n\
                    </div>\n\
                </div>\n\
                </div></div>';//fin de la tabla
            datosAlist += '</div>';//fin de la pag

            if (pag > 1) {
                datosAlist += '<nav aria-label="Page navigation example">\n\
            <ul class="pagination justify-content-center">';
                datosAlist += '<li class="page-item disabled" id="bPrev">\n\
            <a class="page-link enlace" id="btnPrev">Previous</a>\n\
            </li>';

                for (i = 1; i <= pag; i++) {
                    if (i == 1) {
                        datosAlist += '<li class="page-item btnPagina active" id="btnPag' + i + '"><a class="page-link enlace paginado" id="b' + i + '" pag="' + i + '">' + i + '</a></li>';
                    } else {
                        datosAlist += '<li class="page-item btnPagina" id="btnPag' + i + '"><a class="page-link enlace paginado" id="b' + i + '" pag="' + i + '">' + i + '</a></li>';
                    }
                }

                datosAlist += '<li class="page-item" id="bNext">\n\
                                 <a class="page-link enlace" id="btnNext">Next</a>\n\
                    </li>';
                datosAlist += '</ul></nav>';
            }

            $("#bloques").html(datosAlist);

            can_vent_als = blq;
//            alert(can_vent_als);

            $([document.documentElement, document.body]).animate({
                scrollTop: $("#formBuscarAlistProceso").offset().top
            }, 300);

            clickPaginasAlist();
            clickPaginasAlistPrev();
            clickPaginasAlistNext();
            clickEditProd(id_suc);
            checkedVenta();
            click_No_gestionarVenta(id_suc);
            click_gestionar_Venta(id_suc);

            //            $("#btnSaveAllVentas").click(function () {
            //                ventasNoSelected();
            //                ventasSelected();
            //                cargaProdAlistamiento(id_suc_sel);
//            });



            enterProCod();
            checkedItemProd();


            $("#formBuscaGuiaOp").show();
            $("#inputGuiaNum").focus();

            $("#inputGuiaNum").keyup(function (e) {
                if (e.keyCode == 13) {
                    filtro_guia = $('#inputGuiaNum').val();
                    if (filtro_guia.substr(0, 1) == "{") {
                        dato = $.parseJSON(filtro_guia);
                        filtro_guia = dato.id;
                    }
                    if (filtro_guia.substr(0, 1) == "0") {
                        filtro_guia = filtro_guia.substr(1);
                        if (filtro_guia.length > 20) {

                            filtro_guia = filtro_guia.substr(10, 12);
//                            alert(filtro_guia);
                        }
                    }
                    //                    alert(filtro_in);
                    if (filtro_guia === "" || filtro_guia === null) {
                        //                        alert("No ha seleccionado un filtro valido");
                        $("#inputGuiaNum").focus();
                        alertify.alert('No ha seleccionado un filtro valido').setHeader('<em> Cuidado! </em> ');
                    } else {
//                        alst_guia = true;
                        item_act = true;
                        venta_selected = $("#sec" + filtro_guia);
//                        $("#sec" + filtro_guia).removeClass("est_section");
                        if ($("#sec" + filtro_guia).length) {
                            $(".est_section").hide();
                            $(".bloque").show();
                            $("#sec" + filtro_guia).show();
                            $("input[nameinp=" + filtro_guia + "]").focus();
                            $('#inputGuiaNum').val("");
                            //En esta linea me redirije al formulario con una velocodad establecida
                            $([document.documentElement, document.body]).animate({
                                scrollTop: $("#sec" + filtro_guia).offset().top
                            }, 300);
                        } else {
                            alertify.alert('El numero de guia no se encuentra en este proceso o ya ha sido procesada').setHeader('<em> Cuidado! </em> ');
                            $('#inputGuiaNum').val("");
                        }

//                        cargaProdAlistamiento(id_suc_sel);
                    }
                }
            });
            if (item_act == true) {
                $("#inpCodProd0").focus();
            }
//            if ($(".estblq").attr('id')== 'blqAlist0') {
//                $("#inpCodProd0").focus();
//            }
        } else {
            $("#bloques").html("<div class='alert alert-dismissible alert-danger'>\n\
 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
    <strong>No existen datos para mostrar.</strong></div>");
        }

    };
    f_ajax(request, cadena, metodo);
}
var pagina = 1;
/**
 * Metodo que cambia de pagina
 * @returns {undefined}
 */
function clickPaginasAlist() {
    $(".paginado").click(function () {
        pagina = $(this).attr("pag");

        $(".bloque").hide();
        $(".btnPagina").removeClass("active");
        $("#btnPag" + pagina + "").addClass("active");
        $("#blqPagina" + pagina + "").show();

        if (pagina != 1) {
            $("#bPrev").removeClass("disabled");
        } else {
            $("#bPrev").addClass("disabled");
        }

        if (pagina != pag) {
            $("#bNext").removeClass("disabled");

        } else {
            $("#bNext").addClass("disabled");
        }

        $([document.documentElement, document.body]).animate({
            scrollTop: $("#changeAlistEnvios").offset().top
        }, 1200);
    });
}
/**
 * Metodo que cambia de pagina boton previous
 * @returns {undefined}
 */
function clickPaginasAlistPrev() {
    $("#btnPrev").click(function () {
//        alert(parseInt(pagina - 1));

        pagina = parseInt(pagina - 1);

        $(".bloque").hide();
        $(".btnPagina").removeClass("active");
        $("#btnPag" + pagina + "").addClass("active");
        $("#blqPagina" + pagina + "").show();

        if (pagina != 1) {
            $("#bPrev").removeClass("disabled");
        } else {
            $("#bPrev").addClass("disabled");
        }

        if (pagina != pag) {
            $("#bNext").removeClass("disabled");

        } else {
            $("#bNext").addClass("disabled");
        }

        $([document.documentElement, document.body]).animate({
            scrollTop: $("#changeAlistEnvios").offset().top
        }, 1200);
    });
}
/**
 * Metodo que cambia de pagina boton next
 * @returns {undefined}
 */
function clickPaginasAlistNext() {
    $("#btnNext").click(function () { //        alert(pagina++);

        pagina = pagina++;

        $(".bloque").hide();
        $(".btnPagina").removeClass("active");
        $("#btnPag" + pagina + "").addClass("active");
        $("#blqPagina" + pagina + "").show();

        if (pagina != 1) {
            $("#bPrev").removeClass("disabled");
        } else {
            $("#bPrev").addClass("disabled");
        }

        if (pagina != pag) {
            $("#bNext").removeClass("disabled");

        } else {
            $("#bNext").addClass("disabled");
        }

        $([document.documentElement, document.body]).animate({
            scrollTop: $("#changeAlistEnvios").offset().top
        }, 1200);
    });
}

var edit_prod;
/**
 * Metodo que carga el modal con formulario para seleccion de producto en alistamiento
 * @param {type} id_suc
 * @returns {undefined}
 */
function clickEditProd(id_suc) {
//    $("#tableEstOS").on("click", ".actuestos", function () {
    $(".editProduc").click(function () {
        edit_prod = $(this).attr("edPro");
        consulta_prod_alist(edit_prod, id_suc);
//        edit_prod = $(this).attr("id");
        $('#ModalActuEstOS').modal('toggle');
        $('#ModalEstOSTitle').html('PRODUCTO');
        $('#body_mod_os').html('<div class="alert alert-dismissible alert-primary">\n\
                    <div class="row">\n\
                        <div class="col-6"><strong>N° VENTA: <b class="text-primary" id="numVenta"></b></strong></div>\n\
                        <div class="col-6"><strong>N° GUIA: <b class="text-success" id="numGuiaOP"></b></strong></div>\n\
                    </div>\n\
            <form class="mt-3" id="formModalProd" name="formModalProd">\n\
              <div class="form-row">\n\
                <div class="form-group input-group col-md-6">\n\
                  <label for="inputSkuAls">SKU</label>\n\
                  <div class="input-group">\n\
                  <input type="text" class="form-control" id="inputFila" name="inputFila" style="display: none;">\n\
                  <input type="text" class="form-control" id="inputSkuAls" name="inputSkuAls" placeholder="sku">\n\
                  <span class="input-group-btn">\n\
                    <button class="btn btn-success" type="button" id="btnBusSkuAlst" name="btnBusSkuAlst">Go!</button>\n\
                  </span>\n\
                </div>\n\
                </div>\n\
                <div class="form-group col-md-6">\n\
                  <label for="inputCodAls">Código</label>\n\
                  <input type="text" class="form-control" id="inputCodAls" name="inputCodAls" placeholder="Codigo" readonly>\n\
                </div>\n\
              </div>\n\
              <div class="form-group">\n\
                <label for="inputDescAls">Descripción</label>\n\
                <input type="text" class="form-control" id="inputDescAls" name="inputDescAls" placeholder="producto" readonly>\n\
              </div>\n\
              <div class="form-row">\n\
                <div class="form-group col-md-3">\n\
                  <label for="inputUbicAls">Ubicación</label>\n\
                  <input type="text" class="form-control" id="inputUbicAls" name="inputUbicAls" readonly>\n\
                </div>\n\
                <div class="form-group col-md-3">\n\
                  <label for="inputStockAls">Stock</label>\n\
            <input type="text" class="form-control" id="inputStockAls" name="inputStockAls" readonly>\n\
                </div>\n\
                <div class="form-group col-md-3">\n\
                <label for="inputCantiAls">Cantidad</label>\n\
        <input type="text" class="form-control" id="inputCantiAls" name="inputCantiAls">\n\
            </div>\n\
        <div class="form-group col-md-3">\n\
        <label for="inputTeoAls">Teórico</label>\n\
            <input type="text" class="form-control" id="inputTeoAls" name="inputTeoAls" readonly>\n\
            </div>\n\
              </div>\n\
            <button type="submit" class="btn btn-primary" id="btnGuarProdActAlist" name="btnGuarProdActAlist">Guardar</button>\n\
                <button type="button" class="btn btn-danger float-right" id="btnElimProdActAlist" name="btnElimProdActAlist">Eliminar item</button>\n\             </form>');
//        alert("click en " + edit_prod);
        //        form_act_est_os(arregloEstOS, actu_es_os);
        $("#btnBusSkuAlst").click(function () {
            if ($("#inputSkuAls").val().length == 0) {
                alert("Faltan datos");
            } else {
                consulta_prod_alist_sku($("#inputSkuAls").val(), id_suc);
            }
        });
        $("#btnGuarProdActAlist").click(function () {
            validarActuProdItem();
        });

        click_btnElim_item_alist();

        $("#inputCantiAls").bind('input propertychange', function () {
            //            alert($("#inputCantiAls").val());
            total = $("#inputStockAls").val();
            cantidad = $("#inputCantiAls").val();
            teorico = parseInt(total) - parseInt(cantidad);
            $("#inputTeoAls").val(teorico);
            if (teorico < 0) {
                $("#inputTeoAls").addClass("text-danger");
                $("#inputTeoAls").addClass("is-invalid");
            } else {
                $("#inputTeoAls").removeClass("text-danger");
                $("#inputTeoAls").removeClass("is-invalid");
            }
        });
    });
}
/**
 * Metodo que se encarga de cambiar color al desactivar un check
 * @returns {undefined}
 */
function checkedVenta() { //    $('.cheBlq').on('click', function () {
    $('.cheBlq').click(function () {
        checket = $(this).attr("id");
        if ($("#" + checket + "").is(':checked')) {
            // Hacer algo si el checkbox ha sido seleccionado
            $("#blqAlist" + checket + "").removeClass("alert-danger");
            $("#blqAlist" + checket + "").addClass("alert-warning");
            $("#divBtn" + checket + "").show();
            $("#divBtnCan" + checket + "").hide();
        } else {
            // Hacer algo si el checkbox ha sido deseleccionado
            $("#blqAlist" + checket + "").removeClass("alert-warning");
            $("#blqAlist" + checket + "").addClass("alert-danger");
            $("#divBtn" + checket + "").hide();
            $("#divBtnCan" + checket + "").show();
        }
    });
} /**
 * Metodo que se encarga de realizar check en prod de una venta para alistamiento
 * @returns {undefined}
 */
function enterProCod() {

    $(".inpBlq").keyup(function (e) {
        if (e.keyCode == 13) {
            inp_id = $(this).attr("id");
            cod_pro = $('#' + inp_id).val();
            inp_blq = $(this).attr("blinp");
//                    alert(filtro_in);
            if (cod_pro === "" || cod_pro === null) {

//                        alert("No ha seleccionado un filtro valido");
                $('#' + inp_id).focus();
                //                        alertify.alert('No ha seleccionado un filtro valido').setHeader('<em> Cuidado! </em> ');
            } else {
                $("#Check" + inp_blq + cod_pro).prop('checked', true);
                $('#' + inp_id).val("");
                filacolor = $("#Check" + inp_blq + cod_pro).closest('.estfila').attr('id');
                $("#" + filacolor).removeAttr('class').attr('class', 'table-success border border-success estfila');
            }
        }
    });
}
/**
 * Metodo que se encarga de restar en contador_item
 * @returns {undefined}
 */
function checkedItemProd() {
    //    $('.cheBlq').on('click', function () {
    $('.cheitem').click(function () {
        checket = $(this).attr("id");
        filacolor = $("#" + checket + "").closest('.estfila').attr('id');
        if ($("#" + checket + "").is(':checked')) {
            // Hacer algo si el checkbox ha sido seleccionado
            contador_item = 0;
            $("#" + filacolor).removeAttr('class').attr('class', 'table-success border border-success estfila');
        } else {
            // Hacer algo si el checkbox ha sido deseleccionado
            contador_item = 0;
            $("#" + filacolor).removeAttr('class').attr('class', 'estfila');
        }
    });
}
/**
 * Metodo que carga en el form del modal datos para editar producto alistamiento
 * @param {type} csc
 * @param {type} id_suc
 * @returns {consulta_prod_alist}
 */
function consulta_prod_alist(csc, id_suc) {
    request = "Controller/AdminC/AdministrarProd/consulta_prod_alist_controller.php";
    cadena = {"csc": csc, "id_suc": id_suc};
    metodo = function (datos) {
        arreglo_datos_prod_sku = $.parseJSON(datos);

        tmp_dat_prod = arreglo_datos_prod_sku[0];

        $("#numVenta").html(tmp_dat_prod.t_sal_num_venta);
        $("#numGuiaOP").html(tmp_dat_prod.t_sal_guia_num);
        $("#inputFila").val(edit_prod);
        $("#inputSkuAls").val(tmp_dat_prod.pro_sku);
        $("#inputCodAls").val(tmp_dat_prod.t_pro_cod);
        $("#inputDescAls").val(tmp_dat_prod.pro_desc);
        $("#inputUbicAls").val(tmp_dat_prod.pro_ubicacion);
        $("#inputStockAls").val(tmp_dat_prod.total);
        $("#inputCantiAls").val(tmp_dat_prod.t_sal_cantidad);
        $("#inputTeoAls").val(tmp_dat_prod.estimado);

    };
    f_ajax(request, cadena, metodo);
}

var arreglo_datos_prod_sku;
var cantidad;
var teorico;
/**
 * Metodo que carga en el form del modal datos de producto consultado
 * @param {type} sku
 * @param {type} id_suc
 * @returns {consulta_prod_alist_sku}
 */
function consulta_prod_alist_sku(sku, id_suc) {
    request = "Controller/AdminC/AdministrarProd/consulta_sku_alist_controller.php";
    cadena = {"sku": sku, "id_suc": id_suc};
    metodo = function (datos) {
        //        alert(datos);
        arreglo_datos_prod_sku = $.parseJSON(datos);

        tmp_dat_prod_sku = arreglo_datos_prod_sku[0];

        $("#inputCodAls").val(tmp_dat_prod_sku.pro_cod);
        $("#inputDescAls").val(tmp_dat_prod_sku.pro_desc);
        $("#inputUbicAls").val(tmp_dat_prod_sku.pro_ubicacion);
        $("#inputStockAls").val(tmp_dat_prod_sku.total);
        $("#inputCantiAls").val(1);

        total = $("#inputStockAls").val();
        cantidad = $("#inputCantiAls").val();
        teorico = parseInt(total) - parseInt(cantidad);
        $("#inputTeoAls").val(teorico);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que genera mensaje de confirmacion para eliminar item de producto en alistamiento
 * @returns {undefined}
 */
function click_btnElim_item_alist() {
    //    $("#tableEstEnv").on("click", ".eliminaee", function () {
    $("#btnElimProdActAlist").click(function () {
        //        alert("elimina " + edit_prod);
        mensajeConfirmarElim(elimina_item_alist);
    });
}

/**
 * Metodo que elimina un registro en la tabla salidas_prod_temp
 * @returns {undefined}
 */
function elimina_item_alist() {
    request = "Controller/AdminC/AdministrarEnvios/eliminar_item_alist_controller.php";
    cadena = "csc=" + edit_prod; //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            mensajeEliminadoExitoso();
            $('#ModalActuEstOS').modal('hide');
            $('#fila' + edit_prod + '').remove();
        } else {
            mensaje_No_Eliminado();
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que permite validar campos en formulario orden servicio actualizar
 * @returns {undefined}
 */
function validarActuProdItem() {
    $("#formModalProd").validate({
        rules: {
            inputSkuAls: {
                required: true
            },
            inputCantiAls: {
                required: true,
                number: true
            }},
        submitHandler: function (form) {
            actualizarProdItemAlist();
        }
    });
}
/**
 * Metodo que actualiza datos de un producto en una venta de alistamiento
 * @returns {undefined}
 */
function actualizarProdItemAlist() {
    request = "Controller/AdminC/AdministrarEnvios/actualizar_prod_item_alist_controller.php";
    cadena = $("#formModalProd").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            alertify.success('Producto Actualizado!');
            $('#ModalActuEstOS').modal('hide');
            $('#td1' + edit_prod + '').html("");
            $('#td2' + edit_prod + '').html("");
            $('#td3' + edit_prod + '').html("");
            $('#td4' + edit_prod + '').html("");
            $('#td5' + edit_prod + '').html("");
            $('#td6' + edit_prod + '').html("");
            $('#td7' + edit_prod + '').html("");
            $('#tdcheck' + edit_prod + '').html("");
            elch = $('#tdcheck' + edit_prod + '').attr("elch");

            tmp_prod_item = arreglo_datos_prod_sku[0];

            $('#td1' + edit_prod + '').html(tmp_prod_item.pro_sku);
            $('#td2' + edit_prod + '').html(tmp_prod_item.pro_cod);
            $('#td3' + edit_prod + '').html(tmp_prod_item.pro_ubicacion);
            $('#td4' + edit_prod + '').html(tmp_prod_item.total);
            $('#td5' + edit_prod + '').html(cantidad);
            $('#td6' + edit_prod + '').html(teorico);
            $('#td7' + edit_prod + '').html(tmp_prod_item.pro_desc);
            $('#tdcheck' + edit_prod + '').html('<input type="checkbox" id="Check' + elch + tmp_prod_item.pro_cod + '">');
        } else {
            alertify.error('No se pudo realizar la Actualización!');
//            alert(datos);
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que guarda y gestiona venta de tabla salidas temp y actualiza estado en tabla est_x_aenv  * @param {type} id_suc
 * @returns {undefined}
 */
function click_gestionar_Venta(id_suc) {
    //    $('.cheBlq').on('click', function () {
    $('.ventguardar').click(function () {
        esta_venta = $(this).attr("btAddVe");
        itemNoSelected(esta_venta);
        if (contador_item > 0) {
            alertify.alert('No se han seleccionado ' + contador_item + ' item, la venta no será procesada').setHeader('<em> Cuidado! </em> ');
        } else {
            $("#inpGif" + esta_venta).html("<img class='img-fluid' src='img/animaciones/loader.gif' alt=''/>");
            enviaDatosVenta(esta_venta, id_suc, $("#inputNovedad" + esta_venta + "").val());
            item_act = false;
        }
    });
}
/**
 * funcion que envia datos para procesar una venta
 * @param {type} venta
 * @param {type} id_suc
 * @param {type} observ
 * @returns {undefined}
 */
function enviaDatosVenta(venta, id_suc, observ) {
    request = "Controller/AdminC/AdministrarEnvios/gestionar_venta_temp_v2_controller.php";
    cadena = {"inpventa": venta, "inpsuc": id_suc, "inpnovedad": observ}; //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
//            alert("CORRECTO");            
//            elimina_item_alist_venta(venta);
            alertify.success('Venta N° ' + venta + ' Pocesada');
            cargaProdAlistamiento(id_suc);
            //            $("#blqProcesadas").append('<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>VENTA N° ' + venta + ' PROCESADA</strong></div>');
        } else {
            alert(datos);
        }
        //        $("#blqProcesadas").append('<div class="alert alert-dismissible alert-warning"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>ORDENES DE RECOLECCIÓN FINALIZADAS</strong></div>');
    };
    f_ajax(request, cadena, metodo);
}
/**
 * funcion que envia datos para no procesar una venta
 * @param {type} venta
 * @param {type} id_suc
 * @param {type} observ
 * @returns {undefined}
 */
function enviaDatosVentaNoProcesar(venta, id_suc, observ) {
    request = "Controller/AdminC/AdministrarEnvios/gest_venta_temp_no_proc_controller.php";
    cadena = {"inpventa": venta, "inpsuc": id_suc, "inpnovedad": observ}; //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
//            alert("CORRECTO");            
            elimina_item_alist_venta(venta);
            alertify.warning('Venta N° ' + venta + ' Gestionada como No Procesada');
            cargaProdAlistamiento(id_suc_sel); //            $("#blqProcesadas").append('<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>VENTA N° ' + venta + ' PROCESADA</strong></div>');
        } else {
            alert(datos);
        }
        //        $("#blqProcesadas").append('<div class="alert alert-dismissible alert-warning"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>ORDENES DE RECOLECCIÓN FINALIZADAS</strong></div>');
    };
    f_ajax(request, cadena, metodo);
}

function cerrar_sesiones_os() {
    request = "Controller/AdminC/AdministrarOS/cerrar_sesiones_os_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#blqProcesadas").append('<div class="alert alert-dismissible alert-warning"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>ORDENES DE RECOLECCIÓN FINALIZADAS</strong></div>');
    };
    f_ajax(request, cadena, metodo);
} /**
 * Metodo que comprueba existencia de os para recoleccion y distribucion 
 * @param {type} venta
 * @returns {comprobar_os_creada}
 */
function comprobar_os_creada(venta) {
    request = "Controller/AdminC/AdministrarEnvios/gestionar_venta_salid_temp_controller.php";
    cadena = "venta=" + venta; //envio de parametros por POST
    metodo = function (datos) {
        venta_sale = venta;
        if (datos == 1 || datos == 2) {
            insertar_est_x_aenv(2, $("#inputNovedad" + venta_sale + "").val(), venta_sale, orden_serv);
            insertar_est_x_aenv(3, $("#inputNovedad" + venta_sale + "").val(), venta_sale, orden_serv);
            elimina_item_alist_venta(venta_sale);//elimina la seccion de una venta

            can_vent_als--;
            if (can_vent_als < 1) {
                insertar_est_x_os_alist(orden_serv, 6);//actualizacion de estado OS packing
                cerrar_sesiones_os();
            }
        } else if (datos == 3) {
            insertar_est_x_aenv(2, $("#inputNovedad" + venta_sale + "").val(), venta_sale, orden_serv);
            elimina_item_alist_venta(venta_sale);//elimina la seccion de una venta
            can_vent_als--;

            if (can_vent_als < 1) {
                insertar_est_x_os_alist(orden_serv, 6);//actualizacion de estado OS packing
                cerrar_sesiones_os();
            }
        } else {
            alert(datos);
        }

    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que elimina venta de tabla salidas temp y actualiza estado en tabla est_x_aenv
 * @param {type} id_suc
 * @returns {undefined}
 */
function click_No_gestionarVenta(id_suc) {
//    $('.cheBlq').on('click', function () {
    $('.ventcancel').click(function () {
        esta_venta = $(this).attr("btCanVe");

        $("#inpGif" + esta_venta).html("<img class='img-fluid' src='img/animaciones/loader.gif' alt=''/>");
        enviaDatosVentaNoProcesar(esta_venta, id_suc, $("#inputNovedad" + esta_venta + "").val());
        item_act = false;
    });
}
/**
 * Metodo que determina los check no seleccionados para procesar eliminar ventas en tabla temp
 * @returns {undefined}
 */
function ventasNoSelected() {
    $("input:checkbox:not(:checked)").each(function () {

        checket_venta = $(this).attr("vent");//numeo de venta

        $("#inpGif" + esta_venta).html("<img class='img-fluid' src='img/animaciones/loader.gif' alt=''/>");
        insertar_est_x_aenv(4, $("#inputNovedad" + checket_venta + "").val(), checket_venta, orden_serv);
        elimina_item_alist_venta(checket_venta);//elimina la seccion de una venta

        can_vent_als--;

        if (can_vent_als < 1) {
            insertar_est_x_os_alist(orden_serv, 6);//actualizacion de estado OS packing
        }
    });
}
var contador_item = 0;
/**
 * Metodo que determina los check no seleccionados en una venta
 * @param {type} venta  * @returns {undefined}
 */
function itemNoSelected(venta) {
    $('#tab' + venta + ' :input:checkbox:not(:checked)').each(function () {

        contador_item++;

    });
}
/**
 * Metodo que determina los check seleccionados para creacion y actualizacion de estados
 * @returns {undefined}
 */
function ventasSelected() {
    $("input:checkbox:checked").each(function () {

        checket_venta = $(this).attr("vent");//numeo de venta

        if (typeof (checket_venta) === 'undefined') {

        } else {
            $("#inpGif" + esta_venta).html("<img class='img-fluid' src='img/animaciones/loader.gif' alt=''/>");
            comprobar_os_creada(checket_venta);
        }


    });
}
/**
 * Metodo que elimina un registro en la tabla salidas_prod_temp por numero de venta
 * @param {type} venta
 * @returns {elimina_item_alist_venta}
 */
function elimina_item_alist_venta(venta) {
    request = "Controller/AdminC/AdministrarEnvios/eliminar_venta_alist_controller.php";
    cadena = "venta=" + venta; //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        if (datos == 1) { //            alertify.message('Venta ' + venta + ' procesada', 2);
            $("#sec" + venta + "").remove();

        } else {
            alertify.error('Error al cancelar venta N° ' + venta + ' en tabla salidas temp.', 5);
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que inserta un registro en la tabla est_x_aenv
 * @param {type} estado
 * @param {type} novedad
 * @param {type} venta
 * @param {type} os_num
 * @returns {undefined}
 */
function insertar_est_x_aenv(estado, novedad, venta, os_num) {
    request = "Controller/AdminC/AdministrarEnvios/insertar_est_aenv_controller.php";
    cadena = {"estado": estado, "novedad": novedad, "venta": venta, "os_num": os_num}; //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        if (datos == 1) {
            $("#blqProcesadas").append('<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>VENTA N° ' + venta + ' PROCESADA</strong></div>');
            //            alertify.success('Estado Acualizado venta N° ' + venta, 2);
        } else {
            $("#blqProcesadas").append('<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>VENTA N° ' + venta + ' NO PROCESADA</strong></div>');
//            alertify.error('Error al actualizar estado venta N° ' + venta, 5);
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que inserta un registro en la tabla est_x_aenv
 * @param {type} estado
 * @param {type} os_num
 * @returns {undefined}
 */
function insertar_est_x_os_alist(os_num, estado) {
    request = "Controller/AdminC/AdministrarOS/insertar_es_x_os_alist_controller.php";
    cadena = {"estado": estado, "os_num": os_num}; //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        if (datos == 1) {
            alertify.success('Estado Acualizado OS N° ' + os_num, 2);
        } else {
            alertify.error('Error al actualizar estado OS N° ' + os_num, 5);
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que trae tabla de envios en estado inicial para impresion de guias
 * @returns {undefined}
 */
function tabla_imp_guias_suc() {
    request = "Controller/ClienteC/consulta_env_imp_guias_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arregloOS_cli = $.parseJSON(datos);
//        alert(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloOS_cli !== 0) {
            datosOS_cli = '<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">\n\
                                <div class="toast-header">\n\
                                    <strong class="mr-auto">REIMPRIMIR GUIAS</strong>\n\
                                </div><div class="toast-body row">\n\
                          <div class="alert alert-dismissible alert-secondary col-lg-12" style="border-radius: 0.5rem;">\n\
                          <div class="table-responsive text-nowrap" id="tablaEstadoOS"><table class="table table-striped table-sm table-bordered" id="tableEstOS">\n\
                                 <thead><tr style="background-color: #9bb5ff">\n\
                                 <th scope="col"></th>\n\
                                 <th scope="col">GUIA LOGI</th>\n\
                                 <th scope="col">GUIA OP</th>\n\
                                 <th scope="col">FECHA</th>\n\
                                 <th scope="col">DESTINATARIO</th>\n\
                                 <th scope="col">DIRECCION DESTINO</th>\n\
                                 <th scope="col">TELEFONO</th>\n\
                                 <th scope="col">CIUDAD DES.</th>\n\
                                 <th scope="col">DEPTO</th>\n\
                                 <th scope="col">OBS / COMPLEMENTO</th>\n\
                                 <th scope="col">SERVICIO</th>\n\
                                 <th scope="col">T. ENVIO</th>\n\
                                 <th scope="col">CLIENTE</th>\n\
                                 <th scope="col">SUC.</th>\n\
                                 </tr></thead><tbody>';
            for (i = 0; i < arregloOS_cli.length; i++) {
                tmp = arregloOS_cli[i];
                datosOS_cli += '<tr class="table-sm" id="fila' + i + '"><td class="enlace actuestos" act="' + tmp.exe_en_id + '"><span class="ion-document-text text-primary" style="font-size: large;"></span></td>';

                datosOS_cli += '<td>' + tmp.exe_en_id + "</td>";
                datosOS_cli += '<td>' + tmp.en_guia + '</td>';
                datosOS_cli += '<td>' + tmp.exs_fecha_hora + '</td>';
                datosOS_cli += '<td>' + tmp.en_nombre + '</td>';
                datosOS_cli += '<td>' + tmp.en_direccion + '</td>';
                datosOS_cli += '<td>' + tmp.en_telefono + '</td>';
                datosOS_cli += '<td>' + tmp.en_ciudad + '</td>';
                datosOS_cli += '<td>' + tmp.en_departamento + '</td>';
                datosOS_cli += '<td>' + tmp.en_novedad + '</td>';
                datosOS_cli += '<td>' + tmp.ts_desc + '</td>';
                datosOS_cli += '<td>' + tmp.te_desc + '</td>';
                datosOS_cli += '<td>' + tmp.cli_nombre + '</td>';
                datosOS_cli += '<td>' + tmp.suc_nombre + '</td></tr>';
            }
            datosOS_cli += '</tbody></table></div></div></div><div id="enc_guia_num"></div><div id="info_env_os"></div>';
            $("#sectionConten").html(datosOS_cli);

            /**
             * Evento que pagina una tabla 
             */
            $('#tableEstOS').DataTable({
                'scrollX': true
            });
            clickInfoEnvOs();
        } else {
            $("#sectionConten").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que devuelve el formulario para actualizar el estado
 * formulario ciudad
 * @returns {undefined}
 */
function clickInfoEnvOs() {
    $("#tableEstOS").on("click", ".actuestos", function () {
//    $(".actuestos").click(function () {
        guia_num = $(this).attr("act");
//        $('#mod-dalog').removeClass('modal-lg');
//        $('#ModalActuEstOS').modal('toggle');
        $("#info_env_os").html("");
        $("#enc_guia_num").html("<strong>GUIA N° " + guia_num + "</strong>");
        imprime_guia_logi(guia_num);
    });
}
/**
 * Metodo que envia parametros de envio e imprime guia logi
 * @param {type} num_guia
 * @returns {undefined}
 */
function imprime_guia_logi(num_guia) {
    request = "Controller/ClienteC/ruta_guia_pdf_param_controller.php";
    cadena = {"inputNumEnvi": num_guia}; //envio de parametros por POST
    metodo = function (datos) {
        $("#info_env_os").html(datos);
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que devuelve tabla de informacion de envios
 * formulario ciudad
 * @returns {undefined}
 */
function clickInfoEnv_os() {
    $("#tableEstOS").on("click", ".infoenvi", function () {
//    $(".actuestos").click(function () {
        $('#ModalActuEstOS').modal('toggle');
        $('#mod-dalog').addClass('modal-lg');
        $('#ModalEstOSTitle').html('Detalle de envios por OS');
        num_os_info = $(this).attr("infenv");

        tabla_info_env_os(num_os_info);
    });
}

/**
 * Metodo que trae tabla de envios cargados en orden de servicio
 * @param {type} num_os
 * @returns {undefined}
 */
function tabla_info_env_os(num_os) {
    request = "Controller/AdminC/AdministrarEnvios/con_detalle_env_os_controller.php";
    cadena = {"num_os": num_os}; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_inf_env = $.parseJSON(datos);
        tmp_inf = arreglo_inf_env[0];
//        alert(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_inf_env !== 0) {
            datos_kdx = '<div class="toast-body row"><div class="alert alert-dismissible alert-secondary col-lg-12 border-primary" style="border-radius: 0.5rem;">\n\
                             <div class="table-responsive text-nowrap col-lg-12">\n\
                             <table class="table table-striped table-sm table-bordered text-center col-lg-12" id="tableDetEnv">\n\
                             <thead>\n\
                            <tr>\n\
                                <th scope="col" style="background-color: #bda4e8;">GUIA LOGI N°</th>\n\
                                <th scope="col" style="background-color: #e0cff9;">' + tmp_inf.en_id + '</th>\n\
                                <th scope="col" style="background-color: #bda4e8;">OP N°</th>\n\
                                <th scope="col" style="background-color: #e0cff9;">' + tmp_inf.en_guia + '</th>\n\
                                <th scope="col" style="background-color: #bda4e8;">FECHA</th>\n\
                                <th scope="col" style="background-color: #e0cff9;">' + tmp_inf.exe_fec_hora + '</th>\n\
                            </tr>\n\
                            <tr>\n\
                                <th scope="col" style="background-color: #bda4e8;">SERVICIO</th>\n\
                                <th scope="col" style="background-color: #e0cff9;">' + tmp_inf.ts_desc + '</th>\n\
                                <th scope="col" style="background-color: #bda4e8;">T. ENVIO</th>\n\
                                <th scope="col" style="background-color: #e0cff9;">' + tmp_inf.te_desc + '</th>\n\
                                <th scope="col" style="background-color: #bda4e8;">VALOR FLETE</th>\n\
                                <th scope="col" style="background-color: #e0cff9;">' + tmp_inf.en_valor_pago + '</th>\n\
                            </tr>\n\
                            <tr>\n\
                                <th scope="col" style="background-color: #bda4e8;">OS N°</th>\n\
                                <th scope="col" style="background-color: #e0cff9;">' + tmp_inf.os_id + '</th>\n\
                                <th scope="col" style="background-color: #bda4e8;">TOTAL UN</th>\n\
                                <th scope="col" style="background-color: #e0cff9;">' + tmp_inf.en_cantidad + '</th>\n\
                                <th scope="col" style="background-color: #bda4e8;">VALOR DECLARADO</th>\n\
                                <th scope="col" style="background-color: #e0cff9;">' + tmp_inf.en_valor_decl + '</th>\n\
                            </tr>\n\
                            <tr>\n\
                                <th scope="col" style="background-color: #bda4e8;">TOTAL VOL</th>\n\
                                <th scope="col" style="background-color: #e0cff9;">' + Math.pow(tmp_inf.en_alto, 3) + '</th>\n\
                                <th scope="col" style="background-color: #bda4e8;">TOTAL KG</th>\n\
                                <th scope="col" style="background-color: #e0cff9;">' + tmp_inf.en_peso + '</th>\n\
                                <th scope="col" style="background-color: #bda4e8;">VALOR RECAUDO</th>\n\
                                <th scope="col" style="background-color: #e0cff9;">' + tmp_inf.en_recaudo + '</th>\n\
                            </tr>\n\
                            <tr>\n\
                                <th scope="col" style="background-color: #bda4e8;">OBSERVACION SERV</th>\n\
                                <th scope="col" colspan="5">' + tmp_inf.os_observacion + '</th>\n\
                            </tr>\n\
                            <tr>\n\
                                <th scope="col" style="background-color: #bda4e8;">CLIENTE</th>\n\
                                <th scope="col" colspan="5">' + tmp_inf.cli_nombre + '</th>\n\
                            </tr>\n\
                            <tr>\n\
                                <th scope="col" colspan="3" class="table-primary">DESTINO</th>\n\
                                <th scope="col" colspan="3" style="background-color: #ffd388;">REMITE</th>\n\
                            </tr>\n\
                            <tr>\n\
                                <th scope="col" style="background-color: #e0cff9;">NOMBRE</th>\n\
                                <th scope="col" colspan="2">' + tmp_inf.en_nombre + '</th>\n\
                                <th scope="col" class="table-warning">NOMBRE</th>\n\
                                <th scope="col" colspan="2">' + tmp_inf.cli_nombre + '</th>\n\
                            </tr>\n\
                            <tr>\n\
                                <th scope="col" style="background-color: #e0cff9;">DIRECCION</th>\n\
                                <th scope="col" colspan="2">' + tmp_inf.en_direccion + '</th>\n\
                                <th scope="col" class="table-warning">DIRECCION</th>\n\
                                <th scope="col" colspan="2">' + tmp_inf.os_direccion + '</th>\n\
                            </tr>\n\
                            <tr>\n\
                                <th scope="col" style="background-color: #e0cff9;">CIUDAD</th>\n\
                                <th scope="col" colspan="2">' + tmp_inf.en_ciudad + '</th>\n\
                                <th scope="col" class="table-warning">CIUDAD</th>\n\
                                <th scope="col" colspan="2">' + tmp_inf.ciu_nombre + '</th>\n\
                            </tr>\n\
                            <tr>\n\
                                <th scope="col" style="background-color: #e0cff9;">TEL</th>\n\
                                <th scope="col" colspan="2">' + tmp_inf.en_telefono + '</th>\n\
                                <th scope="col" class="table-warning">TEL</th>\n\
                                <th scope="col" colspan="2">' + tmp_inf.cli_tel + '</th>\n\
                            </tr>\n\
                            <tr>\n\
                                <th scope="col" style="background-color: #bda4e8;">OBSERVACION ENV</th>\n\
                                <th scope="col" colspan="5">' + tmp_inf.en_novedad + '</th>\n\
                            </tr>\n\
                            <tr>\n\
                                <th scope="col" style="background-color: #bda4e8;">DICE CONTENER</th>\n\
                                <th scope="col" colspan="5">' + tmp_inf.en_contiene + '</th>\n\
                            </tr>\n\
                            <tr>\n\
                                <th scope="col" colspan="6" class="table-danger">DETALLE UNIDADES</th>\n\
                            </tr>\n\
                            <tr>\n\
                                <th scope="col" class="table-primary">ENVIO N°</th>\n\
                                <th scope="col" class="table-primary">CANTIDAD</th>\n\
                                <th scope="col" class="table-primary">PESO</th>\n\
                                <th scope="col" class="table-primary">ALTO</th>\n\
                                <th scope="col" class="table-primary">ANCHO</th>\n\
                                <th scope="col" class="table-primary">LARGO</th>\n\
                            </tr>\n\
                            </thead><tbody>';
            for (i = 0; i < arreglo_inf_env.length; i++) {
                tmp = arreglo_inf_env[i];


                datos_kdx += '<tr id="fila' + i + '">';
                datos_kdx += '<td>' + tmp.en_id + '</td>';
                datos_kdx += '<td>' + tmp.det_cantidad + '</td>';
                datos_kdx += '<td>' + tmp.det_peso + '</td>';
                datos_kdx += '<td>' + tmp.det_alto + '</td>';
                datos_kdx += '<td>' + tmp.det_ancho + '</td>';
                datos_kdx += '<td>' + tmp.det_largo + '</td></tr>';
            }
            datos_kdx += '</tbody></table></div></div></div>';
            $('#body_mod_os').html(datos_kdx);

            /**
             * Evento que pagina una tabla 
             */
            $('#tableDetEnv').DataTable({
                //            "order": [[0, 'desc'], [1, 'desc']]
                "order": []
            });
        } else {
            $("#body_mod_os").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}
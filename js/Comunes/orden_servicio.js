/**
 * Metodo que trae a la vista el formulario de recoleccion
 * @returns {undefined}
 */
function formulario_recolec() {
    request = "View/ClienteV/form_solic_recoleccion.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#sectionConten").html(datos);
        combo_ciudad("#selectCiudad");
        combo_tipo_envio("#selectTipEnvio");
        $("#btnGenOrdServ").click(function () {
            validarOrdServ();
        });
        $("#btnCancelarOrd").click(function () {
            resetFormOrdServ();
            formulario_recolec();
        });
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
        seleccionCargaEnvios();
        $("#blqSelectModoCarga").hide();

        $("#btnGMasEnvDoc").click(function () {
            validarMasivoEnvios();
        });
        nameFileCargaMasEnvDoc();
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
 * Metodo que permite validar campos en formulario orden servicio
 * @returns {undefined}
 */
function validarOrdServ() {
    $("#formOrdenServ").validate({
        rules: {
            inputDir: {
                required: true
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
            insertarEnvios();
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

/**
 * Metodo que guarda registro en tabla orden_serv
 * @returns {undefined}
 */
function insertar_orden_serv() {
    request = "Controller/ClienteC/insertar_ord_serv_controller.php";
    cadena = $("#formOrdenServ").serialize(); //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        if (datos == 1) {
            numero_orden_serv();
            ciudad = $("#selectCiudad option:selected").text();
            direccion = $("#inputDir").val();
            tipo_envio = $("#selectTipEnvio option:selected").text();
            if ($('#inpCheckLogiYa').prop('checked')) {
                tipo_servi = "<b>LOGI YA!!</b>";
            } else {
                tipo_servi = "MENSAJERIA";
            }
            limpiarFormulario("#formOrdenServ");
            $("#blqinputDir").hide();
            $("#blqselectCiudad").hide();
            $("#blqinputPerContacto").hide();
            $("#blqinputTele").hide();
            $("#lbTitleSection").html("");
//            $("#inputCantidadEnv").prop('disabled', true);
//            $("#selectTipEnvio").prop('disabled', true);
//            $("#btnGenOrdServ").prop('disabled', true);
//            $("#btnAgreEnv").prop('disabled', false);
//            $(".ocultar").show();
//            $("#controlesInput").hide();
            $("#btnGenOrdServ").hide();
            $("#btnCancelarOrd").hide();
            $("#formOrdenServ").hide();
            $("#instruccionNuevo").show();
            alertify.success('Orden Creada!');
            $("#divMensaje").html("<legend id='legTitulo'></legend>\n\
                  <strong>Lugar de Recolección: </strong>" + direccion + " " + ciudad + "<br>\n\
                  <strong>Tipo de Envio: </strong>" + tipo_envio + "<br>\n\
                  <strong>Tipo Servicio: </strong>" + tipo_servi + "\n\
                  <div class='alert alert-dismissible alert-warning border-warning' id='mensajeCompletar' style='border-radius: 0.5rem;'><strong>Orden de Recolección creada,</strong> por favor diligencie los datos de envio.</div>");
            $("#formDescEnvios").show();
            resetMostrarCampos(tipo_envio, "#blqPeso", "#blqAlto", "#blqAncho", "#blqLargo", "#blqContenido", "#blqValorDecl", "#blqObserv", "#inputCantidadEnv");
            $("#blqCargaExcel").hide();
            $("#blqSelectModoCarga").show();
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
 * Metodo que permite resetear el formulario solicitar orden de servicio
 * @returns {undefined}
 */
function resetFormOrdServ() {
    limpiarFormulario("#formOrdenServ");
    $("#btnCancelarOrd").removeClass("btn-secondary");
    $("#btnCancelarOrd").addClass("btn-dark");
    $("#btnCancelarOrd").html("Cancelar");
    contador = 0;
//    $("#inputDir").prop('disabled', false);
//    $("#selectCiudad").prop('disabled', false);
//    $("#inputPerContacto").prop('disabled', false);
//    $("#inputTele").prop('disabled', false);
//    $("#inputCantidadEnv").prop('disabled', false);
//    $("#selectTipEnvio").prop('disabled', false);
//    $("#btnGenOrdServ").prop('disabled', false);
//    $("#btnAgreEnv").prop('disabled', true);
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
        $("#enlPlantilla").attr("href", "Files/Plantillas/Plantilla_Mensajeria.xlsx");
    }
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
                            <div class="form-group form-group-sm col-lg-6">\n\
                                <label for="inputNombreDestino' + contador + '">Nombre destinatario</label>\n\
                                <input type="text" class="form-control form-control-sm" id="inputNombreDestino' + contador + '" name="inputNombreDestino' + contador + '" placeholder="Nombre Destinatario" required>\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-6">\n\
                                <label for="inputDirDestino' + contador + '">Dirección destino</label>\n\
                                <input type="text" class="form-control form-control-sm" id="inputDirDestino' + contador + '" name="inputDirDestino' + contador + '" placeholder="Dirección Destinatario" required>\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-3">\n\
                                <label for="inputTeleDestino' + contador + '">Teléfono Destino</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputTeleDestino' + contador + '" name="inputTeleDestino' + contador + '" placeholder="Telefono Destinatario">\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-3">\n\
                                <label for="selectCiudDestino' + contador + '">Ciudad Destino</label>\n\
                                <select class="form-control form-control-sm" id="selectCiudDestino' + contador + '" name="selectCiudDestino' + contador + '">\n\
                                </select>\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-3">\n\
                                <label for="inputCantidadEnv' + contador + '">Cantidad</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputCantidadEnv' + contador + '" name="inputCantidadEnv' + contador + '" placeholder="N° Envios" required>\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-3">\n\
                                <label for="inputRefGuia' + contador + '">Referencia</label>\n\
                                <input type="text" class="form-control form-control-sm" id="inputRefGuia' + contador + '" name="inputRefGuia' + contador + '" placeholder="Referencia">\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-3" id="blqPeso' + contador + '" style="display: none;">\n\
                                <label for="inputPeso' + contador + '">Peso Kg</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputPeso' + contador + '" name="inputPeso' + contador + '" placeholder="Peso Kg">\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-3" id="blqAlto' + contador + '" style="display: none;">\n\
                                <label for="inputAlto' + contador + '">Alto cm</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputAlto' + contador + '" name="inputAlto' + contador + '" placeholder="Alto cm">\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-3" id="blqAncho' + contador + '" style="display: none;">\n\
                                <label for="inputAncho' + contador + '">Ancho cm</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputAncho' + contador + '" name="inputAncho' + contador + '" placeholder="Ancho cm">\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-3" id="blqLargo' + contador + '" style="display: none;">\n\
                                <label for="inputLargo' + contador + '">Largo cm</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputLargo' + contador + '" name="inputLargo' + contador + '" placeholder="Largo cm">\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-6" id="blqContenido' + contador + '">\n\
                                <label for="inputContenido' + contador + '">Dice Contener</label>\n\
                                <textarea class="form-control form-control-sm" id="inputContenido' + contador + '" name="inputContenido' + contador + '" rows="1"></textarea>\n\
                            </div>\n\
                           <div class="form-group form-group-sm col-lg-3" id="blqValorDecl' + contador + '" style="display: none;">\n\
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
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-6" id="blqObserv' + contador + '">\n\
                                <label for="inputObserv' + contador + '">Observaciones</label>\n\
                                <textarea class="form-control form-control-sm" id="inputObserv' + contador + '" name="inputObserv' + contador + '" rows="1"></textarea>\n\
                            </div></div></div>');
        //en esta parte se agrega el elemento div contenedor para otro formulario
        $("#parentControl").append('<div id="f' + parseInt(contador + 1) + '" class="alert alert-dismissible alert-primary col-lg-12 border-light" style="border-radius: 0.5rem;"></div>');
        combo_tipo_envio('#selectTipEnvio' + contador + '');
        combo_ciudad('#selectCiudDestino' + contador + '');
        $("#inputContador").val(parseInt(contador));
        resetMostrarCampos(tipo_envio, '#blqPeso' + contador + '', '#blqAlto' + contador + '', '#blqAncho' + contador + '', '#blqLargo' + contador + '', '#blqContenido' + contador + '', '#blqValorDecl' + contador + '', '#blqObserv' + contador + '', '#inputCantidadEnv' + contador + '');
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
//        arregloemp = $.parseJSON(datos);
        $("#textMasEnvDoc").html("");
        limpiarFormulario("#formMasEnvDoc");
        if (datos == 2) {
            lectura_xlsx();
//            alert("subio y es excel");
        } else if (datos == 1) {
            lectura_csv();
        } else {
            $("#tabEnviosDocum").html(datos);
        }

//        $("#tabEnviosDocum").html(datos);
    };
    f_ajax_files(request, cadena, metodo);
}
/**
 * Metodo que lee los datos del archivo excel subido por el usuario
 * @returns {undefined}
 */
function lectura_xlsx() {
    if (tipo_envio !== "MENSAJERIA" && tipo_envio !== "RADICACIÓN DOCUMENTOS") {
        request = "Controller/ClienteC/leer_xlsx_mercancia_controller.php";
    } else {
        request = "Controller/ClienteC/leer_xlsx_controller.php";
    }
    cadena = "a=1";
    metodo = function (datos) {

        $("#changeEnvios").html(datos);

        if ($("#tableEnvios").length > 0) {
            /**
             * Evento que pagina una tabla 
             */
            $('#tableEnvios').DataTable({
                'scrollX': true
            });

            $("#formMasEnvDoc").hide();
            $("#blqSelectModoCarga").hide();
            $("#mensajeCompletar").hide();
            $("#blqCargaExcel").removeClass("alert-primary");
            $("#blqCargaExcel").addClass("alert-light");

//            $("#btnGenRem").attr('href', "Files/GuiasPDF_temp/Plantilla_Mensajeria.xlsx");

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
 * las funciones de php requieren en algunos casdos de la sesión activa
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
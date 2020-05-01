/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {

    $("#enlFormRecoleccion").click(function () {
        formulario_recolec();
    });

});

/**
 * Variable global de funcion AJAX
 * @type type
 */
var efe_aja;
/**
 * Metodo Global de funciones AJAX
 * @param {type} request
 * @param {type} cadena
 * @param {type} metodo
 * @returns {f_ajax}
 */
function f_ajax(request, cadena, metodo) {
    this.efe_aja = $.ajax({
        url: request,
        cache: false,
        beforeSend: function () { /*httpR es la variable global donde guardamos la conexion*/
            $(document).ajaxStop();
            $(document).ajaxStart();
        },
        type: "POST",
        dataType: "html",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8;',
        data: cadena,
        timeout: 15000,
        success: function (datos) {
            metodo(datos);
        },
        error: function () {
            alert("No hay conexión");
        }
    });
}
/**
 * Metodo Ajax para subida de ficheros
 * @param {type} request
 * @param {type} cadena
 * @param {type} metodo
 * @returns {f_ajax_files}
 */
function f_ajax_files(request, cadena, metodo) {
    this.efe_aja = $.ajax({
        url: request,
        cache: false,
        beforeSend: function () { /*httpR es la variable global donde guardamos la conexion*/
            $(document).ajaxStop();
            $(document).ajaxStart();
        },
        type: "POST",
        dataType: "html",
        processData: false,
        contentType: false,
        data: cadena,
        timeout: 20000,
        success: function (datos) {
            metodo(datos);
        },
        error: function () {
            alert("No hay conexión");
        }
    });
}
/**
 * Metodo general que limpia campos de un formulario
 * @param {type: form} formulario
 * @returns {undefined}
 */
function limpiarFormulario(formulario) {
    /* Se encarga de leer todas las etiquetas input del formulario*/
    $(formulario).find('input').each(function () {
        switch (this.type) {
            case 'password':
            case 'text':
            case 'hidden':
            case 'date':
            case 'file':
            case 'time':
                $(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
    /* Se encarga de leer todas las etiquetas select del formulario */
    $(formulario).find('select').each(function () {
        $("#" + this.id + " option[value=0]").attr("selected", true);
    });
    /* Se encarga de leer todas las etiquetas textarea del formulario */
    $(formulario).find('textarea').each(function () {
        $(this).val('');
    });
}
/**
 * Metodo que trae a la vista el formulario de recoleccion
 * @returns {undefined}
 */
function formulario_recolec() {
    request = "View/ClienteV/form_solic_recoleccion.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#sectionConten").html(datos);

        combo_ciudad();
        combo_tipo_envio();
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
        $(".ocultar").hide();
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que llena el combo de seleccion tipo ciudad
 * @returns {undefined}
 */
function combo_ciudad() {
    request = "Controller/ClienteC/consulta_ciudades_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        datouscombo = "";
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            datouscombo += '<option value="' + temp.ciu_id + '">' + temp.ciu_nombre + "</option>";
        }
        $("#selectCiudad").html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que llena el combo de seleccion tipo envio
 * @returns {undefined}
 */
function combo_tipo_envio() {
    request = "Controller/AdminC/AdministrarBD/consulta_tipo_env_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        datouscombo = "";
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            datouscombo += '<option value="' + temp.te_desc + '">' + temp.te_desc + "</option>";
        }
        $("#selectTipEnvio").html(datouscombo);
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
            },
            inputCantidadEnv: {
                required: true,
                number: true
            }
        },
        submitHandler: function (form) {
            insertar_orden_serv();

        }
    });
}

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
    };
    f_ajax(request, cadena, metodo);
}

var tipoEnv;
/**
 * Metodo que llena el combo de seleccion tipo envio
 * @returns {undefined}
 */
function insertar_orden_serv() {
    request = "Controller/ClienteC/insertar_ord_serv_controller.php";
    cadena = $("#formOrdenServ").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            numero_orden_serv();

            $("#inputDir").prop('disabled', true);
            $("#selectCiudad").prop('disabled', true);
            $("#inputPerContacto").prop('disabled', true);
            $("#inputTele").prop('disabled', true);
            $("#inputCantidadEnv").prop('disabled', true);
            $("#selectTipEnvio").prop('disabled', true);
            $("#btnGenOrdServ").prop('disabled', true);
            $("#btnAgreEnv").prop('disabled', false);
            $(".ocultar").show();
            $("#controlesInput").hide();
            $("#divBtnGenOS").hide();

            alertify.success('Orden Creada!');
            $("#divMensaje").html("<div class='alert alert-dismissible alert-warning col-lg-12'>\n\
                  <strong>Lugar de Recolección: </strong>" + $("#inputDir").val() + " " + $("#selectCiudad option:selected").text() + "<br>\n\
                  <strong>Tipo Envio: </strong>" + $("#selectTipEnvio").val() + "<br>\n\
                  <strong>Cantidad : </strong>" + $("#inputCantidadEnv").val() + " Envios.</div> ");
            $("#btnCancelarOrd").removeClass("btn-dark");
            $("#btnCancelarOrd").addClass("btn-secondary");
            $("#btnCancelarOrd").html("Nuevo");
            if ($("#selectTipEnvio").val() === "DOCUMENTOS") {
                tipoEnv = "Documentos";
            } else if ($("#selectTipEnvio").val() === "MERCANCÍA" || $("#selectTipEnvio").val() === "PAQUETES") {
                tipoEnv = "mercancia";
            }
        } else {
            alert(datos);
            $("#divMensaje").html("<div class='alert alert-dismissible alert-danger col-lg-12'><strong>No Guardado! </strong> " + datos + "</div> ");
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que permite resetear el formulario ciudad
 * @returns {undefined}
 */
function resetFormOrdServ() {
    limpiarFormulario("#formOrdenServ");
    $("#btnCancelarOrd").removeClass("btn-secondary");
    $("#btnCancelarOrd").addClass("btn-dark");
    $("#btnCancelarOrd").html("Cancelar");
    $("#inputDir").prop('disabled', false);
    $("#selectCiudad").prop('disabled', false);
    $("#inputPerContacto").prop('disabled', false);
    $("#inputTele").prop('disabled', false);
    $("#inputCantidadEnv").prop('disabled', false);
    $("#selectTipEnvio").prop('disabled', false);
    $("#btnGenOrdServ").prop('disabled', false);
    $("#btnAgreEnv").prop('disabled', true);
}

function formularioEnvios() {
    request = "View/ClienteV/FormulariosEnvios/form_env_" + tipoEnv + ".php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#formEnvios").html(datos);

        $("#btnGMasEnvDoc").click(function () {
            validarMasivoEnvios();
        });

        nameFileCargaMasEnvDoc();
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo de validacion Carga masiva de envios documentos txt
 * @returns {undefined}
 */
function validarMasivoEnvios() {
    $("#formMasEnvDoc").validate({
        rules: {
            inpFileMasEnvDoc: {
                required: true,
                extension: "xls|xlsx|csv"
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

function cargaArchivoEnvDocum() {
    var creando = "<div class='col-lg-3'><span>Loading...</span></div>\n\
                    <div class='col-lg-4'><img class='img-fluid' src='img/animaciones/masivo_mensajeria3.gif' alt=''/></div>\n\
                    <div class='col-lg-5'><span>Epere un momento por favor</span></div>";
    $("#tabEnviosDocum").html(creando);
    request = "Controller/ClienteC/carga_masiva_env_doc_controller.php";
    cadena = new FormData($("#formMasEnvDoc")[0]);
    metodo = function (datos) {
//        arregloemp = $.parseJSON(datos);
        $("#textMasEnvDoc").html("");
        limpiarFormulario("#formMasEnvDoc");
        if (datos == 2) {
            lectura_xlsx();
        } else if (datos == 1) {
            lectura_csv();
        } else {
            $("#tabEnviosDocum").html(datos);
        }

//        $("#tabEnviosDocum").html(datos);
    };
    f_ajax_files(request, cadena, metodo);
}

function lectura_xlsx() {
    request = "Controller/ClienteC/leer_xlsx_controller.php";
    cadena = "a=1";
    metodo = function (datos) {

        $("#tabEnviosDocum").html(datos);

        /**
         * Evento que pagina una tabla 
         */
        $('#tableEnvios').DataTable({
            'scrollX': true
        });

    };
    f_ajax(request, cadena, metodo);
}

function lectura_csv() {
    request = "Controller/ClienteC/leer_csv_controller.php";
    cadena = "a=1";
    metodo = function (datos) {

        $("#tabEnviosDocum").html(datos);

        /**
         * Evento que pagina una tabla 
         */
        $('#tableEnvios').DataTable({
            'scrollX': true
        });

    };
    f_ajax(request, cadena, metodo);
}
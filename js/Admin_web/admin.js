/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {

    $("#adminbd a").click(function () {
        vista_tabla_bd(this);
    });
    $("#enlCliente").click(function () {
        vista_cliente(this);
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
 * Metodo que permite validar campos en formulario ciudad
 * @returns {undefined}
 */
function validarInsertCiud() {
    $("#formCiudades").validate({
        rules: {
            inpNomCiudad: {
                required: true
            }
        },
        submitHandler: function (form) {

            inserta_actualiza_ciudad();
        }
    });
}
/**
 * Metodo que permite validar campos en formulario tipo documento
 * @returns {undefined}
 */
function validarInsertTd() {
    $("#formTipoDoc").validate({
        rules: {
            inpSiglaTipoDoc: {
                required: true,
                maxlength: 5
            },
            inpDescTipoDoc: {
                required: true
            }
        },
        submitHandler: function (form) {

            inserta_actualiza_tipoDoc();
        }
    });
}
/**
 * Metodo que permite validar campos en formulario tipo servicio
 * @returns {undefined}
 */
function validarInsertTS() {
    $("#formTipoServ").validate({
        rules: {
            inpNomServ: {
                required: true
            }
        },
        submitHandler: function (form) {

            inserta_actualiza_tipoServ();
        }
    });
}
/**
 * Metodo que permite validar campos en formulario tipo envio
 * @returns {undefined}
 */
function validarInsertTe() {
    $("#formTipoEnv").validate({
        rules: {
            inpNomEnv: {
                required: true
            }
        },
        submitHandler: function (form) {

            inserta_actualiza_tipoEnv();
        }
    });
}
/**
 * Metodo que permite validar campos en formulario estado servicio
 * @returns {undefined}
 */
function validarInsertES() {
    $("#formEstadoServ").validate({
        rules: {
            inpDescEstServ: {
                required: true
            }
        },
        submitHandler: function (form) {

            inserta_actualiza_estadoServ();
        }
    });
}
/**
 * Metodo que permite validar campos en formulario estado servicio
 * @returns {undefined}
 */
function validarInsertEe() {
    $("#formEstadoEnv").validate({
        rules: {
            inpDescEstEnv: {
                required: true
            }
        },
        submitHandler: function (form) {

            inserta_actualiza_estadoEnv();
        }
    });
}
/**
 * Metodo de mensaje de confirmacion para eliminar
 * @param {type} Metodo
 * @returns {undefined}
 */
function mensajeConfirmarElim(Metodo) {
    alertify.confirm('Confirmar Eliminar', 'Desea eliminar el registro?', function () {
        Metodo();
    }
    , function () {
        alertify.error('Cancelado');
        resetFormCiudad();
        resetFormTd();
        resetFormTs();
        resetFormTe();
        resetFormEs();
        resetFormEe();
    });
}
/**
 * Metodo de mensaje de guardado exitoso
 * @returns {undefined}
 */
function mensajeGuardadoExitoso() {
    $("#mensajeAccion").html("<div class='alert alert-dismissible alert-success'>\n\
              <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
              <strong>Guardado exitosamente!</strong>.</div>");
}
/**
 * Metodo de mensaje de error al guardar
 * @returns {undefined}
 */
function mensaje_No_Guardado() {
    $("#mensajeAccion").html("<div class='alert alert-dismissible alert-danger'>\n\
              <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
              <strong>Error al guardar los datos!</strong>.</div>");
}
/**
 * Metodo de mensaje de Eliminado exitoso
 * @returns {undefined}
 */
function mensajeEliminadoExitoso() {
    alertify.success('Registro eliminado!');
    $("#mensajeAccion").html("<div class='alert alert-dismissible alert-info'>\n\
              <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
              <strong>Registro eliminado!</strong>.</div>");
}
/**
 * Metodo de mensaje de No Eliminado 
 * @returns {undefined}
 */
function mensaje_No_Eliminado() {
    alertify.error('Error, registro no eliminado!');
    $("#mensajeAccion").html("<div class='alert alert-dismissible alert-danger'>\n\
              <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
              <strong>Error, registro no eliminado!</strong>.</div>");
}

var ruta_vista;
/**
 * Metodo que trae vistas al conten
 * @param {type} ruta
 * @returns {undefined}
 */
function vista_tabla_bd(ruta) {
    this.ruta_vista = $(ruta).attr("bd");
    request = "View/AdministradorV/" + ruta_vista + ".php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#conten").html(datos);
        tablaGeneralCiudades();
        combo_depto();
        $("#btnCancelarCiu").click(function () {
            resetFormCiudad();
        });
        $("#btnGuardaCiu").click(function () {
            validarInsertCiud();
        });

        tablaGeneralTipoDoc();
        $("#btnGuardaTipoDoc").click(function () {
            validarInsertTd();
        });
        $("#btnCancelarTipoDoc").click(function () {
            resetFormTd();
        });

        tablaGeneralTipoServ();
        $("#btnGuardaTipoServ").click(function () {
            validarInsertTS();
        });
        $("#btnCancelarTipoServ").click(function () {
            resetFormTs();
        });

        tablaGeneralTipoEnv();
        $("#btnGuardaTipoEnv").click(function () {
            validarInsertTe();
        });
        $("#btnCancelarTipoEnv").click(function () {
            resetFormTe();
        });

        tablaGeneralEstadoServ();
        $("#btnGuardaEstServ").click(function () {
            validarInsertES();
        });
        $("#btnCancelarEstServ").click(function () {
            resetFormEs();
        });

        tablaGeneralEstadoEnv();
        $("#btnGuardaEstEnv").click(function () {
            validarInsertEe();
        });
        $("#btnCancelarEstEnv").click(function () {
            resetFormEe();
        });
    };
    f_ajax(request, cadena, metodo);
}

var arregloCiudad;
/**
 * Metodo que retorna el listado de las ciudades registradas en BD
 * @returns {undefined}
 */
function tablaGeneralCiudades() {
    request = "Controller/ClienteC/consulta_ciudades_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arregloCiudad = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloCiudad !== 0) {
//            tid = arregloCiudad[0];
            datosCiudad = "<table class='table table-responsive-sm table-hover table-bordered table-fixed' id='tableCiudad'>\n\
                             <thead><tr class='thead-light'>\n\
                             <th scope='col'>COD.</th>\n\
                             <th scope='col'>CIUDAD</th>\n\
                             <th scope='col'>DEPTO</th>\n\
                             <th scope='col'>ACT.</th>\n\
                             <th scope='col'>ELIM.</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arregloCiudad.length; i++) {
                tmp = arregloCiudad[i];
                datosCiudad += '<tr class="table-secondary" id="fila' + i + '"><td>' + tmp.ciu_id + "</td>";
                datosCiudad += '<td>' + tmp.ciu_nombre + '</td>';
                datosCiudad += '<td>' + tmp.dep_desc + '</td>';
                datosCiudad += '<td><img src="img/iconos/editar_46x46.png" alt=""/ class="enlace img-responsive actualiza" actu="' + i + '"></td>';
                datosCiudad += '<td><img src="img/iconos/papelera_48x48.png" alt=""/ class="enlace img-responsive elimina" elimi="' + i + '"></td></tr>';
            }
            datosCiudad += "</tbody></table>";
            $("#tablaCiudades").html(datosCiudad);

            /**
             * Evento que pagina una tabla 
             */

            $('#tableCiudad').DataTable({
                "scrollX": true
            });
            clickActualiza();
            clickElimina();
        } else {
            $("#tablaCiudades").html("<div class='alert alert-dismissible alert-danger'>\n\
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
function clickActualiza() {
    $(".actualiza").click(function () {
        actualizar = $(this).attr("actu");
        $("#btnGuardaCiu").removeClass("btn-primary");
        $("#btnGuardaCiu").addClass("btn-warning");
        $("#btnGuardaCiu").html("Actualizar");
        tm = arregloCiudad[actualizar];
        $("#inpCodCiudad").val(tm.ciu_id);
        $("#inpNomCiudad").val(tm.ciu_nombre);
    });
}

/**
 * variable global para eliminar ciudad
 * @type jQuery
 */
var eliminar;

/**
 * Metodo que captura los datos del elemento a eliminar
 * formulario ciudad
 * @returns {undefined}
 */
function clickElimina() {
    $(".elimina").click(function () {
        eliminar = $(this).attr("elimi");
        tm = arregloCiudad[eliminar];
        $("#inpCodCiudad").val(tm.ciu_id);
        mensajeConfirmarElim(elimina_ciudad);
    });
}
/**
 * Metodo que llena el combo de seleccion depto
 * @returns {undefined}
 */
function combo_depto() {
    request = "Controller/AdminC/AdministrarBD/consulta_depto_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        datouscombo = "";
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            datouscombo += '<option value="' + temp.dep_id + '">' + temp.dep_desc + "</option>";
        }
        $("#selectDepto").html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que guarda o actualiza un registro en la tabla ciudad
 * @returns {undefined}
 */
function inserta_actualiza_ciudad() {
    request = "Controller/AdminC/AdministrarBD/insertar_ciud_controller.php";
    cadena = $("#formCiudades").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            mensajeGuardadoExitoso();
            resetFormCiudad();
            tablaGeneralCiudades();
        } else {
            mensaje_No_Guardado();
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que elimina un registro en la tabla ciudad
 * @returns {undefined}
 */
function elimina_ciudad() {
    request = "Controller/AdminC/AdministrarBD/eliminar_ciud_controller.php";
    cadena = $("#formCiudades").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            mensajeEliminadoExitoso();
            resetFormCiudad();
            $('#fila' + eliminar + '').remove();
        } else {
            mensaje_No_Eliminado();
            resetFormCiudad();
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que permite resetear el formulario ciudad
 * @returns {undefined}
 */
function resetFormCiudad() {
    limpiarFormulario("#formCiudades");
    $("#btnGuardaCiu").removeClass("btn-warning");
    $("#btnGuardaCiu").addClass("btn-primary");
    $("#btnGuardaCiu").html("Guardar");
}
/****************************************************************
 * Metodos de tabla tipo_doc
 * 
 ****************************************************************/

/**
 * variable global del arreglo tipo_doc
 * @type Object
 */
var arregloTipoDoc;
/**
 * Metodo que retorna el listado de las tipos de documento registrados en BD
 * @returns {undefined}
 */
function tablaGeneralTipoDoc() {
    request = "Controller/AdminC/AdministrarBD/consulta_tipo_doc_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arregloTipoDoc = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloTipoDoc !== 0) {
            datosTipoDoc = "<table class='table table-responsive-sm table-hover table-bordered table-fixed' id='tableTipoDoc'>\n\
                             <thead><tr class='thead-light'>\n\
                             <th scope='col'>COD.</th>\n\
                             <th scope='col'>SIGLA</th>\n\
                             <th scope='col'>DESC.</th>\n\
                             <th scope='col'>ACT.</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arregloTipoDoc.length; i++) {
                tmp = arregloTipoDoc[i];
                datosTipoDoc += '<tr class="table-warning" id="fila' + i + '"><td>' + tmp.td_id + "</td>";
                datosTipoDoc += '<td>' + tmp.td_sigla + '</td>';
                datosTipoDoc += '<td>' + tmp.td_desc + '</td>';
                datosTipoDoc += '<td><img src="img/iconos/editar_46x46.png" alt=""/ class="enlace img-responsive actualizatd" actutd="' + i + '"></td></tr>';
            }
            datosTipoDoc += "</tbody></table>";
            $("#tablaTipoDoc").html(datosTipoDoc);

            /**
             * Evento que pagina una tabla 
             */

            $('#tableTipoDoc').DataTable();
            clickActualizaTd();
//            clickEliminaTd();
        } else {
            $("#tablaTipoDoc").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que plasma los datos del elemento seleccionado en los campos de texto
 * formulario tipo documento
 * @returns {undefined}
 */
function clickActualizaTd() {
    $(".actualizatd").click(function () {
        actualizar = $(this).attr("actutd");
        $("#btnGuardaTipoDoc").removeClass("btn-primary");
        $("#btnGuardaTipoDoc").addClass("btn-warning");
        $("#btnGuardaTipoDoc").html("Actualizar");
        tm = arregloTipoDoc[actualizar];
        $("#inpCodTipoDoc").val(tm.td_id);
        $("#inpSiglaTipoDoc").val(tm.td_sigla);
        $("#inpDescTipoDoc").val(tm.td_desc);
    });
}

/**
 * Metodo que guarda o actualiza un registro en la tabla tipo_doc
 * @returns {undefined}
 */
function inserta_actualiza_tipoDoc() {
    request = "Controller/AdminC/AdministrarBD/insertar_tipo_doc_controller.php";
    cadena = $("#formTipoDoc").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            mensajeGuardadoExitoso();
            resetFormTd();
            tablaGeneralTipoDoc();
        } else {
            mensaje_No_Guardado();
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que permite resetear el formulario tipo documento
 * @returns {undefined}
 */
function resetFormTd() {
    limpiarFormulario("#formTipoDoc");
    $("#btnGuardaTipoDoc").removeClass("btn-warning");
    $("#btnGuardaTipoDoc").addClass("btn-primary");
    $("#btnGuardaTipoDoc").html("Guardar");
}

/**
 * variable global para eliminar tipo documento
 * @type jQuery
 */
var eliminartd;

/**
 * Metodo que captura los datos del elemento a eliminar
 * formulario tipo documento
 * @returns {undefined}
 */
function clickEliminaTd() {
    $(".eliminatd").click(function () {
        eliminartd = $(this).attr("elimitd");
        tm = arregloTipoDoc[eliminartd];
        $("#inpCodTipoDoc").val(tm.td_id);
        mensajeConfirmarElim(elimina_tipo_doc);
    });
}

/**
 * Metodo que elimina un registro en la tabla tipo_doc
 * @returns {undefined}
 */
function elimina_tipo_doc() {
    request = "Controller/AdminC/AdministrarBD/eliminar_tipo_doc_controller.php";
    cadena = $("#formTipoDoc").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            mensajeEliminadoExitoso();
            resetFormTd();
            $('#fila' + eliminartd + '').remove();
        } else {
            mensaje_No_Eliminado();
            resetFormTd();
        }
    };
    f_ajax(request, cadena, metodo);
}
/****************************************************************
 * Metodos de tabla tipo_serv
 * 
 ****************************************************************/

/**
 * variable global del arreglo tipo_serv
 * @type Object
 */
var arregloTipoServ;
/**
 * Metodo que retorna el listado de las tipos de servicio registrados en BD
 * @returns {undefined}
 */
function tablaGeneralTipoServ() {
    request = "Controller/AdminC/AdministrarBD/consulta_tipo_serv_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arregloTipoServ = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloTipoServ !== 0) {
            datosTipoServ = "<table class='table table-responsive-sm table-hover table-bordered table-fixed' id='tableTipoServ'>\n\
                             <thead><tr class='thead-light'>\n\
                             <th scope='col'>COD.</th>\n\
                             <th scope='col'>SERVICIO</th>\n\
                             <th scope='col'>ACT.</th>\n\
                             <th scope='col'>ELIM.</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arregloTipoServ.length; i++) {
                tmp = arregloTipoServ[i];
                datosTipoServ += '<tr class="table-secondary" id="fila' + i + '"><td>' + tmp.ts_id + "</td>";
                datosTipoServ += '<td>' + tmp.ts_desc + '</td>';
                datosTipoServ += '<td><img src="img/iconos/editar_46x46.png" alt=""/ class="enlace img-responsive actualizats" actuts="' + i + '"></td>';
                datosTipoServ += '<td><img src="img/iconos/papelera_48x48.png" alt=""/ class="enlace img-responsive eliminats" elimits="' + i + '"></td></tr>';
            }
            datosTipoServ += "</tbody></table>";
            $("#tablaTipoServ").html(datosTipoServ);

            /**
             * Evento que pagina una tabla 
             */

            $('#tableTipoServ').DataTable();
            clickActualizaTs();
            clickEliminaTs();
        } else {
            $("#tablaTipoServ").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que plasma los datos del elemento seleccionado en los campos de texto
 * formulario tipo servicio
 * @returns {undefined}
 */
function clickActualizaTs() {
    $(".actualizats").click(function () {
        actualizar = $(this).attr("actuts");
        $("#btnGuardaTipoServ").removeClass("btn-primary");
        $("#btnGuardaTipoServ").addClass("btn-warning");
        $("#btnGuardaTipoServ").html("Actualizar");
        tm = arregloTipoServ[actualizar];
        $("#inpCodTipoServ").val(tm.ts_id);
        $("#inpNomServ").val(tm.ts_desc);
    });
}

/**
 * Metodo que guarda o actualiza un registro en la tabla tipo_serv
 * @returns {undefined}
 */
function inserta_actualiza_tipoServ() {
    request = "Controller/AdminC/AdministrarBD/insertar_tipo_serv_controller.php";
    cadena = $("#formTipoServ").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            mensajeGuardadoExitoso();
            resetFormTs();
            tablaGeneralTipoServ();
        } else {
            mensaje_No_Guardado();
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que permite resetear el formulario tipo servicio
 * @returns {undefined}
 */
function resetFormTs() {
    limpiarFormulario("#formTipoServ");
    $("#btnGuardaTipoServ").removeClass("btn-warning");
    $("#btnGuardaTipoServ").addClass("btn-primary");
    $("#btnGuardaTipoServ").html("Guardar");
}

/**
 * variable global para eliminar tipo servicio
 * @type jQuery
 */
var eliminarts;

/**
 * Metodo que captura los datos del elemento a eliminar
 * formulario tipo servicio
 * @returns {undefined}
 */
function clickEliminaTs() {
    $(".eliminats").click(function () {
        eliminarts = $(this).attr("elimits");
        tm = arregloTipoServ[eliminarts];
        $("#inpCodTipoServ").val(tm.ts_id);
        mensajeConfirmarElim(elimina_tipo_serv);
    });
}

/**
 * Metodo que elimina un registro en la tabla tipo_serv
 * @returns {undefined}
 */
function elimina_tipo_serv() {
    request = "Controller/AdminC/AdministrarBD/eliminar_tipo_serv_controller.php";
    cadena = $("#formTipoServ").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            mensajeEliminadoExitoso();
            resetFormTs();
            $('#fila' + eliminarts + '').remove();
        } else {
            mensaje_No_Eliminado();
            resetFormTs();
        }
    };
    f_ajax(request, cadena, metodo);
}

/****************************************************************
 * Metodos de tabla tipo_envio
 * 
 ****************************************************************/

/**
 * variable global del arreglo tipo_envio
 * @type Object
 */
var arregloTipoEnv;
/**
 * Metodo que retorna el listado de las tipos de servicio registrados en BD
 * @returns {undefined}
 */
function tablaGeneralTipoEnv() {
    request = "Controller/AdminC/AdministrarBD/consulta_tipo_env_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arregloTipoEnv = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloTipoEnv !== 0) {
            datosTipoEnv = "<table class='table table-responsive-sm table-hover table-bordered table-fixed' id='tableTipoEnv'>\n\
                             <thead><tr class='thead-light'>\n\
                             <th scope='col'>COD.</th>\n\
                             <th scope='col'>SERVICIO</th>\n\
                             <th scope='col'>ACT.</th>\n\
                             <th scope='col'>ELIM.</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arregloTipoEnv.length; i++) {
                tmp = arregloTipoEnv[i];
                datosTipoEnv += '<tr class="table-warning" id="fila' + i + '"><td>' + tmp.te_id + "</td>";
                datosTipoEnv += '<td>' + tmp.te_desc + '</td>';
                datosTipoEnv += '<td><img src="img/iconos/editar_46x46.png" alt=""/ class="enlace img-responsive actualizate" actute="' + i + '"></td>';
                datosTipoEnv += '<td><img src="img/iconos/papelera_48x48.png" alt=""/ class="enlace img-responsive eliminate" elimite="' + i + '"></td></tr>';
            }
            datosTipoEnv += "</tbody></table>";
            $("#tablaTipoEnv").html(datosTipoEnv);

            /**
             * Evento que pagina una tabla 
             */

            $('#tableTipoEnv').DataTable();
            clickActualizaTe();
            clickEliminaTe();
        } else {
            $("#tablaTipoEnv").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que plasma los datos del elemento seleccionado en los campos de texto
 * formulario tipo envio
 * @returns {undefined}
 */
function clickActualizaTe() {
    $(".actualizate").click(function () {
        actualizar = $(this).attr("actute");
        $("#btnGuardaTipoEnv").removeClass("btn-primary");
        $("#btnGuardaTipoEnv").addClass("btn-warning");
        $("#btnGuardaTipoEnv").html("Actualizar");
        tm = arregloTipoEnv[actualizar];
        $("#inpCodTipoEnv").val(tm.te_id);
        $("#inpNomEnv").val(tm.te_desc);
    });
}

/**
 * Metodo que guarda o actualiza un registro en la tabla tipo_envio
 */
function inserta_actualiza_tipoEnv() {
    request = "Controller/AdminC/AdministrarBD/insertar_tipo_env_controller.php";
    cadena = $("#formTipoEnv").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            mensajeGuardadoExitoso();
            resetFormTe();
            tablaGeneralTipoEnv();
        } else {
            mensaje_No_Guardado();
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que permite resetear el formulario tipo envio
 * @returns {undefined}
 */
function resetFormTe() {
    limpiarFormulario("#formTipoEnv");
    $("#btnGuardaTipoEnv").removeClass("btn-warning");
    $("#btnGuardaTipoEnv").addClass("btn-primary");
    $("#btnGuardaTipoEnv").html("Guardar");
}

/**
 * variable global para eliminar tipo envio
 * @type jQuery
 */
var eliminarte;

/**
 * Metodo que captura los datos del elemento a eliminar
 * formulario tipo envio
 * @returns {undefined}
 */
function clickEliminaTe() {
    $(".eliminate").click(function () {
        eliminarte = $(this).attr("elimite");
        tm = arregloTipoEnv[eliminarte];
        $("#inpCodTipoEnv").val(tm.te_id);
        mensajeConfirmarElim(elimina_tipo_env);
    });
}

/**
 * Metodo que elimina un registro en la tabla tipo_envio
 * @returns {undefined}
 */
function elimina_tipo_env() {
    request = "Controller/AdminC/AdministrarBD/eliminar_tipo_env_controller.php";
    cadena = $("#formTipoEnv").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            mensajeEliminadoExitoso();
            resetFormTe();
            $('#fila' + eliminarte + '').remove();
        } else {
            mensaje_No_Eliminado();
            resetFormTe();
        }
    };
    f_ajax(request, cadena, metodo);
}
/****************************************************************
 * Metodos de tabla estado_serv
 * 
 ****************************************************************/

/**
 * variable global del arreglo estado_serv
 * @type Object
 */
var arregloEstadoServ;
/**
 * Metodo que retorna el listado de estados de servicio registrados en BD
 * @returns {undefined}
 */
function tablaGeneralEstadoServ() {
    request = "Controller/AdminC/AdministrarBD/consulta_estado_serv_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arregloEstadoServ = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEstadoServ !== 0) {
            datosEstServ = "<table class='table table-responsive-sm table-hover table-bordered table-fixed' id='tableEstServ'>\n\
                             <thead><tr class='thead-light'>\n\
                             <th scope='col'>COD.</th>\n\
                             <th scope='col'>EST SERV</th>\n\
                             <th scope='col'>ACT.</th>\n\
                             <th scope='col'>ELIM.</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arregloEstadoServ.length; i++) {
                tmp = arregloEstadoServ[i];
                datosEstServ += '<tr class="table-info" id="fila' + i + '"><td>' + tmp.es_id + "</td>";
                datosEstServ += '<td>' + tmp.es_desc + '</td>';
                datosEstServ += '<td><img src="img/iconos/editar_46x46.png" alt=""/ class="enlace img-responsive actualizaes" actues="' + i + '"></td>';
                datosEstServ += '<td><img src="img/iconos/papelera_48x48.png" alt=""/ class="enlace img-responsive eliminaes" elimies="' + i + '"></td></tr>';
            }
            datosEstServ += "</tbody></table>";
            $("#tablaEstServ").html(datosEstServ);

            /**
             * Evento que pagina una tabla 
             */

            $('#tableEstServ').DataTable();
            clickActualizaEs();
            clickEliminaEs();
        } else {
            $("#tablaEstServ").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que plasma los datos del elemento seleccionado en los campos de texto
 * formulario estado servicio
 * @returns {undefined}
 */
function clickActualizaEs() {
    $(".actualizaes").click(function () {
        actualizar = $(this).attr("actues");
        $("#btnGuardaEstServ").removeClass("btn-primary");
        $("#btnGuardaEstServ").addClass("btn-warning");
        $("#btnGuardaEstServ").html("Actualizar");
        tm = arregloEstadoServ[actualizar];
        $("#inpCodEstServ").val(tm.es_id);
        $("#inpDescEstServ").val(tm.es_desc);
    });
}

/**
 * Metodo que guarda o actualiza un registro en la tabla estado_serv
 * @returns {undefined}
 */
function inserta_actualiza_estadoServ() {
    request = "Controller/AdminC/AdministrarBD/insertar_est_serv_controller.php";
    cadena = $("#formEstadoServ").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            mensajeGuardadoExitoso();
            resetFormEs();
            tablaGeneralEstadoServ();
        } else {
            mensaje_No_Guardado();
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que permite resetear el formulario estado servicio
 * @returns {undefined}
 */
function resetFormEs() {
    limpiarFormulario("#formEstadoServ");
    $("#btnGuardaEstServ").removeClass("btn-warning");
    $("#btnGuardaEstServ").addClass("btn-primary");
    $("#btnGuardaEstServ").html("Guardar");
}

/**
 * variable global para eliminar estado servicio
 * @type jQuery
 */
var eliminares;

/**
 * Metodo que captura los datos del elemento a eliminar
 * formulario estado servicio
 * @returns {undefined}
 */
function clickEliminaEs() {
    $(".eliminaes").click(function () {
        eliminares = $(this).attr("elimies");
        tm = arregloEstadoServ[eliminares];
        $("#inpCodEstServ").val(tm.es_id);
        mensajeConfirmarElim(elimina_est_serv);
    });
}

/**
 * Metodo que elimina un registro en la tabla estado_serv
 * @returns {undefined}
 */
function elimina_est_serv() {
    request = "Controller/AdminC/AdministrarBD/eliminar_est_serv_controller.php";
    cadena = $("#formEstadoServ").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            mensajeEliminadoExitoso();
            resetFormEs();
            $('#fila' + eliminares + '').remove();
        } else {
            mensaje_No_Eliminado();
            resetFormEs();
        }
    };
    f_ajax(request, cadena, metodo);
}
/****************************************************************
 * Metodos de tabla estado_env
 * 
 ****************************************************************/

/**
 * variable global del arreglo estado_env
 * @type Object
 */
var arregloEstadoEnv;
/**
 * Metodo que retorna el listado de estados de envio registrados en BD
 * @returns {undefined}
 */
function tablaGeneralEstadoEnv() {
    request = "Controller/AdminC/AdministrarBD/consulta_estado_env_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arregloEstadoEnv = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEstadoEnv !== 0) {
            datosEstEnv = "<table class='table table-responsive-sm table-hover table-bordered table-fixed' id='tableEstEnv'>\n\
                             <thead><tr class='thead-light'>\n\
                             <th scope='col'>COD.</th>\n\
                             <th scope='col'>EST ENVIO</th>\n\
                             <th scope='col'>ACT.</th>\n\
                             <th scope='col'>ELIM.</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arregloEstadoEnv.length; i++) {
                tmp = arregloEstadoEnv[i];
                datosEstEnv += '<tr class="table-warning" id="fila' + i + '"><td>' + tmp.ee_id + "</td>";
                datosEstEnv += '<td>' + tmp.ee_desc + '</td>';
                datosEstEnv += '<td><img src="img/iconos/editar_46x46.png" alt=""/ class="enlace img-responsive actualizaee" actuee="' + i + '"></td>';
                datosEstEnv += '<td><img src="img/iconos/papelera_48x48.png" alt=""/ class="enlace img-responsive eliminaee" elimiee="' + i + '"></td></tr>';
            }
            datosEstEnv += "</tbody></table>";
            $("#tablaEstEnv").html(datosEstEnv);

            /**
             * Evento que pagina una tabla 
             */

            $('#tableEstEnv').DataTable();
            clickActualizaEe();
            clickEliminaEe();
        } else {
            $("#tablaEstEnv").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que plasma los datos del elemento seleccionado en los campos de texto
 * formulario estado envio
 * @returns {undefined}
 */
function clickActualizaEe() {
    $(".actualizaee").click(function () {
        actualizar = $(this).attr("actuee");
        $("#btnGuardaEstEnv").removeClass("btn-primary");
        $("#btnGuardaEstEnv").addClass("btn-warning");
        $("#btnGuardaEstEnv").html("Actualizar");
        tm = arregloEstadoEnv[actualizar];
        $("#inpCodEstEnv").val(tm.ee_id);
        $("#inpDescEstEnv").val(tm.ee_desc);
    });
}

/**
 * Metodo que guarda o actualiza un registro en la tabla estado_env
 * @returns {undefined}
 */
function inserta_actualiza_estadoEnv() {
    request = "Controller/AdminC/AdministrarBD/insertar_est_env_controller.php";
    cadena = $("#formEstadoEnv").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            mensajeGuardadoExitoso();
            resetFormEe();
            tablaGeneralEstadoEnv();
        } else {
            mensaje_No_Guardado();
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que permite resetear el formulario estado envio
 * @returns {undefined}
 */
function resetFormEe() {
    limpiarFormulario("#formEstadoEnv");
    $("#btnGuardaEstEnv").removeClass("btn-warning");
    $("#btnGuardaEstEnv").addClass("btn-primary");
    $("#btnGuardaEstEnv").html("Guardar");
}

/**
 * variable global para eliminar estado envio
 * @type jQuery
 */
var eliminaree;

/**
 * Metodo que captura los datos del elemento a eliminar
 * formulario estado envio
 * @returns {undefined}
 */
function clickEliminaEe() {
    $(".eliminaee").click(function () {
        eliminaree = $(this).attr("elimiee");
        tm = arregloEstadoEnv[eliminaree];
        $("#inpCodEstEnv").val(tm.ee_id);
        mensajeConfirmarElim(elimina_est_env);
    });
}

/**
 * Metodo que elimina un registro en la tabla estado_env
 * @returns {undefined}
 */
function elimina_est_env() {
    request = "Controller/AdminC/AdministrarBD/eliminar_est_env_controller.php";
    cadena = $("#formEstadoEnv").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            mensajeEliminadoExitoso();
            resetFormEe();
            $('#fila' + eliminaree + '').remove();
        } else {
            mensaje_No_Eliminado();
            resetFormEe();
        }
    };
    f_ajax(request, cadena, metodo);
}

/****************************************************************
 * Metodos de tabla cliente
 * 
 ****************************************************************/

/**
 * Metodo que carga el panel y herramientas de administracion de clientes
 * @returns {undefined}
 */
function vista_cliente() {
    request = "View/AdministradorV/Adcliente/admin_cliente.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#conten").html(datos);
        $("#list-formCliente-list").click(function () {
            vista_form_Nuevo_Edit();

        });
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga el form para editar o modificar clientes
 * @returns {undefined}
 */
function vista_form_Nuevo_Edit() {
    request = "View/AdministradorV/Adcliente/form_nuevo_editar.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html(datos);
        combo_tipo_docum();
        combo_tipo_us();
        $("#btnBuscaCli").click(function () {
            validarBuscarCli();
        });
        $("#btnCancelarCli").click(function () {
            resetFormCliente();
        });
        $("#btnGuardaCli").click(function () {
            validarGuardaActCli();
        });

    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que llena el combo de seleccion tipo doc
 * @returns {undefined}
 */
function combo_tipo_docum() {
    request = "Controller/AdminC/AdministrarBD/consulta_tipo_doc_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        datodoccombo = "";
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            datodoccombo += '<option value="' + temp.td_id + '">' + temp.td_sigla + "</option>";
        }
        $("#selectTipDoc").html(datodoccombo);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que llena el combo de seleccion tipo usuario
 * @returns {undefined}
 */
function combo_tipo_us() {
    request = "Controller/AdminC/AdministrarCliente/consulta_tipo_us_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        datouscombo = "";
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            datouscombo += '<option value="' + temp.tu_id + '">' + temp.tu_tipo + "</option>";
        }
        $("#selectTipUs").html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que permite validar la busqueda de un cliente
 * @returns {undefined}
 */
function validarBuscarCli() {
    $("#formBuscarCli").validate({
        rules: {
            inpBuscaDocCli: {
                required: true,
                digits: true
            }
        },
        submitHandler: function (form) {
            buscar_cliente();
        }
    });
}

/**
 * Metodo que retorna la informacion de un cliente para editar los datos
 * plasma la informacion en los campos de texto del formulario clientes
 * @returns {undefined}
 */
function buscar_cliente() {
    request = "Controller/AdminC/AdministrarCliente/consulta_cliente_controller.php";
    cadena = $("#formBuscarCli").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        arregloCli = $.parseJSON(datos);
        clitm = arregloCli[0];
        if (typeof clitm === 'undefined') {
            limpiarFormulario("#formBuscarCli");
            alertify.alert('No se encuentra en Base de Datos').setHeader('<em> Cuidado! </em> ');
        } else {
            $("#inputNomCli").val(clitm.cli_nombre);
            $('#selectTipDoc option[value="' + clitm.cli_td_id + '"]').attr('selected', true);
            $("#inputNumCli").val(clitm.cli_num_doc);
            $("#inputTelCli").val(clitm.cli_tel);
            $("#inputCelCli").val(clitm.cli_cel);
            $("#inputDirCli").val(clitm.cli_direccion);
            $("#inputPerCont").val(clitm.cli_per_cont);
            $("#selectTipDoc").prop("disabled", true);
            $("#inputNumCli").prop("disabled", true);
            if (clitm.tu_tipo === null) {
                $("#menCliNoAccess").html("<div class='alert alert-dismissible alert-danger'>\n\
                <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                <strong>CLIENTE SIN ACCESO AL SISTEMA</strong></div> ");
            } else {
                $('#selectTipUs option[value="' + clitm.tu_id + '"]').attr('selected', true);
            }
            $("#btnGuardaCli").removeClass("btn-primary");
            $("#btnGuardaCli").addClass("btn-warning");
            $("#btnGuardaCli").html("Actualizar");
        }

    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que permite resetear el formulario Cliente
 * @returns {undefined}
 */
function resetFormCliente() {
    limpiarFormulario("#formCliente");
    limpiarFormulario("#formBuscarCli");
    $("#selectTipDoc").html("");
    combo_tipo_docum();
    $("#selectTipUs").html("");
    combo_tipo_us();
    $("#selectTipDoc").prop("disabled", false);
    $("#inputNumCli").prop("disabled", false);
    $("#menCliNoAccess").html("");
    $("#btnGuardaCli").removeClass("btn-warning");
    $("#btnGuardaCli").addClass("btn-primary");
    $("#btnGuardaCli").html("Guardar");
}
/**
 * Metodo que permite validar la busqueda de un cliente
 * @returns {undefined}
 */
function validarGuardaActCli() {
    $("#formCliente").validate({
        rules: {
            inputNomCli: {
                required: true
            },
            inputNumCli: {
                required: true,
                digits: true
            },
            inputDirCli: {
                required: true
            }
        },
        submitHandler: function (form) {
            inserta_actualiza_cliente();
        }
    });
}
/**
 * Metodo que guarda o actualiza un registro en la tabla cliente
 * @returns {undefined}
 */
function inserta_actualiza_cliente() {
    request = "Controller/AdminC/AdministrarCliente/insertar_cliente_controller.php";
    cadena = $("#formCliente").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            alertify.success('Registro Guardado, Usuario Autorizado!');
            resetFormCliente();
        } else if (datos == 3) {
            alertify.warning('Registro Guardado pero el usuario NO fue Autorizado!');
            resetFormCliente();
        } else {
//            alert(datos);
            alertify.error('NO Guardado!');
        }
    };
    f_ajax(request, cadena, metodo);
}
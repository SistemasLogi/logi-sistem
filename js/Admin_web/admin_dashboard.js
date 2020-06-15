$(document).ready(function () {
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    $("#link_form_cliente").click(function () {
        vista_form_Nuevo_Edit();
    });
    $("#link_form_editar").click(function () {
        vista_form_Edit();
    });
    $("#link_vista_gest").click(function () {
        vista_gestionar_os();
    });
    $("#link_vista_dashboard_serv").click(function () {
        vista_dashboard();
    });

    $("#adminbd a").click(function () {
        vista_tabla_bd(this);
    });

    vista_dashboard();

    consulta_os_program_ini();

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


/****************************************************************
 * Metodos de tabla cliente
 * 
 ****************************************************************/

/**
 * Metodo que carga el form para guardar clientes
 * @returns {undefined}
 */
function vista_form_Nuevo_Edit() {
    request = "View/AdministradorV/Adcliente/form_nuevo_editar.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html(datos);
        combo_tipo_docum();
        combo_tipo_us();
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
 * Metodo que carga el form para modificar clientes
 * @returns {undefined}
 */
function vista_form_Edit() {
    request = "View/AdministradorV/Adcliente/form_editar.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html(datos);
        tablaGeneralClientesActivos();
        combo_tipo_us();
        $("#btnBuscaCli").click(function () {
            validarBuscarCli();
        });
        $("#btnCancelarCli").click(function () {
            resetFormClienteEditar();
        });
        $("#btnGuardaAct").click(function () {
            validarActCli();
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
        $("#selectTipUsAc").html(datouscombo);
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
            $("#inputNomCliAc").val(clitm.cli_nombre);
//            $('#selectTipDocAc option[value="' + clitm.cli_td_id + '"]').attr('selected', true);
            $('#selectTipDocAc').val(clitm.cli_td_id);
            $("#inputNumCliAc").val(clitm.cli_num_doc);
            $("#inputTelCliAc").val(clitm.cli_tel);
            $("#inputCelCliAc").val(clitm.cli_cel);
            $("#inputDirCliAc").val(clitm.cli_direccion);
            $("#inputPerContAc").val(clitm.cli_per_cont);
//            $("#selectTipDoc").prop("disabled", true);
//            $("#inputNumCli").prop("disabled", true);
            if (clitm.tu_tipo === null) {
                $("#menCliNoAccess").html("<div class='alert alert-dismissible alert-danger'>\n\
                <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                <strong>CLIENTE SIN ACCESO AL SISTEMA</strong></div> ");
            } else {
                $('#selectTipUsAc option[value="' + clitm.tu_id + '"]').attr('selected', true);
            }
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
    $("#selectTipDoc").html("");
    combo_tipo_docum();
    $("#selectTipUs").html("");
    combo_tipo_us();
    $("#selectTipDoc").prop("disabled", false);
    $("#inputNumCli").prop("disabled", false);
    $("#menCliNoAccess").html("");
}
/**
 * Metodo que permite resetear el formulario Cliente editar
 * @returns {undefined}
 */
function resetFormClienteEditar() {
    limpiarFormulario("#formClienteAct");
    limpiarFormulario("#formBuscarCli");
    $("#selectTipUs").html("");
    combo_tipo_us();
    $("#selectTipDoc").prop("disabled", false);
    $("#inputNumCli").prop("disabled", false);
    $("#menCliNoAccess").html("");
}
/**
 * Metodo que permite validar formulario de ingreso de cliente
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
 * Metodo que permite validar formulario editar cliente
 * @returns {undefined}
 */
function validarActCli() {
    $("#formClienteAct").validate({
        rules: {
            inputNomCliAc: {
                required: true
            },
            inputNumCliAc: {
                required: true,
                digits: true
            },
            inputDirCliAc: {
                required: true
            }
        },
        submitHandler: function (form) {
            actualiza_cliente();
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
            alert(datos);
            alertify.error('NO Guardado!');
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que guarda o actualiza un registro en la tabla cliente
 * @returns {undefined}
 */
function actualiza_cliente() {
    request = "Controller/AdminC/AdministrarCliente/actualizar_cliente_controller.php";
    cadena = $("#formClienteAct").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            alertify.success('Registro Guardado, Usuario Autorizado!');
            resetFormClienteEditar();
            tablaGeneralClientesActivos();
        } else {
            alert(datos);
            alertify.error('NO Guardado!');
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que retorna el listado de clientes activos registrados en BD
 * @returns {undefined}
 */
function tablaGeneralClientesActivos() {
    request = "Controller/AdminC/AdministrarCliente/consulta_general_cliente_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arregloClientesAct = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloClientesAct !== 0) {
            datosCliente = "<table class='table table-responsive-sm table-sm table-hover table-bordered table-fixed' id='tableClientesAct'>\n\
                             <thead><tr class='thead-light'>\n\
                             <th scope='col'>TD</th>\n\
                             <th scope='col'>N° DOCUMENTO</th>\n\
                             <th scope='col'>NOMBRE</th>\n\
                             <th scope='col'>TELEFONO</th>\n\
                             <th scope='col'>CELULAR</th>\n\
                             <th scope='col'>DIRECCION</th>\n\
                             <th scope='col'>CONTACTO</th>\n\
                             <th scope='col'>CLIENTE</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arregloClientesAct.length; i++) {
                tmp = arregloClientesAct[i];
                datosCliente += '<tr class="table-secondary table-sm" id="fila' + i + '"><td>' + tmp.td_sigla + "</td>";
                datosCliente += '<td>' + tmp.cli_num_doc + '</td>';
                datosCliente += '<td>' + tmp.cli_nombre + '</td>';
                datosCliente += '<td>' + tmp.cli_tel + '</td>';
                datosCliente += '<td>' + tmp.cli_cel + '</td>';
                datosCliente += '<td>' + tmp.cli_direccion + '</td>';
                datosCliente += '<td>' + tmp.cli_per_cont + '</td>';
                datosCliente += '<td>' + tmp.tu_tipo + '</td></tr>';
            }
            datosCliente += "</tbody></table>";
            $("#tablaCliAct").html(datosCliente);

            /**
             * Evento que pagina una tabla 
             */

            $('#tableClientesAct').DataTable();

        } else {
            $("#tablaEstEnv").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
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
        $("#list-formCliente").html(datos);
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
            datosCiudad = "<legend>Tabla General</legend><table class='table table-responsive-sm table-hover table-bordered table-fixed' id='tableCiudad'>\n\
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
        $('#selectDepto option[value="' + tm.dep_id + '"]').attr('selected', true);

        //En esta linea me redirije al formulario con una velocodad establecida
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#page-content-wrapper").offset().top
        }, 300);
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
//            alert(datos);
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
    $("#selectDepto").html("");
    combo_depto();
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
            datosTipoDoc = "<legend>Tabla General</legend><table class='table table-responsive-sm table-hover table-bordered table-fixed' id='tableTipoDoc'>\n\
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
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#page-content-wrapper").offset().top
        }, 300);
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
            datosTipoServ = "<legend>Tabla General</legend><table class='table table-responsive-sm table-hover table-bordered table-fixed' id='tableTipoServ'>\n\
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

        $([document.documentElement, document.body]).animate({
            scrollTop: $("#page-content-wrapper").offset().top
        }, 300);
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
            datosTipoEnv = "<legend>Tabla General</legend><table class='table table-responsive-sm table-hover table-bordered table-fixed' id='tableTipoEnv'>\n\
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

        $([document.documentElement, document.body]).animate({
            scrollTop: $("#page-content-wrapper").offset().top
        }, 300);
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
            datosEstServ = "<legend>Tabla General</legend><table class='table table-responsive-sm table-hover table-bordered table-fixed' id='tableEstServ'>\n\
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

        $([document.documentElement, document.body]).animate({
            scrollTop: $("#page-content-wrapper").offset().top
        }, 300);
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

        $([document.documentElement, document.body]).animate({
            scrollTop: $("#page-content-wrapper").offset().top
        }, 300);
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
 * Metodos de ordenes de servicio
 * 
 ****************************************************************/

/**
 * Metodo que carga el form para guardar clientes
 * @returns {undefined}
 */
function vista_gestionar_os() {
    request = "View/AdministradorV/OrdenesServicio/gestion_os.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html(datos);

        formulario_oreden_serv();

        $("#enlFormOrdenServ").click(function () {
            formulario_oreden_serv();
            $("#items li").removeClass("active");
            $("#itemenlFormOrdenServ").addClass("active");
        });
        $("#enlSeguimiento").click(function () {
            $("#items li").removeClass("active");
            $("#itemenlSeguimiento").addClass("active");
            seguimiento_estado();
        });
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga el dashboard principal
 * @returns {undefined}
 */
function vista_dashboard() {
    request = "View/AdministradorV/Dashboard/dashboard.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        exist = false;
        $("#list-formCliente").html(datos);
        consulta_dashboard_serv_card();
        consulta_dashboard_serv();
        setInterval(consulta_os_program, 20000);
    };
    f_ajax(request, cadena, metodo);
}

var serv_program;
var serv_asignado;
var serv_exitoso;
var serv_novedad;
var arregloEstOS;
var arregloEstOScard;
var tablaEst_x_OS;
var arregloEstOSfil;

/**
 * Metodo que carga el dashboard principal
 * @returns {undefined}
 */
function consulta_dashboard_serv() {
    request = "Controller/AdminC/AdministrarOS/consulta_ult_est_os_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        serv_program = 0;
        serv_asignado = 0;
        serv_exitoso = 0;
        serv_novedad = 0;
        arregloEstOS = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEstOS !== 0) {
            datosEstOS = "<div class='table-responsive text-nowrap' id='tablaEstadoOS'><table class='table table-striped table-sm table-bordered' id='tableEstOS'>\n\
                             <thead><tr style='background-color: #13b955'>\n\
                             <th scope='col'></th>\n\
                             <th scope='col'>N° ORDEN</th>\n\
                             <th scope='col'>FECHA</th>\n\
                             <th scope='col'>ESTADO</th>\n\
                             <th scope='col'>DOC CLIENTE</th>\n\
                             <th scope='col'>NOM CLIENTE</th>\n\
                             <th scope='col'>DIRECCION</th>\n\
                             <th scope='col'>CIUDAD</th>\n\
                             <th scope='col'>TIPO SERV</th>\n\
                             <th scope='col'>TIPO ENV</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arregloEstOS.length; i++) {
                tmp = arregloEstOS[i];
                if (tmp.es_id == 1) {
                    datosEstOS += '<tr class="table-sm" id="fila' + i + '"><td class="enlace actuestos" act="' + i + '"><span class="ion-android-contact" style="color: #fb972e;"></span></td>';
                } else if (tmp.es_id == 2) {
                    datosEstOS += '<tr class="table-sm" id="fila' + i + '"><td class="enlace actuestos" act="' + i + '"><span class="ion-android-car" style="color: #0d40ff;"></span></td>';
                } else if (tmp.es_id == 3) {
                    datosEstOS += '<tr class="table-sm" id="fila' + i + '"><td class="enlace actuestos" act="' + i + '"><span class="ion-checkmark-circled" style="color: #13b955;"></span></td>';
                } else if (tmp.es_id == 4) {
                    datosEstOS += '<tr class="table-sm" id="fila' + i + '"><td class="enlace actuestos" act="' + i + '"><span class="ion-close-circled" style="color: #ff5757;"></span></td>';
                }
                datosEstOS += '<td>' + tmp.os_id + "</td>";
                datosEstOS += '<td>' + tmp.exs_fecha_hora + '</td>';
                if (tmp.es_id == 1) {
                    datosEstOS += '<td style="background-color: #fea;">' + tmp.es_desc + '</td>';
//                    serv_program++;
                } else if (tmp.es_id == 2) {
                    datosEstOS += '<td style="background-color: #82dcff;">' + tmp.es_desc + '</td>';
//                    serv_asignado++;
                } else if (tmp.es_id == 3) {
                    datosEstOS += '<td style="background-color: #b0ffc5;">' + tmp.es_desc + '</td>';
//                    serv_exitoso++;
                } else if (tmp.es_id == 4) {
                    datosEstOS += '<td style="background-color: #ffcfcf;">' + tmp.es_desc + '</td>';
//                    serv_novedad++;
                }
                datosEstOS += '<td>' + tmp.cli_num_doc + '</td>';
                datosEstOS += '<td>' + tmp.cli_nombre + '</td>';
                datosEstOS += '<td>' + tmp.os_direccion + '</td>';
                datosEstOS += '<td>' + tmp.ciu_nombre + '</td>';
                datosEstOS += '<td>' + tmp.ts_desc + '</td>';
                datosEstOS += '<td>' + tmp.te_desc + '</td></tr>';
            }
            datosEstOS += "</tbody></table></div>";
            $("#tbInfoEstOS").html(datosEstOS);

            /**
             * Evento que pagina una tabla 
             */
            tablaEst_x_OS = $('#tableEstOS').DataTable({
                'scrollX': true
            });

            clickActuEstado_OS();
        } else {
            $("#tableEstOS").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que retorna la cantidad de servicios segun su estado a la vista de los paneles
 * @returns {undefined}
 */
function control_dash_serv() {
    $("#cantServExitosos").html(serv_exitoso);
    $("#cantServConNov").html(serv_novedad);
    $("#cantServProgram").html(serv_program);
    $("#cantServAsignados").html(serv_asignado);
}

/**
 * Metodo que devuelve el formulario para actualizar el estado
 * formulario ciudad
 * @returns {undefined}
 */
function clickActuEstado_OS() {
    $("#tableEstOS").on("click", ".actuestos", function () {
//    $(".actuestos").click(function () {
        actu_es_os = $(this).attr("act");
        $('#ModalActuEstOS').modal('toggle');

        form_act_est_os(arregloEstOS, actu_es_os);
    });
}

function form_act_est_os(array, position) {
    tm = array[position];

    var fech = tm.exs_fecha_hora;
    var element = fech.split(' ');
    var fecha = element[0].split('-');
    formato_fec = fecha[2] + '/' + fecha[1] + '/' + fecha[0];
    var tiempo = element[1].split(':');
    formato_hor = tiempo[0] + ':' + tiempo[1] + ':' + tiempo[2];

    if (tm.es_id == 1) {
        $('#ModalEstOSTitle').html('ASIGNAR VEHICULO');
        $('#body_mod_os').html('<div class="alert alert-dismissible alert-warning">\n\
            <form id="formEstOS">\n\
                <fieldset>\n\
                  <div class="row">\n\
                    <div class="form-group form-group-sm col-lg-8">\n\
                        <h4 class="alert-heading">Orden de Servicio N° ' + tm.os_id + '</h4>\n\
                    </div>\n\
                    <div class="form-group form-group-sm col-lg-4">\n\
                        <input type="text" class="form-control" id="inpEstOrdServ" style="background-color: #ffeccafc; display:none;" name="inpEstOrdServ" placeholder="Cod." readonly>\n\
                    </div>\n\
                  </div>\n\
                <p><b>CLIENTE: </b>' + tm.cli_nombre + '<br>\n\
                <b>DIRECCION RECOLECCIÓN: </b>' + tm.os_direccion + '<br>\n\
                <b>CIUDAD: </b>' + tm.ciu_nombre + '<br>\n\
                <b>FECHA: </b>' + formato_fec + '<br>\n\
                <b>FECHA: </b>' + formato_hor + '<br>\n\
                <b>OBSERVACIONES: </b>' + tm.exs_novedad + '</p>\n\
                    <div class="form-group">\n\
                        <label for="selectEmpleado">Mensajero</label>\n\
                        <select class="form-control" id="selectEmpleado" name="selectEmpleado">\n\
                        </select>\n\
                    </div>\n\
                    <div class="form-group">\n\
                        <label for="txaNovedad">Novedad</label>\n\
                        <textarea class="form-control" id="txaNovedad" name="txaNovedad" rows="2"></textarea>\n\
                    </div>\n\
                    <div class="form-group">\n\
                        <button type="submit" class="btn btn-info" id="btnGuardaEstOS" name="btnGuardaEstOS">Asignar Vehiculo <span class="ion-android-car" style="font-size: x-large;"></span></button>\n\
                    </div>\n\
                    <input type="text" class="form-control" id="inpEstado" name="inpEstado" value="2" style="display: none;" readonly>\n\
                </fieldset>\n\
            </form>');
        combo_emp();
    } else if (tm.es_id == 2) {
        $('#ModalEstOSTitle').html('FINALIZAR RECOLECCIÓN');
        $('#body_mod_os').html('<div class="alert alert-dismissible alert-info">\n\
            <form id="formEstOS">\n\
                <fieldset>\n\
                  <div class="row">\n\
                    <div class="form-group form-group-sm col-lg-8">\n\
                        <h4 class="alert-heading">Orden de Servicio N° ' + tm.os_id + '</h4>\n\
                    </div>\n\
                    <div class="form-group form-group-sm col-lg-4">\n\
                        <input type="text" class="form-control" id="inpEstOrdServ" style="background-color: #bcecff; display: none;" name="inpEstOrdServ" placeholder="Cod." readonly>\n\
                    </div>\n\
                  </div>\n\
                <p><b>CLIENTE: </b>' + tm.cli_nombre + '<br>\n\
                <b>DIRECCION RECOLECCIÓN: </b>' + tm.os_direccion + '<br>\n\
                <b>CIUDAD: </b>' + tm.ciu_nombre + '<br>\n\
                <b>FECHA: </b>' + formato_fec + '<br>\n\
                <b>HORA: </b>' + formato_hor + '<br>\n\
                <b>MENSAJERO: </b>' + tm.emp_nombre + '<br>\n\
                <b>OBSERVACIONES: </b>' + tm.exs_novedad + '</p>\n\
                    <div class="form-group" style="display: none;">\n\
                        <label for="selectEmpleado">Mensajero</label>\n\
                        <select class="form-control" id="selectEmpleado" name="selectEmpleado">\n\
                        <option value="' + tm.td_id_men + '|' + tm.num_doc_men + '">' + tm.emp_nombre + '</option>\n\
                        </select>\n\
                    </div>\n\
                    <div id="divRadios">\n\
                    <div class="custom-control custom-radio">\n\
                      <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" value="1" checked="">\n\
                      <label class="custom-control-label" for="customRadio1">Realizada con Exito</label>\n\
                    </div>\n\
                    <div class="custom-control custom-radio">\n\
                      <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" value="2">\n\
                      <label class="custom-control-label" for="customRadio2">No se pudo Realizar</label>\n\
                    </div>\n\
                    </div>\n\
                    <div class="form-group">\n\
                        <label for="txaNovedad">Novedad</label>\n\
                        <textarea class="form-control" id="txaNovedad" name="txaNovedad" rows="2"></textarea>\n\
                    </div>\n\
                    <div class="form-group">\n\
                        <button type="submit" class="btn btn-success" id="btnGuardaEstOS" name="btnGuardaEstOS">Finalizar Recolección <span class="ion-checkmark-circled" style="font-size: x-large;"></span></button>\n\
                    </div>\n\
                    <input type="text" class="form-control" id="inpEstado" name="inpEstado" value="3" style="display: none;" none;" readonly>\n\
                </fieldset>\n\
            </form>');
        $("#divRadios input[name='customRadio']").click(function () {
            est = $("input:radio[name=customRadio]:checked").val();
            if (est === "1") {
                $("#inpEstado").val("3");
                $("#btnGuardaEstOS").removeClass("btn-danger");
                $("#btnGuardaEstOS").addClass("btn-success");
            } else if (est === "2") {
                $("#inpEstado").val("4");
                $("#btnGuardaEstOS").removeClass("btn-success");
                $("#btnGuardaEstOS").addClass("btn-danger");
            }
        });

    } else if (tm.es_id == 3) {

        $('#ModalEstOSTitle').html('REALIZADA');
        $('#body_mod_os').html('<div class="alert alert-dismissible alert-success">\n\
                  <div class="row">\n\
                    <div class="form-group form-group-sm col-lg-8">\n\
                        <h4 class="alert-heading">Orden de Servicio N° ' + tm.os_id + '</h4>\n\
                    </div>\n\
                    <div class="form-group form-group-sm col-lg-4">\n\
                        <input type="text" class="form-control" id="inpEstOrdServ" style="background-color: #84dba7; display: none;" name="inpEstOrdServ" placeholder="Cod." readonly>\n\
                    </div>\n\
                  </div>\n\
                <p><b>CLIENTE: </b>' + tm.cli_nombre + '<br>\n\
                <b>FECHA: </b>' + formato_fec + '<br>\n\
                <b>HORA: </b>' + formato_hor + '<br>\n\
                <b>DIRECCION RECOLECCIÓN: </b>' + tm.os_direccion + '<br>\n\
                <b>CIUDAD: </b>' + tm.ciu_nombre + '<br>\n\
                <b>OBSERVACIONES: </b>' + tm.exs_novedad + '</p>');

    } else if (tm.es_id == 4) {

        $('#ModalEstOSTitle').html('CANCELADA');
        $('#body_mod_os').html('<div class="alert alert-dismissible alert-danger">\n\
                  <div class="row">\n\
                    <div class="form-group form-group-sm col-lg-8">\n\
                        <h4 class="alert-heading">Orden de Servicio N° ' + tm.os_id + '</h4>\n\
                    </div>\n\
                    <div class="form-group form-group-sm col-lg-4">\n\
                        <input type="text" class="form-control" id="inpEstOrdServ" style="background-color: #84dba7; display: none;" name="inpEstOrdServ" placeholder="Cod." readonly>\n\
                    </div>\n\
                  </div>\n\
                <p><b>CLIENTE: </b>' + tm.cli_nombre + '<br>\n\
                <b>FECHA: </b>' + formato_fec + '<br>\n\
                <b>HORA: </b>' + formato_hor + '<br>\n\
                <b>DIRECCION RECOLECCIÓN: </b>' + tm.os_direccion + '<br>\n\
                <b>CIUDAD: </b>' + tm.ciu_nombre + '<br>\n\
                <b>OBSERVACIONES: </b>' + tm.exs_novedad + '</p>');
    }
    $("#inpEstOrdServ").val(tm.os_id);
    $("#btnGuardaEstOS").click(function () {
        validarInsert_est_x_os();
    });
}
/**
 * Metodo que llena el combo de seleccion empleado
 * @returns {undefined}
 */
function combo_emp() {
    request = "Controller/AdminC/AdministrarEmpleados/consulta_emp_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        datouscombo = "";
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            datouscombo += '<option value="' + temp.emp_td_id + '|' + temp.emp_num_doc + '">' + temp.emp_nombre + "</option>";
        }
        $("#selectEmpleado").html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Funcion de validacion para envio de est_x_os
 * @returns {undefined}
 */
function validarInsert_est_x_os() {
    $("#formEstOS").validate({
        rules: {
            inpEstOrdServ: {
                required: true
            }
        },
        submitHandler: function (form) {

            inserta_est_x_ordServ();
        }
    });
}
/**
 * Funcion que inserta un registro en tabla est_x_os
 * @returns {undefined}
 */
function inserta_est_x_ordServ() {
    request = "Controller/AdminC/AdministrarOS/insertar_es_x_os_controller.php";
    cadena = $("#formEstOS").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            alertify.success('Registro actualizado!');
//            $("#link_vista_dashboard_serv").trigger("click");
            consulta_dashboard_serv();
            consulta_dashboard_serv_card();
            seguimiento_estado();
            $("#btnCloseModal").trigger("click");
        } else {
//            alert(datos);
            alertify.error('No actualizado!');
        }
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

var fech_old = '1001,01,01';
var fech_new;
var exist = false;
/**
 * Funcion que consulta cambios de fecha en los estados
 * @returns {undefined}
 */
function consulta_os_program() {
    request = "Controller/AdminC/AdministrarOS/cons_os_x-est_reciente_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
//        alert(fech_old);
        arreglo = $.parseJSON(datos);
        tmp_f = arreglo[0];
        fech_new = tmp_f.fecha;
        if (fech_new > fech_old) {
            fech_old = fech_new;
            consulta_dashboard_serv_card();
            exist = true;

            var delay = alertify.get('notifier', 'delay');
            alertify.set('notifier', 'delay', 15);
            alertify.warning('Nueva Orden de servicio Programada!');
            alertify.set('notifier', 'delay', delay);
        } else {

        }
//        alert(fech_old);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Funcion que consulta cambios de fecha en los estados
 * @returns {undefined}
 */
function consulta_os_program_ini() {
    request = "Controller/AdminC/AdministrarOS/cons_os_x-est_reciente_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
//        alert(fech_old);
        arreglo = $.parseJSON(datos);
        tmp_f = arreglo[0];
        fech_old = tmp_f.fecha;
//        alert(fech_old);
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que carga tabla de dashboard segun filtro
 * @param {type} fil
 * @returns {undefined}
 */
function consulta_dashb_serv_fil(fil) {
    request = "Controller/AdminC/AdministrarOS/cons_est_os_filtro_controller.php";
    cadena = "fil=" + fil; //envio de parametros por POST
    metodo = function (datos) {
        arregloEstOS = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEstOS !== 0) {
            datosEstOS = "<div class='table-responsive text-nowrap' id='tablaEstadoOS'><table class='table table-striped table-sm table-bordered' id='tableEstOS'>\n\
                             <thead><tr style='background-color: #13b955'>\n\
                             <th scope='col'></th>\n\
                             <th scope='col'>N° ORDEN</th>\n\
                             <th scope='col'>FECHA</th>\n\
                             <th scope='col'>ESTADO</th>\n\
                             <th scope='col'>DOC CLIENTE</th>\n\
                             <th scope='col'>NOM CLIENTE</th>\n\
                             <th scope='col'>DIRECCION</th>\n\
                             <th scope='col'>CIUDAD</th>\n\
                             <th scope='col'>TIPO SERV</th>\n\
                             <th scope='col'>TIPO ENV</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arregloEstOS.length; i++) {
                tmp = arregloEstOS[i];
                if (tmp.es_id == 1) {
                    datosEstOS += '<tr class="table-sm" id="fila' + i + '"><td class="enlace actuestos" act="' + i + '"><span class="ion-android-contact" style="color: #fb972e;"></span></td>';
                } else if (tmp.es_id == 2) {
                    datosEstOS += '<tr class="table-sm" id="fila' + i + '"><td class="enlace actuestos" act="' + i + '"><span class="ion-android-car" style="color: #0d40ff;"></span></td>';
                } else if (tmp.es_id == 3) {
                    datosEstOS += '<tr class="table-sm" id="fila' + i + '"><td class="enlace actuestos" act="' + i + '"><span class="ion-checkmark-circled" style="color: #13b955;"></span></td>';
                } else if (tmp.es_id == 4) {
                    datosEstOS += '<tr class="table-sm" id="fila' + i + '"><td class="enlace actuestos" act="' + i + '"><span class="ion-close-circled" style="color: #ff5757;"></span></td>';
                }
                datosEstOS += '<td>' + tmp.os_id + "</td>";
                datosEstOS += '<td>' + tmp.exs_fecha_hora + '</td>';
                if (tmp.es_id == 1) {
                    datosEstOS += '<td style="background-color: #fea;">' + tmp.es_desc + '</td>';
//                    serv_program++;
                } else if (tmp.es_id == 2) {
                    datosEstOS += '<td style="background-color: #82dcff;">' + tmp.es_desc + '</td>';
//                    serv_asignado++;
                } else if (tmp.es_id == 3) {
                    datosEstOS += '<td style="background-color: #b0ffc5;">' + tmp.es_desc + '</td>';
//                    serv_exitoso++;
                } else if (tmp.es_id == 4) {
                    datosEstOS += '<td style="background-color: #ffcfcf;">' + tmp.es_desc + '</td>';
//                    serv_novedad++;
                }
                datosEstOS += '<td>' + tmp.cli_num_doc + '</td>';
                datosEstOS += '<td>' + tmp.cli_nombre + '</td>';
                datosEstOS += '<td>' + tmp.os_direccion + '</td>';
                datosEstOS += '<td>' + tmp.ciu_nombre + '</td>';
                datosEstOS += '<td>' + tmp.ts_desc + '</td>';
                datosEstOS += '<td>' + tmp.te_desc + '</td></tr>';
            }
            datosEstOS += "</tbody></table></div>";
            $("#tbInfoEstOS").html(datosEstOS);

            /**
             * Evento que pagina una tabla 
             */
            tablaEst_x_OS = $('#tableEstOS').DataTable({
                'scrollX': true
            });

            clickActuEstado_OS();
        } else {
            $("#tableEstOS").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
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
 * Metodo que llena el combo de seleccion tipo servicio
 * @param {type} select
 * @returns {undefined}
 */
function combo_tipo_serv(select) {
    request = "Controller/AdminC/AdministrarBD/consulta_tipo_serv_controller.php";
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
            inputDir: {
                required: true
            }
        },
        submitHandler: function (form) {
            insertar_orden_serv();
        }
    });
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
 * Metodo que trae a la vista el formulario de recoleccion
 * @returns {undefined}
 */
function formulario_oreden_serv() {
    request = "View/AdministradorV/OrdenesServicio/form_os_admin.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#contenGestOs").html(datos);
        combo_ciudad("#selectCiudad");
        combo_tipo_envio("#selectTipEnvio");
        combo_tipo_serv("#selectTipoServi");
        $("#btnGenOrdServ").click(function () {
            validarOrdServ();
        });
        $("#btnCancelarOrd").click(function () {
            resetFormOrdServ();
            formulario_recolec();
        });
        $("#btnBuscaOS").click(function () {
            validarBuscarNumOS(datos_orden_serv);
        });
        $("#btnActuOS").click(function () {
            validarActuOrdServ();
        });
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que trae a la vista el formulario de recoleccion
 * @returns {undefined}
 */
function seguimiento_estado() {
    request = "View/AdministradorV/OrdenesServicio/seguimiento_estados.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#contenGestOs").html(datos);
        $("#btnBuscaOS").click(function () {
            validarBuscarNumOS(datos_orden_serv_seg);
        });
        botones_seg_os();
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que trae a la vista el contenido de botones de actualizacion de estados os
 * @returns {undefined}
 */
function botones_seg_os() {
    request = "View/AdministradorV/OrdenesServicio/con_bot_actu_est_os.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#contAux").html(datos);
        $("#btnActuOS_prog").prop("disabled", true);
        $("#btnActuOS_asig").prop("disabled", true);
        $("#btnActuOS_prog").click(function () {
            $('#ModalActuEstOS').modal('toggle');
            form_act_est_os(arregloSegOS, 0);
        });
        $("#btnActuOS_asig").click(function () {
            $('#ModalActuEstOS').modal('toggle');
            form_act_est_os(arregloSegOS, 1);
        });
    };
    f_ajax(request, cadena, metodo);
}



/**
 * Metodo que realiza la busqueda de una orden de servicio
 * @returns {undefined}
 */
function datos_orden_serv() {
    request = "Controller/AdminC/AdministrarOS/cons_os_x_num_controller.php";
    cadena = $("#formBuscarOS").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arregloOS = $.parseJSON(datos);
        os_num = arregloOS[0];
        if (typeof os_num === 'undefined') {
            limpiarFormulario("#formBuscarOS");
            limpiarFormulario("#formOrdenServAdm");
            alertify.alert('No se encuentra en Base de Datos').setHeader('<em> Cuidado! </em> ');
        } else {
            limpiarFormulario("#formOrdenServAdm");
            $("#selectTipEnvio").find('option').removeAttr("selected");
            $("#selectCiudad").find('option').removeAttr("selected");
            $("#selectTipoServi").find('option').removeAttr("selected");
            $("#inputDir").val(os_num.os_direccion);
//            $('#selectTipDocAc option[value="' + clitm.cli_td_id + '"]').attr('selected', true);
//            $('#selectCiudad').val(os_num.ciu_id);
            $('#selectCiudad option[value="' + os_num.ciu_id + '"]').attr('selected', true);
            $("#selectCiudad").val(os_num.ciu_id);
            $("#inputTele").val(os_num.os_tel_cont);
            $("#inputPerContacto").val(os_num.os_per_cont);
            $('#selectTipEnvio option[value="' + os_num.te_id + '"]').attr('selected', true);
            $("#selectTipEnvio").val(os_num.te_id);
            $("#inputObservServ").val(os_num.os_observacion);
            $("#inputNovedServ").val(os_num.exs_novedad);
            $("#inputNumOSAd").val(os_num.os_id);
            $("#inputTdCli").val(os_num.cli_td_id);
            $("#inputNumDocCli").val(os_num.cli_num_doc);
            if (os_num.ts_id == 1) {
//                $("#inpCheckLogiYa").prop("checked", true);
                $("#selectTipoServi").addClass('colorLogiYA');
            } else {
//                $("#inpCheckLogiYa").prop("checked", false);
                $("#selectTipoServi").removeClass('colorLogiYA');
            }
            $('#selectTipoServi option[value="' + os_num.ts_id + '"]').attr('selected', true);
            $("#selectTipoServi").val(os_num.ts_id);
            var fecha_hora = new Date(os_num.exs_fecha_hora);
            var options = {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            var timeString = fecha_hora.toLocaleString('en-US', options);
//            dia = os_num.exs_fecha_hora.substr(8, 2);
            f = new Date(os_num.exs_fecha_hora.replace(/-/g, '\/'));
            $("#lbTitleSection").html('Orden N° <samp>' + os_num.os_id + '</samp> ' + os_num.cli_nombre + '<br> Última modificación ' + diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear() + ' ' + timeString + ' ' + os_num.es_desc);
            if (os_num.es_id == 3 || os_num.es_id == 4) {
                $("#inputDir").attr('disabled', 'disabled');
                $("#selectCiudad").attr('disabled', 'disabled');
                $("#inputTele").attr('disabled', 'disabled');
                $("#inputPerContacto").attr('disabled', 'disabled');
                $("#selectTipEnvio").attr('disabled', 'disabled');
                $("#inputObservServ").attr('disabled', 'disabled');
                $("#inputNovedServ").attr('disabled', 'disabled');
                $("#selectTipoServi").attr('disabled', 'disabled');
                $("#btnActuOS").attr('disabled', 'disabled');
                $("#btnEliOSs").attr('disabled', 'disabled');
            } else {
                $("#inputDir").removeAttr('disabled');
                $("#selectCiudad").removeAttr('disabled');
                $("#inputTele").removeAttr('disabled');
                $("#inputPerContacto").removeAttr('disabled');
                $("#selectTipEnvio").removeAttr('disabled');
                $("#inputObservServ").removeAttr('disabled');
                $("#inputNovedServ").removeAttr('disabled');
                $("#selectTipoServi").removeAttr('disabled');
                $("#btnActuOS").removeAttr('disabled');
                $("#btnEliOSs").removeAttr('disabled');
            }
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que permite validar campos en formulario orden servicio actualizar
 * @returns {undefined}
 */
function validarActuOrdServ() {
    $("#formOrdenServAdm").validate({
        rules: {
            inputDir: {
                required: true
            }
        },
        submitHandler: function (form) {
            actualizarOS();
        }
    });
}
/**
 * Metodo que actualiza datos de una orden de servicio
 * @returns {undefined}
 */
function actualizarOS() {
    request = "Controller/AdminC/AdministrarOS/actualizar_os_controller.php";
    cadena = $("#formOrdenServAdm").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            alertify.success('Orden de Servicio Actualizada!');
            limpiarFormulario("#formOrdenServAdm");
            $("#selectTipoServi").removeClass('colorLogiYA');
        } else {
            alertify.error('No se pudo realizar la Actualización!');
//            alert(datos);
        }
    };
    f_ajax(request, cadena, metodo);
}
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
    $("#enlAsigMens").click(function () {
        formulario_asig_mens();
        envios = [];
    });

    $("#enlFormEntregaOp").click(function () {
        tabla_entrega_op();
    });

    $("#enlSeguimientoEnv").click(function () {
        seguimiento_estado_env();
    });

    $("#enlSeguimientoAlist").click(function () {
        seguimiento_estado_alist_env();
    });
    $("#link_vista_gest_env").click(function () {
        vista_gestionar_envios();
    });
    $("#link_vista_dashboard_serv").click(function () {
        vista_dashboard();
    });
    $("#link_vista_hist").click(function () {
        vista_historial_os();
    });
    $("#link_vista_dashboard_envios").click(function () {
        vista_dashboard_envios();
    });
    $("#link_vista_informes_envios").click(function () {
        vista_informes_envios();
    });
    $("#link_form_carga_pruebas").click(function () {
        vista_form_carga_pruebas();
    });
    $("#link_form_editar_env").click(function () {
        vista_form_editar_env();
    });

    //*Este menu es gestionar del almacen*//
    $("#link_gest_almacen").click(function () {
        vista_admin_sucursal();
    });
    $("#link_vista_dashboard_alist").click(function () {
        vista_dashboard_alist();
    });
    $("#link_form_nuev_emp").click(function () {
        vista_form_Nuevo_Edit_Emp();
    });

    click_enlace_bd();

    vista_dashboard();

//    consulta_os_program_ini();

    setInterval(refrescar_sesion, 30000);

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
        dataType: "html", /*se cambia el tipo "html" por "json"*/
        processData: false,
        contentType: false,
        data: cadena,
        timeout: 20000,
        success: function (datos) {
            metodo(datos);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 0) {
                alert('Not connect: Verify Network.');
            } else if (jqXHR.status == 404) {
                alert('Requested page not found [404]');
            } else if (jqXHR.status == 500) {
                alert('Internal Server Error [500].');
            } else if (textStatus === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (textStatus === 'timeout') {
                alert('Time out error.');
            } else if (textStatus === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error: ' + jqXHR.responseText);
            }
//            alert("No hay conexión");
        }
    });
}
/**Metodo de nueva regla de validacion**/
$.validator.addMethod("valueNotEquals", function (value, element, arg) {
    return arg !== value;
}, "Value must not equal arg.");
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
            case 'number':
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
    request = "View/AdministradorV/AdCliente/form_nuevo_editar.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html("");
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
    request = "View/AdministradorV/AdCliente/form_editar.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html("");
        $("#list-formCliente").html(datos);
        tablaGeneralClientesActivos();

        $("#btnBuscaCli").click(function () {
            validarBuscarCli();
        });
        $("#vistaFormEditCli").click(function () {
            vista_form_editar_cli();
        });
        $("#vistaFormCrearSuc").click(function () {
            vista_form_crear_suc();
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
        datodoccombo = '<option value="0">Seleccione</option>';
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
var arregloCli;
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
            limpiarFormulario("#formClienteAct");
            limpiarFormulario("#formCrearSuc");
            $("#labelNombreCli").html("");
            $("#labelNumeroCli").html("");
            alertify.alert('No se encuentra en Base de Datos').setHeader('<em> Cuidado! </em> ');
        } else {
            $("#labelNombreCli").html(clitm.cli_nombre);
            $("#labelNumeroCli").html(clitm.cli_num_doc);
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
 * Metodo que carga la vista de formulario modificar cliente
 * @returns {undefined}
 */
function vista_form_editar_cli() {
    request = "View/AdministradorV/AdCliente/form_midificar.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#contenFormEdit").html(datos);
        combo_tipo_us();
        $("#btnCancelarCli").click(function () {
            resetFormClienteEditar();
        });
        $("#btnGuardaAct").click(function () {
            validarActCli();
        });
        if (typeof arregloCli === 'undefined') {
            limpiarFormulario("#formBuscarCli");
            limpiarFormulario("#formClienteAct");
            $("#labelNombreCli").html("");
            $("#labelNumeroCli").html("");
        } else {
            clitemp = arregloCli[0];
            if (typeof clitemp === 'undefined') {
                limpiarFormulario("#formBuscarCli");
                limpiarFormulario("#formClienteAct");
            } else {
                $("#inputNomCliAc").val(clitemp.cli_nombre);
//            $('#selectTipDocAc option[value="' + clitm.cli_td_id + '"]').attr('selected', true);
                $('#selectTipDocAc').val(clitemp.cli_td_id);
                $("#inputNumCliAc").val(clitemp.cli_num_doc);
                $("#inputTelCliAc").val(clitemp.cli_tel);
                $("#inputCelCliAc").val(clitemp.cli_cel);
                $("#inputDirCliAc").val(clitemp.cli_direccion);
                $("#inputPerContAc").val(clitemp.cli_per_cont);
//            $("#selectTipDoc").prop("disabled", true);
//            $("#inputNumCli").prop("disabled", true);
                if (clitemp.tu_tipo === null) {
                    $("#menCliNoAccess").html("<div class='alert alert-dismissible alert-danger'>\n\
                <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                <strong>CLIENTE SIN ACCESO AL SISTEMA</strong></div> ");
                } else {
                    $('#selectTipUsAc option[value="' + clitemp.tu_id + '"]').attr('selected', true);
                }
            }
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga la vista de formulario crear sucursal
 * @returns {undefined}
 */
function vista_form_crear_suc() {
    request = "View/AdministradorV/AdCliente/form_crear_sucursal.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#contenFormEdit").html(datos);
        combo_ciudad("#selectCiudad");
        $("#btnCancelarSuc").click(function () {
            limpiarFormulario("#formCrearSuc");
        });
        $("#btnGuardaSuc").click(function () {
            validarCrearSuc();
        });
        if (typeof arregloCli === 'undefined') {
            limpiarFormulario("#formBuscarCli");
            limpiarFormulario("#formCrearSuc");
            $("#labelNombreCli").html("");
            $("#labelNumeroCli").html("");
        } else {
            clitemp = arregloCli[0];
            if (typeof clitemp === 'undefined') {
                limpiarFormulario("#formBuscarCli");
                limpiarFormulario("#formCrearSuc");
            } else {
                $('#selectTipDocAc').val(clitemp.cli_td_id);
                $("#inputNumCliAc").val(clitemp.cli_num_doc);
                if (clitemp.tu_tipo === null) {
                    $("#menCliNoAccess").html("<div class='alert alert-dismissible alert-danger'>\n\
                <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                <strong>CLIENTE SIN ACCESO AL SISTEMA</strong></div> ");
                } else {
                    $('#selectTipUsAc option[value="' + clitemp.tu_id + '"]').attr('selected', true);
                }
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
 * Metodo que permite resetear el formulario crear sucursal
 * @returns {undefined}
 */
function resetFormCrearSucursal() {
    limpiarFormulario("#formCrearSuc");
    limpiarFormulario("#formBuscarCli");
    $("#selectCiudad").html("");
    combo_ciudad('selectCiudad');
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
            },
            selectTipDoc: {
                valueNotEquals: "0"
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
 * Metodo que permite validar formulario crear sucursal
 * @returns {undefined}
 */
function validarCrearSuc() {
    $("#formCrearSuc").validate({
        rules: {
            inputNumCliAc: {
                required: true
            },
            inputNomSucursal: {
                required: true
            },
            inputDirSuc: {
                required: true
            }
        },
        submitHandler: function (form) {
            inserta_sucursal();
        }
    });
}
/**
 * Metodo que guarda un registro en la tabla cliente
 * @returns {undefined}
 */
function inserta_actualiza_cliente() {
    request = "Controller/AdminC/AdministrarCliente/insertar_cliente_controller.php";
    cadena = $("#formCliente").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            alertify.success('Registro Guardado, Usuario Autorizado!');
            resetFormCliente();
            arregloCli.length = 0;
        } else if (datos == 3) {
            alertify.warning('Registro Guardado pero el usuario NO fue Autorizado!');
            resetFormCliente();
            arregloCli.length = 0;
        } else {
            alert(datos);
            alertify.error('NO Guardado!');
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que actualiza un registro en la tabla cliente
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
            arregloCli.length = 0;
        } else {
            alert(datos);
            alertify.error('NO Guardado!');
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que inserta un registro en la tabla sucursal
 * @returns {undefined}
 */
function inserta_sucursal() {
    request = "Controller/AdminC/AdministrarSucursal/insertar_sucursal_controller.php";
    cadena = $("#formCrearSuc").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            alertify.success('Registro Guardado, Usuario Autorizado!');
            resetFormCrearSucursal();
            arregloCli.length = 0;
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
 * Metodo que permite validar campos en formulario operadores
 * @returns {undefined}
 */
function validarInsertOpera() {
    $("#formOperador").validate({
        rules: {
            inpNomOpera: {
                required: true
            }
        },
        submitHandler: function (form) {

            inserta_actualiza_operadores();
        }
    });
}
/**
 * Metodo que permite validar campos en formulario estado envio alistamiento 
 * @returns {undefined}
 */
function validarInsertEsae() {
    $("#formEstadoAEnv").validate({
        rules: {
            inpDescEstAEnv: {
                required: true
            }
        },
        submitHandler: function (form) {

            inserta_actualiza_estadoAEnv();
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
/**
 * Metodo que carga envio a mensajero
 * @returns {undefined}
 */
function click_enlace_bd() {

    $(".renl").click(function () {
        ruta_vista = $(this).attr("bd");
        vista_tabla_bd(ruta_vista);
    });
}

/**
 * Metodo que trae vistas al conten
 * @param {type} ruta
 * @returns {undefined}
 */
function vista_tabla_bd(ruta) {
    request = "View/AdministradorV/" + ruta + ".php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html("");
        $("#list-formCliente").html(datos);

        switch (ruta) {
            case 'admin_ciudades':
                tablaGeneralCiudades();
                combo_depto();
                $("#btnCancelarCiu").click(function () {
                    resetFormCiudad();
                });
                $("#btnGuardaCiu").click(function () {
                    validarInsertCiud();
                });
                break;
            case 'admin_tipo_doc':
                tablaGeneralTipoDoc();
                $("#btnGuardaTipoDoc").click(function () {
                    validarInsertTd();
                });
                $("#btnCancelarTipoDoc").click(function () {
                    resetFormTd();
                });
                break;
            case 'admin_tipo_serv':
                tablaGeneralTipoServ();
                $("#btnGuardaTipoServ").click(function () {
                    validarInsertTS();
                });
                $("#btnCancelarTipoServ").click(function () {
                    resetFormTs();
                });
                break;
            case 'admin_tipo_env':
                tablaGeneralTipoEnv();
                $("#btnGuardaTipoEnv").click(function () {
                    validarInsertTe();
                });
                $("#btnCancelarTipoEnv").click(function () {
                    resetFormTe();
                });
                break;
            case 'admin_estado_serv':
                tablaGeneralEstadoServ();
                $("#btnGuardaEstServ").click(function () {
                    validarInsertES();
                });
                $("#btnCancelarEstServ").click(function () {
                    resetFormEs();
                });
                break;
            case 'admin_estado_env':
                tablaGeneralEstadoEnv();
                $("#btnGuardaEstEnv").click(function () {
                    validarInsertEe();
                });
                $("#btnCancelarEstEnv").click(function () {
                    resetFormEe();
                });
                break;
            case 'admin_operadores':
                tablaGeneralOperadores();
                $("#btnGuardaOperador").click(function () {
                    validarInsertOpera();
                });
                $("#btnCancelarOperador").click(function () {
                    resetFormOpera();
                });
                break;
            case 'admin_estado_aenv':
                tablaGeneralEstadoAEnv();
                $("#btnGuardaEstAEnv").click(function () {
                    validarInsertEsae();
                });
                $("#btnCancelarEstAEnv").click(function () {
                    resetFormEsae();
                });
                break;
            case 'admin_usuarios':
                tablaGeneral_US_Clientes();
                vista_form_act_us_cli();
                $('input[type=radio][name=customRadio]').change(function () {
                    if (this.value == 'clientes') {
                        tablaGeneral_US_Clientes();
                        vista_form_act_us_cli();
                    }
                    if (this.value == 'sucursales') {
                        tablaGeneral_US_Sucursales();
                        vista_form_act_us_suc();
                    }
                    if (this.value == 'empleados') {
                        tablaGeneral_US_Empleados();
                        vista_form_act_us_emp();
                    }
                });
                break;
        }

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
    $("#tableCiudad").on("click", ".actualiza", function () {
//    $(".actualiza").click(function () {
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
    $("#tableCiudad").on("click", ".elimina", function () {
//    $(".elimina").click(function () {
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
    $('#tableTipoDoc').on('click', '.actualizatd', function () {
//    $(".actualizatd").click(function () {
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
    $('#tableTipoDoc').on('click', '.eliminatd', function () {
//    $(".eliminatd").click(function () {
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
    $("#tableTipoServ").on("click", ".actualizats", function () {
//    $(".actualizats").click(function () {
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
    $("#tableTipoServ").on("click", ".eliminats", function () {
//    $(".eliminats").click(function () {
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
    $("#tableTipoEnv").on("click", ".actualizate", function () {
//    $(".actualizate").click(function () {
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
    $("#tableTipoEnv").on("click", ".eliminate", function () {
//    $(".eliminate").click(function () {
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
    $("#tableEstServ").on("click", ".actualizaes", function () {
//    $(".actualizaes").click(function () {
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
    $("#tableEstServ").on("click", ".eliminaes", function () {
//    $(".eliminaes").click(function () {
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
    $("#tableEstEnv").on("click", ".actualizaee", function () {
//    $(".actualizaee").click(function () {
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
    $("#tableEstEnv").on("click", ".eliminaee", function () {
//    $(".eliminaee").click(function () {
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
/**
 * Metodo que llena el combo de seleccion de estado envio
 * @param {type} select
 * @returns {undefined}
 */
function combo_estado_envio(select) {
    request = "Controller/AdminC/AdministrarBD/consulta_estado_env_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        datoescombo = '<option value="0">Seleccione</option>';
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            datoescombo += '<option value="' + temp.ee_id + '">' + temp.ee_desc + "</option>";
        }
        $(select).html(datoescombo);
    };
    f_ajax(request, cadena, metodo);
}

/****************************************************************
 * Metodos de tabla operadores
 * 
 ****************************************************************/

/**
 * variable global del arreglo operadores
 * @type Object
 */
var arregloOperadores;
/**
 * Metodo que retorna el listado de operadores registrados en BD
 * @returns {undefined}
 */
function tablaGeneralOperadores() {
    request = "Controller/AdminC/AdministrarBD/consulta_operadores_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arregloOperadores = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloOperadores !== 0) {
            datosOperadores = "<legend>Tabla General</legend><table class='table table-responsive-sm table-hover table-bordered table-fixed' id='tableOperadores'>\n\
                             <thead><tr class='thead-light'>\n\
                             <th scope='col'>COD.</th>\n\
                             <th scope='col'>OPERADOR</th>\n\
                             <th scope='col'>ACT.</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arregloOperadores.length; i++) {
                tmp = arregloOperadores[i];
                datosOperadores += '<tr class="table-warning" id="fila' + i + '"><td>' + tmp.ope_id + "</td>";
                datosOperadores += '<td>' + tmp.ope_nombre + '</td>';
                datosOperadores += '<td><img src="img/iconos/editar_46x46.png" alt=""/ class="enlace img-responsive actualizaop" actuop="' + i + '"></td></tr>';
            }
            datosOperadores += "</tbody></table>";
            $("#tablaOperadores").html(datosOperadores);

            /**
             * Evento que pagina una tabla 
             */

            $('#tableOperadores').DataTable();
            clickActualizaOp();
        } else {
            $("#tablaOperadores").html("<div class='alert alert-dismissible alert-danger'>\n\
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
function clickActualizaOp() {
    $("#tableOperadores").on("click", ".actualizaop", function () {
//    $(".actualizaop").click(function () {
        actualizar = $(this).attr("actuop");
        $("#btnGuardaOperador").removeClass("btn-primary");
        $("#btnGuardaOperador").addClass("btn-warning");
        $("#btnGuardaOperador").html("Actualizar");
        tm = arregloOperadores[actualizar];
        $("#inpCodOpera").val(tm.ope_id);
        $("#inpNomOpera").val(tm.ope_nombre);

        $([document.documentElement, document.body]).animate({
            scrollTop: $("#page-content-wrapper").offset().top
        }, 300);
    });
}

/**
 * Metodo que inserta o actualiza un registro en la tabla operadores
 * @returns {undefined}
 */
function inserta_actualiza_operadores() {
    request = "Controller/AdminC/AdministrarBD/insertar_operador_controller.php";
    cadena = $("#formOperador").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            mensajeGuardadoExitoso();
            resetFormOpera();
            tablaGeneralOperadores();
        } else {
            mensaje_No_Guardado();
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que permite resetear el formulario operadores
 * @returns {undefined}
 */
function resetFormOpera() {
    limpiarFormulario("#formOperador");
    $("#btnGuardaOperador").removeClass("btn-warning");
    $("#btnGuardaOperador").addClass("btn-primary");
    $("#btnGuardaOperador").html("Guardar");
}


/****************************************************************
 * Metodos de tabla estado_aenv
 * 
 ****************************************************************/

/**
 * variable global del arreglo estado_aenv
 * @type Object
 */
var arregloEstadoAEnv;
/**
 * Metodo que retorna el listado de estados de envio alistamiento registrados en BD
 * @returns {undefined}
 */
function tablaGeneralEstadoAEnv() {
    request = "Controller/AdminC/AdministrarBD/consulta_estado_aenv_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arregloEstadoAEnv = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEstadoAEnv !== 0) {
            datosEstAEnv = "<table class='table table-responsive-sm table-hover table-bordered table-fixed' id='tableAEstEnv'>\n\
                             <thead><tr class='thead-light'>\n\
                             <th scope='col'>COD.</th>\n\
                             <th scope='col'>EST ENVIO</th>\n\
                             <th scope='col'>ACT.</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arregloEstadoAEnv.length; i++) {
                tmp = arregloEstadoAEnv[i];
                datosEstAEnv += '<tr class="table-warning" id="fila' + i + '"><td>' + tmp.esae_id + "</td>";
                datosEstAEnv += '<td>' + tmp.esae_desc + '</td>';
                datosEstAEnv += '<td><img src="img/iconos/editar_46x46.png" alt=""/ class="enlace img-responsive actualizaesae" actuesae="' + i + '"></td></tr>';
            }
            datosEstAEnv += "</tbody></table>";
            $("#tablaEstAEnv").html(datosEstAEnv);

            /**
             * Evento que pagina una tabla 
             */

            $('#tableEstAEnv').DataTable();
            clickActualizaEsae();
        } else {
            $("#tablaEstAEnv").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que plasma los datos del elemento seleccionado en los campos de texto
 * formulario estado envio alistamiento
 * @returns {undefined}
 */
function clickActualizaEsae() {
    $("#tableAEstEnv").on("click", ".actualizaesae", function () {
//    $(".actualizaesae").click(function () {
        actualizar = $(this).attr("actuesae");
        $("#btnGuardaEstAEnv").removeClass("btn-primary");
        $("#btnGuardaEstAEnv").addClass("btn-warning");
        $("#btnGuardaEstAEnv").html("Actualizar");
        tm = arregloEstadoAEnv[actualizar];
        $("#inpCodEstAEnv").val(tm.esae_id);
        $("#inpDescEstAEnv").val(tm.esae_desc);

        $([document.documentElement, document.body]).animate({
            scrollTop: $("#page-content-wrapper").offset().top
        }, 300);
    });
}

/**
 * Metodo que guarda o actualiza un registro en la tabla estado_aenv
 * @returns {undefined}
 */
function inserta_actualiza_estadoAEnv() {
    request = "Controller/AdminC/AdministrarBD/insertar_est_aenv_controller.php";
    cadena = $("#formEstadoAEnv").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            mensajeGuardadoExitoso();
            resetFormEsae();
            tablaGeneralEstadoAEnv();
        } else {
            mensaje_No_Guardado();
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que permite resetear el formulario estado envio alistamiento
 * @returns {undefined}
 */
function resetFormEsae() {
    limpiarFormulario("#formEstadoAEnv");
    $("#btnGuardaEstAEnv").removeClass("btn-warning");
    $("#btnGuardaEstAEnv").addClass("btn-primary");
    $("#btnGuardaEstAEnv").html("Guardar");
}
/****************************************************************
 * Metodos de administracion de usuarios
 * 
 ****************************************************************/

/**
 * variable global del arreglo usuarios del sistema
 * @type Object
 */
var arregloUser;
/**
 * Metodo que retorna el listado de usuarios clientes
 * @returns {undefined}
 */
function tablaGeneral_US_Clientes() {
    request = "Controller/AdminC/AdministrarCliente/consulta_usuarios_cli_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arregloUser = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloUser !== 0) {
            datosUser = "<table class='table table-responsive-sm table-hover table-bordered table-fixed' id='tableUsCli'>\n\
                             <thead><tr class='thead-light'>\n\
                             <th scope='col'>NOMBRE</th>\n\
                             <th scope='col'>NUM. DOC</th>\n\
                             <th scope='col'>USUARIOS</th>\n\
                             <th scope='col'>ACT. PASS</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arregloUser.length; i++) {
                tmp = arregloUser[i];
                datosUser += '<tr class="table-primary" id="fila' + i + '"><td>' + tmp.cli_nombre + "</td>";
                datosUser += '<td>' + tmp.us_num_doc + '</td>';
                datosUser += '<td>' + tmp.us_usuario + '</td>';
//                datosUser += '<td><img src="img/iconos/editar_46x46.png" alt=""/ class="enlace img-responsive actualizaesae" actuesae="' + i + '"></td></tr>';
                datosUser += '<td><span class="ion-eye-disabled enlace actualizaclus" style="font-size: xx-large; color: #831e1e;" actuclus="' + i + '"></span></td></tr>';
            }
            datosUser += "</tbody></table>";
            $("#tablaUsuarios").html(datosUser);

            /**
             * Evento que pagina una tabla 
             */

            $('#tableUsCli').DataTable();
            clickActualizaClUs();
        } else {
            $("#tablaUsuarios").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que carga el form actualizar datos de usuario y pass clientes
 * @returns {undefined}
 */
function vista_form_act_us_cli() {
    request = "View/AdministradorV/AdCliente/form_act_us_pass_cl.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#formularioUsuarios").html(datos);
        $("#btnActuUsuCli").click(function () {
            validarActuUsCli();
        });
        $("#btnCancelUsuCli").click(function () {
            limpiarFormulario("#formUsCli");
        });
        $("#inputGroup-sizing-sm").click(function () {
            if ($('#inpPass').attr("type") == "text") {

                $('#inpPass').attr('type', 'password');
                $('#inputGroup-sizing-sm').removeClass("ion-eye");
                $('#inputGroup-sizing-sm').addClass("ion-eye-disabled");

            } else if ($('#inpPass').attr("type") == "password") {

                $('#inpPass').attr('type', 'text');
                $('#inputGroup-sizing-sm').removeClass("ion-eye-disabled");
                $('#inputGroup-sizing-sm').addClass("ion-eye");
            }
        });
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que plasma los datos del elemento seleccionado en los campos de texto
 * formulario estado usuario cliente
 * @returns {undefined}
 */
function clickActualizaClUs() {
    $("#tableUsCli").on("click", ".actualizaclus", function () {
//    $(".actualizaesae").click(function () {
        actualizar = $(this).attr("actuclus");
        tm = arregloUser[actualizar];
        $("#inpTipoDoc").val(tm.us_td_id);
        $("#inpNumero").val(tm.us_num_doc);
        $("#inpNombre").val(tm.cli_nombre);
        $("#inpUsuario").val(tm.us_usuario);

        $([document.documentElement, document.body]).animate({
            scrollTop: $("#page-content-wrapper").offset().top
        }, 300);
    });
}

/**
 * Metodo que permite validar campos en formulario actualizacion de usuario cliente 
 * @returns {undefined}
 */
function validarActuUsCli() {
    $("#formUsCli").validate({
        rules: {
            inpTipoDoc: {
                required: true
            },
            inpNumero: {
                required: true
            },
            inpNombre: {
                required: true
            },
            inpUsuario: {
                required: true
            },
            inpPass: {
                required: true
            }
        },
        submitHandler: function (form) {

            actualiza_us_cli();
        }
    });
}
/**
 * Metodo que actualiza usuario y pass en tabla usuario_pass
 * @returns {undefined}
 */
function actualiza_us_cli() {
    request = "Controller/AdminC/AdministrarCliente/actualiza_us_pass_cli_controller.php";
    cadena = $("#formUsCli").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            $("#mensajeAccion").html("<div class='alert alert-dismissible alert-success'>\n\
              <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
              <strong>Datos de aceso de Cliente Actualizados!</strong>.</div>");
            limpiarFormulario("#formUsCli");
            tablaGeneral_US_Clientes();
        } else {
            $("#mensajeAccion").html("<div class='alert alert-dismissible alert-danger'>\n\
              <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
              <strong>Error al guardar los datos!</strong>.</div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que retorna el listado de usuarios empleados
 * @returns {undefined}
 */
function tablaGeneral_US_Empleados() {
    request = "Controller/AdminC/AdministrarEmpleados/consulta_usuarios_emp_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arregloUser = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloUser !== 0) {
            datosUserEmp = "<table class='table table-responsive-sm table-hover table-bordered table-fixed' id='tableUsEmp'>\n\
                             <thead><tr class='thead-light'>\n\
                             <th scope='col'>NOMBRE</th>\n\
                             <th scope='col'>ESTADO</th>\n\
                             <th scope='col'>NUM. DOC</th>\n\
                             <th scope='col'>USUARIOS</th>\n\
                             <th scope='col'>ACT. PASS</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arregloUser.length; i++) {
                tmp = arregloUser[i];
                datosUserEmp += '<tr class="table-warning" id="fila' + i + '"><td>' + tmp.emp_nombre + "</td>";
                if (tmp.esu_id == 1) {
                    datosUserEmp += '<td style="background-color: #5deca0;">ACTIVO</td>';
                } else {
                    datosUserEmp += '<td style="background-color: #efabab;">INACTIVO</td>';
                }
                datosUserEmp += '<td>' + tmp.ue_num_doc + '</td>';
                datosUserEmp += '<td>' + tmp.ue_usuario + '</td>';
//                datosUser += '<td><img src="img/iconos/editar_46x46.png" alt=""/ class="enlace img-responsive actualizaesae" actuesae="' + i + '"></td></tr>';
                datosUserEmp += '<td><span class="ion-eye-disabled enlace actualizaempus" style="font-size: xx-large; color: #831e1e;" actuempus="' + i + '"></span></td></tr>';
            }
            datosUserEmp += "</tbody></table>";
            $("#tablaUsuarios").html(datosUserEmp);

            /**
             * Evento que pagina una tabla 
             */

            $('#tableUsEmp').DataTable();
            clickActualizaEmpUs();
        } else {
            $("#tablaUsuarios").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que carga el form actualizar datos de usuario y pass empleados
 * @returns {undefined}
 */
function vista_form_act_us_emp() {
    request = "View/AdministradorV/AdEmpleados/form_act_us_pass_emp.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#formularioUsuarios").html(datos);
        $("#btnActuUsuEmp").click(function () {
            validarActuUsEmp();
        });
        $("#btnCancelUsuEmp").click(function () {
            limpiarFormulario("#formUsEmp");
        });
        $("#inputGroup-sizing-sm").click(function () {
            if ($('#inpPassEmp').attr("type") == "text") {

                $('#inpPassEmp').attr('type', 'password');
                $('#inputGroup-sizing-sm').removeClass("ion-eye");
                $('#inputGroup-sizing-sm').addClass("ion-eye-disabled");

            } else if ($('#inpPassEmp').attr("type") == "password") {

                $('#inpPassEmp').attr('type', 'text');
                $('#inputGroup-sizing-sm').removeClass("ion-eye-disabled");
                $('#inputGroup-sizing-sm').addClass("ion-eye");
            }
        });
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que plasma los datos del elemento seleccionado en los campos de texto
 * formulario usuarios empleados
 * @returns {undefined}
 */
function clickActualizaEmpUs() {
    $("#tableUsEmp").on("click", ".actualizaempus", function () {
//    $(".actualizaesae").click(function () {
        actualizar = $(this).attr("actuempus");
        tmpo = arregloUser[actualizar];
        $("#inpTipoDocEmp").val(tmpo.ue_td_id);
        $("#inpNumeroEmp").val(tmpo.ue_num_doc);
        $("#inpNombreEmp").val(tmpo.emp_nombre);
        $("#inpUsuarioEmp").val(tmpo.ue_usuario);
        $("#selectEstadoUsu").val(tmpo.esu_id);

        $([document.documentElement, document.body]).animate({
            scrollTop: $("#page-content-wrapper").offset().top
        }, 300);
    });
}

/**
 * Metodo que permite validar campos en formulario actualizacion de usuario empleado 
 * @returns {undefined}
 */
function validarActuUsEmp() {
    $("#formUsEmp").validate({
        rules: {
            inpTipoDocEmp: {
                required: true
            },
            inpNumeroEmp: {
                required: true
            },
            inpNombreEmp: {
                required: true
            },
            inpUsuarioEmp: {
                required: true
            }
        },
        submitHandler: function (form) {

            actualiza_us_emp();
        }
    });
}
/**
 * Metodo que actualiza usuario y pass en tabla usuario_pass_emp
 * @returns {undefined}
 */
function actualiza_us_emp() {
    request = "Controller/AdminC/AdministrarEmpleados/actualiza_us_pass_emp_controller.php";
    cadena = $("#formUsEmp").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            $("#mensajeAccion").html("<div class='alert alert-dismissible alert-success'>\n\
              <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
              <strong>Datos de aceso de Cliente Actualizados!</strong>.</div>");
            limpiarFormulario("#formUsEmp");
            tablaGeneral_US_Empleados();
        } else {
            $("#mensajeAccion").html("<div class='alert alert-dismissible alert-danger'>\n\
              <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
              <strong>Error al guardar los datos!</strong>.</div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que retorna el listado de usuarios sucursales
 * @returns {undefined}
 */
function tablaGeneral_US_Sucursales() {
    request = "Controller/AdminC/AdministrarSucursal/consulta_gen_sucursales_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arregloUser = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloUser !== 0) {
            datosUserSuc = "<table class='table table-responsive-sm table-hover table-bordered table-fixed' id='tableUsSuc'>\n\
                             <thead><tr class='thead-light'>\n\
                             <th scope='col'>NOMBRE</th>\n\
                             <th scope='col'>NUM. SUC</th>\n\
                             <th scope='col'>USUARIOS</th>\n\
                             <th scope='col'>ACT. PASS</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arregloUser.length; i++) {
                tmp = arregloUser[i];
                datosUserSuc += '<tr class="table-info" id="fila' + i + '"><td>' + tmp.suc_nombre + "</td>";
                datosUserSuc += '<td>' + tmp.suc_num_id + '</td>';
                datosUserSuc += '<td>' + tmp.suc_usuario + '</td>';
//                datosUser += '<td><img src="img/iconos/editar_46x46.png" alt=""/ class="enlace img-responsive actualizaesae" actuesae="' + i + '"></td></tr>';
                datosUserSuc += '<td><span class="ion-eye-disabled enlace actualizasucus" style="font-size: xx-large; color: #831e1e;" actusucus="' + i + '"></span></td></tr>';
            }
            datosUserSuc += "</tbody></table>";
            $("#tablaUsuarios").html(datosUserSuc);

            /**
             * Evento que pagina una tabla 
             */

            $('#tableUsSuc').DataTable();
            clickActualizaSucUs();
        } else {
            $("#tablaUsuarios").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que carga el form actualizar datos de usuario y pass sucursales
 * @returns {undefined}
 */
function vista_form_act_us_suc() {
    request = "View/AdministradorV/AdSucursal/form_act_us_pass_suc.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#formularioUsuarios").html(datos);
        $("#btnActuUsuSuc").click(function () {
            validarActuUsSuc();
        });
        $("#btnCancelUsuSuc").click(function () {
            limpiarFormulario("#formUsSuc");
        });
        $("#inputGroup-sizing-sm").click(function () {
            if ($('#inpPassSuc').attr("type") == "text") {

                $('#inpPassSuc').attr('type', 'password');
                $('#inputGroup-sizing-sm').removeClass("ion-eye");
                $('#inputGroup-sizing-sm').addClass("ion-eye-disabled");

            } else if ($('#inpPassSuc').attr("type") == "password") {

                $('#inpPassSuc').attr('type', 'text');
                $('#inputGroup-sizing-sm').removeClass("ion-eye-disabled");
                $('#inputGroup-sizing-sm').addClass("ion-eye");
            }
        });
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que plasma los datos del elemento seleccionado en los campos de texto
 * formulario usuarios sucursales
 * @returns {undefined}
 */
function clickActualizaSucUs() {
    $("#tableUsSuc").on("click", ".actualizasucus", function () {
//    $(".actualizaesae").click(function () {
        actualizar = $(this).attr("actusucus");
        tempo = arregloUser[actualizar];
        $("#inpNumeroSuc").val(tempo.suc_num_id);
        $("#inpNombreSuc").val(tempo.suc_nombre);
        $("#inpUsuarioSuc").val(tempo.suc_usuario);

        $([document.documentElement, document.body]).animate({
            scrollTop: $("#page-content-wrapper").offset().top
        }, 300);
    });
}

/**
 * Metodo que permite validar campos en formulario actualizacion de usuario sucursal 
 * @returns {undefined}
 */
function validarActuUsSuc() {
    $("#formUsSuc").validate({
        rules: {
            inpNumeroSuc: {
                required: true
            },
            inpNombreSuc: {
                required: true
            },
            inpUsuarioSuc: {
                required: true
            },
            inpPassSuc: {
                required: true
            }
        },
        submitHandler: function (form) {

            actualiza_us_suc();
        }
    });
}
/**
 * Metodo que actualiza usuario y pass en tabla sucursales
 * @returns {undefined}
 */
function actualiza_us_suc() {
    request = "Controller/AdminC/AdministrarSucursal/actualiza_us_pass_suc_controller.php";
    cadena = $("#formUsSuc").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            $("#mensajeAccion").html("<div class='alert alert-dismissible alert-success'>\n\
              <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
              <strong>Datos de aceso de Cliente Actualizados!</strong>.</div>");
            limpiarFormulario("#formUsSuc");
            tablaGeneral_US_Sucursales();
        } else {
            $("#mensajeAccion").html("<div class='alert alert-dismissible alert-danger'>\n\
              <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
              <strong>Error al guardar los datos!</strong>.</div>");
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
        $("#list-formCliente").html("");
        $("#list-formCliente").html(datos);

        crear_os_por_cliente();

        //*Editar OS*//
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
        $("#enlCrearOs").click(function () {
            $("#items li").removeClass("active");
            $("#itemenlCrearOs").addClass("active");
            crear_os_por_cliente();
        });
        $("#enlEnProceso").click(function () {
            $("#items li").removeClass("active");
            $("#itemenlEnProceso").addClass("active");
            en_proceso_os_por_cliente();
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
        $("#list-formCliente").html("");
        $("#list-formCliente").html(datos);
        consulta_dashboard_serv_card();
        consulta_dashboard_serv();
//        setInterval(consulta_os_program, 20000);
    };
    f_ajax(request, cadena, metodo);
}

var serv_program;
var serv_asignado;
var serv_exitoso;
var serv_novedad;
var serv_picking;
var serv_packing;
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
        serv_picking = 0;
        serv_packing = 0;
        arregloEstOS = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEstOS !== 0) {
            datosEstOS = "<div class='table-responsive text-nowrap' id='tablaEstadoOS'><table class='table table-striped table-sm table-bordered' id='tableEstOS'>\n\
                             <thead><tr style='background-color: #13b955'>\n\
                             <th scope='col'></th>\n\
                             <th scope='col'>N° ORDEN</th>\n\
                             <th scope='col'></th>\n\
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
                } else if (tmp.es_id == 5) {
                    datosEstOS += '<tr class="table-sm" id="fila' + i + '"><td class="enlace actuestos" act="' + i + '"><span class="ion-social-dropbox" style="color: #ce8300;"></span></td>';
                } else if (tmp.es_id == 6) {
                    datosEstOS += '<tr class="table-sm" id="fila' + i + '"><td class="enlace actuestos" act="' + i + '"><span class="ion-cube" style="color: #009e3f;"></span></td>';
                }
                datosEstOS += '<td>' + tmp.os_id + "</td>";
                datosEstOS += '<td class="enlace infoenvi" infenv="' + tmp.os_id + '"><span class="ion-email-unread" style="color: #13b955;"></span></td>';
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
                } else if (tmp.es_id == 5) {
                    datosEstOS += '<td style="background-color: #fea;">' + tmp.es_desc + '</td>';
//                    serv_novedad++;
                } else if (tmp.es_id == 6) {
                    datosEstOS += '<td style="background-color: #b0ffc5;">' + tmp.es_desc + '</td>';
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
                'order': [[1, 'desc']],
                'scrollX': true
            });

            clickActuEstado_OS();
            clickInfoEnv_os();
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
    $("#cantServPicking").html(serv_picking);
    $("#cantServPacking").html(serv_packing);
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
        $('#mod-dalog').removeClass('modal-lg');
        $('#ModalActuEstOS').modal('toggle');

        form_act_est_os(arregloEstOS, actu_es_os);
    });
}
/**
 * Metodo que llama la ventana emergente con el formulario
 * @param {type} array
 * @param {type} position
 * @returns {undefined}
 */
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
            </form></div>');
        combo_emp();
        $("#btnGuardaEstOS").click(function () {
            validarInsert_est_x_os();
        });
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
                    <div id="tabEnvDia"></div>\n\
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
                    <div class="form-group" id="btnColecta"  style="display: none;">\n\
                        <button type="submit" class="btn btn-success" id="btnGuardaEstOS" name="btnGuardaEstOS">Finalizar Recolección <span class="ion-checkmark-circled" style="font-size: x-large;"></span></button>\n\
                    </div>\n\
                    <input type="text" class="form-control" id="inpEstado" name="inpEstado" value="3" style="display: none;" readonly>\n\
                </fieldset>\n\
            </form></div>');
        $("#divRadios input[name='customRadio']").click(function () {
            est = $("input:radio[name=customRadio]:checked").val();
            if (est === "1") {
                $("#inpEstado").val("3");
                $("#btnGuardaEstOS").removeClass("btn-danger");
                $("#btnGuardaEstOS").addClass("btn-success");
                $("#btnColecta").hide();
                $(".cheitem").prop("disabled", false);
            } else if (est === "2") {
                $("#inpEstado").val("4");
                $("#btnGuardaEstOS").removeClass("btn-success");
                $("#btnGuardaEstOS").addClass("btn-danger");
                $("#btnColecta").show();
                $(".cheitem").removeAttr("checked");
                $(".cheitem").prop("disabled", true);
            }
        });
        consulta_tabla_env_mens_os_recolec(tm.os_id);
        $("#btnGuardaEstOS").click(function () {
            enviosSelectedRecoleccion();
            validarInsert_est_x_os();
        });
    } else if (tm.es_id == 3) {

        $('#ModalEstOSTitle').html('REALIZADA');
        $('#body_mod_os').html('<div class="alert alert-dismissible alert-success">\n\
                  <div class="row">\n\
                    <div class="form-group form-group-sm col-lg-8">\n\
                        <h4 class="alert-heading">Orden de Servicio N° ' + tm.os_id + '</h4>\n\
                    </div>\n\
                  </div>\n\
                <p><b>CLIENTE: </b>' + tm.cli_nombre + '<br>\n\
                <b>FECHA: </b>' + formato_fec + '<br>\n\
                <b>HORA: </b>' + formato_hor + '<br>\n\
                <b>DIRECCION RECOLECCIÓN: </b>' + tm.os_direccion + '<br>\n\
                <b>CIUDAD: </b>' + tm.ciu_nombre + '<br>\n\
                <b>OBSERVACIONES: </b>' + tm.exs_novedad + '</p>\n\
                <div class="custom-control custom-switch">\n\
                 <input type="checkbox" class="custom-control-input" id="switchCheck">\n\
                 <label class="custom-control-label" for="switchCheck">Asignar Servicio a Mensajero</label>\n\
                </div>\n\
                <form id="formActEstOsAsig" style="display: none;">\n\
                <fieldset>\n\
                  <div class="row">\n\
                    <div class="form-group form-group-sm col-lg-4" style="display: none;">\n\
                        <input type="text" class="form-control form-control-sm" id="inpEstOrdServ" style="background-color: #ffeccafc;" name="inpEstOrdServ" placeholder="Cod." readonly>\n\
                        <input type="text" class="form-control form-control-sm" id="inpEstId" value="2" style="background-color: #ffeccafc;" name="inpEstId" readonly>\n\
                    </div>\n\
                  </div>\n\
                </fieldset>\n\
                <div class="form-row align-items-center">\n\
                <div class="col-sm-6 my-1">\n\
                    <label class="mr-sm-2" for="selectEmpl">Mensajero/Vehiculo</label>\n\
                    <select class="form-control form-control-sm" id="selectEmpl" name="selectEmpl">\n\
                    </select>\n\
                </div>\n\
                <div class="col-sm-3 my-1" id="blqSucur">\n\
                    <label class="mr-sm-2" for="selectSuc_x_Cli">Valor</label>\n\
                    <input class="form-control form-control-sm mr-sm-2" type="number" id="inpValorFlet" name="inpValorFlet" placeholder="$">\n\
                </div>\n\
                <div class="col-auto my-1 mt-4">\n\
                    <button type="submit" class="btn btn-primary btn-sm" id="btnGuarEstAct" name="btnGuarEstAct">Guardar</button>\n\
                </div>\n\
            </div>\n\
            </form></div>');
        $('#switchCheck').on('click', function () {
            if ($(this).is(':checked')) {
                // Hacer algo si el checkbox ha sido seleccionado
                $("#formActEstOsAsig").show();
                combo_empleados("#selectEmpl");
            } else {
                // Hacer algo si el checkbox ha sido deseleccionado
//                $("#selectSuc_x_Cli").html("");
                $("#formActEstOsAsig").hide();
            }
        });
        $("#btnGuarEstAct").click(function () {
            validarAct_est_x_os();
        });

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
                <b>OBSERVACIONES: </b>' + tm.exs_novedad + '</p></div>');
    } else if (tm.es_id == 5) {

        $('#ModalEstOSTitle').html('PICKING');
        $('#body_mod_os').html('<div class="alert alert-dismissible alert-warning">\n\
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
                    <div class="form-group">\n\
                        <button type="button" class="btn btn-info" id="btnEditOS" name="btnEditOS">Editar <span class="ion-checkmark-circled" style="font-size: x-large;"></span></button>\n\
                    </div>\n\
                    <input type="text" class="form-control" id="inpEstado" name="inpEstado" value="6" readonly>\n\
                    <div id="inf_tot_aenv"></div>\n\
                </fieldset>\n\
            </form></div>');
    } else if (tm.es_id == 6) {

        $('#ModalEstOSTitle').html('PACKING');
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
                    <div class="form-group">\n\
                        <button type="button" class="btn btn-info" id="btnEditOS" name="btnEditOS">Editar <span class="ion-checkmark-circled" style="font-size: x-large;"></span></button>\n\
                    </div>\n\
                    <input type="text" class="form-control" id="inpEstado" name="inpEstado" value="6" readonly>\n\
                    <div id="inf_tot_aenv"></div>\n\
                </fieldset>\n\
            </form></div>');
    }
    $("#inpEstOrdServ").val(tm.os_id);
//    $("#inpEstId").val(tm.es_id);
    $("#btnEditOS").click(function () {
        consulta_total_aenvios(tm.os_id);
    });
}
/**
 * Metodo que carga tabla de envios asignados a recoleccion por os
 * @param {type} value
 * @returns {undefined}
 */
function consulta_tabla_env_mens_os_recolec(value) {
    request = "Controller/AdminC/AdministrarEnvios/cons_env_x_os_recoleccion_controller.php";
    cadena = {"num_os": value}; //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        arreglo_env_est = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_env_est !== 0) {
            datos_env_est = '<div class="table-responsive text-nowrap" id="tablaEstadoEnv"><table class="table table-striped table-sm table-bordered" id="tableEstEnvio">\n\
                             <thead><tr class="">\n\
                             <th scope="col">CHECK</th>\n\
                             <th scope="col">GUIA LOGI</th>\n\
                             <th scope="col">GUIA OP</th>\n\
                             <th scope="col">CANTIDAD</th>\n\
                             <th scope="col">PESO Kg</th>\n\
                             <th scope="col">DIR. DESTINO</th>\n\
                             <th scope="col">CIUDAD</th>\n\
                             <th scope="col">OS</th>\n\
                             </tr></thead><tbody>';
            for (i = 0; i < arreglo_env_est.length; i++) {
                tmp = arreglo_env_est[i];

                datos_env_est += '<tr class="table-sm" id="fila' + i + '">';
                datos_env_est += '<td id="' + i + '"><input type="checkbox" class="cheitem" colecta="' + tmp.en_id + '" id="Check' + tmp.en_id + '"></td>';
                datos_env_est += '<td>' + tmp.en_id + '</td>';
                datos_env_est += '<td>' + tmp.en_guia + '</td>';
                datos_env_est += '<td>' + tmp.en_cantidad + '</td>';
                datos_env_est += '<td>' + tmp.en_peso + '</td>';
                datos_env_est += '<td>' + tmp.en_direccion + '</td>';
                datos_env_est += '<td>' + tmp.en_ciudad + '</td>';
                datos_env_est += '<td>' + tmp.os_id + '</td></tr>';
            }
            datos_env_est += "</tbody></table></div>";


            $("#tabEnvDia").html(datos_env_est);

        } else {
            $("#tab_envios").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
        $(".cheitem").click(function () {
            $("#btnColecta").show();
        });
    };
    f_ajax(request, cadena, metodo);
}
var recolec_selected = 0;
/**
 * Metodo que determina los check seleccionados para actualizacion de recoleccion
 * @returns {undefined}
 */
function enviosSelectedRecoleccion() {
    json_act_est = '[';

    $("input:checkbox:checked").each(function () {

        checket_envio = $(this).attr("colecta");//numeo de fila posicion en el arreglo
//
        if (typeof (checket_envio) === 'undefined') {

        } else {
//            alert(checket_envio);
            guiaLogi = checket_envio;
            estadoID = 13;//estado colectado
            mens_logi = '1|9874123652';
            novedadValor = "";
//            insert_estado_envio_asig_men(mensajero, guiaLogi, estadoID, novedadValor);

            json_act_est += '{"mens":"' + mens_logi + '","id_env":"' + guiaLogi + '","id_est":"' + estadoID + '","nov":"' + novedadValor + '"},';
            recolec_selected++;
        }

    });
    $("input:checkbox:not(:checked)").each(function () {
        checket_envio = $(this).attr('colecta');//numeo de fila posicion en el arreglo
//
        if (typeof (checket_envio) === 'undefined') {

        } else {

            guiaLogi = checket_envio;
            estadoID = 12;//estado colectado
            mens_logi = '1|9874123652';
            novedadValor = "CANCELADO";
//            insert_estado_envio_asig_men(mensajero, guiaLogi, estadoID, novedadValor);

            json_act_est += '{"mens":"' + mens_logi + '","id_env":"' + guiaLogi + '","id_est":"' + estadoID + '","nov":"' + novedadValor + '"},';
            recolec_selected++;
        }

    });
    json_act_valor_new = json_act_est.substr(0, json_act_est.length - 1);
    json_act_valor_new += ']';
    insert_estado_envio_recolect_json(json_act_valor_new);
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
 * Funcion de validacion para actualizacion de est_x_os
 * @returns {undefined}
 */
function validarAct_est_x_os() {
    $("#formActEstOsAsig").validate({
        rules: {
            inpEstOrdServ: {
                required: true
            },
            selectEmpl: {
                valueNotEquals: "0|0"
            },
            inpValorFlet: {
                required: true
            }
        },
        submitHandler: function (form) {

            act_est_x_ordServ();
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
 * Funcion que actualiza un registro en tabla est_x_os
 * @returns {undefined}
 */
function act_est_x_ordServ() {
    request = "Controller/AdminC/AdministrarOS/act_est_os_controller.php";
    cadena = $("#formActEstOsAsig").serialize(); //envio de parametros por POST
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
        serv_picking = 0;
        serv_packing = 0;
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
                    serv_picking++;
                } else if (tmp.es_id == 6) {
                    serv_packing++;
                }
            }

            control_dash_serv();
            $("#cardRealizadas").click(function () {
                $("#sectionDatOS").html("");
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
                $("#sectionDatOS").html("");
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
                $("#sectionDatOS").html("");
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
                $("#sectionDatOS").html("");
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
            $("#cardPicking").click(function () {
                $("#sectionDatOS").html("");
                if (exist == true) {
                    consulta_dashb_serv_fil(5);
//                    exist = false;
                } else {
                    tablaEst_x_OS
                            .column(3)
                            .search('')
                            .search('PICKING')
                            .draw();
                }

                //En esta linea me redirije al formulario con una velocodad establecida
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#tablaEstadoOS").offset().top
                }, 900);
            });
            $("#cardPacking").click(function () {
                $("#sectionDatOS").html("");
                if (exist == true) {
                    consulta_dashb_serv_fil(6);
//                    exist = false;
                } else {
                    tablaEst_x_OS
                            .column(3)
                            .search('')
                            .search('PACKING')
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
 * Funcion que mantiene la sesion abierta
 * @returns {undefined}
 */
function refrescar_sesion() {
    request = "Controller/Login_General/refrescar_control.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {

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
 * Metodo que retorna la vista de seguimiento de orden
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

var valor;
var id_cliente_select = '0|0';
var id_suc_sel;

/**
 * Metodo que trae a la vista el entorno de creacion de ordenes de servicio
 * @returns {undefined}
 */
function crear_os_por_cliente() {
    request = "View/AdministradorV/OrdenesServicio/crear_os_cliente.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#contenGestOs").html(datos);
        combo_clientes();
        //**Metodos Nuevos**//
        combo_ciudad("#selCiudad");
        combo_tipo_envio("#selEnvio");
        combo_clientes_param("#selCliente");
        combo_tipo_serv_param("#selServi");

        $("#selCliente").change(function () {
            id_cli_sel = $("#selCliente").val();
            combo_sucursal_x_cli_param("#selSucur", id_cli_sel);
            datos_cliente_selected_v2(id_cli_sel);
        });

        $("#selSucur").change(function () {
            id_suc_sel = $("#selSucur").val();
            datos_sucursal_selected_v2(id_suc_sel);
        });
        $("#btnGuardaOS").click(function () {
            validarGuardarOS();
        });
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que trae a la vista el formulario de seleccion cliente sucursal para os en procso
 * @returns {undefined}
 */
function en_proceso_os_por_cliente() {
    request = "View/AdministradorV/OrdenesServicio/form_os_en_proceso.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#contenGestOs").html(datos);

        combo_sucursal_all("#selSucurEnProc");
        $("#selSucurEnProc").change(function () {
            id_suc_sel = $("#selSucurEnProc").val();
            datos_sucursal_selected_v2(id_suc_sel);
        });
        $("#btnBuscarSucAlist").click(function () {
            validarBusSucAlistProc();
        });
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que permite validar formulario de creacion de os
 * @returns {undefined}
 */
function validarGuardarOS() {
    $("#form_guarda_os").validate({
        rules: {
            selCliente: {
                valueNotEquals: "0|0"
            },
            inpDirec: {
                required: true
            },
            inpTel: {
                digits: true
            },
            inpCel: {
                digits: true
            }
        },
        submitHandler: function (form) {
            insertar_orden_serv_v2();
        }
    });
}
/**
 * Metodo que permite validar formulario para buscar alistamiento en proceso
 * sucursales
 * @returns {undefined}
 */
function validarBusSucAlistProc() {
    $("#formBuscarAlistProceso").validate({
        rules: {
            selSucurEnProc: {
                valueNotEquals: "0"
            }
        },
        submitHandler: function (form) {
            item_act = false;
            cargaProdAlistamiento(id_suc_sel);
        }
    });
}

//var alst_guia = false;
var filtro_guia;
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

/**
 * Metodo que carga la vista de busqueda historica de os por cliente
 * @returns {undefined}
 */
function vista_historial_os() {
    request = "View/AdministradorV/OrdenesServicio/tipo_busq_historial_os.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html("");
        $("#list-formCliente").html(datos);
        combo_clientes();

        $("#selectCliente").change(function () {
            value = $("#selectCliente").val();
            consulta_tabla_os_hist(value);
        });

        $("#btnSelect").click(function () {
            value = $("#selectCliente").val();
            consulta_tabla_os_hist(value);
        });

        $("#btnBuscaCliNum").click(function () {
            validarBuscarCliNumero();
        });

    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que llena el combo de seleccion Clientes
 * @returns {undefined}
 */
function combo_clientes() {
    request = "Controller/AdminC/AdministrarCliente/consulta_general_cliente_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        datouscombo = '<option value="0|0">Seleccione...</option>';
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            datouscombo += '<option value="' + temp.cli_td_id + '|' + temp.cli_num_doc + '">' + temp.cli_nombre + "</option>";
        }
        $("#selectCliente").html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que llena el combo de seleccion Clientes
 * primer option 0
 * @returns {undefined}
 */
function combo_clientes_dos() {
    request = "Controller/AdminC/AdministrarCliente/consulta_general_cliente_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        datouscombo = '<option value="0|0">Seleccione</option>';
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            datouscombo += '<option value="' + temp.cli_td_id + '|' + temp.cli_num_doc + '">' + temp.cli_nombre + "</option>";
        }
        $("#selectCliente").html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que llena el combo de seleccion Clientes reibe parametro identificador
 * @param {type} seletCliente
 * @returns {undefined}
 */
function combo_clientes_param(seletCliente) {
    request = "Controller/AdminC/AdministrarCliente/consulta_general_cliente_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        datouscombo = '<option value="0|0">Seleccione...</option>';
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            datouscombo += '<option value="' + temp.cli_td_id + '|' + temp.cli_num_doc + '">' + temp.cli_nombre + "</option>";
        }
        $(seletCliente).html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que permite validar campos en formulario orden servicio actualizar
 * @returns {undefined}
 */
function validarBuscarCliNumero() {
    $("#formBuscarCliNumero").validate({
        rules: {
            inpBuscaDocCli: {
                required: true
            }
        },
        submitHandler: function (form) {
            consultar_cli_numero_id();
        }
    });
}
/**
 * Metodo que retorna los datos de ordenes de servicio por numero de cliente
 * @returns {undefined}
 */
function consultar_cli_numero_id() {
    request = "Controller/AdminC/AdministrarCliente/consulta_cliente_controller.php";
    cadena = $("#formBuscarCliNumero").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);

        temp = arreglo[0];
        if (typeof temp === 'undefined') {
            alertify.alert('No se encuentra en Base de Datos').setHeader('<em> Cuidado! </em> ');
        } else {
            value = temp.cli_td_id + '|' + temp.cli_num_doc;
            consulta_tabla_os_hist(value);
        }
    };
    f_ajax(request, cadena, metodo);
}

/****************************************************************
 * Metodos de tabla sucursales
 * 
 ****************************************************************/
/**
 * Metodo que retorna la vista de administracion de sucursales
 * @returns {undefined}
 */
function vista_admin_sucursal() {
    request = "View/AdministradorV/AdSucursal/contenedor_suc.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html("");
        $("#list-formCliente").html(datos);

        combo_sucursal();

        $("#formNuevoProd").click(function () {
            if (typeof value_suc === 'undefined' || $("#inputSucId").val() == "") {
                alertify.alert('Debe seleccionar una sucursal').setHeader('<em> Cuidado! </em> ');
            } else {
                form_nuevo_prod();
            }
        });
        $("#formIngInvXlsx").click(function () {
            if (typeof value_suc === 'undefined' || $("#inputSucId").val() == "") {
                alertify.alert('Debe seleccionar una sucursal').setHeader('<em> Cuidado! </em> ');
            } else {
                form_carga_inventario();
            }
        });

        $("#tabStockSuc").click(function () {
            if (typeof value_suc === 'undefined' || $("#inputSucId").val() == "") {
                alertify.alert('Debe seleccionar una sucursal').setHeader('<em> Cuidado! </em> ');
            } else {
                tabla_stock_suc();
            }
        });

        $("#formEdita").click(function () {
            if (typeof value_suc === 'undefined' || $("#inputSucId").val() == "") {
                alertify.alert('Debe seleccionar una sucursal').setHeader('<em> Cuidado! </em> ');
            } else {
                num_id_sucursal = $("#inputSucId").val();
                tabla_productos_suc(num_id_sucursal);
            }
        });

        $("#formRepEntradas").click(function () {
            if (typeof value_suc === 'undefined' || $("#inputSucId").val() == "") {
                alertify.alert('Debe seleccionar una sucursal').setHeader('<em> Cuidado! </em> ');
            } else {
                num_id_suc_ent = $("#inputSucId").val();
                vista_busca_entrada();
            }
        });

        $("#selectSucursal").change(function () {
            value_suc = $("#selectSucursal").val();
            cargar_suc_selected(value_suc);
            $("#contenidoInvent").html("");
        });

        $("#btnSelectSuc").click(function () {
            value_suc = $("#selectSucursal").val();
            cargar_suc_selected(value_suc);
            $("#contenidoInvent").html("");
        });
    };
    f_ajax(request, cadena, metodo);
}
var value_suc;
var num_id_suc_ent;
var arreglo_suc;
/**
 * Metodo que retorna los datos a combo sucursales
 * @returns {undefined}
 */
function combo_sucursal() {
    request = "Controller/AdminC/AdministrarSucursal/consulta_gen_sucursales_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_suc = $.parseJSON(datos);
        datouscombo = "";
        for (i = 0; i < arreglo_suc.length; i++) {
            temp = arreglo_suc[i];
            datouscombo += '<option value="' + i + '">' + temp.suc_nombre + "</option>";
        }
        $("#selectSucursal").html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga en la vista la informacion de una sucursal seleccionada
 * @param {type} id
 * @returns {undefined}
 */
function cargar_suc_selected(id) {
    tempo = arreglo_suc[id];
    $("#inputNombreCliAc").val(tempo.cli_nombre);
    $("#inputNumCliAc").val(tempo.cli_num_doc);
    $("#inputSucId").val(tempo.suc_num_id);
    $("#inputSucNombre").val(tempo.suc_nombre);
    $("#imageSucursal").html('<img src="img/sucursales/' + tempo.suc_num_id + '.png" alt=""/>');
}
/**
 * Metodo que carga a la vista el formulario de entradas de inventario
 * @returns {undefined}
 */
function form_carga_inventario() {
    request = "View/AdministradorV/AdSucursal/form_entradas_inv.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#contenidoInvent").html(datos);

        nameFileCargaXlsxInv();

        $("#btnGuardarInv").click(function () {
            validarXlsxInv();
        });
        $("#inputSucNumId").val($("#inputSucId").val());
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga a la vista el formulario de ingreso nuevos productos
 * @returns {undefined}
 */
function form_nuevo_prod() {
    request = "View/AdministradorV/AdSucursal/form_prod_nuevo.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#contenidoInvent").html(datos);
        $("#btnGuardaProd").click(function () {
            validarFormNuevoProd();
        });
        $("#inputNumSuc").val($("#inputSucId").val());
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que plasma nombre archivo en carga masiva envios documentos
 * @returns {undefined}
 */
function nameFileCargaXlsxInv() {
    $("#inpFileMasInventario").change(function () {
        nombre = $("#inpFileMasInventario").val();
//        if (nombre.substring(3,11) == 'fakepath') {
//            nombre = nombre.substring(12);
//        }
        $("#textNameInv").text(nombre);
    });
}
/**
 * Metodo de validacion de carga entradas inventario xlsx
 * @returns {undefined}
 */
function validarXlsxInv() {
    $("#formEntInvXlsx").validate({
        errorLabelContainer: '#errorTxt',
        rules: {
            inpFileMasInventario: {
                required: true,
                extension: "xlsx"
            }
        },
        messages: {
            inpFileMasInventario: {
                extension: "Extensión no valida, debe ser xlsx"
            }
        },
        submitHandler: function (form) {
            cargaArchivoEntradaInv();
        }
    });
}
/**
 * Metodo de validacion para campos de formulario nuevo producto
 * @returns {undefined}
 */
function validarFormNuevoProd() {
    $("#formProducto").validate({
        rules: {
            inputCodProd: {
                required: true
            },
            inputSku: {
                required: true
            },
            inputNomProd: {
                required: true
            },
            inputCantProd: {
                required: true,
                digits: true
            }
        },
        messages: {
            inputCantProd: {
                digits: "Si no existe cantidad use '0'"
            }
        },
        submitHandler: function (form) {
            insertarProducto();
        }
    });
}

/**
 * Metodo de validacion para campos de formulario actualizar producto
 * @returns {undefined}
 */
function validarFormActualizaProd() {
    $("#formModalProd").validate({
        rules: {
            inputDescProd: {
                required: true
            },
            inputSkuProd: {
                required: true
            },
            inputUbicacionProd: {
                required: true
            },
            inputCostoUnit: {
                required: true,
                digits: true
            }
        },
        submitHandler: function (form) {
            actualizarProducto();
        }
    });
}

/**
 * Metodo que se encarga de guardar un fichero en la carpeta raiz del servidor
 * para la carga de entradas de inventario
 * @returns {undefined}
 */
function cargaArchivoEntradaInv() {
    var creando = "<div class='col-lg-3'><span>Loading...</span></div>\n\
                    <div class='col-lg-4'><img class='img-fluid' src='img/animaciones/masivo_mensajeria3.gif' alt=''/></div>\n\
                    <div class='col-lg-5'><span>Epere un momento por favor</span></div>";
    $("#changeEntradas").html(creando);
    request = "Controller/AdminC/AdministrarSucursal/carga_ent_inv_controller.php";
    cadena = new FormData($("#formEntInvXlsx")[0]);
    metodo = function (datos) {
        $("#textNameInv").html("");
        limpiarFormulario("#formEntInvXlsx");
        if (datos == 1) {
            lectura_xlsx_entradas();
//            alert("subio y es excel");
        } else {
            $("#changeEntradas").html(datos);
        }

//        $("#tabEnviosDocum").html(datos);
    };
    f_ajax_files(request, cadena, metodo);
}
/**
 * Metodo que se encarga de guardar un registro en tabla productos
 * @returns {undefined}
 */
function insertarProducto() {
    request = "Controller/AdminC/AdministrarProd/insertar_nuevo_prod_controller.php";
    cadena = $("#formProducto").serialize();
    metodo = function (datos) {
        if (datos == 1) {
            alertify.success('Producto creado en Base de datos OK!');
            limpiarFormulario("#formProducto");
        } else {
            alertify.alert(datos).setHeader('<em> Cuidado! </em> ');
        }

//        $("#tabEnviosDocum").html(datos);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que se encarga de actualizar un registro en tabla productos
 * @returns {undefined}
 */
function actualizarProducto() {
    request = "Controller/AdminC/AdministrarProd/actualizar_prod_controller.php";
    cadena = $("#formModalProd").serialize();
    metodo = function (datos) {
//        alert(datos);
        if (datos == 1) {
            limpiarFormulario("#formModalProd");
            $('#ModalActuEstOS').modal('hide');
            alertify.success('Producto Actalizado OK!');
            tabla_productos_suc($("#inputSucId").val());
        } else {
            alertify.alert('Error al actualizar producto').setHeader('<em> Cuidado! </em> ');
        }

//        $("#tabEnviosDocum").html(datos);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que lee los datos del archivo excel subido por el usuario
 * para entradas de inventario
 * @returns {undefined}
 */
function lectura_xlsx_entradas() {
    sucursal_id = $("#inputSucId").val();
    request = "Controller/AdminC/AdministrarSucursal/leer_xlsx_ent_inven_controller.php";
    cadena = "suc=" + sucursal_id;
    metodo = function (datos) {

        $("#changeEntradas").html(datos);
        $("#btnActualizaStock").click(function () {
            actualizar_stck_masivo();
        });
        /**
         * Evento que pagina una tabla 
         */
        $('#tableEntInven').DataTable({
            'scrollX': true
        });

    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que actualiza el stock de acuerdo a las entradas masivas
 * @returns {undefined}
 */
function actualizar_stck_masivo() {
    request = "Controller/AdminC/AdministrarSucursal/actualizar_stock_masivo_controller.php";
    cadena = "a=1";
    metodo = function (datos) {

        alert(datos);

    };
    f_ajax(request, cadena, metodo);
}
var arreglo_gen_prod;
/**
 * Metodo que carga a la vista la tabla con el stock actualizado de los productos de una sucursal
 * @param {type} suc_id
 * @returns {tabla_productos_suc}
 */
function tabla_productos_suc(suc_id) {
    request = "Controller/AdminC/AdministrarProd/consulta_general_prod_controller.php";
    cadena = "suc_id=" + suc_id; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_gen_prod = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_gen_prod !== 0) {
            datos_prod_gen = '<div class="toast-header"><strong class="mr-auto">PRODUCTOS</strong></div>\n\
                             <div class="toast-body row"><div class="alert alert-dismissible alert-warning col-lg-12" style="border-radius: 0.5rem;">\n\
                             <h4>Tabla General de Productos</h4>\n\
                             <div class="col-lg-12 table-responsive" id="tabProdGen">\n\
                             <table class="table table-striped table-sm table-bordered table-hover col-lg-12" id="tableProductoGen">\n\
                             <thead><tr class="table-sm table-primary">\n\
                                 <th scope="col">INFO</th>\n\
                                 <th scope="col">CODIGO</th>\n\
                                 <th scope="col">SKU</th>\n\
                                 <th scope="col">DESCRIPCIÓN</th>\n\
                                 <th scope="col">UB.</th>\n\
                                 <th scope="col">COSTO UN</th>\n\
                             </tr></thead><tbody>';
            for (i = 0; i < arreglo_gen_prod.length; i++) {
                tmp = arreglo_gen_prod[i];

                datos_prod_gen += '<tr class="table-sm" id="fila' + i + '">';
                datos_prod_gen += '<td class="enlace text-center text-info"><span class="ion-edit gesProd" GestProd="' + i + '" style="font-size: large;"></span></td>';
                datos_prod_gen += '<td>' + tmp.pro_cod + '</td>';
                datos_prod_gen += '<td>' + tmp.pro_sku + '</td>';
                datos_prod_gen += '<td>' + tmp.pro_desc + '</td>';
                datos_prod_gen += '<td id="ub' + tmp.pro_cod + '">' + tmp.pro_ubicacion + '</td>';
                datos_prod_gen += '<td id="el' + tmp.pro_cod + '">' + tmp.pro_costo_unitario + '</td></tr>';
            }
            datos_prod_gen += '</tbody><tfoot><tr class="table-primary">\n\
                        <th>INFO</th>\n\
                        <th>CODIGO</th>\n\
                        <th>SKU</th>\n\
                        <th>DESCRIPCIÓN</th>\n\
                        <th>UB</th>\n\
                        <th>COSTO UN un</th>\n\
                    </tr></tfoot></table></div></div></div>';
            $("#contenidoInvent").html(datos_prod_gen);

//            /**
//             * Evento que pagina una tabla 
//             */
//            $('#tableStockSucursal').DataTable();
            $('#tableProductoGen thead tr').clone(true).appendTo('#tableProductoGen thead');
            $('#tableProductoGen thead tr:eq(1) th').each(function (i) {
                var title = $(this).text();
                if (i == 0) {
                    $(this).html('');
                } else if (i == 1) {
                    $(this).html('<input type="text" id="inpCod' + i + '" placeholder="' + title + '" size="10">');
                } else if (i == 2) {
                    $(this).html('<input type="text" id="inpSku' + i + '" placeholder="' + title + '" size="15">');
                } else if (i == 3) {
                    $(this).html('<input type="text" id="inpDesc' + i + '" placeholder="' + title + '" size="35">');
                } else if (i == 4) {
                    $(this).html('<input type="text" id="inpUb' + i + '" placeholder="' + title + '" size="2">');
                } else if (i == 5) {
                    $(this).html('<input type="text" id="inpCos' + i + '" placeholder="' + title + '" size="8">');
                }
//                $(this).html('<input type="text" id="inp' + i + '" placeholder="' + title + '"/>');

                $('input', this).on('keyup change', function () {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });

            var table = $('#tableProductoGen').DataTable({
                orderCellsTop: true,
                fixedHeader: true
            });

            /**
             * evento de click para llamada de formulario
             */
            clickGestProducto();

        } else {
            $("#contenidoInvent").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que carga el modal con formulario para editar datos de producto en tabla producto
 * @returns {undefined}
 */
function clickGestProducto() {
    $("#tableProductoGen").on("click", ".gesProd", function () {

        fila_p = $(this).attr("GestProd");

        tmp_prod = arreglo_gen_prod[fila_p];

        $('#ModalActuEstOS').modal('toggle');
        $('#mod-dalog').removeClass('modal-lg');
        $('#ModalEstOSTitle').html('Editar Producto');

        $('#body_mod_os').html('<div class="alert alert-dismissible alert-info">\n\
                    <div class="row">\n\
                        <div class="col-6"><strong>CODIGO: <b class="text-primary" id="numCodigo">' + tmp_prod.pro_cod + '</b></strong></div>\n\
                        <div id="imageSucursal"><img src="img/sucursales/' + tmp_prod.suc_num_id + '.png" alt=""></div>\n\
                    </div>\n\
            <form class="mt-3" id="formModalProd" name="formModalProd">\n\
              <div class="form-row">\n\
                <div class="form-group input-group col-md-12">\n\
                  <div class="input-group">\n\
                  <input type="text" class="form-control" id="inputNumSuc" name="inputNumSuc" style="display: none;">\n\
                  <input type="text" class="form-control" id="inputCodProd" name="inputCodProd" style="display: none;">\n\
                </div>\n\
                </div>\n\
              </div>\n\
              <div class="form-group">\n\
                <label for="inputDescProd">Descripción</label>\n\
                <input type="text" class="form-control form-control-sm" id="inputDescProd" name="inputDescProd">\n\
              </div>\n\
              <div class="form-row">\n\
                <div class="form-group col-md-5">\n\
                  <label for="inputSkuProd">SKU</label>\n\
                  <input type="text" class="form-control form-control-sm" id="inputSkuProd" name="inputSkuProd">\n\
                </div>\n\
                <div class="form-group col-md-3">\n\
                  <label for="inputUbicacionProd">UB.</label>\n\
                  <input type="text" class="form-control form-control-sm" id="inputUbicacionProd" name="inputUbicacionProd">\n\
                </div>\n\
                <div class="form-group col-md-4">\n\
                  <label for="inputCostoUnit">Costo UN.</label>\n\
                  <input type="text" class="form-control form-control-sm" id="inputCostoUnit" name="inputCostoUnit">\n\
                </div>\n\
              </div>\n\
              <button type="submit" class="btn btn-info" id="btnGuardaProd" name="btnGuardaProd">Guardar</button>\n\
              <button type="button" class="btn btn-dark float-right" id="btnCancelarProd" name="btnCancelarProd">Cancelar</button>\n\
            </form>\n\
            <div id="enlaceGuia"></div>');

        $("#inputNumSuc").val(tmp_prod.suc_num_id);
        $("#inputCodProd").val(tmp_prod.pro_cod);
        $("#inputDescProd").val(tmp_prod.pro_desc);
        $("#inputSkuProd").val(tmp_prod.pro_sku);
        $("#inputUbicacionProd").val(tmp_prod.pro_ubicacion);
        $("#inputCostoUnit").val(tmp_prod.pro_costo_unitario);

        $("#btnGuardaProd").click(function () {
            validarFormActualizaProd();
        });
        $("#btnCancelarProd").click(function () {
            limpiarFormulario("#formModalProd");
        });
    });
}

/****************************************************************
 * Metodos de Creacion de OS
 * 
 ****************************************************************/
//var arreglo_suc_cli;
//var arreglo_datos_cli;
/**
 * Metodo que retorna los datos a combo sucursales por cliente seleccionado
 * @returns {undefined}
 */
function combo_sucursal_x_cli() {
    request = "Controller/AdminC/AdministrarSucursal/consulta_suc_x_cli_controller.php";
    cadena = "selectCliente=" + id_cliente_select; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_suc_cli = $.parseJSON(datos);
        datouscombo = "";
        if (arreglo_suc_cli == "") {
            datouscombo += '<option value="0"></option>';
        } else {
            for (i = 0; i < arreglo_suc_cli.length; i++) {
                temp = arreglo_suc_cli[i];
                datouscombo += '<option value="' + temp.suc_num_id + '">' + temp.suc_nombre + "</option>";
            }
        }

        $("#selectSuc_x_Cli").html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que retorna los datos a combo sucursales por cliente seleccionado
 * recibe parametro identificador select
 * @param {type} iden_select
 * @param {type} id_cliente
 * @returns {undefined}
 */
function combo_sucursal_x_cli_param(iden_select, id_cliente) {
    request = "Controller/AdminC/AdministrarSucursal/consulta_suc_x_cli_controller.php";
    cadena = "selectCliente=" + id_cliente; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_suc_cli = $.parseJSON(datos);
        datouscombo = "";
        if (arreglo_suc_cli == "") {
            datouscombo += '<option value="0"></option>';
        } else {
            datouscombo += '<option value="0">Seleccione..</option>';
            for (i = 0; i < arreglo_suc_cli.length; i++) {
                temp = arreglo_suc_cli[i];
                datouscombo += '<option value="' + temp.suc_num_id + '">' + temp.suc_nombre + "</option>";
            }
        }

        $(iden_select).html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que retorna los datos a combo de todas las sucursales 
 * @param {type} iden_select
 * @returns {combo_sucursal_all}
 */
function combo_sucursal_all(iden_select) {
    request = "Controller/AdminC/AdministrarSucursal/consulta_gen_sucursales_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_suc_cli = $.parseJSON(datos);
        datouscombo = "";
        if (arreglo_suc_cli == "") {
            datouscombo += '<option value="0"></option>';
        } else {
            datouscombo += '<option value="0">Seleccione..</option>';
            for (i = 0; i < arreglo_suc_cli.length; i++) {
                temp = arreglo_suc_cli[i];
                datouscombo += '<option value="' + temp.suc_num_id + '">' + temp.suc_nombre + "</option>";
            }
        }
        $(iden_select).html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que retorna los datos a combo tipo de servicio
 * recibe parametro identificador
 * @param {type} ident_select
 * @returns {undefined}
 */
function combo_tipo_serv_param(ident_select) {
    request = "Controller/AdminC/AdministrarBD/consulta_tipo_serv_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_serv = $.parseJSON(datos);
        datouscombo = "";
        if (arreglo_serv == "") {
            datouscombo += '<option value="0"></option>';
        } else {
            for (i = 0; i < arreglo_serv.length; i++) {
                temp = arreglo_serv[i];
                if (temp.ts_id == 2) {
                    datouscombo += '<option value="' + temp.ts_id + '" selected>' + temp.ts_desc + "</option>";
                } else {
                    datouscombo += '<option value="' + temp.ts_id + '">' + temp.ts_desc + "</option>";
                }

            }
        }

        $(ident_select).html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que retorna los datos a combo sucursales por cliente seleccionado
 * @returns {undefined}
 */
function combo_sucursal_x_cli_dos() {
    request = "Controller/AdminC/AdministrarSucursal/consulta_suc_x_cli_controller.php";
    cadena = "selectCliente=" + $("#selectCliente").val(); //envio de parametros por POST
    metodo = function (datos) {
        arreglo_suc_cli = $.parseJSON(datos);
        datouscombo = '<option value="0">Seleccione</option>';
        if (arreglo_suc_cli == "") {
            datouscombo += '<option value="0"></option>';
        } else {
            for (i = 0; i < arreglo_suc_cli.length; i++) {
                temp = arreglo_suc_cli[i];
                datouscombo += '<option value="' + temp.suc_num_id + '">' + temp.suc_nombre + "</option>";
            }
        }

        $("#selectSuc_x_Cli").html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que retorna los datos de cliente seleccionado
 * @returns {undefined}
 */
function datos_cliente_selected() {
    request = "Controller/AdminC/AdministrarCliente/consulta_cli_x_num_controller.php";
    cadena = "selectCliente=" + id_cliente_select; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_datos_cli = $.parseJSON(datos);

        tmp_dat_cli = arreglo_datos_cli[0];

        $("#inputDir").val(tmp_dat_cli.cli_direccion);
        $("#inputTele").val(tmp_dat_cli.cli_tel);
        $("#inputPerContacto").val(tmp_dat_cli.cli_per_cont);
        $("#inputNumDocCl").val(tmp_dat_cli.cli_num_doc);
        $("#inputTDocCli").val(tmp_dat_cli.cli_td_id);
        $("#nombreCliSuc").html(tmp_dat_cli.cli_nombre);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que retorna los datos de cliente seleccionado
 * recibe parametro identificador de id select
 * @param {type} id_sel_cli
 * @returns {undefined}
 */
function datos_cliente_selected_v2(id_sel_cli) {
    request = "Controller/AdminC/AdministrarCliente/consulta_cli_x_num_controller.php";
    cadena = "selectCliente=" + id_sel_cli; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_datos_cli = $.parseJSON(datos);

        tmp_dat_cli = arreglo_datos_cli[0];

        $("#inpDirec").val(tmp_dat_cli.cli_direccion);
        $("#inpTel").val(tmp_dat_cli.cli_tel);
        $("#inpPerCont").val(tmp_dat_cli.cli_per_cont);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que retorna los datos de sucursal seleccionada
 * @returns {undefined}
 */
function datos_sucursal_selected() {
    request = "Controller/AdminC/AdministrarSucursal/consulta_suc_x_id_controller.php";
    cadena = "selectSuc_x_Cli=" + $("#selectSuc_x_Cli").val(); //envio de parametros por POST
    metodo = function (datos) {
        arreglo_datos_suc = $.parseJSON(datos);

        tmp_dat_suc = arreglo_datos_suc[0];

        $("#inputDir").val(tmp_dat_suc.suc_direccion);
        $("#inputTele").val(tmp_dat_suc.suc_telefono);
        $("#inputPerContacto").val(tmp_dat_suc.suc_nombre);
        $("#inputNumDocCl").val(tmp_dat_suc.cli_num_doc);
        $("#inputTDocCli").val(tmp_dat_suc.cli_td_id);
        $("#inputNumSucu").val(tmp_dat_suc.suc_num_id);
        $("#nombreCliSuc").html(tmp_dat_suc.suc_nombre);
        $("#blqFinalizado").html('<img src="img/sucursales/' + tmp_dat_suc.suc_num_id + '.png" class="rounded mx-auto d-block" alt=""/>');
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que retorna los datos de sucursal seleccionada
 * recibe parametro de id sucursal
 * @param {type} id_suc_sel
 * @returns {undefined}
 */
function datos_sucursal_selected_v2(id_suc_sel) {
    request = "Controller/AdminC/AdministrarSucursal/consulta_suc_x_id_controller.php";
    cadena = "selectSuc_x_Cli=" + id_suc_sel; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_datos_suc = $.parseJSON(datos);

        tmp_dat_suc = arreglo_datos_suc[0];

        if (tmp_dat_suc === 0 || typeof tmp_dat_suc === "undefined") {

        } else {
            $("#inpDirec").val(tmp_dat_suc.suc_direccion);
            $("#inpTel").val(tmp_dat_suc.suc_telefono);
            $("#inpPerCont").val(tmp_dat_suc.suc_nombre);
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que retorna los datos de cliente seleccionado para os en proceso
 * @returns {undefined}
 */
function datos_cli_selected_en_proceso() {
    request = "Controller/AdminC/AdministrarCliente/consulta_cli_x_num_controller.php";
    cadena = "selectCliente=" + $("#selectCliente").val(); //envio de parametros por POST
    metodo = function (datos) {
        arreglo_datos_cli = $.parseJSON(datos);

//        tmp_dat_cli = arreglo_datos_cli[0];
//
//        $("#inputDir").val(tmp_dat_cli.cli_direccion);
//        $("#inputTele").val(tmp_dat_cli.cli_tel);
//        $("#inputPerContacto").val(tmp_dat_cli.cli_per_cont);
//        $("#inputNumDocCl").val(tmp_dat_cli.cli_num_doc);
//        $("#inputTDocCli").val(tmp_dat_cli.cli_td_id);
//        $("#nombreCliSuc").html(tmp_dat_cli.cli_nombre);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que retorna los datos de sucursal seleccionada para os en proceso
 * @returns {undefined}
 */
function datos_suc_selected_en_proceso() {
    request = "Controller/AdminC/AdministrarSucursal/cons_suc_x_id_os_proceso_controller.php";
    cadena = "selectSuc_x_Cli=" + $("#selectSuc_x_Cli").val(); //envio de parametros por POST
    metodo = function (datos) {
        arreglo_datos_suc = $.parseJSON(datos);

        tmp_dat_suc = arreglo_datos_suc[0];

//        $("#inputDir").val(tmp_dat_suc.suc_direccion);
//        $("#inputTele").val(tmp_dat_suc.suc_telefono);
//        $("#inputPerContacto").val(tmp_dat_suc.suc_nombre);
//        $("#inputNumDocCl").val(tmp_dat_suc.cli_num_doc);
//        $("#inputTDocCli").val(tmp_dat_suc.cli_td_id);
//        $("#inputNumSucu").val(tmp_dat_suc.suc_num_id);
//        $("#nombreCliSuc").html(tmp_dat_suc.suc_nombre);
        $("#blqFinalizado").html('<img src="img/sucursales/' + tmp_dat_suc.suc_num_id + '.png" class="rounded mx-auto d-block" alt=""/>');
        datos_os_picking_en_proceso();
    };
    f_ajax(request, cadena, metodo);
}
var orden_serv;
/**
 * Metodo que retorna los datos de os en proceso picking
 * @returns {undefined}
 */
function datos_os_picking_en_proceso() {
    request = "Controller/AdminC/AdministrarOS/consulta_ult_os_picking_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_datos_os = $.parseJSON(datos);

        tmp_dat_os = arreglo_datos_os[0];
        orden_serv = tmp_dat_os.os_id;
    };
    f_ajax(request, cadena, metodo);
}

/****************************************************************
 * Metodos de gestion envios
 * 
 ****************************************************************/
/**
 * Metodo que carga menu y formulario para gestion de envios
 * @returns {undefined}
 */
function vista_gestionar_envios() {
    request = "View/AdministradorV/AdEnvios/gestion_envios.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html("");
        $("#list-formCliente").html(datos);

        $("#enlAsigMens").click(function () {
            formulario_asig_mens();
            $("#items-env li").removeClass("active");
            $("#itemenlAsigMens").addClass("active");
        });

        $("#enlFormEntregaOp").click(function () {
            tabla_entrega_op();
            $("#items-env li").removeClass("active");
            $("#itemenlFormEntregaOp").addClass("active");
        });

        $("#enlSeguimientoEnv").click(function () {
            seguimiento_estado_env();
            $("#items-env li").removeClass("active");
            $("#itemenlSeguimientoEnv").addClass("active");
        });

        $("#enlSeguimientoAlist").click(function () {
            seguimiento_estado_alist_env();
            $("#items-env li").removeClass("active");
            $("#itemenlSeguimientoAlist").addClass("active");
        });
    };
    f_ajax(request, cadena, metodo);
}

var mensajero = '0|0';
/**
 * Metodo que retorna la vista de asignacion de mensajero a envios
 * @returns {undefined}
 */
function formulario_asig_mens() {
    request = "View/AdministradorV/AdEnvios/asignar_mens.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html(datos);

        combo_empleados("#selectMensajero");

        /**
         * Evento que pagina una tabla 
         */
        table_env_no_asig = $('#tabEnvNoAsig').DataTable({
            'scrollX': true,
            'pageLength': 50
        });

        $("#selectMensajero").change(function () {
            mensajero = $("#selectMensajero").val();
            consulta_tabla_env_mens(mensajero);
        });

        $("#btnSelectMens").click(function () {
            mensajero = $("#selectMensajero").val();
            consulta_tabla_env_mens(mensajero);
        });

        $("#enlTabNoAsig").click(function () {
            $("#tabla_listos_asig").show();
            $("#tab_envios").hide();
        });
        $("#enlTabAsig").click(function () {
            $("#tabla_listos_asig").hide();
            $("#tab_envios").show();
            consulta_tabla_env_mens(mensajero);
        });
        consulta_tabla_env_programados();

        clickAdd_env_mensajero_temp_delete();

        clickAdd_env_mensajero_json();

    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que llena el combo de seleccion empleado
 * @param {type} select
 * @returns {undefined}
 */
function combo_empleados(select) {
    request = "Controller/AdminC/AdministrarEmpleados/consulta_mens_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        datouscombo = '<option value="0|0">Seleccione</option>';
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            datouscombo += '<option value="' + temp.emp_td_id + '|' + temp.emp_num_doc + '">' + temp.emp_nombre + "</option>";
        }
        $(select).html(datouscombo);
    };
    f_ajax(request, cadena, metodo);
}

var arreglo_env_est;

/**
 * Metodo que carga la tabla de envios cargados a mensajero
 * @param {type} value
 * @returns {undefined}
 */
function consulta_tabla_env_mens(value) {
    request = "Controller/AdminC/AdministrarEnvios/consulta_env_x_est_controller.php";
    cadena = "fil=" + value; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_env_est = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_env_est !== 0) {
            datos_env_est = "<div class='table-responsive text-nowrap' id='tablaEstadoEnv'><table class='table table-striped table-sm table-bordered' id='tableEstEnvio'>\n\
                             <thead><tr style='background-color: #9bb5ff'>\n\
                             <th scope='col'></th>\n\
                             <th scope='col'></th>\n\
                             <th scope='col'>GUIA LOGI</th>\n\
                             <th scope='col'>GUIA OP</th>\n\
                             <th scope='col'>$ VALOR</th>\n\
                             <th scope='col'>DIR. DESTINO</th>\n\
                             <th scope='col'>CIUDAD</th>\n\
                             <th scope='col'>OS</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arreglo_env_est.length; i++) {
                tmp = arreglo_env_est[i];

                if (tmp.ts_id == 1) {
                    color_serv = ' #593196;';
                } else if (tmp.ts_id == 2) {
                    color_serv = ' #18d26e;';
                }

                datos_env_est += '<tr class="table-sm" id="fila' + i + '"><td id="' + i + '"></td>';
                datos_env_est += '<td class="enlace"><span class="ion-android-mail gesEnvio" envMens="' + tmp.exe_en_id + '" style="color: ' + color_serv + '"></span></td>';
                datos_env_est += '<td>' + tmp.exe_en_id + '</td>';
                datos_env_est += '<td>' + tmp.en_guia + '</td>';
                datos_env_est += '<td>' + tmp.exe_novedad + '</td>';
                datos_env_est += '<td>' + tmp.en_direccion + '</td>';
                datos_env_est += '<td>' + tmp.en_ciudad + '</td>';
                datos_env_est += '<td>' + tmp.os_id + '</td></tr>';
            }
            datos_env_est += "</tbody></table></div>";
            datos_env_est += '<div>\n\
                                <form class="form-inline form-group-sm mt-2" id="formFlete" name="formFlete"><b>Valor Flete $:</b>\n\
                                    <input class="form-control form-control-sm mr-sm-2" type="number" id="inpValorFlet" name="inpValorFlet" placeholder="$">\n\
                                    <button type="button" class="btn btn-outline-primary btn-sm" id="btnGuardaSelectEnv" name="btnGuardaSelectEnv">GUARDAR $</button>\n\
                                </form></div>';
            datos_env_est += '<div class="toast show border-warning col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">\n\
                              <div class="toast-header"><strong class="mr-auto">Asignación de Estados</strong></div>\n\
                                <form id="formAsigEstEnv" name="formAsigEstEnv">\n\
                                    <div class="form-group row">\n\
                                        <label class="col-sm-2 col-form-label" for="selectEstadEnvio"><b>Estado</b></label>\n\
                                        <div class="col-sm-10">\n\
                                            <select class="form-control form-control-sm" id="selectEstadEnvio" name="selectEstadEnvio">\n\
                                            </select>\n\
                                        </div>\n\
                                    </div>\n\
                                    <div class="form-group row">\n\
                                        <label for="areaNovedad" class="col-sm-2 col-form-label"><b>Novedad</b></label>\n\
                                        <div class="col-sm-10">\n\
                                            <textarea class="form-control form-control-sm" id="areaNovedad" name="areaNovedad" rows="1"></textarea>\n\
                                        </div>\n\
                                    </div>\n\
                                    <button type="button" class="btn btn-outline-warning btn-sm" id="btnGuardaEstSelected" name="btnGuardaEstSelected">GUARDAR EST</button>\n\
                                </form></div><div id="datosprueb"></div>';
            $("#tab_envios").html(datos_env_est);
            /**
             * Evento que pagina una tabla 
             */
            var table = $('#tableEstEnvio').DataTable({
//                'ajax': '/lab/jquery-datatables-checkboxes/ids-arrays.txt',
                'columnDefs': [
                    {
                        'targets': 0,
                        'checkboxes': {
                            'selectRow': true
                        }
                    }
                ],
                'select': {
                    'style': 'multi'
                },
                'order': [[1, 'asc']],
                'scrollX': true,
                'pageLength': 50
            });

            clickGestEnv();

            //**Metodos de formulario asignar valor**//
            $("#btnGuardaSelectEnv").click(function () {
                enviosSelected();
                limpiarFormulario("#formFlete");

            });

            /**evento enter desde elemento input**/
            $("#inpValorFlet").keypress(function (e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 13) {
                    enviosSelected();
                    limpiarFormulario("#formFlete");
                    return false;
                }
            });

            //**Metodos de formulario asignar estado**//
            combo_estado_envio("#selectEstadEnvio");

            $("#btnGuardaEstSelected").click(function () {

//                alert($("#selectEstadEnvio").val());

                if ($("#selectEstadEnvio").val() == 0) {
                    alertify.alert('Debe seleccionar un estado').setHeader('<em> Cuidado! </em> ');
                } else {
                    enviosSelectedEst();
                    limpiarFormulario("#formAsigEstEnv");
                }
            });

        } else {
            $("#tab_envios").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que determina los check seleccionados para asignacion de valor flete 
 * @returns {undefined}
 */
function enviosSelected() {
    json_act_valor = '[';
    $("input:checkbox:checked").each(function () {

        checket_envio = $(this).parent().attr('id');//numeo de fila posicion en el arreglo
//
        if (typeof (checket_envio) === 'undefined') {

        } else {
//            comprobar_os_creada(checket_venta);
//            alert(checket_envio);
            temp_env = arreglo_env_est[checket_envio];

            guiaLogi = temp_env.exe_en_id;
            estadoID = temp_env.exe_ee_id;
            fechaEst = temp_env.exe_fec_hora;
            novedadValor = $("#inpValorFlet").val();

            json_act_valor += '{"id_env":"' + guiaLogi + '","id_est":"' + estadoID + '","fech":"' + fechaEst + '","nov":"' + novedadValor + '"},';

//            actualiza_env_prog(guiaLogi, estadoID, fechaEst, novedadValor);
        }

    });
    json_act_valor_new = json_act_valor.substr(0, json_act_valor.length - 1);
    json_act_valor_new += ']';
    actualiza_env_prog_json(json_act_valor_new);
}

/**
 * Metodo que actualiza novedad de envio en reparto
 * en el campo novedad para repato se almacena el valor del flete
 * @param {type} guia
 * @param {type} estado
 * @param {type} fecha
 * @param {type} novedad
 * @returns {actualiza_env_prog}
 */
function actualiza_env_prog(guia, estado, fecha, novedad) {
    request = "Controller/AdminC/AdministrarEnvios/actualizar_env_prog_val_flete_controller.php";
    cadena = {"guia": guia, "estado": estado, "fecha": fecha, "novedad": novedad}; //envio de parametros por POST
    metodo = function (datos) {

        if (datos == 1) {
            consulta_tabla_env_mens(mensajero);
        } else {
            alert(datos);
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que envia datos de actualizacion a php
 * @param {type} datos_json
 * @returns {actualiza_env_prog_json}
 */
function actualiza_env_prog_json(datos_json) {
    request = "Controller/AdminC/AdministrarEnvios/actualizar_env_prog_val_flet_json_controller.php";
    cadena = "datos=" + datos_json; //envio de parametros por POST
    metodo = function (datos) {

        alertify.success('Envios costeados');
        consulta_tabla_env_mens(mensajero);

    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que determina los check seleccionados para asignacion de estados 
 * @returns {undefined}
 */
function enviosSelectedEst() {
    json_act_est = '[';
    $("input:checkbox:checked").each(function () {

        checket_envio = $(this).parent().attr('id');//numeo de venta
//
        if (typeof (checket_envio) === 'undefined') {

        } else {
//            comprobar_os_creada(checket_venta);
//            alert(checket_envio);
            temp_env = arreglo_env_est[checket_envio];

            guiaLogi = temp_env.exe_en_id;
            estadoID = $("#selectEstadEnvio").val();
            fechaEst = temp_env.exe_fec_hora;
            novedadValor = $("#areaNovedad").val();
//            insert_estado_envio_asig_men(mensajero, guiaLogi, estadoID, novedadValor);

            json_act_est += '{"mens":"' + mensajero + '","id_env":"' + guiaLogi + '","id_est":"' + estadoID + '","nov":"' + novedadValor + '"},';
        }
    });
    json_act_est_new = json_act_est.substr(0, json_act_est.length - 1);
    json_act_est_new += ']';
    insert_estado_envio_asig_men_json(json_act_est_new);
}

/**
 * Metodo que inserta un estado en tabla estados x envio
 * desde la vista de la tabla envios asignados a mensajero
 * @param {type} selectMensajero
 * @param {type} inputNumEnvi
 * @param {type} selectEstado
 * @param {type} txaNovedadEstado
 * @returns {undefined}
 */
function insert_estado_envio_asig_men(selectMensajero, inputNumEnvi, selectEstado, txaNovedadEstado) {
    request = "Controller/AdminC/AdministrarEnvios/insertar_estado_envio_controller.php";
    cadena = {"selectMensajero": selectMensajero, "inputNumEnvi": inputNumEnvi, "selectEstado": selectEstado, "txaNovedadEstado": txaNovedadEstado}; //envio de parametros por POST
    metodo = function (datos) {

        if (datos == 1) {
            consulta_tabla_env_mens(mensajero);
        } else {
            alert(datos);
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que envia datos a php para insertar estados de envio
 * @param {type} datos_act_est
 * @returns {insert_estado_envio_asig_men_json}
 */
function insert_estado_envio_asig_men_json(datos_act_est) {
    request = "Controller/AdminC/AdministrarEnvios/insertar_estado_envio_json_controller.php";
    cadena = "datos_est=" + datos_act_est; //envio de parametros por POST
    metodo = function (datos) {

        alertify.success('Envios actualizados');
        consulta_tabla_env_mens(mensajero);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que envia datos a php para insertar estados de envio
 * @param {type} datos_act_est
 * @returns {insert_estado_envio_asig_men_json}
 */
function insert_estado_envio_recolect_json(datos_act_est) {
    request = "Controller/AdminC/AdministrarEnvios/insertar_estado_envio_json_controller.php";
    cadena = "datos_est=" + datos_act_est; //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            alertify.success('Envios actualizados');
        } else {
            alertify.error('No se actualizo el envio ' + datos);
        }

    };
    f_ajax(request, cadena, metodo);
}

var arreglo_env_prog;
var table_env_prog;
var table_env_no_asig;
/**
 * Metodo que carga la tabla de envios programados
 * @returns {undefined}
 */
function consulta_tabla_env_programados() {
    request = "Controller/AdminC/AdministrarEnvios/consulta_env_prog_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_env_prog = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_env_prog !== 0) {

            datos_env_prog = "<div class='table-responsive text-nowrap'><table class='table table-striped table-sm table-bordered' id='tableEnvProgram'>\n\
                             <thead><tr style='background-color: #9bb5ff'>\n\
                             <th scope='col'></th>\n\
                             <th scope='col'>GUIA LOGI</th>\n\
                             <th scope='col'>GUIA OP</th>\n\
                             <th scope='col'>OS</th>\n\
                             <th scope='col'>DIR. DESTINO</th>\n\
                             <th scope='col'>CIUDAD</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arreglo_env_prog.length; i++) {
                temp = arreglo_env_prog[i];

                if (temp.ts_id == 1) {
                    color_serv = ' #593196;';
                } else if (temp.ts_id == 2) {
                    color_serv = ' #18d26e;';
                }

                datos_env_prog += '<tr class="table-sm DelFil" id="fila_pro' + temp.exe_en_id + '" fil="' + temp.exe_en_id + '"><td class="enlace addEnvio" addEnv="' + temp.exe_en_id + '"><span class="ion-android-add-circle" style="color: ' + color_serv + '"></span></td>';
                datos_env_prog += '<td>' + temp.exe_en_id + '</td>';
                datos_env_prog += '<td>' + temp.en_guia + '</td>';
                datos_env_prog += '<td>' + temp.os_id + '</td>';
                datos_env_prog += '<td>' + temp.en_direccion + '</td>';
                datos_env_prog += '<td>' + temp.en_ciudad + '</td></tr>';
            }
            datos_env_prog += "</tbody></table></div>";
            $("#tab_envios_prog").html(datos_env_prog);

            /**
             * Evento que pagina una tabla 
             */
            table_env_prog = $('#tableEnvProgram').DataTable({
                'scrollX': true,
                'pageLength': 2000
            });

            $('div.dataTables_filter input', table_env_prog.table().container()).focus();

//            table_env_prog.on('search.dt', function () {
//                num_filas = table_env_prog.rows().count();
//                alert(num_filas);
//            });

            $("div#tableEnvProgram_filter input").keyup(function (e) {
                if (e.keyCode == 13) {

                    filtro_in = $('#tableEnvProgram_filter input').val();

                    if (filtro_in.substr(0, 1) == "{" || filtro_in.substr(0, 1) == "[") {
                        dato = $.parseJSON(filtro_in);
                        filtro_in = dato.id;
                        $('#tableEnvProgram_filter input').val(filtro_in);
                        e = $.Event('keyup');
                        e.keyCode = 13; // enter
                        $('#tableEnvProgram_filter input').trigger(e);
                    } else {
                        if (filtro_in === "" || filtro_in === null) {
                            alert("No ha seleccionado un filtro valido");
//                        alertify.alert('No ha seleccionado un filtro valido').setHeader('<em> Cuidado! </em> ');
                        } else {

                            num_filas = $("#tableEnvProgram").dataTable()._('tr', {"filter": "applied"});
                            id = "'" + num_filas[0] + "'";//cadena de texto con la información de la fila separado por comas
                            faccion = id.split(',');
                            guia_enter = faccion[1];

                            if (guia_enter === undefined) {
                                alert("No se encontraron resultados");
                            } else {
                                //reset del campo de busqueda y despliegue de tabla
                                table_env_prog.search("").draw();
                                $("div#tableEnvProgram_filter input").val("");
//                            alert(guia_enter);

                                if (mensajero === undefined || mensajero === '0|0') {
                                    alertify.alert('Debe seleccionar un mensajero').setHeader('<em> Cuidado! </em> ');
                                } else {
//                                    insertar_env_prog(guia_enter, mensajero);
////                                consulta_tabla_env_mens(mensajero);
//                                    $('#fila_pro' + guia_enter + '').remove();
//                                    alertify.success('Envio Guia Logi N° ' + guia_enter + ' cargado');
//                                    index_row = table_env_prog.row('#fila_pro' + guia_enter).index();
                                    envios.push(guia_enter);

                                    var row = table_env_prog.row($('#fila_pro' + guia_enter));
                                    var rowNode = row.node();
                                    row.remove();

                                    table_env_no_asig
                                            .row.add(rowNode)
                                            .draw();
                                    alertify.success('Envio Guia Logi N° ' + guia_enter + ' agregado');

//                                    table_env_prog.row(':eq(' + index_row + ')').remove().draw();

                                }
                            }

                        }
//                        consulta_tabla_env_programados();
                    }
                }
            });

//            clickAdd_env_mensajero();
            clickAdd_env_mensajero_temp();

//            clickElim_fila();
        } else {
            $("#tab_envios_prog").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que recorre el arreglo para asignacion de envios a mensajero 
 * @returns {undefined}
 */
function enviosInArray() {
    json_env_tmp = '[';

    for (var i = 0; i < envios.length; i++) {
        json_env_tmp += '{"id_env":"' + envios[i] + '","mens":"' + mensajero + '"},';
    }

    json_env_tmp_new = json_env_tmp.substr(0, json_env_tmp.length - 1);
    json_env_tmp_new += ']';
//    alert(json_env_tmp_new);
    insertar_env_prog_json(json_env_tmp_new);

}
/**
 * Metodo que carga envio a mensajero
 * @returns {undefined}
 */
function clickAdd_env_mensajero() {
    $("#tableEnvProgram").on("click", ".addEnvio", function () {
//    $(".actuestos").click(function () {
        add_envio = $(this).attr("addEnv");
        if (mensajero === undefined || mensajero === '0|0') {
            alertify.alert('Debe seleccionar un mensajero').setHeader('<em> Cuidado! </em> ');
        } else {
            insertar_env_prog(add_envio, mensajero);
//        $('#ModalActuEstOS').modal('toggle');
            alertify.success('Envio Guia Logi N° ' + add_envio + ' cargado');
            //reset del campo de busqueda y despliegue de tabla
//            table_env_prog.search("").draw();
            consulta_tabla_env_programados();
            $("div#tableEnvProgram_filter input").val("");
        }
//        form_act_est_os(arreglo_env_prog, add_envio);
    });
}
/**
 * Metodo que carga envio a mensajero
 * @returns {undefined}
 */
function clickAdd_env_mensajero_json() {
//    $("#tableEnvProgram").on("click", ".addEnvio", function () {
    $("#btnAddEnviosMens").click(function () {
        if (mensajero === undefined || mensajero === '0|0') {
            alertify.alert('Debe seleccionar un mensajero').setHeader('<em> Cuidado! </em> ');
        } else {
            enviosInArray();
        }
//        form_act_est_os(arreglo_env_prog, add_envio);
    });
}
var envios = [];

/**
 * Metodo que mueve los envios a la tabla temporal de asignacion
 * @returns {undefined}
 */
function clickAdd_env_mensajero_temp() {
    $("#tableEnvProgram").on("click", ".addEnvio", function () {
//    $(".actuestos").click(function () {
        add_envio = $(this).attr("addEnv");

        envios.push(add_envio);


        var row = table_env_prog.row($(this).parents('tr'));
        var rowNode = row.node();
        row.remove();

        table_env_no_asig
                .row.add(rowNode)
                .draw();
        alertify.success('Envio Guia Logi N° ' + add_envio + ' agregado');
//        console.log(envios);
    });
}
/**
 * Metodo que devuelve un envio a tabla programados desde la tabla de asignacion temporal
 * @returns {undefined}
 */
function clickAdd_env_mensajero_temp_delete() {
    $("#tabEnvNoAsig").on("click", ".addEnvio", function () {
//    $(".actuestos").click(function () {
        delete_envio = $(this).attr("addEnv");
        ubicado = envios.indexOf(delete_envio);
        envios.splice(ubicado, 1);


        var row = table_env_no_asig.row($(this).parents('tr'));
        var rowNode = row.node();
        row.remove();

        table_env_prog
                .row.add(rowNode)
                .draw();
        alertify.warning('Envio Guia Logi N° ' + delete_envio + ' devuelto');
//        console.log(envios);
        index_row = table_env_no_asig.row('#fila_pro' + delete_envio).index();
        table_env_no_asig.row(':eq(' + index_row + ')').remove().draw();
    });
}
var fil_delete;
/**
 * Metodo que elimina en la vista la fila cargada a mensajero
 * @returns {undefined}
 */
function clickElim_fila() {
    $("#tableEnvProgram").on("click", ".DelFil", function () {
//    $(".actuestos").click(function () {
        fil_delete = $(this).attr("fil");
    });
}


/**
 * Metodo que guarda asignacion de envio programado a mensajero
 * @param {type} guia
 * @param {type} mensajero
 * @returns {undefined}
 */
function insertar_env_prog(guia, mensajero) {
    request = "Controller/AdminC/AdministrarEnvios/insertar_est_prog_controller.php";
    cadena = {"guia": guia, "mensajero": mensajero}; //envio de parametros por POST
    metodo = function (datos) {

        if (mensajero === undefined || mensajero === '0|0') {

        } else {
            $('#fila_pro' + fil_delete + '').remove();
            consulta_tabla_env_mens(mensajero);
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que guarda asignacion de envio programado a mensajero desde datos json
 * @param {type} data
 * @returns {undefined}
 */
function insertar_env_prog_json(data) {
    request = "Controller/AdminC/AdministrarEnvios/insertar_est_prog_json_controller.php";
    cadena = "data_json=" + data; //envio de parametros por POST
    metodo = function (datos) {

        alertify.success('Envios actualizados');
        consulta_tabla_env_mens(mensajero);
        table_env_no_asig.clear().draw();
        envios = [];
        consulta_tabla_env_programados();
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que carga el modal con formulario para seleccion de producto en alistamiento 
 * @returns {undefined}
 */
function clickGestEnv() {
    $("#tablaEstadoEnv").on("click", ".gesEnvio", function () {
//    $(".gesEnvio").click(function () {
        ges_envio = $(this).attr("envMens");
//        consulta_prod_alist(edit_prod);
//        edit_prod = $(this).attr("id");
        viasta_envio_modal(ges_envio);
//        alert(ges_envio);
        $('#mod-dalog').removeClass('modal-lg');
        $('#ModalActuEstOS').modal('toggle');
        $('#ModalEstOSTitle').html('ENVIO');
        $('#body_mod_os').html('<div class="alert alert-dismissible alert-secondary">\n\
                    <div class="row">\n\
                        <div class="col-6"><strong>N° ENVIO: <b class="text-primary" id="numEnvio"></b></strong></div>\n\
                        <div class="col-6"><strong>N° GUIA OP: <b class="text-success" id="numGuiaOP"></b></strong></div>\n\
                    </div>\n\
            <form class="mt-3" id="formModalEnvAsig" name="formModalEnvAsig">\n\
              <div class="form-row">\n\
                <div class="form-group input-group col-md-12">\n\
                  <div class="input-group">\n\
                  <input type="text" class="form-control" id="inputNumEnvi" name="inputNumEnvi" style="display: none;">\n\
                  <input type="text" class="form-control" id="inputEst_x_env" name="inputEst_x_env" style="display: none;">\n\
                  <input type="datetime" class="form-control" id="inputFechaEstEnv" name="inputFechaEstEnv" style="display: none;">\n\
                </div>\n\
                </div>\n\
              </div>\n\
              <div class="form-group">\n\
                <label for="inputNomDestin">Destinatario</label>\n\
                <input type="text" class="form-control form-control-sm" id="inputNomDestin" name="inputNomDestin" readonly>\n\
              </div>\n\
              <div class="form-row">\n\
                <div class="form-group input-group col-md-7">\n\
                  <label for="inputDirecDestin">Dirección Destino</label>\n\
                  <div class="input-group">\n\
                   <input type="text" class="form-control form-control-sm" id="inputDirecDestin" name="inputDirecDestin" readonly>\n\
                </div>\n\
                </div>\n\
                <div class="form-group col-md-5">\n\
                  <label for="inputTelDestin">Tel.</label>\n\
                  <input type="text" class="form-control form-control-sm" id="inputTelDestin" name="inputTelDestin" readonly>\n\
                </div>\n\
              </div>\n\
              <div class="form-row">\n\
                <div class="form-group col-md-3">\n\
                  <label for="inputPesoEnv">Peso</label>\n\
                  <input type="text" class="form-control form-control-sm" id="inputPesoEnv" name="inputPesoEnv" readonly>\n\
                </div>\n\
                <div class="form-group col-md-3">\n\
                  <label for="inputAltoEnv">Alto</label>\n\
                  <input type="text" class="form-control form-control-sm" id="inputAltoEnv" name="inputAltoEnv" readonly>\n\
                </div>\n\
                <div class="form-group col-md-3">\n\
                  <label for="inputAnchoEnv">Ancho</label>\n\
                  <input type="text" class="form-control form-control-sm" id="inputAnchoEnv" name="inputAnchoEnv" readonly>\n\
                </div>\n\
                <div class="form-group col-md-3">\n\
                  <label for="inputLargoEnv">Largo</label>\n\
                  <input type="text" class="form-control form-control-sm" id="inputLargoEnv" name="inputLargoEnv" readonly>\n\
                </div>\n\
              </div>\n\
              <button type="submit" class="btn btn-success" id="btnImpRemesa" name="btnImpRemesa">Imprimir Guia</button>\n\
              <button type="button" class="btn btn-danger float-right" id="btnQuitarAsig" name="btnQuitarAsig">Devolver a Bodega</button>\n\
            </form>\n\
            <div id="enlaceGuia"></div>');

        $("#btnImpRemesa").click(function () {
            validarEnvioAsignado();
        });
        $("#btnQuitarAsig").click(function () {
            eliminar_env_asignado(id_est_asig, num_env_asig, fech_env_asig);
        });
    });
}

var num_env_asig;
var id_est_asig;
var fech_env_asig;

/**
 * Metodo que retorna a la vista los datos de un envio especifico
 * @param {type} envio_id
 * @returns {undefined}
 */
function viasta_envio_modal(envio_id) {
    request = "Controller/AdminC/AdministrarEnvios/consulta_env_x_id_controller.php";
    cadena = "env_id=" + envio_id; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        temp_env = arreglo[0];

//        alert(datos);

        $("#numEnvio").html(temp_env.en_id);
        $("#numGuiaOP").html(temp_env.en_guia);
        $("#inputNumEnvi").val(temp_env.en_id);
        $("#inputEst_x_env").val(temp_env.ee_id);
        $("#inputFechaEstEnv").val(temp_env.exe_fec_hora);
        $("#inputNomDestin").val(temp_env.en_nombre);
        $("#inputDirecDestin").val(temp_env.en_direccion);
        $("#inputTelDestin").val(temp_env.en_telefono);
        $("#inputPesoEnv").val(temp_env.en_peso);
        $("#inputAltoEnv").val(temp_env.en_alto);
        $("#inputAnchoEnv").val(temp_env.en_ancho);
        $("#inputLargoEnv").val(temp_env.en_largo);

        num_env_asig = $("#inputNumEnvi").val();
        id_est_asig = $("#inputEst_x_env").val();
        fech_env_asig = $("#inputFechaEstEnv").val();

    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que elimina envio asignado a mensajero
 * @param {type} estado
 * @param {type} num_envio
 * @param {type} fecha
 * @returns {eliminar_env_asignado}
 */
function eliminar_env_asignado(estado, num_envio, fecha) {
    request = "Controller/AdminC/AdministrarEnvios/eliminar_est_envio_controller.php";
    cadena = {"inputEstId": estado, "inputEnvId": num_envio, "inputFechaEst": fecha}; //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        if (datos == 1) {
            $('#ModalActuEstOS').modal('hide');
            consulta_tabla_env_mens(mensajero);
            consulta_tabla_env_programados();
            alertify.warning('Envio eliminado en la lista del mensajero!');
        } else {
            alertify.error('Error al regresar envio a Bodega!');
        }

    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que retorna la vista de seguimiento de envios
 * @returns {undefined}
 */
function seguimiento_estado_env() {
    request = "View/AdministradorV/AdEnvios/seguimiento_estados_env.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html(datos);
        $("#btnBuscaEnv").click(function () {
            validarBuscarNumEnvio(datos_envio_seg);
        });
        $("#btnBuscaEnvGuiaOp").click(function () {
            validarBuscarNumEnvioOp(datos_envio_seg_op);
        });
//        botones_seg_os();
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que retorna la vista de seguimiento de envios en alistamiento
 * @returns {undefined}
 */
function seguimiento_estado_alist_env() {
    request = "View/AdministradorV/AdEnvios/seguimiento_est_alist_env.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html(datos);
        $("#btnBuscaEnvAlst").click(function () {
            validarBuscarNumVenta(datos_seg_alist);
        });
        $("#btnBuscaEnvAlstGuiaOp").click(function () {
            validarBuscarNumGuiaOp(datos_seg_alist_op);
        });
//        botones_seg_os();
    };
    f_ajax(request, cadena, metodo);
}

/****************************************************************
 * Metodos de tabla empleados
 * 
 ****************************************************************/

/**
 * Metodo que carga el form para guardar clientes
 * @returns {undefined}
 */
function vista_form_Nuevo_Edit_Emp() {
    request = "View/AdministradorV/AdEmpleados/form_nuevo_emp.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html("");
        $("#list-formCliente").html(datos);
        combo_tipo_docum();
        combo_cargo();

        $("#btnCancelarEmp").click(function () {
            resetFormEmpleado();
        });
        $("#btnGuardaEmp").click(function () {
            validarGuardaEmp();
        });

        tablaGeneralEmpleadosActivos();

    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que llena el combo de seleccion cargo
 * @returns {undefined}
 */
function combo_cargo() {
    request = "Controller/AdminC/AdministrarEmpleados/consulta_cargo_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo = $.parseJSON(datos);
        dato_combo_carg = '<option value="0">Seleccione</option>';
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            dato_combo_carg += '<option value="' + temp.car_id + '">' + temp.car_nombre + "</option>";
        }
        $("#selectTipCargo").html(dato_combo_carg);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que permite resetear el formulario Empleado
 * @returns {undefined}
 */
function resetFormEmpleado() {
    limpiarFormulario("#formEmpleado");
    $("#selectTipDoc").html("");
    combo_tipo_docum();
    $("#selectTipCargo").html("");
    combo_cargo();
    $("#selectTipDoc").prop("disabled", false);
    $("#inputNumEmp").prop("disabled", false);
    $("#menCliNoAccess").html("");
}
/**
 * Metodo que permite validar formulario de ingreso de Empleado
 * @returns {undefined}
 */
function validarGuardaEmp() {
    $("#formEmpleado").validate({
        rules: {
            inputNomEmp: {
                required: true
            },
            inputNumEmp: {
                required: true,
                digits: true
            },
            selectTipDoc: {
                valueNotEquals: "0"
            },
            selectTipCargo: {
                valueNotEquals: "0"
            }
        },
        submitHandler: function (form) {
            inserta_empleado();
        }
    });
}
/**
 * Metodo que guarda un registro en la tabla empleado
 * @returns {undefined}
 */
function inserta_empleado() {
    request = "Controller/AdminC/AdministrarEmpleados/insertar_empleado_controller.php";
    cadena = $("#formEmpleado").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            alertify.success('Registro Guardado, Usuario Autorizado!');
            resetFormEmpleado();
//            arregloCli.length = 0;
        } else if (datos == 3) {
            alertify.warning('Registro Guardado pero el usuario NO fue Autorizado!');
            resetFormEmpleado();
//            arregloCli.length = 0;
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
function tablaGeneralEmpleadosActivos() {
    request = "Controller/AdminC/AdministrarEmpleados/consulta_emp_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arregloEmpleadosAct = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEmpleadosAct !== 0) {
            datos_emp = '<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">\n\
                            <div class="toast-header">\n\
                            <strong class="mr-auto" id="title_env_est">TABLA GENERAL DE EMPLEADOS LOGI</strong>\n\
                            </div>\n\
                            <div class="toast-body">\n\
                            <div class="table-responsive text-nowrap col-lg-12" id="tbInfoEstEnv">\n\
                            <table class="table table-striped table-sm table-bordered" id="tableEmpLogi">\n\
                            <thead><tr class="table-primary">\n\
                                <th scope="col">N° DOC</th>\n\
                                <th scope="col">NOMBRE</th>\n\
                                <th scope="col">CELULAR</th>\n\
                                <th scope="col">EMAIL</th>\n\
                                <th scope="col">CARGO</th>\n\
                                </tr></thead><tbody>';
            for (i = 0; i < arregloEmpleadosAct.length; i++) {
                tmp = arregloEmpleadosAct[i];
                datos_emp += '<tr class="table-sm" id="fila' + i + '">';
                datos_emp += '<td>' + tmp.emp_num_doc + '</td>';
                datos_emp += '<td>' + tmp.emp_nombre + '</td>';
                datos_emp += '<td>' + tmp.emp_cel + '</td>';
                datos_emp += '<td>' + tmp.emp_email + '</td>';
                datos_emp += '<td>' + tmp.car_nombre + '</td></tr>';
            }
            datos_emp += "</tbody></table>";
            $("#tabEmpActivos").html(datos_emp);
            /**
             * Evento que pagina una tabla 
             */

            $('#tableEmpLogi').DataTable();
        } else {
            $("#tableEmpLogi").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}


var arreglo_hist_est_aenv;
/**
 * Metodo que carga a la vista la tabla general de los envios pendientes por entregar a operador
 * en estado 2 packing 
 * @returns {tabla_productos_suc}
 */
function tabla_entrega_op() {
    request = "Controller/AdminC/AdministrarEnvios/consulta_aenv_paking_controller.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        arreglo_hist_est_aenv = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_hist_est_aenv !== 0) {
            datos_aenv_est = '<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;"><div class="toast-header"><strong class="mr-auto">ENVIOS PARA ENTREGA OP</strong></div>\n\
                             <div class="toast-body row"><div class="alert alert-dismissible alert-secondary col-lg-12" style="border-radius: 0.5rem;">\n\
                             <h4>Tabla General de Envios Alistamiento</h4>\n\
                             <div class="col-lg-12 table-responsive" id="tabProdGen">\n\
                             <table class="table table-striped table-sm table-bordered table-hover col-lg-12" id="tableEntragaOp">\n\
                             <thead><tr class="table-sm table-primary">\n\
                                 <th scope="col"></th>\n\
                                 <th scope="col">COD ALIST</th>\n\
                                 <th scope="col">FECHA</th>\n\
                                 <th scope="col">GUIA</th>\n\
                                 <th scope="col">VENTA</th>\n\
                                 <th scope="col">ESTADO</th>\n\
                                 <th scope="col">OPERADOR</th>\n\
                                 <th scope="col">CLIENTE</th>\n\
                                 <th scope="col">SUCURSAL</th>\n\
                             </tr></thead><tbody>';
            for (i = 0; i < arreglo_hist_est_aenv.length; i++) {
                tmp = arreglo_hist_est_aenv[i];

                datos_aenv_est += '<tr class="table-sm" id="fila' + i + '">';
                datos_aenv_est += '<td id="' + i + '"></td>';
                datos_aenv_est += '<td>' + tmp.aen_id + '</td>';
                datos_aenv_est += '<td>' + tmp.exae_fecha_hora + '</td>';
                datos_aenv_est += '<td>' + tmp.aen_guia_op + '</td>';
                datos_aenv_est += '<td>' + tmp.aen_venta + '</td>';
                datos_aenv_est += '<td>' + tmp.esae_desc + '</td>';
                datos_aenv_est += '<td>' + tmp.ope_nombre + '</td>';
                datos_aenv_est += '<td>' + tmp.cli_nombre + '</td>';
                datos_aenv_est += '<td>' + tmp.suc_nombre + '</td></tr>';
            }
            datos_aenv_est += '</tbody><tfoot><tr class="table-primary">\n\
                        <th></th>\n\
                        <th>COD ALIST</th>\n\
                        <th>FECHA</th>\n\
                        <th>GUIA</th>\n\
                        <th>VENTA</th>\n\
                        <th>ESTADO</th>\n\
                        <th>OPERADOR</th>\n\
                        <th>CLIENTE</th>\n\
                        <th>SUCURSAL</th>\n\
                    </tr></tfoot></table></div></div></div>';
            datos_aenv_est += '<div class="row p-3">\n\
                                <form class="form-inline form-group mt-2 col-lg-12" id="formEntregaAEnv" name="formEntregaAEnv">\n\
                                    <b>Observación:</b>\n\
                                    <textarea class="form-control form-control-sm mr-sm-2 col-6" id="inpObsEstAEnv" name="inpObsEstAEnv" rows="1"></textarea>\n\
                                    <button type="button" class="btn btn-outline-primary btn-sm" id="btnGuardaEntrega" name="btnGuardaEntrega">ENTREGAR</button>\n\
                                </form></div></div>';
            $("#list-formCliente").html(datos_aenv_est);

            /**
             * Evento que pagina muestra cuadro de busqueda para cada colunna 
             */
            $('#tableEntragaOp thead tr').clone(true).appendTo('#tableEntragaOp thead');
            $('#tableEntragaOp thead tr:eq(1) th').each(function (i) {
                var title = $(this).text();
                if (i == 0) {
                    $(this).html('');
                } else if (i == 1) {
                    $(this).html('<input type="text" placeholder="' + title + '" size="6">');
                } else if (i == 2) {
                    $(this).html('<input type="text" placeholder="' + title + '" size="15">');
                } else if (i == 3) {
                    $(this).html('<input type="text" placeholder="' + title + '" size="9">');
                } else if (i == 4) {
                    $(this).html('<input type="text" placeholder="' + title + '" size="9">');
                } else if (i == 5) {
                    $(this).html('<input type="text" placeholder="' + title + '" size="10">');
                } else if (i == 6) {
                    $(this).html('<input type="text" placeholder="' + title + '" size="15">');
                } else if (i == 7) {
                    $(this).html('<input type="text" placeholder="' + title + '" size="20">');
                } else if (i == 8) {
                    $(this).html('<input type="text" placeholder="' + title + '" size="20">');
                }
//                $(this).html('<input type="text" id="inp' + i + '" placeholder="' + title + '"/>');

                $('input', this).on('keyup change', function () {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });

            /**
             * Evento que pagina una tabla 
             */
            var table = $('#tableEntragaOp').DataTable({
                orderCellsTop: true,
                fixedHeader: true,
                'columnDefs': [
                    {
                        'targets': 0,
                        'checkboxes': {
                            'selectRow': true
                        }
                    }
                ],
                'select': {
                    'style': 'multi'
                },
                'order': [[1, 'asc']],
                'scrollX': true,
                'pageLength': 20
            });

            /**
             * evento de click para entrega de envios seleccionados
             */
            $("#btnGuardaEntrega").click(function () {
                enviosAlistSelected();
                limpiarFormulario("#formEntregaAEnv");

            });

        } else {
            $("#list-formCliente").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que determina los check seleccionados para actualizacion de estado operador
 * @returns {undefined}
 */
function enviosAlistSelected() {
    json_act_est = '[';
    $("input:checkbox:checked").each(function () {

        checket_envio = $(this).parent().attr('id');//numeo de fila posicion en el arreglo
//
        if (typeof (checket_envio) === 'undefined') {

        } else {
//            comprobar_os_creada(checket_venta);
//            alert(checket_envio);
            temp_aenv = arreglo_hist_est_aenv[checket_envio];

            guiaLogi = temp_aenv.aen_id;
            estadoID = 3;
            novedad = $("#inpObsEstAEnv").val();
//            actualiza_est_aenv_entrega(guiaLogi, estadoID, novedad);
            json_act_est += '{"id_aenv":"' + guiaLogi + '","id_est":"' + estadoID + '","nov":"' + novedad + '"},';
        }
    });
    json_act_est_new = json_act_est.substr(0, json_act_est.length - 1);
    json_act_est_new += ']';
    actualiza_est_aenv_entrega_json(json_act_est_new);
}

/**
 * Metodo que actualiza estado de aenvio al entregar a operador
 * @param {type} guia
 * @param {type} estado
 * @param {type} novedad
 * @returns {undefined}
 */
function actualiza_est_aenv_entrega(guia, estado, novedad) {
    request = "Controller/AdminC/AdministrarEnvios/insertar_est_aenv_obj_controller.php";
    cadena = {"guia": guia, "estado": estado, "novedad": novedad}; //envio de parametros por POST
    metodo = function (datos) {

        if (datos == 1) {
            tabla_entrega_op();
        } else {
            alert(datos);
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que actualiza estado de aenvio al entregar a operador obj json
 * @param {type} datos_json
 * @returns {undefined}
 */
function actualiza_est_aenv_entrega_json(datos_json) {
    request = "Controller/AdminC/AdministrarEnvios/insertar_est_aenv_obj_json_controller.php";
    cadena = "dat_aenv=" + datos_json; //envio de parametros por POST
    metodo = function (datos) {

        alertify.success('Envios Entregados');
        tabla_entrega_op();

    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que carga form para carga masiva de pruebas de entrega
 * @returns {undefined}
 */
function vista_form_carga_pruebas() {
    request = "View/AdministradorV/AdEnvios/form_carga_pruebas.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html("");
        $("#list-formCliente").html(datos);

        nameFileCargaPruebas();

        $("#btnGuardarPruebas").click(function () {
            validarPrebasEntrega();
        });

    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga form para carga masiva de pruebas de entrega
 * @returns {undefined}
 */
function vista_form_editar_env() {
    request = "View/AdministradorV/AdEnvios/form_edit_envios.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html("");
        $("#list-formCliente").html(datos);
        combo_ciudad("#selectCiuRemite");
        combo_tipo_envio("#selectTipoEnvi");
        combo_tipo_serv("#selectTipoServi");

//        nameFileCargaPruebas();
//
        $("#btnBuscaGuia").click(function () {
            arregloEnvEdit = "";
            limpiarFormulario("#formEditEnvio");
            $("#contDetalle").html("");
            validarGuiaBuscar();
        });
        $("#btnGuardarCambio").click(function () {
            validarGuardaCambiosEnv();
        });

        $("#btnDetalle").click(function () {

            if (arregloEnvEdit.length === 0) {
                alertify.alert("No hay datos de envio para buscar").setHeader('<em> Cuidado! </em> ');
            } else {
                temp = arregloEnvEdit[0];
                if (temp.en_id == "" || temp.en_id == 0) {
                    alertify.alert("No hay datos de envio para buscar").setHeader('<em> Cuidado! </em> ');
                } else {
                    consulta_env_detalle(temp.en_id);
                }
            }


        });

    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que plasma nombre archivo en carga masiva envios documentos
 * @returns {undefined}
 */
function nameFileCargaPruebas() {
    $("#inpFileMasPruebas").change(function () {
        if ($("#inpFileMasPruebas").get(0).files.length !== 0) {
            $("#inpFileMasPruebas").addClass("is-valid");
            $("#textFileMasPruebas").addClass("text-success");
            $("#textFileMasPruebas").text("Archivos listos para cargar");
        } else {
            $("#inpFileMasPruebas").removeClass("is-valid");
            $("#textFileMasPruebas").removeClass("text-success");
            $("#textFileMasPruebas").text("No se han seleccionado archivos...");
        }
    });
}

var arregloEnvEdit;
/**
 * Metodo que retorna datos de envio a editar
 * @returns {undefined}
 */
function consulta_env_editar() {
    request = "Controller/AdminC/AdministrarEnvios/cons_envio_editar_controller.php";
    cadena = $("#formBuscarEnv").serialize(); //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);

        arregloEnvEdit = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEnvEdit !== 0) {
            tmp_env_edit = arregloEnvEdit[0];

            $("#inputNumGuiaLogi").val(tmp_env_edit.en_id);
            $("#inputNumGuiaLogi").prop("readonly", true);
            $("#inputNumOs").val(tmp_env_edit.os_id);
            $("#inputNumOs").prop("readonly", true);
            $('#selectTipoServi option[value="' + tmp_env_edit.ts_id + '"]').attr('selected', true);
            $('#selectTipoEnvi option[value="' + tmp_env_edit.te_id + '"]').attr('selected', true);
            $("#inputGuiaOp").val(tmp_env_edit.en_guia);
            $("#inputObservServi").val(tmp_env_edit.os_observacion);
            $("#inputRecaudo").val(tmp_env_edit.en_recaudo);
            $("#inputValorDecl").val(tmp_env_edit.en_valor_decl);
            $("#inputValPago").val(tmp_env_edit.en_valor_pago);
            $("#inputContenido").val(tmp_env_edit.en_contiene);
            $("#inputObservEnvio").val(tmp_env_edit.en_novedad);
            $("#inputNombreRemite").val(tmp_env_edit.cli_nombre);
            $("#inputDirRemite").val(tmp_env_edit.os_direccion);
            $("#inputTeleRemite").val(tmp_env_edit.os_tel_cont);
            $('#selectCiuRemite option[value="' + tmp_env_edit.ciu_id + '"]').attr('selected', true);
            $("#inputNombreDestino").val(tmp_env_edit.en_nombre);
            $("#inputDirDestino").val(tmp_env_edit.en_direccion);
            $("#inputTeleDestino").val(tmp_env_edit.en_telefono);
            $("#inputCiudDestino").val(tmp_env_edit.en_ciudad);
            $("#inputDptoDestino").val(tmp_env_edit.en_departamento);

        } else {
            alertify.alert("El numero ingresado no se encuentra en la Base de Datos").setHeader('<em> Cuidado! </em> ');
            limpiarFormulario("#formEditEnvio");
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo de validacion de carga pruebas de entrega
 * @returns {undefined}
 */
function validarPrebasEntrega() {
    $("#formCargaPruebas").validate({
        errorLabelContainer: '#errorTxt',
        rules: {
            'inpFileMasPruebas[]': {
                required: true
            }
        },
        messages: {
            'inpFileMasPruebas[]': {
                required: "CAMPO REQUERIDO"
            }
        },
        submitHandler: function (form) {
            cargaPruebasEntregaFile();
        }
    });
}
/**
 * Metodo de validacion de busqueda guia
 * @returns {undefined}
 */
function validarGuiaBuscar() {
    $("#formBuscarEnv").validate({
        errorLabelContainer: '#errorTxt',
        rules: {
            inputNumGuia: {
                required: true
            }
        },
        submitHandler: function (form) {
            consulta_env_editar();
        }
    });
}
/**
 * Metodo de validacion de guardado de cambios en envio y os
 * @returns {undefined}
 */
function validarGuardaCambiosEnv() {
    $("#formEditEnvio").validate({
        rules: {
            inputNumGuiaLogi: {
                required: true
            },
            inputNumOs: {
                required: true
            },
            inputDirRemite: {
                required: true
            },
            inputNombreDestino: {
                required: true
            },
            inputDirDestino: {
                required: true
            },
            inputCiudDestino: {
                required: true
            },
            inputDptoDestino: {
                required: true
            }
        },
        submitHandler: function (form) {
            actualizarEnvDatosGuia();
        }
    });
}
/**
 * Metodo de validacion formulario de actualizacion detalle envios
 * @returns {undefined}
 */
function validarGuardaCambiosEnvDet() {

    $("#formDetalleEnvEdit").validate({
        submitHandler: function (form) {
            actualizarDetalleEnvios();
        }
    });
}

/**
 * Metodo que actualiza datos de una orden de servicio
 * @returns {undefined}
 */
function actualizarEnvDatosGuia() {
    request = "Controller/AdminC/AdministrarEnvios/actualizar_envio_dat_guia_controller.php";
    cadena = $("#formEditEnvio").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        if (datos == 1) {
            alertify.success('Envio Actualizado!!');
            arregloEnvEdit = "";
            limpiarFormulario("#formEditEnvio");
            $("#contDetalle").html("");
        } else {
            alertify.error('No se pudo realizar la Actualización! ' + datos);
//            alert(datos);
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que actualiza datos de una orden de servicio
 * @returns {undefined}
 */
function actualizarDetalleEnvios() {
    request = "Controller/AdminC/AdministrarEnvios/actualizar_det_env_controller.php";
    cadena = $("#formDetalleEnvEdit").serialize(); //envio de parametros por POST
    metodo = function (datos) {

        if (datos == 1) {
            alertify.success('Detalles de Envio Actualizado!!');
            arregloEnvEdit = "";
            limpiarFormulario("#formEditEnvio");
            $("#contDetalle").html("");
        } else {
            alertify.error('No se pudo realizar la Actualización! ' + datos);
            alert(datos);
            $("#datDetControl").html(datos);
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que retorna detalle de envio
 * @param {type} num_guia
 * @returns {undefined}
 */
function consulta_env_detalle(num_guia) {
    request = "Controller/AdminC/AdministrarEnvios/cons_detalle_envio_controller.php";
    cadena = {"NumGuiaLogi": num_guia}; //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);

        arregloEnvDet = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEnvDet !== 0) {
            items = arregloEnvDet.length;
            dat_det = '<form id="formDetalleEnvEdit">\n\
                <fieldset>\n\
                    <div class="alert alert-dismissible alert-primary col-lg-12 border-light" style="border-radius: 0.5rem;">\n\
                        <div class="toast show border-primary" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">\n\
                            <div class="toast-body row">\n\
                                <div id="parentSec">\n\
                                    <div id="sec" class="row px-3">\n\
                                <input type="number" class="form-control form-control-sm" id="inputCuenta" name="inputCuenta" value="' + items + '" style="display: none;">\n\
                                <input type="number" class="form-control form-control-sm" id="inputNumEnvLogi" name="inputNumEnvLogi" value="' + num_guia + '" style="display: none;">';
            for (i = 0; i < arregloEnvDet.length; i++) {
                tmp = arregloEnvDet[i];

                dat_det += '<div class="form-group form-group-sm col-lg-3">\n\
                                <input type="number" class="form-control form-control-sm" id="inputItemId' + i + '" name="inputItemId' + i + '" value="' + tmp.id + '" style="display: none;">\n\
                                <label for="inputCantidadEnv' + i + '">Cantidad</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputCantidadEnv' + i + '" name="inputCantidadEnv' + i + '" value="' + tmp.det_cantidad + '" required>\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-3">\n\
                                <label for="inputPeso' + i + '">Peso Kg  / x und</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputPeso' + i + '" name="inputPeso' + i + '" value="' + tmp.det_peso + '" required>\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-2">\n\
                                <label for="inputAlto' + i + '">Alto cm  / x und</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputAlto' + i + '" name="inputAlto' + i + '" value="' + tmp.det_alto + '" required>\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-2">\n\
                                <label for="inputAncho' + i + '">Ancho cm  / x und</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputAncho' + i + '" name="inputAncho' + i + '" value="' + tmp.det_ancho + '" required>\n\
                            </div>\n\
                            <div class="form-group form-group-sm col-lg-2">\n\
                                <label for="inputLargo' + i + '">Largo cm  / x und</label>\n\
                                <input type="number" class="form-control form-control-sm" id="inputLargo' + i + '" name="inputLargo' + i + '" value="' + tmp.det_largo + '" required>\n\
                            </div>';
            }
            dat_det += '<div class="form-group col-lg-12 mr-auto">\n\
                                            <button type="submit" class="btn btn-warning" id="btnGuardaCambioDet" name="btnGuardaCambioDet"><strong>Guardar Cambios Detalle</strong></button>\n\
                                        </div>\n\
                                    </div>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </fieldset>\n\
            </form><div id="datDetControl"></div>';
            $("#contDetalle").html(dat_det);

            $("#btnGuardaCambioDet").click(function () {
                validarGuardaCambiosEnvDet();
            });

        } else {
            alertify.alert("El numero ingresado no se encuentra en la Base de Datos").setHeader('<em> Cuidado! </em> ');
            limpiarFormulario("#formEditEnvio");
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que se encarga de guardar ficheros en carpeta de pruebas de entrega
 * @returns {undefined}
 */
function cargaPruebasEntregaFile() {
    var creando = "<div class='col-lg-3'><span>Loading...</span></div>\n\
                    <div class='col-lg-4'><img class='img-fluid' src='img/animaciones/masivo_mensajeria3.gif' alt=''/></div>\n\
                    <div class='col-lg-5'><span>Epere un momento por favor</span></div>";
    $("#changePruebasEntrega").html(creando);
    request = "Controller/AdminC/AdministrarEnvios/carga_pruebas_entrega_controller.php";
    cadena = new FormData($("#formCargaPruebas")[0]);
    metodo = function (datos) {
        $("#textFileMasPruebas").html("");
        limpiarFormulario("#formCargaPruebas");

        $("#changePruebasEntrega").html(datos);
    };
    f_ajax_files(request, cadena, metodo);
}
/****************************************************************
 * Metodos de Informes de envios
 * 
 ****************************************************************/
/**
 * Metodo que carga menu de informes de envios
 * @returns {undefined}
 */
function vista_informes_envios() {
    request = "View/AdministradorV/AdEnvios/informes.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html("");
        $("#list-formCliente").html(datos);

        $("#enlManifRec").click(function () {
            vista_form_manif_rec();
        });
        $("#enlRecaudCli").click(function () {
            vista_form_recaud_cli();
        });
        $("#enlConteoEnviosCli").click(function () {
            vista_form_conteo_envios_fact();
        });
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga formulario para seleccion de mensajero y fechas 
 * @returns {undefined}
 */
function vista_form_manif_rec() {
    request = "View/AdministradorV/AdEnvios/form_manif_recaudos.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#contenInfEnv").html(datos);

        combo_empleados("#selectMensajero");

        $("#btnBusEnvFec").click(function () {
            validarFechaManifiesto();
        });
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que permite validar campos de formulario seleccion de fechas
 * @returns {undefined}
 */
function validarFechaManifiesto() {
    $("#formFechManif").validate({
        rules: {
            InputFecIni: {
                required: true,
                date: true
            },
            InputFecFin: {
                required: true,
                date: true
            },
            selectMensajero: {
                valueNotEquals: "0|0"
            }
        },
        submitHandler: function (form) {
            compararFechas();
        }
    });
}

/**
 * Metodo que permite controlar que la fecha inicial sea menor a la final
 * @returns {undefined}
 */
function compararFechas() {
    var fInicial = $("#InputFecIni").val();
    var fFinal = $("#InputFecFin").val();
    if (fInicial > fFinal) {
        alertify.alert("La fecha de inicio no debe ser mayor que la fecha final").setHeader('<em> Cuidado! </em> ');
    } else {
        consulta_envios_historico();
        consulta_envios_hist_rec();
        $("#labelNomMens").html($('select[name="selectMensajero"] option:selected').text());
    }
}


/**
 * Metodo que retorna los envios cargados historicos para un mensajero
 * @returns {undefined}
 */
function consulta_envios_historico() {
    request = "Controller/AdminC/AdministrarEnvios/cons_historico_env_mens_controller.php";
    cadena = $("#formFechManif").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arregloEnvHist = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEnvHist !== 0) {
            datosEnvHist = '<legend>MANIFIESTOS</legend>';
            datosEnvHist += '<div class="table-responsive text-nowrap col-lg-12">';
            datosEnvHist += '<table class="table table-sm table-bordered table table-hover">';
            datosEnvHist += '<thead>';
            datosEnvHist += '<tr class="table-primary text-primary">';
            datosEnvHist += '<th scope="col">N° Envio</th>';
            datosEnvHist += '<th scope="col">Guia OP</th>';
            datosEnvHist += '<th scope="col">Costo</th>';
            datosEnvHist += '<th scope="col">Destino</th>';
            datosEnvHist += '<th scope="col">Recaudo Teorico</th>';
            datosEnvHist += '</tr>';
            datosEnvHist += '</thead>';
            datosEnvHist += '<tbody>';

            dia_ant = "";
            a = 0;
            b = 0;
            c = 0;
            tot = 0;

            ar = 0;
            br = 0;
            cr = 0;
            rec = 0;
            for (i = 0; i < arregloEnvHist.length; i++) {
                tmp = arregloEnvHist[i];
                dia = tmp.exe_fec_hora.substr(8, 2);
                f = new Date(tmp.exe_fec_hora.replace(/-/g, '\/'));

                if (i == 0) {
                    datosEnvHist += '<tr><th class="table-warning" colspan="5">' + diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear() + '</th></tr>';
                    datosEnvHist += '<tr>';
                    datosEnvHist += '<td>' + tmp.exe_en_id + '</td>';
                    datosEnvHist += '<td>' + tmp.en_guia + '</td>';
                    datosEnvHist += '<td>' + tmp.exe_novedad + '</td>';
                    datosEnvHist += '<td>' + tmp.en_direccion + '</td>';
                    if (tmp.en_novedad == "") {
                        rec = 0;
                        datosEnvHist += '<td>0</td>';
                    } else {
                        rec = tmp.en_novedad;
                        datosEnvHist += '<td>' + tmp.en_novedad + '</td>';
                    }
                    datosEnvHist += '</tr>';
                    a = parseInt(tmp.exe_novedad);
                    c = (a + b);
                    b = c;

                    ar = parseInt(rec);
                    cr = (ar + br);
                    br = cr;
                } else {
                    if (dia == dia_ant) {
                        datosEnvHist += '<tr>';
                        datosEnvHist += '<td>' + tmp.exe_en_id + '</td>';
                        datosEnvHist += '<td>' + tmp.en_guia + '</td>';
                        datosEnvHist += '<td>' + tmp.exe_novedad + '</td>';
                        datosEnvHist += '<td>' + tmp.en_direccion + '</td>';
                        if (tmp.en_novedad == "") {
                            rec = 0;
                            datosEnvHist += '<td>0</td>';
                        } else {
                            rec = tmp.en_novedad;
                            datosEnvHist += '<td>' + tmp.en_novedad + '</td>';
                        }
                        datosEnvHist += '</tr>';
                        a = parseInt(tmp.exe_novedad);
                        c = (a + b);
                        b = c;

                        ar = parseInt(rec);
                        cr = (ar + br);
                        br = cr;
                    } else {
                        datosEnvHist += '<tr>';
                        datosEnvHist += '<th colspan="2">SubTotal</th>';

                        tot = tot + b;
                        datosEnvHist += '<th colspan="2">' + b + '</th>';
                        datosEnvHist += '<th>' + br + '</th>';
                        datosEnvHist += '</tr>';

                        a = 0;
                        c = 0;
                        b = 0;

                        ar = 0;
                        br = 0;
                        cr = 0;

                        datosEnvHist += '<tr><th class="table-warning" colspan="5">' + diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear() + '</th></tr>';
                        datosEnvHist += '<tr>';
                        datosEnvHist += '<td>' + tmp.exe_en_id + '</td>';
                        datosEnvHist += '<td>' + tmp.en_guia + '</td>';
                        datosEnvHist += '<td>' + tmp.exe_novedad + '</td>';
                        datosEnvHist += '<td>' + tmp.en_direccion + '</td>';
                        if (tmp.en_novedad == "") {
                            rec = 0;
                            datosEnvHist += '<td>0</td>';
                        } else {
                            rec = tmp.en_novedad;
                            datosEnvHist += '<td>' + tmp.en_novedad + '</td>';
                        }
                        datosEnvHist += '</tr>';
                        a = parseInt(tmp.exe_novedad);
                        c = (a + b);
                        b = c;

                        ar = parseInt(rec);
                        cr = (ar + br);
                        br = cr;
                    }
                }
                dia_ant = tmp.exe_fec_hora.substr(8, 2);

            }
            datosEnvHist += '<tr>';
            datosEnvHist += '<th colspan="2">SubTotal</th>';

            tot = tot + b;
            datosEnvHist += '<th colspan="2">' + b + '</th>';
            datosEnvHist += '<th>' + br + '</th>';
            datosEnvHist += '</tr>';

            datosEnvHist += '<tr class="table-primary">';
            datosEnvHist += '<th colspan="2">TOTAL</th>';
            datosEnvHist += '<th colspan="3">' + tot + '</th>';
            datosEnvHist += "</tbody></table></div>";
            $("#datosMenif").html(datosEnvHist);

//            clickActuEstado_OS();
        } else {
            $("#datosMenif").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No se encontraron datos.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que retorna los envios cargados historicos para un mensajero
 * @returns {undefined}
 */
function consulta_envios_hist_rec() {
    request = "Controller/AdminC/AdministrarEnvios/cons_hist_recaudos_controller.php";
    cadena = $("#formFechManif").serialize(); //envio de parametros por POST
    metodo = function (datos) {
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arregloEnvHistRec = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEnvHistRec !== 0) {
            datosEnvHistRc = '<legend>RECAUDOS</legend>';
            datosEnvHistRc += '<div class="table-responsive text-nowrap col-lg-12">';
            datosEnvHistRc += '<table class="table table-sm table-bordered table table-hover">';
            datosEnvHistRc += '<thead>';
            datosEnvHistRc += '<tr class="bg-success">';
            datosEnvHistRc += '<th scope="col">N° Envio</th>';
            datosEnvHistRc += '<th scope="col">Guia OP</th>';
            datosEnvHistRc += '<th scope="col">Destino</th>';
            datosEnvHistRc += '<th scope="col">Recaudo</th>';
            datosEnvHistRc += '</tr>';
            datosEnvHistRc += '</thead>';
            datosEnvHistRc += '<tbody>';

            dia_ant = "";

            ar = 0;
            br = 0;
            cr = 0;
            rec = 0;
            for (i = 0; i < arregloEnvHistRec.length; i++) {
                tmp = arregloEnvHistRec[i];
                dia = tmp.exe_fec_hora.substr(8, 2);
                f = new Date(tmp.exe_fec_hora.replace(/-/g, '\/'));

                if (i == 0) {
                    datosEnvHistRc += '<tr><th class="table-success" colspan="5">' + diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear() + '</th></tr>';
                    datosEnvHistRc += '<tr>';
                    datosEnvHistRc += '<td>' + tmp.exe_en_id + '</td>';
                    datosEnvHistRc += '<td>' + tmp.en_guia + '</td>';
                    datosEnvHistRc += '<td>' + tmp.en_direccion + '</td>';
                    if (tmp.en_novedad == "") {
                        rec = 0;
                        datosEnvHistRc += '<td>0</td>';
                    } else {
                        rec = tmp.en_novedad;
                        datosEnvHistRc += '<td>' + tmp.en_novedad + '</td>';
                    }
                    datosEnvHistRc += '</tr>';

                    ar = parseInt(rec);
                    cr = (ar + br);
                    br = cr;
                } else {
                    if (dia == dia_ant) {
                        datosEnvHistRc += '<tr>';
                        datosEnvHistRc += '<td>' + tmp.exe_en_id + '</td>';
                        datosEnvHistRc += '<td>' + tmp.en_guia + '</td>';
                        datosEnvHistRc += '<td>' + tmp.en_direccion + '</td>';
                        if (tmp.en_novedad == "") {
                            rec = 0;
                            datosEnvHistRc += '<td>0</td>';
                        } else {
                            rec = tmp.en_novedad;
                            datosEnvHistRc += '<td>' + tmp.en_novedad + '</td>';
                        }
                        datosEnvHistRc += '</tr>';

                        ar = parseInt(rec);
                        cr = (ar + br);
                        br = cr;
                    } else {
                        datosEnvHistRc += '<tr>';
                        datosEnvHistRc += '<th colspan="3">SubTotal</th>';

                        datosEnvHistRc += '<th>' + br + '</th>';
                        datosEnvHistRc += '</tr>';

                        ar = 0;
                        br = 0;
                        cr = 0;

                        datosEnvHistRc += '<tr><th class="table-success" colspan="5">' + diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear() + '</th></tr>';
                        datosEnvHistRc += '<tr>';
                        datosEnvHistRc += '<td>' + tmp.exe_en_id + '</td>';
                        datosEnvHistRc += '<td>' + tmp.en_guia + '</td>';
                        datosEnvHistRc += '<td>' + tmp.en_direccion + '</td>';
                        if (tmp.en_novedad == "") {
                            rec = 0;
                            datosEnvHistRc += '<td>0</td>';
                        } else {
                            rec = tmp.en_novedad;
                            datosEnvHistRc += '<td>' + tmp.en_novedad + '</td>';
                        }
                        datosEnvHistRc += '</tr>';

                        ar = parseInt(rec);
                        cr = (ar + br);
                        br = cr;
                    }
                }
                dia_ant = tmp.exe_fec_hora.substr(8, 2);

            }
            datosEnvHistRc += '<tr>';
            datosEnvHistRc += '<th colspan="3">SubTotal</th>';

            datosEnvHistRc += '<th>' + br + '</th>';
            datosEnvHistRc += '</tr>';
            datosEnvHistRc += "</tbody></table></div>";
            $("#datosRecaudo").html(datosEnvHistRc);

        } else {
            $("#datosRecaudo").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No se encontraron datos.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que carga formulario para generar informe de recaudos
 * @returns {undefined}
 */
function vista_form_recaud_cli() {
    request = "View/AdministradorV/AdEnvios/form_recaudos_cli.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#contenInfEnv").html(datos);

        combo_clientes_dos();

        $("#selectCliente").change(function () {
            combo_sucursal_x_cli_dos();
        });

        $("#btnBusEnvFecRec").click(function () {
            validarFechaRecaudCli();
        });
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que permite validar campos de formulario seleccion de fechas
 * para informe de recaudos cliente sucursal
 * @returns {undefined}
 */
function validarFechaRecaudCli() {
    $("#formFechRecaudCli").validate({
        rules: {
            InputFecIni: {
                required: true,
                date: true
            },
            InputFecFin: {
                required: true,
                date: true
            },
            selectCliente: {
                valueNotEquals: "0|0"
            }
        },
        submitHandler: function (form) {
            compararFechasCli(consulta_env_entregados_recaudo);
        }
    });
}

/**
 * Metodo que permite controlar que la fecha inicial sea menor a la final
 * formulario de informe de recaudos cliente sucursal
 * @param {type} metodo
 * @returns {undefined}
 */
function compararFechasCli(metodo) {
    var fInicial = $("#InputFecIni").val();
    var fFinal = $("#InputFecFin").val();
    if (fInicial > fFinal) {
        alertify.alert("La fecha de inicio no debe ser mayor que la fecha final").setHeader('<em> Cuidado! </em> ');
    } else {
        metodo();
    }
}

/**
 * Metodo que retorna los envios entregados que generaron recaudo
 * @returns {undefined}
 */
function consulta_env_entregados_recaudo() {
    request = "Controller/AdminC/AdministrarEnvios/cons_hist_recaudo_cli_controller.php";
    cadena = $("#formFechRecaudCli").serialize(); //envio de parametros por POST
    metodo = function (datos) {

        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arregloEnvHist = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEnvHist !== 0) {
            fecini = new Date($("#InputFecIni").val().replace(/-/g, '\/'));
            fecfin = new Date($("#InputFecFin").val().replace(/-/g, '\/'));
            temp_cli = arregloEnvHist[0];
            datosEnvHist = '<h6>' + meses[fecini.getMonth()] + ' ' + fecini.getDate() + '-' + fecini.getFullYear() + ' a ' + meses[fecfin.getMonth()] + ' ' + fecfin.getDate() + '-' + fecfin.getFullYear() + '</h6>';
            datosEnvHist += '<h6>Total Envios Entregados para ' + temp_cli.cli_nombre + ': ' + arregloEnvHist.length + '</h6>';
            datosEnvHist += '<h5 id="totalRec">Total Recaudos :</h5>';
            datosEnvHist += '<div class="table-responsive text-nowrap col-lg-12">';
            datosEnvHist += '<table class="table table-sm table-bordered table table-hover">';
            datosEnvHist += '<thead>';
            datosEnvHist += '<tr class="table-primary text-primary">';
            datosEnvHist += '<th scope="col">N° Envio</th>';
            datosEnvHist += '<th scope="col">Guia OP</th>';
            datosEnvHist += '<th scope="col">Cliente</th>';
            datosEnvHist += '<th scope="col">Sucursal</th>';
            datosEnvHist += '<th scope="col">Recaudo</th>';
            datosEnvHist += '</tr>';
            datosEnvHist += '</thead>';
            datosEnvHist += '<tbody>';

            dia_ant = "";
            tot = 0;
            ar = 0;
            br = 0;
            cr = 0;
            rec = 0;

            for (i = 0; i < arregloEnvHist.length; i++) {
                tmp = arregloEnvHist[i];

                if (tmp.os_id_suc == null) {

                } else {
                    dia = tmp.exe_fec_hora.substr(8, 2);
                    f = new Date(tmp.exe_fec_hora.replace(/-/g, '\/'));

                    if (i == 0) {
                        datosEnvHist += '<tr><th class="table-warning" colspan="5">' + diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear() + '</th></tr>';
                        datosEnvHist += '<tr>';
                        datosEnvHist += '<td>' + tmp.exe_en_id + '</td>';
                        datosEnvHist += '<td>' + tmp.en_guia + '</td>';
                        datosEnvHist += '<td>' + tmp.cli_nombre + '</td>';
                        datosEnvHist += '<td>' + tmp.suc_nombre + '</td>';
                        if (tmp.en_novedad == "") {
                            rec = 0;
                            datosEnvHist += '<td>0</td>';
                        } else {
                            rec = tmp.en_novedad;
                            datosEnvHist += '<td>' + tmp.en_novedad + '</td>';
                        }
                        datosEnvHist += '</tr>';


                        ar = parseInt(rec);
                        cr = (ar + br);
                        br = cr;
                    } else {
                        if (dia == dia_ant) {
                            datosEnvHist += '<tr>';
                            datosEnvHist += '<td>' + tmp.exe_en_id + '</td>';
                            datosEnvHist += '<td>' + tmp.en_guia + '</td>';
                            datosEnvHist += '<td>' + tmp.cli_nombre + '</td>';
                            datosEnvHist += '<td>' + tmp.suc_nombre + '</td>';
                            if (tmp.en_novedad == "") {
                                rec = 0;
                                datosEnvHist += '<td>0</td>';
                            } else {
                                rec = tmp.en_novedad;
                                datosEnvHist += '<td>' + tmp.en_novedad + '</td>';
                            }
                            datosEnvHist += '</tr>';


                            ar = parseInt(rec);
                            cr = (ar + br);
                            br = cr;
                        } else {
                            datosEnvHist += '<tr>';
                            datosEnvHist += '<th colspan="4">SubTotal</th>';

                            tot = tot + br;
                            datosEnvHist += '<th>' + br + '</th>';
                            datosEnvHist += '</tr>';

                            ar = 0;
                            br = 0;
                            cr = 0;

                            datosEnvHist += '<tr><th class="table-warning" colspan="5">' + diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear() + '</th></tr>';
                            datosEnvHist += '<tr>';
                            datosEnvHist += '<td>' + tmp.exe_en_id + '</td>';
                            datosEnvHist += '<td>' + tmp.en_guia + '</td>';
                            datosEnvHist += '<td>' + tmp.cli_nombre + '</td>';
                            datosEnvHist += '<td>' + tmp.suc_nombre + '</td>';
                            if (tmp.en_novedad == "") {
                                rec = 0;
                                datosEnvHist += '<td>0</td>';
                            } else {
                                rec = tmp.en_novedad;
                                datosEnvHist += '<td>' + tmp.en_novedad + '</td>';
                            }
                            datosEnvHist += '</tr>';

                            ar = parseInt(rec);
                            cr = (ar + br);
                            br = cr;
                        }
                    }
                    dia_ant = tmp.exe_fec_hora.substr(8, 2);
                }

            }

            datosEnvHist += '<tr>';
            datosEnvHist += '<th colspan="4">SubTotal</th>';

            tot = tot + br;
            datosEnvHist += '<th>' + br + '</th>';
            datosEnvHist += '</tr>';

            datosEnvHist += '<tr class="table-primary">';
            datosEnvHist += '<th colspan="2">TOTAL</th>';
            datosEnvHist += '<th colspan="3">' + tot + '</th>';
            datosEnvHist += "</tbody></table></div>";
            $("#datosMenif").html(datosEnvHist);

//            clickActuEstado_OS();
        } else {
            $("#datosMenif").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No se encontraron datos.</strong></div>");
        }
        $("#totalRec").html("Total Recaudos: $" + tot);
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que carga formulario para generar informe de envios a facturar
 * @returns {undefined}
 */
function vista_form_conteo_envios_fact() {
    request = "View/AdministradorV/AdEnvios/form_cuenta_env_fact_cli.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#contenInfEnv").html(datos);

        combo_clientes_dos();

        $("#btnBusEnvFecFact").click(function () {
            validarFechaEnvCliFact();
        });
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que permite validar campos de formulario seleccion de fechas
 * para informe de recaudos cliente sucursal
 * @returns {undefined}
 */
function validarFechaEnvCliFact() {
    $("#formFechConteoEnvCliFact").validate({
        rules: {
            InputFecIni: {
                required: true,
                date: true
            },
            InputFecFin: {
                required: true,
                date: true
            },
            selectCliente: {
                valueNotEquals: "0|0"
            }
        },
        submitHandler: function (form) {
            compararFechasCli(consulta_env_cli_fact);
        }
    });
}

/**
 * Metodo que retorna los envios procesados para facturar
 * @returns {undefined}
 */
function consulta_env_cli_fact() {
    request = "Controller/AdminC/AdministrarEnvios/cons_hist_env_cli_fact_controller.php";
    cadena = $("#formFechConteoEnvCliFact").serialize(); //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arregloEnvHistFact = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloEnvHistFact !== 0) {
            datosEnvHistFact = '<div class="table-responsive text-nowrap col-lg-12">';
            datosEnvHistFact += '<table class="table table-sm table-bordered table-hover" id="tableEnvCliFact">';
            datosEnvHistFact += '<thead>';
            datosEnvHistFact += '<tr class="table-primary text-primary">';
            datosEnvHistFact += '<th scope="col">N° Envio</th>';
            datosEnvHistFact += '<th scope="col">Guia OP</th>';
            datosEnvHistFact += '<th scope="col">Fecha</th>';
            datosEnvHistFact += '<th scope="col">N° OS</th>';
            datosEnvHistFact += '<th scope="col">Cliente</th>';
            datosEnvHistFact += '<th scope="col">Sucursal</th>';
            datosEnvHistFact += '<th scope="col">T. Servicio</th>';
            datosEnvHistFact += '<th scope="col">T. Envio</th>';
            datosEnvHistFact += '<th scope="col">Nombre Destinatario</th>';
            datosEnvHistFact += '<th scope="col">Dirección Destino</th>';
            datosEnvHistFact += '<th scope="col">Ciudad Destino</th>';
            datosEnvHistFact += '</tr>';
            datosEnvHistFact += '</thead>';
            datosEnvHistFact += '<tbody>';

            for (i = 0; i < arregloEnvHistFact.length; i++) {
                tmp = arregloEnvHistFact[i];

                dia = tmp.exe_fec_hora.substr(8, 2);
                f = new Date(tmp.exe_fec_hora.replace(/-/g, '\/'));

                datosEnvHistFact += '<td>' + tmp.exe_en_id + '</td>';
                datosEnvHistFact += '<td>' + tmp.en_guia + '</td>';
                datosEnvHistFact += '<td>' + diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear() + '</td>';
                datosEnvHistFact += '<td>' + tmp.os_id + '</td>';
                datosEnvHistFact += '<td>' + tmp.cli_nombre + '</td>';
                datosEnvHistFact += '<td>' + tmp.suc_nombre + '</td>';
                datosEnvHistFact += '<td>' + tmp.ts_desc + '</td>';
                datosEnvHistFact += '<td>' + tmp.te_desc + '</td>';
                datosEnvHistFact += '<td>' + tmp.en_nombre + '</td>';
                datosEnvHistFact += '<td>' + tmp.en_direccion + '</td>';
                datosEnvHistFact += '<td>' + tmp.en_ciudad + '</td>';
                datosEnvHistFact += '</tr>';

            }

            datosEnvHistFact += "</tbody></table></div>";
            datosEnvHistFact += '<div class="toast-header"><strong class="mr-auto">TOTAL ENVIOS POR FECHA</strong><div id="btn_xls_fac"><button type="button" class="btn btn-success float-right btn-sm" id="btnReportFacturaXlsx" name="btnReportFacturaXlsx">Descargar Informe</button></div></div>';
            $("#datosEnvFact").html(datosEnvHistFact);

            $('#tableEnvCliFact thead tr').clone(true).appendTo('#tableEnvCliFact thead');
            $('#tableEnvCliFact thead tr:eq(1) th').each(function (i) {
                var title = $(this).text();
                if (i == 0) {
                    $(this).html('<input type="text" id="inpCod' + i + '" placeholder="' + title + '" size="4">');
                } else if (i == 1) {
                    $(this).html('<input type="text" id="inpCod' + i + '" placeholder="' + title + '" size="5">');
                } else if (i == 2) {
                    $(this).html('<input type="text" id="inpSku' + i + '" placeholder="' + title + '" size="20">');
                } else if (i == 3) {
                    $(this).html('<input type="text" id="inpDesc' + i + '" placeholder="' + title + '" size="3">');
                } else if (i == 4) {
                    $(this).html('<input type="text" id="inpUb' + i + '" placeholder="' + title + '" size="20">');
                } else if (i == 5) {
                    $(this).html('<input type="text" id="inpCos' + i + '" placeholder="' + title + '" size="20">');
                } else if (i == 6) {
                    $(this).html('<input type="text" id="inpCos' + i + '" placeholder="' + title + '" size="8">');
                } else if (i == 7) {
                    $(this).html('<input type="text" id="inpCos' + i + '" placeholder="' + title + '" size="8">');
                } else if (i == 8) {
                    $(this).html('<input type="text" id="inpCos' + i + '" placeholder="' + title + '" size="30">');
                } else if (i == 9) {
                    $(this).html('<input type="text" id="inpCos' + i + '" placeholder="' + title + '" size="30">');
                } else if (i == 10) {
                    $(this).html('<input type="text" id="inpCos' + i + '" placeholder="' + title + '" size="8">');
                }
//                $(this).html('<input type="text" id="inp' + i + '" placeholder="' + title + '"/>');

                $('input', this).on('keyup change', function () {
                    if (table.column(i).search() !== this.value) {
                        table
                                .column(i)
                                .search(this.value)
                                .draw();
                    }
                });
            });

            var table = $('#tableEnvCliFact').DataTable({
                orderCellsTop: true,
                fixedHeader: true
            });

            $("#btnReportFacturaXlsx").click(function () {
                reporte_fact_Xls(cadena);
            });
//            clickActuEstado_OS();
        } else {
            $("#datosEnvFact").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No se encontraron datos.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que carga el dashboard principal de envios para una sucursal
 * @returns {undefined}
 */
function vista_busca_entrada() {
    request = "View/SucursalV/form_busq_entradas.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
//        exist = false;
        $("#contenidoInvent").html(datos);

        $("#btnBuscaDet").click(function () {
            validar_detalle_entrada();
        });
        $("#btnBuscaFechEnt").click(function () {
            validar_fechas_entrada();
        });
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que permite validar campos de fecha en dashboard envios cliente
 * @returns {undefined}
 */
function validar_detalle_entrada() {
    $("#formBuscarDetalle").validate({
        rules: {
            inpBuscaDet: {
                required: true,
                minlength: 5
            }
        },
        submitHandler: function (form) {
            tabla_detalle_entrada(num_id_suc_ent, $("#inpBuscaDet").val());
        }
    });
}
/**
 * Metodo que carga la tabla de envios segun detalle de entrada
 * @param {type} suc
 * @param {type} detalle
 * @returns {tabla_detalle_entrada}
 */
function tabla_detalle_entrada(suc, detalle) {
    request = "Controller/AdminC/AdministrarProd/consulta_entradas_detalle_controller.php";
    cadena = {"suc_id": suc, "inpBuscaDet": detalle}; //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arreglo_entr = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_entr !== 0) {
            datos_entr = '<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">\n\
                            <div class="toast-header">\n\
                            <strong class="mr-auto" id="title_env_est">TABLA GENERAL DE ENTRADAS</strong>\n\
                            </div>\n\
                            <div class="toast-body">\n\
                            <div class="table-responsive text-nowrap col-lg-12" id="tbInfoEstEnv">\n\
                            <table class="table table-striped table-sm table-bordered" id="tableEntSucDet">\n\
                            <thead><tr class="table-primary">\n\
                                <th scope="col">FECHA</th>\n\
                                <th scope="col">HORA</th>\n\
                                <th scope="col">CODIGO</th>\n\
                                <th scope="col">SKU</th>\n\
                                <th scope="col">DESCRIPCION</th>\n\
                                <th scope="col">CANTIDAD</th>\n\
                                <th scope="col">DETALLE</th>\n\
                                </tr></thead><tbody>';

            for (i = 0; i < arreglo_entr.length; i++) {
                temp = arreglo_entr[i];

                var fecha_hora = new Date(temp.ent_fecha);
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                };
                var timeString = fecha_hora.toLocaleString('en-US', options);
                fe = new Date(temp.ent_fecha.replace(/-/g, '\/'));

                datos_entr += '<tr class="table-sm fila="' + i + '">';
                datos_entr += '<td>' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                datos_entr += '<td>' + timeString + '</td>';
                datos_entr += '<td>' + temp.pro_cod + '</td>';
                datos_entr += '<td>' + temp.pro_sku + '</td>';
                datos_entr += '<td>' + temp.pro_desc + '</td>';
                datos_entr += '<td>' + temp.ent_cantidad + '</td>';
                datos_entr += '<td>' + temp.ent_detalle + '</td>';
            }
            datos_entr += "</tbody></table></div></div></div>";


            $("#tabla_Ent_Suc").html(datos_entr);
            /**
             * Evento que pagina una tabla 
             */
            var table = $('#tableEntSucDet').DataTable({
                'scrollX': true
            });

        } else {
            $("#tabla_Ent_Suc").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que valida datos del formulario para generar reporte por fechas entrada
 * @returns {undefined}
 */
function validar_fechas_entrada() {
    $("#formBuscarFechaEnt").validate({
        rules: {
            inpFechaInicio: {
                required: true,
                date: true
            },
            inpFechaFin: {
                required: true,
                date: true
            }
        },
        submitHandler: function (form) {
            verificaFechasEnt();
        }
    });
}
/**
 * Metodo que permite controlar que la fecha inicial sea menor a la final para reporte entradas
 * @returns {undefined}
 */
function verificaFechasEnt() {
    var fInicial = $("#inpFechaInicio").val();
    var fFinal = $("#inpFechaFin").val();
    if (fInicial > fFinal) {
        $("#mensaje").html("La fecha inicial no puede ser mayor que la final");
    } else {
        tabla_fechas_entrada(num_id_suc_ent, $("#inpFechaInicio").val(), $("#inpFechaFin").val());
    }
}
/**
 * Metodo que carga la tabla de envios segun rango fechas de entrada
 * @param {type} suc
 * @param {type} f_ini
 * @param {type} f_fin
 * @returns {tabla_fechas_entrada}
 */
function tabla_fechas_entrada(suc, f_ini, f_fin) {
    request = "Controller/AdminC/AdministrarProd/consulta_entradas_fecha_controller.php";
    cadena = {"suc_id": suc, "inpFechaInicio": f_ini, "inpFechaFin": f_fin}; //envio de parametros por POST
    metodo = function (datos) {
//        alert(datos);
        meses = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic");
        diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        arreglo_entr = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arreglo_entr !== 0) {
            datos_entr = '<div class="toast show border-primary col-lg-12" role="alert" aria-live="assertive" aria-atomic="true" style="max-width: 100%; border-radius: 0.5rem;">\n\
                            <div class="toast-header">\n\
                            <strong class="mr-auto" id="title_env_est">TABLA GENERAL DE ENTRADAS</strong>\n\
                            </div>\n\
                            <div class="toast-body">\n\
                            <div class="table-responsive text-nowrap col-lg-12" id="tbInfoEstEnv">\n\
                            <table class="table table-striped table-sm table-bordered" id="tableEntSucDet">\n\
                            <thead><tr class="table-secondary">\n\
                                <th scope="col">FECHA</th>\n\
                                <th scope="col">HORA</th>\n\
                                <th scope="col">CODIGO</th>\n\
                                <th scope="col">SKU</th>\n\
                                <th scope="col">DESCRIPCION</th>\n\
                                <th scope="col">CANTIDAD</th>\n\
                                <th scope="col">DETALLE</th>\n\
                                </tr></thead><tbody>';

            for (i = 0; i < arreglo_entr.length; i++) {
                temp = arreglo_entr[i];

                var fecha_hora = new Date(temp.ent_fecha);
                var options = {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                };
                var timeString = fecha_hora.toLocaleString('en-US', options);
                fe = new Date(temp.ent_fecha.replace(/-/g, '\/'));

                datos_entr += '<tr class="table-sm fila="' + i + '">';
                datos_entr += '<td>' + fe.getDate() + " de " + meses[fe.getMonth()] + " de " + fe.getFullYear() + '</td>';
                datos_entr += '<td>' + timeString + '</td>';
                datos_entr += '<td>' + temp.pro_cod + '</td>';
                datos_entr += '<td>' + temp.pro_sku + '</td>';
                datos_entr += '<td>' + temp.pro_desc + '</td>';
                datos_entr += '<td>' + temp.ent_cantidad + '</td>';
                datos_entr += '<td>' + temp.ent_detalle + '</td>';
            }
            datos_entr += "</tbody></table></div></div></div>";


            $("#tabla_Ent_Suc").html(datos_entr);
            /**
             * Evento que pagina una tabla 
             */
            var table = $('#tableEntSucDet').DataTable({
                'scrollX': true
            });

        } else {
            $("#tabla_Ent_Suc").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

function reporte_fact_Xls(data) {
//    alert(num_suc);
    request = "Controller/AdminC/AdministrarEnvios/reporte_env_fact_controller.php";
    cadena = data; //envio de parametros por POST
    metodo = function (datos) {
        rutaXLS_fact_guardado(datos);
    };
    f_ajax(request, cadena, metodo);
}

/**
 * Metodo que proporciona la ruta y el nombre del archivo xls de fact para descargar
 * basicamente se hace como medio de control en tiempo de ejecucion
 * previene que se ejecute una descarga antes de crear el archivo xlsx
 * @param {type} clienteRuta
 * @returns {undefined}
 */
function rutaXLS_fact_guardado(clienteRuta) {
    if (clienteRuta == 1) {
        alertify.alert('Reporte no generado, error al generar el reporte').setHeader('<em> Cuidado! </em> ');
    } else {
        $(location).attr('href', 'Files/' + $.trim(clienteRuta) + '.xlsx');

        alertify.warning('Reporte Generado!!!');
    }

}
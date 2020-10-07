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
    $("#link_vista_gest_env").click(function () {
        vista_gestionar_envios();
    });
    $("#link_vista_dashboard_serv").click(function () {
        vista_dashboard();
    });
    $("#link_vista_hist").click(function () {
        vista_historial_os();
    });
    $("#link_sucursales").click(function () {
        vista_admin_sucursal();
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
    request = "View/AdministradorV/AdCliente/form_editar.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
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

        tablaGeneralOperadores();
        $("#btnGuardaOperador").click(function () {
            validarInsertOpera();
        });
        $("#btnCancelarOperador").click(function () {
            resetFormOpera();
        });

        tablaGeneralEstadoAEnv();
        $("#btnGuardaEstAEnv").click(function () {
            validarInsertEsae();
        });
        $("#btnCancelarEstAEnv").click(function () {
            resetFormEsae();
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

//        formulario_oreden_serv();//ejecuta por defecto
        crear_os_por_cliente();

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
var serv_piking;
var serv_paking;
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
        serv_piking = 0;
        serv_paking = 0;
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
                } else if (tmp.es_id == 5) {
                    datosEstOS += '<tr class="table-sm" id="fila' + i + '"><td class="enlace actuestos" act="' + i + '"><span class="ion-social-dropbox" style="color: #ce8300;"></span></td>';
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
                } else if (tmp.es_id == 5) {
                    datosEstOS += '<td style="background-color: #fea;">' + tmp.es_desc + '</td>';
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
    $("#cantServPiking").html(serv_piking);
    $("#cantServPaking").html(serv_paking);
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
        serv_piking = 0;
        serv_paking = 0;
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
                    serv_piking++;
                } else if (tmp.es_id == 6) {
                    serv_paking++;
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

        $('#checkSucur').on('click', function () {
            if ($(this).is(':checked')) {
                // Hacer algo si el checkbox ha sido seleccionado
                $("#blqSucur").show();
                combo_sucursal_x_cli();
            } else {
                // Hacer algo si el checkbox ha sido deseleccionado
                $("#selectSuc_x_Cli").html("");
                $("#blqSucur").hide();
            }
        });

        $("#selectCliente").change(function () {
            if ($('#checkSucur').prop('checked')) {
                combo_sucursal_x_cli();
            }
        });

        $("#btnSiguiente").click(function () {
            if ($("#selectProceso").val() == 1) {
                formulario_recolec();
                if ($('#checkSucur').prop('checked')) {
                    if ($("#selectSuc_x_Cli").val() == '' || $("#selectSuc_x_Cli").val() == 0) {
                        datos_cliente_selected();
                        $("#nomCli").html("Cliente: " + $("#selectCliente option:selected").html());
                        $("#infoOrd").html("Proceso: " + $("#selectProceso option:selected").html());
                    } else {
                        datos_sucursal_selected();
                        $("#nomCli").html("Cliente: " + $("#selectSuc_x_Cli option:selected").html());
                        $("#infoOrd").html("Proceso: " + $("#selectProceso option:selected").html());
                    }
                } else {
                    datos_cliente_selected();
                    $("#nomCli").html("Cliente: " + $("#selectCliente option:selected").html());
                    $("#infoOrd").html("Proceso: " + $("#selectProceso option:selected").html());
                }
            } else if ($("#selectProceso").val() == 2) {
                formulario_alistamiento_xlsx();
                if ($('#checkSucur').prop('checked')) {
                    if ($("#selectSuc_x_Cli").val() == '' || $("#selectSuc_x_Cli").val() == 0) {
                        datos_cliente_selected();
                        $("#nomCli").html("Cliente: " + $("#selectCliente option:selected").html());
                        $("#infoOrd").html("Proceso: " + $("#selectProceso option:selected").html());
                    } else {
                        datos_sucursal_selected();
                        $("#nomCli").html("Cliente: " + $("#selectSuc_x_Cli option:selected").html());
                        $("#infoOrd").html("Proceso: " + $("#selectProceso option:selected").html());
                    }
                } else {
                    datos_cliente_selected();
                    $("#nomCli").html("Cliente: " + $("#selectCliente option:selected").html());
                    $("#infoOrd").html("Proceso: " + $("#selectProceso option:selected").html());
                }
            }
            $("#formBuscarCli_crear_OS").hide();
            $("#infoCliente").show();
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
        combo_clientes();

        $('#checkSucur').on('click', function () {
            if ($(this).is(':checked')) {
                // Hacer algo si el checkbox ha sido seleccionado
                $("#blqSucur").show();
                combo_sucursal_x_cli();
            } else {
                // Hacer algo si el checkbox ha sido deseleccionado
                $("#selectSuc_x_Cli").html("");
                $("#blqSucur").hide();
            }
        });

        $("#selectCliente").change(function () {
            if ($('#checkSucur').prop('checked')) {
                combo_sucursal_x_cli();
            }
        });

        $("#btnBuscarProc").click(function () {
            if ($("#selectProceso").val() == 1) {
                alert("proceso no definido aun!!");
//                formulario_recolec();
//                if ($('#checkSucur').prop('checked')) {
//                    if ($("#selectSuc_x_Cli").val() == '' || $("#selectSuc_x_Cli").val() == 0) {
//                        datos_cliente_selected();
//                        $("#nomCli").html("Cliente: " + $("#selectCliente option:selected").html());
//                        $("#infoOrd").html("Proceso: " + $("#selectProceso option:selected").html());
//                    } else {
//                        datos_sucursal_selected();
//                        $("#nomCli").html("Cliente: " + $("#selectSuc_x_Cli option:selected").html());
//                        $("#infoOrd").html("Proceso: " + $("#selectProceso option:selected").html());
//                    }
//                } else {
//                    datos_cliente_selected();
//                    $("#nomCli").html("Cliente: " + $("#selectCliente option:selected").html());
//                    $("#infoOrd").html("Proceso: " + $("#selectProceso option:selected").html());
//                }
            } else if ($("#selectProceso").val() == 2) {
//                formulario_alistamiento_xlsx();
                if ($('#checkSucur').prop('checked')) {
                    if ($("#selectSuc_x_Cli").val() == '' || $("#selectSuc_x_Cli").val() == 0) {
                        alert("proceso no definido aun!!");
//                        datos_cliente_selected();
//                        cargaProdAlistamiento();
//                        $("#nomCli").html("Cliente: " + $("#selectCliente option:selected").html());
//                        $("#infoOrd").html("Proceso: " + $("#selectProceso option:selected").html());
                    } else {
                        datos_suc_selected_en_proceso();
                        cargaProdAlistamiento();
                        $("#nomCli").html("Cliente: " + $("#selectSuc_x_Cli option:selected").html());
                        $("#infoOrd").html("Proceso: " + $("#selectProceso option:selected").html());
                    }
                } else {
                    alert("proceso no definido aun!!");
//                    datos_cliente_selected();
//                    $("#nomCli").html("Cliente: " + $("#selectCliente option:selected").html());
//                    $("#infoOrd").html("Proceso: " + $("#selectProceso option:selected").html());
                }
            }
            $("#formBuscarCli_crear_OS").hide();
            $("#infoCliente").show();
        });
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

/**
 * Metodo que carga la vista de busqueda historica de os por cliente
 * @returns {undefined}
 */
function vista_historial_os() {
    request = "View/AdministradorV/OrdenesServicio/tipo_busq_historial_os.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
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
        datouscombo = "";
        for (i = 0; i < arreglo.length; i++) {
            temp = arreglo[i];
            datouscombo += '<option value="' + temp.cli_td_id + '|' + temp.cli_num_doc + '">' + temp.cli_nombre + "</option>";
        }
        $("#selectCliente").html(datouscombo);
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
        $("#list-formCliente").html(datos);

        combo_sucursal();

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

        $("#formAjuste").click(function () {
            if (typeof value_suc === 'undefined' || $("#inputSucId").val() == "") {
                alertify.alert('Debe seleccionar una sucursal').setHeader('<em> Cuidado! </em> ');
            } else {
                tabla_kardex_prueba();
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
                             <div class="toast-body row"><div class="alert alert-dismissible alert-warning col-lg-12" style="border-radius: 0.5rem;">\n\
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
                datos_stock_suc += '<td class="enlace"><span class="ion-clipboard geskardex" style="color: #702894; font-size: large;"></span></td>';
                datos_stock_suc += '<td>' + tmp.pro_cod + '</td>';
                datos_stock_suc += '<td>' + tmp.pro_sku + '</td>';
                datos_stock_suc += '<td>' + tmp.pro_desc + '</td>';
                datos_stock_suc += '<td>' + tmp.pro_ubicacion + '</td>';
                if (tmp.total < 3) {
                    datos_stock_suc += '<td><b style="color: #e40a0a;">' + tmp.total + '</b></td></tr>';
                } else {
                    datos_stock_suc += '<td>' + tmp.total + '</td></tr>';
                }
            }
            datos_stock_suc += "</tbody></table></div></div></div>";
            $("#contenidoInvent").html(datos_stock_suc);

//            /**
//             * Evento que pagina una tabla 
//             */
            $('#tableStockSucursal').DataTable();

            $("#tableStockSucursal").on("click", ".geskardex", function () {

//                ges_envio = $(this).attr("envMens");
//                viasta_envio_modal(ges_envio);

                $('#ModalActuEstOS').modal('toggle');
                $('#ModalEstOSTitle').html('ENVIO');
                $('#body_mod_os').html('<div class="toast-header"><strong class="mr-auto">STOCK</strong></div>');

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
 * @returns {undefined}
 */
function tabla_kardex_prueba() {
    request = "View/AdministradorV/AdSucursal/tabla_stock_kardex.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {

        $("#contenidoInvent").html(datos);
        $('#tableKardex').DataTable();
    };
    f_ajax(request, cadena, metodo);
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
    cadena = "selectCliente=" + $("#selectCliente").val(); //envio de parametros por POST
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
 * Metodo que retorna los datos de cliente seleccionado
 * @returns {undefined}
 */
function datos_cliente_selected() {
    request = "Controller/AdminC/AdministrarCliente/consulta_cli_x_num_controller.php";
    cadena = "selectCliente=" + $("#selectCliente").val(); //envio de parametros por POST
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
        $("#numOrden").html("N° OS : " + tmp_dat_os.os_id + "");
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
        $("#sectionConten").html(datos);
        $("#btnGMasAlist").click(function () {
            validarMasivoEnviosAlist();
        });
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
        },
        submitHandler: function (form) {
            cargaArchivo_xlsx_alist();
//            alert("ok");
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
    request = "Controller/AdminC/AdministrarOS/carga_xlsx_alist_controller.php";
    cadena = new FormData($("#formMasAlistamiento")[0]);
    metodo = function (datos) {
//        arregloemp = $.parseJSON(datos);
        $("#textMasAlist").html("");
        limpiarFormulario("#formMasAlistamiento");
        if (datos == 1) {
            lectura_xlsx_alist();
//            $("#changeAlistEnvios").html("FINALIZADO");
//            alert("subio y es excel");
        } else {
            $("#changeAlistEnvios").html(datos);
        }

//        $("#tabEnviosDocum").html(datos);
    };
    f_ajax_files(request, cadena, metodo);
}
/**
 * Metodo que lee los datos del archivo excel subido para alistamiento
 * @returns {undefined}
 */
function lectura_xlsx_alist() {
    request = "Controller/AdminC/AdministrarOS/leer_xlsx_alist_controller.php";
    cadena = "a=1";
    metodo = function (datos) {
        $("#changeAlistEnvios").html(datos);
    };
    f_ajax(request, cadena, metodo);
}
var pag;
/*
 * Metodo que carga la vista de las ventas para alistamiento
 * se ejecuta desde php al recibir la carga correcta de archivo xlsx
 * @returns {undefined}
 */
function cargaProdAlistamiento() {
    request = "Controller/AdminC/AdministrarOS/consulta_alist_prod_stock_controller.php";
    cadena = "a=1";
    metodo = function (datos) {

//        $("#blqPagina1").html(datos);

        arregloAlista = $.parseJSON(datos);
        /*Aqui se determina si la consulta retorna datos, de ser asi se genera vista de tabla, de lo contrario no*/
        if (arregloAlista !== 0) {

            venta = 0;
            blq = 0;
            pag = 1;
            datosAlist = '<div><button type="button" class="btn btn-success float-right" id="btnSaveAllVentas" name="btnSaveAllVentas">Guaradar Todo</button></div>';

            for (i = 0; i < arregloAlista.length; i++) {
                tmp = arregloAlista[i];

                if (tmp.total <= 0 || tmp.estimado <= 0) {
                    tema = 'danger';
                    icon = '<span class="ion-android-settings text-danger"></span>';
                    checked = '';
                } else {
                    tema = 'warning';
                    icon = '<span class="ion-android-cloud-done text-success"></span>';
                    checked = 'checked = ""';
                }

                if (i === 0) {
                    //******primera fila****//
                    datosAlist += '<div class="bloque" id="blqPagina' + pag + '"><h4>HOJA ' + pag + '</h4>';
                    datosAlist += '<div id="sec' + tmp.t_sal_num_venta + '"><div class="alert alert-dismissible alert-' + tema + ' col-lg-12 border-warning" id="blqAlist' + blq + '" style="border-radius: 0.5rem;">\n\
                        <div class="row">\n\
                        <div class="col-4"><strong>N° VENTA: <b class="text-primary">' + tmp.t_sal_num_venta + ' </b></strong></div>\n\
                        <div class="col-4"><strong>N° GUIA: <b class="text-success">' + tmp.t_sal_guia_num + ' </b></strong></div>\n\
                        <div class="form-group col-3">\n\
                          <div class="custom-control custom-switch">\n\
                          <input type="checkbox" class="custom-control-input cheBlq" vent="' + tmp.t_sal_num_venta + '" che="' + i + '" id="' + blq + '" ' + checked + '>\n\
                          <label class="custom-control-label" for="' + blq + '">OK</label>\n\
                        </div></div></div>';
                    datosAlist += '<div class="dropdown-divider"></div>\n\
                        <div class="table-responsive text-nowrap">\n\
                        <table class="table table-hover table-sm table-fixed">\n\
                        <thead><tr class="table-primary">\n\
                        <th scope="col">SKU</th>\n\
                            <th scope="col">PRODUCTO</th>\n\
                            <th scope="col">UB</th>\n\
                            <th scope="col">STOCK</th>\n\
                            <th scope="col">UNS</th>\n\
                            <th scope="col">TEÓRICO</th>\n\
                            <th scope="col"><span class="ion-android-clipboard"></span></th>\n\
                        </tr></thead><tbody>';

                    blq++;

                    datosAlist += '<tr class="table-' + tema + '" id="fila' + tmp.t_csc + '"><td id="td1' + tmp.t_csc + '">' + tmp.pro_sku + '</td>';
                    datosAlist += '<td id="td2' + tmp.t_csc + '">' + tmp.pro_desc + '</td>';
                    datosAlist += '<td id="td3' + tmp.t_csc + '">' + tmp.pro_ubicacion + '</td>';
                    datosAlist += '<td id="td4' + tmp.t_csc + '">' + tmp.total + '</td>';
                    datosAlist += '<td id="td5' + tmp.t_csc + '">' + tmp.t_sal_cantidad + '</td>';
                    datosAlist += '<td id="td6' + tmp.t_csc + '">' + tmp.estimado + '</td>';
                    datosAlist += '<td class="enlace editProduc" id="producto' + i + '" edPro="' + tmp.t_csc + '">' + icon + '</td></tr>';

                    if (i === arregloAlista[arregloAlista.length - 1]) {

                        datosAlist += '</tbody></table></div>\n\
                          <div class="row justify-content-end" id="divBtn' + (parseInt(blq) - 1) + '"><div class="col-3">\n\
                            <button class="btn btn-light ventguardar" type="button" btAddVe="' + venta + '" id="btnGuardVent' + venta + '" name="btnGuardVent' + venta + '">Go!</button>\n\
                          </span></div>\n\
                          </div>\n\
                          <div class="row justify-content-end" id="divBtnCan' + (parseInt(blq) - 1) + '" style="display: none;">\n\
                          <div class="col-8">\n\
                            <input class="form-control form-control-sm" type="text" id="inputNovedad' + venta + '" name="inputNovedad' + venta + '" placeholder="Novedad">\n\
                          </div>\n\
                          <div class="col-3">\n\
                            <button class="btn btn-danger ventcancel" type="button" btCanVe="' + venta + '" id="btnCancelVent' + venta + '" name="btnCancelVent' + venta + '">Go!</button>\n\
                          </span></div>\n\
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
                            datosAlist += '<tr class="table-' + tema + '" id="fila' + tmp.t_csc + '"><td id="td1' + tmp.t_csc + '">' + tmp.pro_sku + '</td>';
                            datosAlist += '<td id="td2' + tmp.t_csc + '">' + tmp.pro_desc + '</td>';
                            datosAlist += '<td id="td3' + tmp.t_csc + '">' + tmp.pro_ubicacion + '</td>';
                            datosAlist += '<td id="td4' + tmp.t_csc + '">' + tmp.total + '</td>';
                            datosAlist += '<td id="td5' + tmp.t_csc + '">' + tmp.t_sal_cantidad + '</td>';
                            datosAlist += '<td id="td6' + tmp.t_csc + '">' + tmp.estimado + '</td>';
                            datosAlist += '<td class="enlace editProduc" id="producto' + i + '" edPro="' + tmp.t_csc + '">' + icon + '</td></tr>';

                            datosAlist += '</tbody></table></div>\n\
                              <div class="row justify-content-end" id="divBtn' + (parseInt(blq) - 1) + '"><div class="col-3">\n\
                                <button class="btn btn-light ventguardar" type="button" btAddVe="' + venta + '" id="btnGuardVent' + venta + '" name="btnGuardVent' + venta + '">Go!</button>\n\
                              </span></div>\n\
                              </div>\n\
                              <div class="row justify-content-end" id="divBtnCan' + (parseInt(blq) - 1) + '" style="display: none;">\n\
                              <div class="col-8">\n\
                                <input class="form-control form-control-sm" type="text" id="inputNovedad' + venta + '" name="inputNovedad' + venta + '" placeholder="Novedad">\n\
                              </div>\n\
                              <div class="col-3">\n\
                                <button class="btn btn-danger ventcancel" type="button" btCanVe="' + venta + '" id="btnCancelVent' + venta + '" name="btnCancelVent' + venta + '">Go!</button>\n\
                              </span></div>\n\
                              </div>\n\
                            </div></div>';//fin de la tabla
                            datosAlist += '</div>';//fin de la pag
                        } else {
                            //***NO es la misma venta de la fila anterior**//
                            datosAlist += '</tbody></table></div>\n\
                              <div class="row justify-content-end" id="divBtn' + (parseInt(blq) - 1) + '"><div class="col-3">\n\
                                <button class="btn btn-light ventguardar" type="button" btAddVe="' + venta + '" id="btnGuardVent' + venta + '" name="btnGuardVent' + venta + '">Go!</button>\n\
                              </span></div>\n\
                              </div>\n\
                              <div class="row justify-content-end" id="divBtnCan' + (parseInt(blq) - 1) + '" style="display: none;">\n\
                              <div class="col-8">\n\
                                <input class="form-control form-control-sm" type="text" id="inputNovedad' + venta + '" name="inputNovedad' + venta + '" placeholder="Novedad">\n\
                              </div>\n\
                              <div class="col-3">\n\
                                <button class="btn btn-danger ventcancel" type="button" btCanVe="' + venta + '" id="btnCancelVent' + venta + '" name="btnCancelVent' + venta + '">Go!</button>\n\
                              </span></div>\n\
                              </div>\n\
                            </div></div>';//fin de la tabla

                            if (blq % 20 == 0) {
                                datosAlist += '</div>';//fin de la pag
                                pag++;
                                datosAlist += '<div class="bloque" id="blqPagina' + pag + '" style="display: none;"><h4>HOJA ' + pag + '</h4>';
                            }

                            datosAlist += '<div id="sec' + tmp.t_sal_num_venta + '"><div class="alert alert-dismissible alert-' + tema + ' col-lg-12 border-warning" id="blqAlist' + blq + '" style="border-radius: 0.5rem;">\n\
                                <div class="row">\n\
                                <div class="col-4"><strong>N° VENTA: <b class="text-primary">' + tmp.t_sal_num_venta + ' </b></strong></div>\n\
                                <div class="col-4"><strong>N° GUIA: <b class="text-success">' + tmp.t_sal_guia_num + ' </b></strong></div>\n\
                                <div class="form-group col-3">\n\
                                  <div class="custom-control custom-switch">\n\
                                  <input type="checkbox" class="custom-control-input cheBlq" vent="' + tmp.t_sal_num_venta + '" che="' + i + '" id="' + blq + '" ' + checked + '>\n\
                                  <label class="custom-control-label" for="' + blq + '">OK</label>\n\
                                </div></div></div>';
                            datosAlist += '<div class="dropdown-divider"></div>\n\
                                <div class="table-responsive text-nowrap">\n\
                                <table class="table table-hover table-sm table-fixed">\n\
                                <thead><tr class="table-primary">\n\
                                <th scope="col">SKU</th>\n\
                                    <th scope="col">PRODUCTO</th>\n\
                                    <th scope="col">UB</th>\n\
                                    <th scope="col">STOCK</th>\n\
                                    <th scope="col">UNS</th>\n\
                                    <th scope="col">TEÓRICO</th>\n\
                                    <th scope="col"><span class="ion-android-clipboard"></span></th>\n\
                                </tr></thead><tbody>';

                            blq++;

                            datosAlist += '<tr class="table-' + tema + '" id="fila' + tmp.t_csc + '"><td id="td1' + tmp.t_csc + '">' + tmp.pro_sku + '</td>';
                            datosAlist += '<td id="td2' + tmp.t_csc + '">' + tmp.pro_desc + '</td>';
                            datosAlist += '<td id="td3' + tmp.t_csc + '">' + tmp.pro_ubicacion + '</td>';
                            datosAlist += '<td id="td4' + tmp.t_csc + '">' + tmp.total + '</td>';
                            datosAlist += '<td id="td5' + tmp.t_csc + '">' + tmp.t_sal_cantidad + '</td>';
                            datosAlist += '<td id="td6' + tmp.t_csc + '">' + tmp.estimado + '</td>';
                            datosAlist += '<td class="enlace editProduc" id="producto' + i + '" edPro="' + tmp.t_csc + '">' + icon + '</td></tr>';

                            datosAlist += '</tbody></table></div>\n\
                              <div class="row justify-content-end" id="divBtn' + (parseInt(blq) - 1) + '"><div class="col-3">\n\
                                <button class="btn btn-light ventguardar" type="button" btAddVe="' + venta + '" id="btnGuardVent' + venta + '" name="btnGuardVent' + venta + '">Go!</button>\n\
                              </span></div>\n\
                              </div>\n\
                              <div class="row justify-content-end" id="divBtnCan' + (parseInt(blq) - 1) + '" style="display: none;">\n\
                              <div class="col-8">\n\
                                <input class="form-control form-control-sm" type="text" id="inputNovedad' + venta + '" name="inputNovedad' + venta + '" placeholder="Novedad">\n\
                              </div>\n\
                              <div class="col-3">\n\
                                <button class="btn btn-danger ventcancel" type="button" btCanVe="' + venta + '" id="btnCancelVent' + venta + '" name="btnCancelVent' + venta + '">Go!</button>\n\
                              </span></div>\n\
                              </div>\n\
                            </div></div>';//fin de la tabla
                            datosAlist += '</div>';//fin de la pag
                        }

                    } else {
                        //***NO es la ultima fila del arreglo**//

                        if (tmp.t_sal_num_venta == venta) {
                            //***si es la misma venta de la fila anterior**//
                            datosAlist += '<tr class="table-' + tema + '" id="fila' + tmp.t_csc + '"><td id="td1' + tmp.t_csc + '">' + tmp.pro_sku + '</td>';
                            datosAlist += '<td id="td2' + tmp.t_csc + '">' + tmp.pro_desc + '</td>';
                            datosAlist += '<td id="td3' + tmp.t_csc + '">' + tmp.pro_ubicacion + '</td>';
                            datosAlist += '<td id="td4' + tmp.t_csc + '">' + tmp.total + '</td>';
                            datosAlist += '<td id="td5' + tmp.t_csc + '">' + tmp.t_sal_cantidad + '</td>';
                            datosAlist += '<td id="td6' + tmp.t_csc + '">' + tmp.estimado + '</td>';
                            datosAlist += '<td class="enlace editProduc" id="producto' + i + '" edPro="' + tmp.t_csc + '">' + icon + '</td></tr>';

                        } else {
                            //***NO es la misma venta de la fila anterior**//
                            datosAlist += '</tbody></table></div>\n\
                              <div class="row justify-content-end" id="divBtn' + (parseInt(blq) - 1) + '"><div class="col-3">\n\
                                <button class="btn btn-light ventguardar" type="button" btAddVe="' + venta + '" id="btnGuardVent' + venta + '" name="btnGuardVent' + venta + '">Go!</button>\n\
                              </span></div>\n\
                              </div>\n\
                              <div class="row justify-content-end" id="divBtnCan' + (parseInt(blq) - 1) + '" style="display: none;">\n\
                              <div class="col-8">\n\
                                <input class="form-control form-control-sm" type="text" id="inputNovedad' + venta + '" name="inputNovedad' + venta + '" placeholder="Novedad">\n\
                              </div>\n\
                              <div class="col-3">\n\
                                <button class="btn btn-danger ventcancel" type="button" btCanVe="' + venta + '" id="btnCancelVent' + venta + '" name="btnCancelVent' + venta + '">Go!</button>\n\
                              </span></div>\n\
                              </div>\n\
                            </div></div>';//fin de la tabla

                            if (blq % 20 == 0) {
                                datosAlist += '</div>';//fin de la pag
                                pag++;
                                datosAlist += '<div class="bloque" id="blqPagina' + pag + '" style="display: none;"><h4>HOJA ' + pag + '</h4>';
                            }

                            datosAlist += '<div id="sec' + tmp.t_sal_num_venta + '"><div class="alert alert-dismissible alert-' + tema + ' col-lg-12 border-warning" id="blqAlist' + blq + '" style="border-radius: 0.5rem;">\n\
                                <div class="row">\n\
                                <div class="col-4"><strong>N° VENTA: <b class="text-primary">' + tmp.t_sal_num_venta + ' </b></strong></div>\n\
                                <div class="col-4"><strong>N° GUIA: <b class="text-success">' + tmp.t_sal_guia_num + ' </b></strong></div>\n\
                                <div class="form-group col-3">\n\
                                  <div class="custom-control custom-switch">\n\
                                  <input type="checkbox" class="custom-control-input cheBlq" vent="' + tmp.t_sal_num_venta + '" che="' + i + '" id="' + blq + '" ' + checked + '>\n\
                                  <label class="custom-control-label" for="' + blq + '">OK</label>\n\
                                </div></div></div>';
                            datosAlist += '<div class="dropdown-divider"></div>\n\
                                <div class="table-responsive text-nowrap">\n\
                                <table class="table table-hover table-sm table-fixed">\n\
                                <thead><tr class="table-primary">\n\
                                <th scope="col">SKU</th>\n\
                                    <th scope="col">PRODUCTO</th>\n\
                                    <th scope="col">UB</th>\n\
                                    <th scope="col">STOCK</th>\n\
                                    <th scope="col">UNS</th>\n\
                                    <th scope="col">TEÓRICO</th>\n\
                                    <th scope="col"><span class="ion-android-clipboard"></span></th>\n\
                                </tr></thead><tbody>';

                            blq++;

                            datosAlist += '<tr class="table-' + tema + '" id="fila' + tmp.t_csc + '"><td id="td1' + tmp.t_csc + '">' + tmp.pro_sku + '</td>';
                            datosAlist += '<td id="td2' + tmp.t_csc + '">' + tmp.pro_desc + '</td>';
                            datosAlist += '<td id="td3' + tmp.t_csc + '">' + tmp.pro_ubicacion + '</td>';
                            datosAlist += '<td id="td4' + tmp.t_csc + '">' + tmp.total + '</td>';
                            datosAlist += '<td id="td5' + tmp.t_csc + '">' + tmp.t_sal_cantidad + '</td>';
                            datosAlist += '<td id="td6' + tmp.t_csc + '">' + tmp.estimado + '</td>';
                            datosAlist += '<td class="enlace editProduc" id="producto' + i + '" edPro="' + tmp.t_csc + '">' + icon + '</td></tr>';

                            venta = tmp.t_sal_num_venta;
                        }
                    }
                }

            }
            datosAlist += '</tbody></table></div>\n\
              <div class="row justify-content-end" id="divBtn' + (parseInt(blq) - 1) + '"><div class="col-3">\n\
                <button class="btn btn-light ventguardar" type="button" btAddVe="' + venta + '" id="btnGuardVent' + venta + '" name="btnGuardVent' + venta + '">Go!</button>\n\
              </span></div>\n\
              </div>\n\
              <div class="row justify-content-end" id="divBtnCan' + (parseInt(blq) - 1) + '" style="display: none;">\n\
              <div class="col-8">\n\
                <input class="form-control form-control-sm" type="text" id="inputNovedad' + venta + '" name="inputNovedad' + venta + '" placeholder="Novedad">\n\
              </div>\n\
              <div class="col-3">\n\
                <button class="btn btn-danger ventcancel" type="button" btCanVe="' + venta + '" id="btnCancelVent' + venta + '" name="btnCancelVent' + venta + '">Go!</button>\n\
              </span></div>\n\
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

            clickPaginasAlist();
            clickPaginasAlistPrev();
            clickPaginasAlistNext();
            clickEditProd();
            checkedVenta();
            click_No_gestionarVenta();
            click_gestionar_Venta();

            $("#btnSaveAllVentas").click(function () {
                ventasNoSelected();
                ventasSelected();
                cargaProdAlistamiento();
            });

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
    $("#btnNext").click(function () {
//        alert(pagina++);

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
 * @returns {undefined}
 */
function clickEditProd() {
//    $("#tableEstOS").on("click", ".actuestos", function () {
    $(".editProduc").click(function () {
        edit_prod = $(this).attr("edPro");
        consulta_prod_alist(edit_prod);
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
              <button type="button" class="btn btn-danger float-right" id="btnElimProdActAlist" name="btnElimProdActAlist">Eliminar item</button>\n\
            </form>');
//        alert("click en " + edit_prod);
//        form_act_est_os(arregloEstOS, actu_es_os);
        $("#btnBusSkuAlst").click(function () {
            if ($("#inputSkuAls").val().length == 0) {
                alert("Faltan datos");
            } else {
                consulta_prod_alist_sku($("#inputSkuAls").val());
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
function checkedVenta() {
//    $('.cheBlq').on('click', function () {
    $('.cheBlq').click(function () {
        checket = $(this).attr("id");
        if ($("#" + checket + "").is(':checked')) {
            // Hacer algo si el checkbox ha sido seleccionado
            $("#blqAlist" + checket + "").removeClass("alert-danger");
            $("#blqAlist" + checket + "").addClass("alert-warning");
            $("#divBtn" + checket + "").show();
            $("#divBtnCan" + checket + "").hide();

//            alert("activado " + checket);
        } else {
            // Hacer algo si el checkbox ha sido deseleccionado
            $("#blqAlist" + checket + "").removeClass("alert-warning");
            $("#blqAlist" + checket + "").addClass("alert-danger");
            $("#divBtn" + checket + "").hide();
            $("#divBtnCan" + checket + "").show();

//            alert("No activo el " + checket);
        }
    });
}
/**
 * Metodo que carga en el form del modal datos para editar producto alistamiento
 * @param {type} csc
 * @returns {undefined}
 */
function consulta_prod_alist(csc) {
    request = "Controller/AdminC/AdministrarProd/consulta_prod_alist_controller.php";
    cadena = "csc=" + csc;
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
 * @returns {undefined}
 */
function consulta_prod_alist_sku(sku) {
    request = "Controller/AdminC/AdministrarProd/consulta_sku_alist_controller.php";
    cadena = "sku=" + sku;
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
            }
        },
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

            tmp_prod_item = arreglo_datos_prod_sku[0];

            $('#td1' + edit_prod + '').html(tmp_prod_item.pro_sku);
            $('#td2' + edit_prod + '').html(tmp_prod_item.pro_desc);
            $('#td3' + edit_prod + '').html(tmp_prod_item.pro_ubicacion);
            $('#td4' + edit_prod + '').html(tmp_prod_item.total);
            $('#td5' + edit_prod + '').html(cantidad);
            $('#td6' + edit_prod + '').html(teorico);
        } else {
            alertify.error('No se pudo realizar la Actualización!');
//            alert(datos);
        }
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que guarda y gestiona venta de tabla salidas temp y actualiza estado en tabla est_x_aenv
 * @returns {undefined}
 */
function click_gestionar_Venta() {
//    $('.cheBlq').on('click', function () {
    $('.ventguardar').click(function () {
        esta_venta = $(this).attr("btAddVe");

//        elimina_item_alist_venta(esta_venta);//elimina la seccion de una venta
//        insertar_est_x_aenv(4, $("#inputNovedad" + esta_venta + "").val(), esta_venta, orden_serv);
        comprobar_os_creada(esta_venta);

    });
}
/**
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
        } else if (datos == 3) {
            insertar_est_x_aenv(2, $("#inputNovedad" + venta_sale + "").val(), venta_sale, orden_serv);
            elimina_item_alist_venta(venta_sale);//elimina la seccion de una venta
        } else {
            alert(datos);
        }

    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo que elimina venta de tabla salidas temp y actualiza estado en tabla est_x_aenv
 * @returns {undefined}
 */
function click_No_gestionarVenta() {
//    $('.cheBlq').on('click', function () {
    $('.ventcancel').click(function () {
        esta_venta = $(this).attr("btCanVe");

        elimina_item_alist_venta(esta_venta);//elimina la seccion de una venta
        insertar_est_x_aenv(4, $("#inputNovedad" + esta_venta + "").val(), esta_venta, orden_serv);

    });
}
/**
 * Metodo que determina los check no seleccionados para procesar eliminar ventas en tabla temp
 * @returns {undefined}
 */
function ventasNoSelected() {
    $("input:checkbox:not(:checked)").each(function () {

        checket_venta = $(this).attr("vent");//numeo de venta

        elimina_item_alist_venta(checket_venta);//elimina la seccion de una venta
        insertar_est_x_aenv(4, $("#inputNovedad" + checket_venta + "").val(), checket_venta, orden_serv);
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
        if (datos == 1) {
            alertify.message('Venta ' + venta + ' procesada', 2);
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
            alertify.success('Estado Acualizado venta N° ' + venta, 2);
        } else {
            alertify.error('Error al actualizar estado venta N° ' + venta, 5);
        }
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
        $("#list-formCliente").html(datos);

        $("#enlAsigMens").click(function () {
            formulario_asig_mens();
            $("#items-env li").removeClass("active");
            $("#itemenlAsigMens").addClass("active");
        });

        $("#enlSeguimientoEnv").click(function () {
            seguimiento_estado_env();
            $("#items-env li").removeClass("active");
            $("#itemenlSeguimiento").addClass("active");
        });
    };
    f_ajax(request, cadena, metodo);
}

var mensajero;
/**
 * Metodo que retorna la vista de asignacion de mensajero a envios
 * @returns {undefined}
 */
function formulario_asig_mens() {
    request = "View/AdministradorV/AdEnvios/asignar_mens.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#contenGestEnvios").html(datos);

        combo_empleados("#selectMensajero");

        $("#selectMensajero").change(function () {
            mensajero = $("#selectMensajero").val();
            consulta_tabla_env_mens(mensajero);
        });

        $("#btnSelectMens").click(function () {
            mensajero = $("#selectMensajero").val();
            consulta_tabla_env_mens(mensajero);
        });
        consulta_tabla_env_programados();
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
                             <th scope='col'>GUIA LOGI</th>\n\
                             <th scope='col'>GUIA OP</th>\n\
                             <th scope='col'>OS</th>\n\
                             <th scope='col'>DIR. DESTINO</th>\n\
                             <th scope='col'>CIUDAD</th>\n\
                             </tr></thead><tbody>";
            for (i = 0; i < arreglo_env_est.length; i++) {
                tmp = arreglo_env_est[i];

                if (tmp.ts_id == 1) {
                    color_serv = ' #593196;';
                } else if (tmp.ts_id == 2) {
                    color_serv = ' #18d26e;';
                }

                datos_env_est += '<tr class="table-sm" id="fila' + i + '"><td class="enlace"><span class="ion-android-mail gesEnvio" envMens="' + tmp.exe_en_id + '" style="color: ' + color_serv + '"></span></td>';
                datos_env_est += '<td>' + tmp.exe_en_id + '</td>';
                datos_env_est += '<td>' + tmp.en_guia + '</td>';
                datos_env_est += '<td>' + tmp.os_id + '</td>';
                datos_env_est += '<td>' + tmp.en_direccion + '</td>';
                datos_env_est += '<td>' + tmp.en_ciudad + '</td></tr>';
            }
            datos_env_est += "</tbody></table></div>";
            $("#tab_envios").html(datos_env_est);

            /**
             * Evento que pagina una tabla 
             */
            $('#tableEstEnvio').DataTable({
                'scrollX': true
            });

            clickGestEnv();

        } else {
            $("#tab_envios").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
}

var arreglo_env_prog;
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
                'pageLength': 50
            });

//            table_env_prog.on('search.dt', function () {
//                num_filas = table_env_prog.rows().count();
//                alert(num_filas);
//            });

            $("div#tableEnvProgram_filter input").keyup(function (e) {
                if (e.keyCode == 13) {

                    filtro_in = $('#tableEnvProgram_filter input').val();
//                    alert(filtro_in);
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
                                insertar_env_prog(guia_enter, mensajero);
                                consulta_tabla_env_mens(mensajero);
                                $('#fila_pro' + guia_enter + '').remove();
                                alertify.success('Envio Guia Logi N° ' + guia_enter + ' cargado');
                            }
                        }

                    }

                }
            });

            clickAdd_env_mensajero();
            clickElim_fila();
        } else {
            $("#tab_envios_prog").html("<div class='alert alert-dismissible alert-danger'>\n\
                 <button type='button' class='close' data-dismiss='alert'>&times;</button>\n\
                 <strong>No existen datos para mostrar.</strong></div>");
        }
    };
    f_ajax(request, cadena, metodo);
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
            consulta_tabla_env_mens(mensajero);
            $('#fila_pro' + fil_delete + '').remove();
        }
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
        $("#contenGestEnvios").html(datos);
        $("#btnBuscaEnv").click(function () {
            validarBuscarNumEnvio(datos_envio_seg);
        });
//        botones_seg_os();
    };
    f_ajax(request, cadena, metodo);
}

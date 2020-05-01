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
 * Metodo que carga el form para modificar clientes
 * @returns {undefined}
 */
function vista_form_Edit() {
    request = "View/AdministradorV/Adcliente/form_editar.php";
    cadena = "a=1"; //envio de parametros por POST
    metodo = function (datos) {
        $("#list-formCliente").html(datos);
        tablaGeneralClientesActivos();
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
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {

    $("#btnIngresar").click(function () {
        validarLogin();
    });

//    $("#perfil").click(function () {
//        ejecutarIngreso();
//    });
//
//    $("#cerrarSesion").click(function () {
//        cerrarSesion();
//    });

//    active_menu();

});

/**
 * Variable global de ajax
 * @type type
 */
var efe_aja;
/**
 * Metodo general de ajax para formularios sin ficheros
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
 * Metodo de validacion de loging
 * @returns {undefined}
 */
function validarLogin() {
    $("#formLog").validate({
        rules: {
            inputUsuario: {
                required: true
            },
            inputClave: {
                required: true
            }
        },
        submitHandler: function (form) {
            ejecutarIngreso();
        }
    });
}

/**
 * Metodo de comprobacion usuario
 * @returns {undefined}
 */
function ejecutarIngreso() {
    request = "Controller/Login_General/login_control.php";
    cadena = $("#formLog").serialize();
    metodo = function (datos) {
//        alert(datos);
        comprobarUsuario(datos);
    };
    f_ajax(request, cadena, metodo);
}
/**
 * Metodo de inicio de sesion
 * @param {type} respuesta
 * @returns {undefined}
 */
function comprobarUsuario(respuesta) {
//    alert("Usuario o Contraseña incorrectos" + respuesta);
    if (respuesta == 1) {
        $(location).attr('href', 'admin_logi.php');
    } else if (respuesta == 2) {
        $(location).attr('href', 'cliente.php');
    } else if (respuesta == 3) {
        $(location).attr('href', 'cliente.php');
    }else{
        alert("Usuario o Contraseña Incorrectos");
    }
}
/**
 * Metodo para cerrar sesion
 * @returns {undefined}
 */
function cerrarSesion() {
    request = "Control/Login_General/log_aut_control.php";
    cadena = "a=1";
    metodo = function (datos) {
//        alertify.success('Sesión finalizada');
        location.href = "index.php";
    };
    f_ajax(request, cadena, metodo);
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
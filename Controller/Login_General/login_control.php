<?php

/* iniciar la sesión */
session_start();

require '../../config.php';

if ($_POST) {

    $usuario_pass_dao = new Usuario_pass_DAO();

    $usuario = $_POST["inputUsuario"];
    $password = $_POST["inputClave"];


    if (!empty($datos_acceso = json_encode($usuario_pass_dao->consultaLogin($_POST["inputUsuario"])))) {

        $array = json_decode($datos_acceso);
        for ($i = 0; $i < count($array); $i++) {

            if (password_verify($password, $array[$i]->us_password) == TRUE) {

                $_SESSION["tipo_doc"] = $array[$i]->cli_td_id;
                $_SESSION["numero_doc"] = $array[$i]->cli_num_doc;
                $_SESSION["nombre_cli"] = $array[$i]->cli_nombre;
                $_SESSION["telefono_cli"] = $array[$i]->cli_tel;
                $_SESSION["celular_cli"] = $array[$i]->cli_cel;
                $_SESSION["direccion_cli"] = $array[$i]->cli_direccion;
                $_SESSION["id_usu"] = $array[$i]->tu_id;
                $_SESSION["documento"] = $array[$i]->td_sigla;
                $_SESSION["usuario_sistema"] = $array[$i]->tu_tipo;
                $_SESSION["per_contac"] = $array[$i]->cli_per_cont;

                switch ($_SESSION["id_usu"]) {
                    case 1:
                        $_SESSION["cliente_a"] = $array[$i]->tu_tipo;
                        echo 2;
                        break;
                    case 2:
                        $_SESSION["cliente_b"] = $array[$i]->tu_tipo;
                        echo 3;
                        break;
                }
            }
        }
    } elseif (!empty($datos_acceso = json_encode($usuario_pass_dao->consultaLoginEmp($_POST["inputUsuario"])))) {

        $array = json_decode($datos_acceso);


        for ($i = 0; $i < count($array); $i++) {

            if (password_verify($password, $array[$i]->ue_password) == TRUE) {

                $_SESSION["tipo_doc"] = $array[$i]->emp_td_id;
                $_SESSION["numero_doc"] = $array[$i]->emp_num_doc;
                $_SESSION["nombre_cli"] = $array[$i]->emp_nombre;
                $_SESSION["telefono_cli"] = $array[$i]->emp_tel;
                $_SESSION["celular_cli"] = $array[$i]->emp_cel;
                $_SESSION["direccion_cli"] = $array[$i]->emp_direccion;
                $_SESSION["car_usu"] = $array[$i]->car_id;
                $_SESSION["documento"] = $array[$i]->td_sigla;
                $_SESSION["usuario_sistema"] = $array[$i]->car_nombre;
                $_SESSION["email_emp"] = $array[$i]->emp_email;

                switch ($_SESSION["car_usu"]) {
                    case 1:
                        $_SESSION["adminlogi"] = $array[$i]->car_nombre;
                        echo 1;
                        break;
                    case 2:
                        $_SESSION["mensajero_logi"] = $array[$i]->car_nombre;
                        echo 5;
                        break;
                }
            }
        }
    } elseif (!empty($datos_acceso = json_encode($usuario_pass_dao->consultaSucLogin($_POST["inputUsuario"])))) {

        $array = json_decode($datos_acceso);


        for ($i = 0; $i < count($array); $i++) {

            if (password_verify($password, $array[$i]->suc_password) == TRUE) {

                $_SESSION["tipo_doc"] = $array[$i]->cli_td_id;
                $_SESSION["numero_doc"] = $array[$i]->cli_num_doc;
                $_SESSION["nombre_cli"] = $array[$i]->cli_nombre;
                $_SESSION["numero_suc"] = $array[$i]->suc_num_id;
                $_SESSION["direccion_suc"] = $array[$i]->suc_direccion;
                $_SESSION["ciudad_suc"] = $array[$i]->suc_ciudad;
                $_SESSION["tel_suc"] = $array[$i]->suc_telefono;


                $_SESSION["sucursal"] = $array[$i]->suc_nombre;

                echo 4;
            }
        }
    }
} else {
    header("location: ../");
}
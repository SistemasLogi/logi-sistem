<?php

require_once 'vendor/autoload.php';
require_once 'auth.php';

//$key = 'my_secret_key';
//
//if (!isset($_GET['p']))
//    die('No ha definido la página a visualizar');
//
//$page = strtolower($_GET['p']);
//require_once "api_controller/$page.php";

require '../config.php';


if ($_POST) {

    $usuario_pass_dao = new Usuario_pass_DAO();
    $usuario_pass_vo = new Usuario_pass_VO();

    $usuario = $_POST["user"];
    $password = $_POST["password"];


    if (!empty($datos_acceso = json_encode($usuario_pass_dao->consultaLogin($usuario)))) {

        $array = json_decode($datos_acceso);
        for ($i = 0; $i < count($array); $i++) {

            if (password_verify($password, $array[$i]->us_password) == TRUE) {

                $usuario_pass_vo->setTipo_doc($array[$i]->cli_td_id);
                $usuario_pass_vo->setNum_doc($array[$i]->cli_num_doc);
                $usuario_pass_vo->setRole('cliente');
                $usuario_pass_vo->setTipo_usu($array[$i]->tu_tipo);

//                require_once "controllers/autentica.php";
                echo Auth::SignIn([
                    'id_doc' => $usuario_pass_vo->getTipo_doc(),
                    'num_doc' => $usuario_pass_vo->getNum_doc(),
                    'role' => $usuario_pass_vo->getRole(),
                    'id_role' => $usuario_pass_vo->getTipo_usu()
                ]);
            }
        }
    } elseif (!empty($datos_acceso = json_encode($usuario_pass_dao->consultaLoginEmp($usuario)))) {

        $array = json_decode($datos_acceso);


        for ($i = 0; $i < count($array); $i++) {

            if (password_verify($password, $array[$i]->ue_password) == TRUE) {

                $usuario_pass_vo->setTipo_doc($array[$i]->emp_td_id);
                $usuario_pass_vo->setNum_doc($array[$i]->emp_num_doc);
                $usuario_pass_vo->setRole('empleado');
                $usuario_pass_vo->setTipo_usu($array[$i]->car_id);

//                require_once "controllers/autentica.php";
                echo Auth::SignIn([
                    'id_doc' => $usuario_pass_vo->getTipo_doc(),
                    'num_doc' => $usuario_pass_vo->getNum_doc(),
                    'role' => $usuario_pass_vo->getRole(),
                    'id_role' => $usuario_pass_vo->getTipo_usu()
                ]);
            }
        }
    } elseif (!empty($datos_acceso = json_encode($usuario_pass_dao->consultaSucLogin($usuario)))) {

        $array = json_decode($datos_acceso);


        for ($i = 0; $i < count($array); $i++) {

            if (password_verify($password, $array[$i]->suc_password) == TRUE) {

                $usuario_pass_vo->setTipo_doc($array[$i]->cli_td_id);
                $usuario_pass_vo->setNum_doc($array[$i]->cli_num_doc);
                $usuario_pass_vo->setRole('sucursal');
                $usuario_pass_vo->setTipo_usu($array[$i]->suc_num_id);

//                require_once "controllers/autentica.php";
                echo Auth::SignIn([
                    'id_doc' => $usuario_pass_vo->getTipo_doc(),
                    'num_doc' => $usuario_pass_vo->getNum_doc(),
                    'role' => $usuario_pass_vo->getRole(),
                    'id_role' => $usuario_pass_vo->getTipo_usu()
                ]);
            }
        }
    }
} else {
    echo 'No se ha especificado un ingreso valido';
}


<?php

require '../../config.php';

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
        }
    }
}
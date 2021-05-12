<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if ($_POST) {
    require '../../../config.php';
    $upass_dao = new Usuario_pass_DAO();
    $upass_vo = new Usuario_pass_VO();

    $upass_vo->setTipo_doc($_POST["inpTipoDocEmp"]);
    $upass_vo->setNum_doc($_POST["inpNumeroEmp"]);
    $upass_vo->setUsuario($_POST["inpUsuarioEmp"]);
    $passw = $_POST["inpPassEmp"];
    $estado = $_POST["selectEstadoUsu"];
    if (empty($passw)) {
        if ($upass_dao->actualizarEstadoEmpleado($upass_vo, $estado) == 1) {
            echo 1;
        } else {
            echo 2;
        }
    } else {
        $upass_vo->setPassword(password_hash($_POST["inpPassEmp"], PASSWORD_DEFAULT));

        if ($upass_dao->actualizarUsuarioEmpleado($upass_vo) == 1) {
            if ($upass_dao->actualizarEstadoEmpleado($upass_vo, $estado) == 1) {
                echo 1;
            } else {
                echo 2;
            }
        } else {
            echo 3;
        }
    }
} else {
    header("location../");
}

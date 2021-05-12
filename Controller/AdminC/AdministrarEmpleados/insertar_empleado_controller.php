<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if ($_POST) {
    require '../../../config.php';
    $empleado_dao = new Empleado_DAO();
    $empleado_vo = new Empleado_VO();
    $upass_dao = new Usuario_pass_DAO();
    $upass_vo = new Usuario_pass_VO();

    $empleado_vo->setEmp_tipo_doc($_POST["selectTipDoc"]);
    $empleado_vo->setEmp_numero_doc($_POST["inputNumEmp"]);
    $empleado_vo->setEmp_nombre($_POST["inputNomEmp"]);
    $empleado_vo->setEmp_telefono($_POST["inputTelEmp"]);
    $empleado_vo->setEmp_celular($_POST["inputCelEmp"]);
    $empleado_vo->setEmp_direccion($_POST["inputDirEmp"]);
    $empleado_vo->setEmp_correo($_POST["inputEmailEmp"]);
    $empleado_vo->setEmp_estado(1);

    $upass_vo->setTipo_doc($_POST["selectTipDoc"]);
    $upass_vo->setNum_doc($_POST["inputNumEmp"]);
    $upass_vo->setTipo_usu($_POST["selectTipCargo"]);
    $upass_vo->setUsuario($_POST["inputNumEmp"]);
    $upass_vo->setPassword(password_hash($_POST["inputNumEmp"], PASSWORD_DEFAULT));

    if ($empleado_dao->insertarEmpleado($empleado_vo) == 1) {
        if ($upass_dao->insertarActualEmpPass($upass_vo) == 1) {
            echo 1;
        } else {
            echo 3;
        }
    } else {
        echo 2;
    }
} else {
    header("location../");
}
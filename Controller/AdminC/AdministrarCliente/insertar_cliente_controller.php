<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if ($_POST) {
    require '../../../config.php';
    $cliente_dao = new Cliente_DAO();
    $cliente_vo = new Cliente_VO();
    $upass_dao = new Usuario_pass_DAO();
    $upass_vo = new Usuario_pass_VO();

    $cliente_vo->setTipo_doc($_POST["selectTipDoc"]);
    $cliente_vo->setNum_doc($_POST["inputNumCli"]);
    $cliente_vo->setNombre($_POST["inputNomCli"]);
    $cliente_vo->setTelefono($_POST["inputTelCli"]);
    $cliente_vo->setCelular($_POST["inputCelCli"]);
    $cliente_vo->setDireccion($_POST["inputDirCli"]);
    $cliente_vo->setPcontac($_POST["inputPerCont"]);

    $upass_vo->setTipo_doc($_POST["selectTipDoc"]);
    $upass_vo->setNum_doc($_POST["inputNumCli"]);
    $upass_vo->setTipo_usu($_POST["selectTipUs"]);
    $upass_vo->setUsuario($_POST["inputNumCli"]);
    $upass_vo->setPassword(password_hash($_POST["inputNumCli"], PASSWORD_DEFAULT));

    if ($cliente_dao->insertarCliente($cliente_vo) == 1) {
        if ($upass_dao->insertarActualUsuPass($upass_vo) == 1) {
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

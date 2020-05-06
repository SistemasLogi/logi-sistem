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

    $cliente_vo->setTipo_doc($_POST["selectTipDocAc"]);
    $cliente_vo->setNum_doc($_POST["inputNumCliAc"]);
    $cliente_vo->setNombre($_POST["inputNomCliAc"]);
    $cliente_vo->setTelefono($_POST["inputTelCliAc"]);
    $cliente_vo->setCelular($_POST["inputCelCliAc"]);
    $cliente_vo->setDireccion($_POST["inputDirCliAc"]);
    $cliente_vo->setPcontac($_POST["inputPerContAc"]);

    echo $cliente_dao->actualizarCliente($cliente_vo);
} else {
    header("location../");
}

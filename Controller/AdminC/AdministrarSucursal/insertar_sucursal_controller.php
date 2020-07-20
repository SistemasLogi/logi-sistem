<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if ($_POST) {
    require '../../../config.php';
    $sucursal_vo = new Sucursales_VO();
    $sucursal_dao = new Sucursales_DAO();
    $dpto_dao = new Depto_DAO();

    $json_id_dpto = json_encode($dpto_dao->consultaDepto_x_ciu($_POST["selectCiudad"]));
    $dpto_ciu = json_decode($json_id_dpto);
    $passw = 'colombia123';

    $sucursal_vo->setTd_cliente($_POST["selectTipDocAc"]);
    $sucursal_vo->setNum_doc_cliente($_POST["inputNumCliAc"]);
    $sucursal_vo->setNombre_suc($_POST["inputNomSucursal"]);
    $sucursal_vo->setDireccion_suc($_POST["inputDirSuc"]);
    $sucursal_vo->setCiudad_suc($dpto_ciu[0]->ciu_nombre);
    $sucursal_vo->setTel_suc($_POST["inputTelSuc"]);
    $sucursal_vo->setUsuario_suc($_POST["inputUsuarioSuc"]);
    $sucursal_vo->setPass_suc(password_hash($passw, PASSWORD_DEFAULT));

    echo $sucursal_dao->insertarSucursal($sucursal_vo);
} else {
    header("location../");
}
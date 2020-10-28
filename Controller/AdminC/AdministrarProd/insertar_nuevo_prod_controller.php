<?php

if ($_POST) {
    require '../../../config.php';
    date_default_timezone_set('America/Bogota');
    $fecha_hora = date("Y-m-d H:i:s");
    $producto_dao = new Producto_DAO();
    $producto_vo = new Producto_VO();

    $producto_vo->setSuc_numero($_POST["inputNumSuc"]);
    $producto_vo->setCod_prod($_POST["inputCodProd"]);
    $producto_vo->setSku_prod($_POST["inputSku"]);
    $producto_vo->setDescripcion($_POST["inputNomProd"]);
    $producto_vo->setUbicacion($_POST["inputUbProd"]);
    $producto_vo->setFecha_reg($fecha_hora);
    $producto_vo->setCosto_unit(0);

    echo $producto_dao->insertarProductoNuevo($producto_vo);
} else {
    header("location../");
}
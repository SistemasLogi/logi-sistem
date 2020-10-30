<?php

if ($_POST) {
    require '../../../config.php';
    $producto_dao = new Producto_DAO();

    $num_suc = $_POST["inputNumSuc"];
    $cod_prod = $_POST["inputCodProd"];
    $sku = $_POST["inputSkuProd"];
    $desc = $_POST["inputDescProd"];
    $ubic = $_POST["inputUbicacionProd"];
    $costo = $_POST["inputCostoUnit"];

    echo $producto_dao->actualizarProducto($sku, $desc, $ubic, $costo, $num_suc, $cod_prod);
} else {
    header("location../");
}
<?php

if ($_POST) {
    require '../../../config.php';
    $product_dao = new Producto_DAO();

    $csc = $_POST["inputFila"];
    $cantidad = $_POST["inputCantiAls"];
    $cod_prod = $_POST["inputCodAls"];

    echo $product_dao->actualizarItemProdAlist($cod_prod, $cantidad, $csc);
} else {
    header("location../");
}
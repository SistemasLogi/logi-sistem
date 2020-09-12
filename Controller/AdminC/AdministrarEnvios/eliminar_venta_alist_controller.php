<?php

if ($_POST) {
    require '../../../config.php';
    $product_dao = new Producto_DAO();

    echo $product_dao->elimProdTempVent($_POST["venta"]);
} else {
    header("location../");
}
